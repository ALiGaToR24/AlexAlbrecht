import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  }
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  }
}
