import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { z } from "zod";
import argon2 from "argon2";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Некорректные данные" }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase();
    const name = parsed.data.name.trim();
    const passwordHash = await argon2.hash(parsed.data.password);

    const db = await getDb();

    // проверим уникальность
    const exists = await db.collection("users").findOne({ email });
    if (exists) {
      return NextResponse.json({ ok: false, error: "E-mail уже зарегистрирован" }, { status: 409 });
    }

    // создаём запись
    await db.collection("users").insertOne({
      email,
      name,
      passwordHash,
      role: "STUDENT",
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("REGISTER ERROR", e);
    return NextResponse.json({ ok: false, error: "Серверная ошибка" }, { status: 500 });
  }
}
