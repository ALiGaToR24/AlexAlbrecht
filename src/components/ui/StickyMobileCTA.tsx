"use client";
import Link from "next/link";
import Image from "next/image";

export default function StickyMobileCTA() {
  const size = 56;

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

      {/* WhatsApp */}
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
        <Image
          src="/icons/whatsapp.svg" // из public
          alt="WhatsApp"
          width={30}
          height={30}
        />
      </a>
    </div>
  );
}
