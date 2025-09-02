"use client";

import { useState } from "react";

export default function ContactForm() {
  const cardStyle: React.CSSProperties = {
    background: "#141415",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
    borderRadius: 16,
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: отправка через API/Formspree/Telegram и т.п.
    setTimeout(() => {
      setLoading(false);
      alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <form className="p-3" style={cardStyle} onSubmit={onSubmit}>
      <div className="text-white fw-semibold mb-3">Написать сообщение</div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-white-50">Имя*</label>
          <input className="form-control" required name="name" />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50">Телефон*</label>
          <input className="form-control" required name="phone" inputMode="tel" />
        </div>
        <div className="col-md-12">
          <label className="form-label text-white-50">E-mail</label>
          <input className="form-control" type="email" name="email" />
        </div>
        <div className="col-12">
          <label className="form-label text-white-50">Сообщение*</label>
          <textarea className="form-control" rows={4} required name="message" />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 mt-3">
        <button className="btn btn-danger btn-lg" disabled={loading}>
          {loading ? "Отправляем…" : "Отправить"}
        </button>
        <span className="small text-white-50">
          Нажимая «Отправить», вы соглашаетесь с нашей{" "}
          <a className="link-light" href="/datenschutz">Политикой конфиденциальности</a>.
        </span>
      </div>
    </form>
  );
}
