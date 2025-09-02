import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prodriver247",
  description: "Fahrschule | AlexAlbrecht",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={dmSans.variable}>
        {/* Глобальные провайдеры (SessionProvider + Bootstrap JS) */}
        <Providers>
          {/* 
            Если хочешь глобальный ограничитель ширины — оставляй container-1080.
            Если на некоторых страницах нужен full-bleed, оборачивай секции в свои контейнеры там.
          */}
          <main className="container-1080">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
