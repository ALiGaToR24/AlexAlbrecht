"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      className={className ?? "btn btn-outline-light"}
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Выйти
    </button>
  );
}
