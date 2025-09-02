import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

function addMonths(d: Date, m: number) {
  const nd = new Date(d);
  nd.setMonth(nd.getMonth() + m);
  return nd;
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  let months = Number(body?.months ?? 6);
  if (!Number.isFinite(months) || months < 1 || months > 36) months = 6;

  const db = await getDb();
  const coll = db.collection("users");

  // читаем текущую дату истечения
  const doc = await coll.findOne<{ expiresAt?: Date }>({ _id: new ObjectId(id) }, { projection: { expiresAt: 1 } });
  if (!doc) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const base = doc.expiresAt instanceof Date && !Number.isNaN(doc.expiresAt.getTime())
    ? doc.expiresAt
    : new Date();

  const newExpires = addMonths(base, months);

  await coll.updateOne(
    { _id: new ObjectId(id) },
    { $set: { expiresAt: newExpires, updatedAt: new Date() } }
  );

  return NextResponse.json({ ok: true, expiresAt: newExpires }, { status: 200 });
}
