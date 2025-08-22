import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "./BootstrapClient";
import "./globals.css";


const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prodriver247",
  description: "Fahrschule | AlexAlbrecht",
  icons: {
    icon: "/icons/favicon.ico",         // обычный favicon
    shortcut: "/favicon-32x32.png", // для вкладок
    apple: "/apple-touch-icon.png", // для iOS
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={dmSans.variable}>
        <BootstrapClient />
        <main className="container-1080">{children}</main>
      </body>
    </html>
  );
}