"use client";
import Link from "next/link";

export default function StickyMobileCTA() {
  const size = 56; // диаметр кружка (px)

  return (
    <div
      className="d-md-none"
      style={{
        position: "fixed",
        right: "max(12px, env(safe-area-inset-right))",
        bottom: "max(16px, calc(env(safe-area-inset-bottom) + 16px))",
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Записаться */}
      <Link
        href="/registration"
        aria-label="Записаться"
        title="Записаться"
        style={{
          width: size,
          height: size,
          borderRadius: 9999,
          display: "grid",
          placeItems: "center",
          background: "#E71544",
          color: "#fff",
          textDecoration: "none",
          boxShadow:
            "0 12px 28px rgba(231,21,68,.35), 0 6px 14px rgba(0,0,0,.35)",
        }}
      >
        {/* плюсик */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Link>

      {/* WhatsApp (или другой мессенджер) */}
      <a
        href="https://wa.me/491234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        title="WhatsApp"
        style={{
          width: size,
          height: size,
          borderRadius: 9999,
          display: "grid",
          placeItems: "center",
          background: "rgba(255,255,255,.08)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.25)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 10px 22px rgba(0,0,0,.35)",
        }}
      >
        {/* иконка чата (упрощённая) */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 12a8 8 0 1 1-3.3-6.5L20 5l-.6 3.6A8 8 0 0 1 20 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity=".9"
          />
          <path
            d="M8.8 9.8c.2-.6.9-.7 1.2-.4l.8.7c.2.2.6.2.8 0l1.3-1.3c.3-.3.9-.1 1 .3l.2.8c.1.5-.1 1-.5 1.3l-1.2.9c-.6.5-1.5.5-2.1 0l-1.8-1.5c-.3-.2-.4-.7-.3-1Z"
            fill="currentColor"
            opacity=".9"
          />
        </svg>
      </a>
    </div>
  );
}
