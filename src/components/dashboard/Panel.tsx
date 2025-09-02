"use client";
import type { PropsWithChildren } from "react";
import styles from "./dashboard.module.css";

export default function Panel({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
