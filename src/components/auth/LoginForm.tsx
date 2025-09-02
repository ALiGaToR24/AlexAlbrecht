"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const cardStyle: React.CSSProperties = {
  background: "#141415",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 16,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
};

function mapError(err?: string) {
  if (!err) return null;
  const known: Record<string, string> = {
    CredentialsSignin: "Неверный e-mail или пароль.",
    AccessDenied: "Доступ запрещён.",
    SessionRequired: "Требуется вход.",
    OAuthSignin: "Ошибка входа через провайдера.",
    OAuthCallback: "Ошибка обратного вызова провайдера.",
    EmailSignin: "Не удалось отправить письмо для входа.",
    Default: "Не удалось выполнить вход.",
  };
  return known[err] || known.Default;
}

// маленький SVG-глаз — без зависимости от bootstrap-icons
function Eye({ crossed = false, size = 18 }: { crossed?: boolean; size?: number }) {
  if (crossed) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10.585 10.585a2 2 0 102.83 2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.362 7.51C5.37 8.61 3.96 10.2 3 12c2.4 4.4 6.6 6 9 6 1.08 0 2.4-.28 3.77-1.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20.999 12c-.73-1.34-1.77-2.53-3.06-3.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export default function LoginForm({ error, info }: { error?: string; info?: string }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [show, setShow]   = useState(false);
  const [loading, setLoading] = useState(false);
  const errText = mapError(error);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password: pass,
      redirect: true,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
    return res;
  }

  return (
    <div className="p-4" style={cardStyle}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Image src="/Logo.svg" alt="Prodriver247" width={48} height={46} />
        <div className="text-white">
          <div className="fw-bold">Prodriver247</div>
          <small className="text-white-50">Fahrschule Albrecht</small>
        </div>
      </div>

      <h1 className="h4 text-white mb-3">Вход в личный кабинет</h1>

      {!!info && (
        <div className="alert alert-success py-2" role="alert">
          {info}
        </div>
      )}
      {!!errText && (
        <div className="alert alert-danger py-2" role="alert">
          {errText}
        </div>
      )}

      <form onSubmit={onSubmit} className="d-grid gap-3">
        {/* Email */}
        <div className="form-floating">
          <input
            type="email"
            className="form-control bg-dark text-white border-0"
            id="loginEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label htmlFor="loginEmail" className="text-white-50">E-mail</label>
        </div>

      {/* Password + глазик внутри поля (ровно по центру) */}
<div className="form-floating position-relative">
  <input
    type={show ? "text" : "password"}
    className="form-control bg-dark text-white border-0 pe-5"
    id="loginPass"
    placeholder="Пароль"
    value={pass}
    onChange={(e) => setPass(e.target.value)}
    required
    autoComplete="current-password"
  />
  <label htmlFor="loginPass" className="text-white-50">Пароль</label>

  {/* маленькая кнопка-глазик, идеально центрованная */}
  <button
    type="button"
    onClick={() => setShow(s => !s)}
    aria-label={show ? "Скрыть пароль" : "Показать пароль"}
    className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center btn btn-outline-light btn-sm"
    style={{ width: 34, height: 34, borderRadius: 10, padding: 0 }}
  >
    {/* SVG-иконка */}
    {show ? (
      // зачёркнутый глаз
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10.585 10.585a2 2 0 102.83 2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.362 7.51C5.37 8.61 3.96 10.2 3 12c2.4 4.4 6.6 6 9 6 1.08 0 2.4-.28 3.77-1.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 12c-.73-1.34-1.77-2.53-3.06-3.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ) : (
      // обычный глаз
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )}
  </button>
</div>

        {/* Submit */}
        <button className="btn btn-danger btn-lg" disabled={loading}>
          {loading ? "Входим…" : "Войти"}
        </button>
      </form>
    </div>
  );
}
