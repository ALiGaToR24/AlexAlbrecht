"use client";
import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // подключаем JS для collapse/offcanvas
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}