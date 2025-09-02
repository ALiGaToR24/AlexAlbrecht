"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./dashboard.module.css";
import type { Role } from "./types";

type Item = { key: string; label: string; href: string; roles?: Role[] };

const baseItems: Item[] = [
  { key: "overview", label: "Обзор", href: "/dashboard?tab=overview" },
  { key: "materials", label: "Материалы", href: "/dashboard?tab=materials", roles: ["STUDENT", "INSTRUCTOR", "ADMIN"] },
  { key: "schedule", label: "Расписание", href: "/dashboard?tab=schedule", roles: ["STUDENT", "INSTRUCTOR", "ADMIN"] },
  { key: "progress", label: "Прогресс", href: "/dashboard?tab=progress", roles: ["STUDENT", "INSTRUCTOR", "ADMIN"] },
  { key: "payments", label: "Платежи", href: "/dashboard?tab=payments", roles: ["STUDENT", "INSTRUCTOR", "ADMIN"] },
  { key: "support", label: "Поддержка", href: "/dashboard?tab=support", roles: ["STUDENT", "INSTRUCTOR", "ADMIN"] },
];

const manageItems: Item[] = [
  { key: "create", label: "Добавить ученика", href: "/dashboard?tab=create", roles: ["ADMIN", "INSTRUCTOR"] },
  { key: "students", label: "Ученики", href: "/dashboard?tab=students", roles: ["ADMIN", "INSTRUCTOR"] },
  { key: "instructors", label: "Инструкторы", href: "/dashboard?tab=instructors", roles: ["ADMIN"] },
  { key: "courses", label: "Курсы", href: "/dashboard?tab=courses", roles: ["ADMIN"] },
  { key: "news", label: "Объявления", href: "/dashboard?tab=news", roles: ["ADMIN"] },
  { key: "settings", label: "Настройки", href: "/dashboard?tab=settings", roles: ["STUDENT", "INSTRUCTOR", "ADMIN"] },
];

export default function DashboardNav({ role }: { role?: Role }) {
  const sp = useSearchParams();
  const current = sp.get("tab") || "overview";

  const items = [
    ...baseItems.filter(i => !i.roles || i.roles.includes(role as Role)),
    ...manageItems.filter(i => !i.roles || i.roles.includes(role as Role)),
  ];

  return (
    <div className={styles.side}>
      <div className="d-flex flex-column gap-2">
        {items.map(i => (
          <Link
            key={i.key}
            href={i.href}
            className={`${styles.sideLink} ${current === i.key ? styles.sideActive : ""}`}
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
