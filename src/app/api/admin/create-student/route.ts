// app/api/admin/create-student/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import argon2 from "argon2";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongo";
import { sendWelcomeStudentEmail } from "@/lib/email"; // <— используем красивое письмо

export const runtime = "nodejs";
export const dynamic = "force-dynamic";   // не пытаться предрендерить/кэшировать
export const revalidate = 0;              // (на всякий) отключить ISR

/** Добавить N месяцев к дате */
function addMonths(d: Date, m: number) {
  const nd = new Date(d);
  const day = nd.getDate();
  nd.setMonth(nd.getMonth() + m);
  // фиксация кейса «31-е -> 30-е» и т.п.
  if (nd.getDate() < day) nd.setDate(0);
  return nd;
}

/** Простой цифровой пароль (например, 6 цифр) */
function numericPassword(len = 6) {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// валидатор полезной нагрузки
const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(3).max(32).optional().nullable(),
  firstName: z.string().max(64).optional().nullable(),
  lastName: z.string().max(64).optional().nullable(),
  address: z.string().max(160).optional().nullable(),
  plz: z.string().max(16).optional().nullable(),
  city: z.string().max(64).optional().nullable(),
});

export async function POST(req: Request) {
  // 1) доступ только админам/инструкторам
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // 2) парсинг и валидация
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректное тело запроса" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Некорректные данные" }, { status: 400 });
  }

  const { email, phone, firstName, lastName, address, plz, city } = parsed.data;
  const emailNorm = email.trim().toLowerCase();

  // 3) проверка уникальности и запись в БД
  const db = await getDb();
  const coll = db.collection("users");

  // (желательно иметь уникальный индекс на email)
  const exists = await coll.findOne({ email: emailNorm });
  if (exists) {
    return NextResponse.json({ ok: false, error: "E-mail уже зарегистрирован" }, { status: 409 });
  }

  const password = numericPassword(6);
  const passwordHash = await argon2.hash(password);
  const now = new Date();
  const expiresAt = addMonths(now, 6);

  const insertRes = await coll.insertOne({
    email: emailNorm,
    role: "STUDENT",
    phone: phone ?? "",
    profile: {
      firstName: firstName ?? "",
      lastName:  lastName ?? "",
      address:   address ?? "",
      plz:       plz ?? "",
      city:      city ?? "",
    },
    passwordHash,
    emailVerified: null,
    createdAt: now,
    updatedAt: now,
    expiresAt,
  });

  // 4) письмо ученику
  let mailed = true;
  try {
    await sendWelcomeStudentEmail({
      to: emailNorm,
      email: emailNorm,
      password,
    });
  } catch (e) {
    mailed = false;
    console.error("MAIL ERROR:", e);
  }

  // 5) ответ
  const payload: Record<string, unknown> = {
    ok: true,
    mailed,
    userId: insertRes.insertedId?.toString(),
    expiresAt,
  };

  // В dev режиме вернём временный пароль, если письмо не ушло (удобно тестировать)
  if (!mailed && process.env.NODE_ENV !== "production") {
    payload.tempPassword = password;
  }

  return NextResponse.json(payload, { status: 201 });
}
