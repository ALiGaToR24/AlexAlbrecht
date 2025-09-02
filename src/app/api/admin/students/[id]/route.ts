import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const runtime = "nodejs";          // чтобы не использовать Edge
export const dynamic = "force-dynamic";   // не пытаться предрендерить/кэшировать
export const revalidate = 0;              // (на всякий) отключить ISR

// В Next 15+ params — Promise
type Ctx = { params: Promise<{ id: string }> };

const updateSchema = z.object({
  firstName: z.string().max(64).optional(),
  lastName:  z.string().max(64).optional(),
  address:   z.string().max(160).optional(),
  plz:       z.string().max(16).optional(),
  city:      z.string().max(64).optional(),
  phone:     z.string().max(32).optional(),
  role:      z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]).optional(),
  active:    z.boolean().optional(),
});

export async function PATCH(req: NextRequest, ctx: Ctx) {
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
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Bad body" }, { status: 400 });
  }

  const db = await getDb();
  const $set: Record<string, any> = { updatedAt: new Date() };

  if (parsed.data.firstName != null) $set["profile.firstName"] = parsed.data.firstName;
  if (parsed.data.lastName  != null) $set["profile.lastName"]  = parsed.data.lastName;
  if (parsed.data.address   != null) $set["profile.address"]   = parsed.data.address;
  if (parsed.data.plz       != null) $set["profile.plz"]       = parsed.data.plz;
  if (parsed.data.city      != null) $set["profile.city"]      = parsed.data.city;
  if (parsed.data.phone     != null) $set["phone"]             = parsed.data.phone;

  if (role === "ADMIN" && parsed.data.role) $set["role"] = parsed.data.role;
  if (parsed.data.active != null) $set["active"] = parsed.data.active;

  await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set }
  );

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true }, { status: 200 });
}
