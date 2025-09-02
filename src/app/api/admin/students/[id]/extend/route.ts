import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";

export const runtime = "nodejs";

function addMonths(d: Date, m: number) {
    const nd = new Date(d);
    nd.setMonth(nd.getMonth() + m);
    return nd;
}

const schema = z.object({
    months: z.number().int().min(1).max(36).default(6),
});

export async function POST(req: Request, ctx: { params: { id: string } }) {
    const session = await auth();
    const role = session?.user?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const id = ctx.params.id;
    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ ok: false, error: "Bad id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const { months } = schema.parse(body);

    const db = await getDb();
    const coll = db.collection("users");
    const doc = await coll.findOne({ _id: new ObjectId(id), role: "STUDENT" });
    if (!doc) {
        return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const base = doc.expiresAt ? new Date(doc.expiresAt) : new Date();
    const newDate = addMonths(base < new Date() ? new Date() : base, months);

    await coll.updateOne({ _id: new ObjectId(id) }, { $set: { expiresAt: newDate, updatedAt: new Date() } });

    return NextResponse.json({ ok: true, expiresAt: newDate });
}
