"use client";
import styles from "./dashboard.module.css";
import type { Role } from "./types";

function roleLabel(role?: Role) {
  if (role === "ADMIN") return "Администратор";
  if (role === "INSTRUCTOR") return "Инструктор";
  return "Студент";
}
function roleClass(role?: Role) {
  return role === "ADMIN"
    ? styles.roleAdmin
    : role === "INSTRUCTOR"
    ? styles.roleInstructor
    : styles.roleStudent;
}

export default function RoleBadge({ role, small = false }: { role?: Role; small?: boolean }) {
  return (
    <div className={`${styles.roleBadge} ${small ? styles.roleBadgeSm : ""} ${roleClass(role)}`} title="Права доступа">
      <span className={styles.roleDot} aria-hidden="true" />
      {roleLabel(role)}
    </div>
  );
}
