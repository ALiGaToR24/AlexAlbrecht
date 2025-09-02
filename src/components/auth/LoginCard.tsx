"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";

export default function LoginCard() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!email || !password) {
      toast.error("Введите Email и пароль");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (!res) {
      toast.error("Сервер недоступен. Попробуйте позже");
      return;
    }
    if (res.error) {
      toast.error("Неверный Email или пароль");
      return;
    }
    toast.success("Вход был выполнен");
    router.push("/dashboard");
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <form onSubmit={onSubmit} className="p-4" style={{
        width: "100%", maxWidth: 420, background:"#141415",
        border:"1px solid rgba(255,255,255,.08)", borderRadius:16,
        boxShadow:"inset 0 1px 0 rgba(255,255,255,.03)"
      }}>
        <h4 className="text-white mb-3">Войти в кабинет</h4>

        <div className="mb-3">
          <label className="form-label text-white-50">E-mail</label>
          <input name="email" type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white-50">Пароль</label>
          <div className="position-relative">
            <input name="password" type="password" className="form-control pe-5" required />
          </div>
        </div>

        <button className="btn btn-danger w-100" disabled={loading}>
          {loading ? (
            <span aria-label="Входим…" title="Входим…">
              {/* двойные стрелки по кругу */}
              <svg className="spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 10a8 8 0 0 1 13.657-3.657" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 4v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 14a8 8 0 0 1-13.657 3.657" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 20v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          ) : (
            "Войти"
          )}
        </button>
      </form>
    </div>
  );
}
