import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";

const patchSchema = z.object({
  phone: z.string().max(32).optional(),
  firstName: z.string().max(64).optional(),
  lastName: z.string().max(64).optional(),
  address: z.string().max(160).optional(),
  plz: z.string().max(16).optional(),
  city: z.string().max(64).optional(),
});

export async function PATCH(_: Request, ctx: { params: { id: string } }) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const db = await getDb();
  const coll = db.collection("users");

  const body = await _.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Некорректные данные" }, { status: 400 });
  }

  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Bad id" }, { status: 400 });
  }

  const { phone, firstName, lastName, address, plz, city } = parsed.data;
  const set: any = { updatedAt: new Date() };
  if (phone !== undefined) set.phone = phone;
  if (firstName !== undefined) set["profile.firstName"] = firstName;
  if (lastName !== undefined)  set["profile.lastName"]  = lastName;
  if (address !== undefined)   set["profile.address"]   = address;
  if (plz !== undefined)       set["profile.plz"]       = plz;
  if (city !== undefined)      set["profile.city"]      = city;

  await coll.updateOne({ _id: new ObjectId(id) }, { $set: set });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, ctx: { params: { id: string } }) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Only admin" }, { status: 403 });
  }

  const id = ctx.params.id;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Bad id" }, { status: 400 });
  }
  const db = await getDb();
  const coll = db.collection("users");
  await coll.deleteOne({ _id: new ObjectId(id), role: "STUDENT" });

  return NextResponse.json({ ok: true });
}
