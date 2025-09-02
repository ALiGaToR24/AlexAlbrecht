"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function ContactForm() {
  const cardStyle: React.CSSProperties = {
    background: "#141415",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
    borderRadius: 16,
  };
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: отправка на API, сейчас — имитация
      await new Promise((r) => setTimeout(r, 700));
      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Не удалось отправить сообщение. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
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
          {loading ? (
            <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 10a8 8 0 0 1 13.657-3.657" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 4v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 14a8 8 0 0 1-13.657 3.657" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 20v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : "Отправить"}
        </button>
        <span className="small text-white-50">
          Нажимая «Отправить», вы соглашаетесь с нашей{" "}
          <a className="link-light" href="/datenschutz">Политикой конфиденциальности</a>.
        </span>
      </div>
    </form>
  );
}
