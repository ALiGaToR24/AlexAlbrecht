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

export default function LoginForm({ error, info }: { error?: string; info?: string }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
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
    // при redirect управление уйдёт; если вдруг нет — снимаем лоадер
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
          <label htmlFor="loginEmail" className="text-white-50">
            E-mail
          </label>
        </div>

        {/* Password */}
        <div className="input-group">
          <div className="form-floating flex-grow-1">
            <input
              type={show ? "text" : "password"}
              className="form-control bg-dark text-white border-0"
              id="loginPass"
              placeholder="Пароль"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              autoComplete="current-password"
            />
            <label htmlFor="loginPass" className="text-white-50">
              Пароль
            </label>
          </div>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Скрыть пароль" : "Показать пароль"}
          >
            {show ? "Скрыть" : "Показать"}
          </button>
        </div>

        {/* Submit */}
        <button className="btn btn-danger btn-lg" disabled={loading}>
          {loading ? "Входим…" : "Войти"}
        </button>
      </form>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <a className="link-light text-decoration-none" href="/support">
          Нужна помощь?
        </a>
        {/* Подсказка для студентов: регистрация только через администратора */}
        <small className="text-white-50">
          Нет аккаунта? Обратитесь к администратору.
        </small>
      </div>
    </div>
  );
}
