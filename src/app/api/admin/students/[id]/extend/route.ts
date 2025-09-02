import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";
import { ObjectId, type WithId, type Document } from "mongodb";
import { z } from "zod";

export const runtime = "nodejs";

// В Next 15+ params в контексте асинхронные
type RouteCtx = { params: Promise<{ id: string }> };

const bodySchema = z.object({
  months: z.number().int().min(1).max(24).default(6),
});

export async function POST(req: NextRequest, ctx: RouteCtx) {
  // Доступ только ADMIN / INSTRUCTOR
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // Достаём id из асинхронных params
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  // Тело запроса
  const parsed = bodySchema.safeParse(await req.json().catch(() => ({})));
  const months = parsed.success ? parsed.data.months : 6;

  const db = await getDb();
  const coll = db.collection("users");

  // Универсально для разных версий драйвера:
  // в одних — { value: doc }, в других — doc | null
  const rawRes = await coll.findOneAndUpdate(
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
    { returnDocument: "after" as any }
  );

  const doc = (rawRes as any)?.value ?? (rawRes as WithId<Document> | null);
  if (!doc) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const expiresAt = (doc as any).expiresAt ?? null;

  return NextResponse.json({ ok: true, expiresAt }, { status: 200 });
}
