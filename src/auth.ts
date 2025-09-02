import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { z } from "zod";
import argon2 from "argon2";
import { getDb } from "./lib/mongo";

// ✅ Не бросаем ошибку во время билда
const secret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  process.env.SECRET ??                  // ← добавили поддержку SECRET
  (process.env.NODE_ENV === "development" ? "dev-only-secret-change-me" : undefined);

const creds = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  secret,                    // ← если переменной нет на этапе билда — просто undefined
  session: { strategy: "jwt" },
  // debug: process.env.NODE_ENV !== "production",

  providers: [
    Credentials({
      name: "Email & Password",
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        const parsed = creds.safeParse(raw);
        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase();
        const { password } = parsed.data;

        const db = await getDb();
        const user = await db.collection("users").findOne<{
          _id: any;
          email: string;
          name?: string;
          passwordHash?: string;
          role?: string;
        }>({ email });

        if (!user?.passwordHash) return null;

        const ok = await argon2.verify(user.passwordHash, password);
        if (!ok) return null;

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? "",
          role: (user.role as any) ?? "STUDENT",
        };
      },
    }),
  ],

  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || "STUDENT";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token as any).role || "STUDENT";
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);
