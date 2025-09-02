// src/auth.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { z } from "zod";
import argon2 from "argon2";
import { getDb } from "./lib/mongo";

const creds = z.object({
  email: z.string().email(),
  password: z.string().min(1), // пусть будет ≥1, а не 6 — вдруг тестишь одноразовые цифры
});

const DEBUG = process.env.NEXTAUTH_DEBUG === "true";

export const authOptions: NextAuthOptions = {
  // ❗️обязательно в проде
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: DEBUG,

  providers: [
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        try {
          const parsed = creds.safeParse(raw);
          if (!parsed.success) {
            if (DEBUG) console.warn("[AUTH] Zod failed");
            return null;
          }

          const email = parsed.data.email.toLowerCase().trim();
          const password = parsed.data.password;

          const db = await getDb();
          const user = await db.collection("users").findOne<{
            _id: any;
            email: string;
            name?: string;
            role?: string;
            passwordHash?: string;
            active?: boolean;
          }>({ email });

          if (!user) {
            if (DEBUG) console.warn("[AUTH] user not found:", email);
            return null;
          }

          if (!user.passwordHash || typeof user.passwordHash !== "string") {
            if (DEBUG) console.warn("[AUTH] no passwordHash in DB for:", email);
            return null;
          }

          // Если у тебя есть логика блокировки/истечения — можно тут тоже проверять и возвращать null
          // if (user.active === false) return null;

          const ok = await argon2.verify(user.passwordHash, password);
          if (!ok) {
            if (DEBUG) console.warn("[AUTH] bad password:", email);
            return null;
          }

          const role = (user.role as any) || "STUDENT";
          const id = typeof user._id === "object" && user._id.toString ? user._id.toString() : String(user._id);

          return { id, email: user.email, name: user.name ?? "", role };
        } catch (e) {
          console.error("[AUTH] authorize error:", e);
          return null;
        }
      },
    }),
  ],

  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).role = (user as any).role || "STUDENT";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub as string) || "";
        session.user.role = (token as any).role || "STUDENT";
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);
