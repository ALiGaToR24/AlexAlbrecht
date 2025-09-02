import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const patchSchema = z.object({
  firstName: z.string().max(64).optional(),
  lastName:  z.string().max(64).optional(),
  phone:     z.string().max(32).optional(),
  address:   z.string().max(160).optional(),
  plz:       z.string().max(16).optional(),
  city:      z.string().max(64).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(session.user.id) },
    { projection: { email: 1, phone: 1, profile: 1 } }
  );

  return NextResponse.json({ ok: true, user });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Некорректные данные" }, { status: 400 });
  }

  const { firstName, lastName, phone, address, plz, city } = parsed.data;

  const $set: Record<string, any> = { updatedAt: new Date() };
  if (firstName != null) $set["profile.firstName"] = firstName;
  if (lastName  != null) $set["profile.lastName"]  = lastName;
  if (phone     != null) $set["phone"]             = phone;
  if (address   != null) $set["profile.address"]   = address;
  if (plz       != null) $set["profile.plz"]       = plz;
  if (city      != null) $set["profile.city"]      = city;

  const db = await getDb();
  await db.collection("users").updateOne(
    { _id: new ObjectId(session.user.id) },
    { $set }
  );

  return NextResponse.json({ ok: true });
}
