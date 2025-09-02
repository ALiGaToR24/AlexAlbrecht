import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import ToastProvider from "@/components/ui/ToastProvider";

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
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0f0f10" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f0f10" />

        {/* для iOS как standalone (на главном экране) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={dmSans.variable}>
        {/* Глобальные провайдеры (SessionProvider + Bootstrap JS) */}
        <Providers>
          <ToastProvider>
            <main className="container-1080">{children}</main>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
