import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();

  const db = await getDb();
  const coll = db.collection("users");

  const filter: any = { role: "STUDENT" };
  if (q) {
    filter.$or = [
      { email: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } },
      { "profile.firstName": { $regex: q, $options: "i" } },
      { "profile.lastName":  { $regex: q, $options: "i" } },
    ];
  }

  const items = await coll
    .find(filter)
    .project({
      email: 1,
      phone: 1,
      role: 1,
      expiresAt: 1,
      profile: 1,
      createdAt: 1,
    })
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();

  return NextResponse.json({ ok: true, items });
}
