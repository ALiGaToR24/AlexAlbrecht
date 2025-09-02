import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await auth();
  const role = session?.user?.role;

  // Всегда JSON даже при 403
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json(
      { ok: false, error: "Forbidden", items: [] },
      { status: 403 }
    );
  }

  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  const match: any = {};
  if (q) {
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = new RegExp(esc, "i");
    match.$or = [
      { email: rx },
      { phone: rx },
      { "profile.firstName": rx },
      { "profile.lastName": rx },
      { "profile.city": rx },
      { "profile.plz": rx },
    ];
  }

  const items = await db
    .collection("users")
    .find(match, {
      projection: {
        email: 1,
        phone: 1,
        role: 1,
        expiresAt: 1,
        "profile.firstName": 1,
        "profile.lastName": 1,
      },
    })
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return NextResponse.json({ ok: true, items }, { status: 200 });
}
