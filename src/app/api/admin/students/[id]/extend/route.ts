import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";
import { ObjectId, WithId, Document, ModifyResult } from "mongodb";
import { z } from "zod";

export const runtime = "nodejs";

const bodySchema = z.object({
  months: z.number().int().min(1).max(24).default(6),
});

export async function POST(
  req: Request,
  ctx: { params: { id: string } }
) {
  // доступ только ADMIN / INSTRUCTOR
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => ({})));
  const months = parsed.success ? parsed.data.months : 6;

  const db = await getDb();
  const coll = db.collection("users");

  type UserDoc = WithId<Document> & { expiresAt?: Date };

  // ⚠️ БЕЗ дженерика <UserDoc> — он здесь не поддерживается
  const res = (await coll.findOneAndUpdate(
      { _id: new ObjectId(id) },
      [
          {
              $set: {
                  expiresAt: {
                      $dateAdd: {
                          startDate: { $ifNull: ["$expiresAt", "$$NOW"] },
                          unit: "month",
                          amount: months,
                      },
                  },
                  updatedAt: "$$NOW",
              },
          },
      ],
      { returnDocument: "after" as const }
  )) as unknown as ModifyResult<UserDoc>;

  // Универсально получаем документ (в разных версиях драйвера это либо res.value, либо сам res)
  const doc = (res as any)?.value ?? (res as any);

  if (!doc) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    { ok: true, expiresAt: (doc as UserDoc).expiresAt ?? null },
    { status: 200 }
  );
}
