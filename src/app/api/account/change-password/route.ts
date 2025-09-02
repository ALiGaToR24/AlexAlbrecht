import { NextResponse } from "next/server";
import { z } from "zod";
import argon2 from "argon2";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  current: z.string().min(6, "Текущий пароль обязателен"),
  next: z.string().min(6, "Новый пароль минимум 6 символов").max(64),
  confirm: z.string().min(6).max(64),
})
.refine(v => v.next === v.confirm, {
  message: "Пароли не совпадают",
  path: ["confirm"],
})
.refine(v => v.current !== v.next, {
  message: "Новый пароль не должен совпадать с текущим",
  path: ["next"],
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // ✅ Zod v3: используем issues, а не errors
    const first = parsed.error.issues.at(0)?.message ?? "Некорректные данные";
    return NextResponse.json({ ok: false, error: first }, { status: 400 });
  }

  const { current, next } = parsed.data;

  const db  = await getDb();
  const _id = new ObjectId(session.user.id);

  const user = await db.collection("users").findOne<{ passwordHash: string }>(
    { _id },
    { projection: { passwordHash: 1 } }
  );
  if (!user?.passwordHash) {
    return NextResponse.json({ ok: false, error: "Аккаунт не найден" }, { status: 404 });
  }

  const ok = await argon2.verify(user.passwordHash, current);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Неверный текущий пароль" }, { status: 400 });
  }

  const newHash = await argon2.hash(next);
  await db.collection("users").updateOne(
    { _id },
    {
      $set: {
        passwordHash: newHash,
        updatedAt: new Date(),
        passwordChangedAt: new Date(),
      },
      $inc: { tokenVersion: 1 }, // на будущее (инвалидация токенов)
    }
  );

  // Просим пользователя перелогиниться
  return NextResponse.json({ ok: true, mustReLogin: true });
}
