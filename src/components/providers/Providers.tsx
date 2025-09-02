"use client";

import { SessionProvider } from "next-auth/react";
// если у тебя есть клиент для bootstrap JS — можно подключить тут
// import BootstrapClient from "@/components/system/BootstrapClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider /* refetchOnWindowFocus={false} */>
      {children}
      {/* <BootstrapClient /> */}
    </SessionProvider>
  );
}
