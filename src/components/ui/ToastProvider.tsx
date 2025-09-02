"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type Kind = "success" | "error" | "info";
type Toast = {
  id: string;
  kind: Kind;
  title?: string;
  message: string;
  duration?: number; // ms
};

type Ctx = {
  notify: (t: Omit<Toast, "id">) => void;
  close: (id: string) => void;
};

const ToastContext = createContext<Ctx | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider />");
  const { notify } = ctx;
  return useMemo(
    () => ({
      success: (message: string, title = "Успешно") => notify({ kind: "success", message, title }),
      error: (message: string, title = "Ошибка") => notify({ kind: "error", message, title }),
      info: (message: string, title = "Инфо") => notify({ kind: "info", message, title }),
    }),
    [notify]
  );
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const close = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const toast: Toast = { id, duration: 3500, ...t };
      setToasts((list) => [...list, toast]);
      const ttl = toast.duration ?? 3500;
      if (ttl > 0) setTimeout(() => close(id), ttl);
    },
    [close]
  );

  return (
    <ToastContext.Provider value={{ notify, close }}>
      {children}

      {/* Стек уведомлений в правом верхнем углу */}
      <div className="toast-stack position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
        {toasts.map((t) => (
          <div key={t.id} className={`toastBox ${t.kind} shadow-lg`} role="status" aria-live="polite">
            <div className="d-flex gap-2">
              <div className="toastIcon">
                {t.kind === "success" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {t.kind === "error" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
                {t.kind === "info" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 8h.01M11 12h2v4h-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div className="flex-grow-1">
                {t.title && <div className="toastTitle">{t.title}</div>}
                <div className="toastMsg">{t.message}</div>
              </div>
              <button
                className="btn btn-sm btn-outline-light border-0 opacity-75"
                onClick={() => close(t.id)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
