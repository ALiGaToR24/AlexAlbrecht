"use client";
import { useSearchParams } from "next/navigation";
import RoleBadge from "./RoleBadge";
import DashboardNav from "./DashboardNav";
import CreateStudentCard from "./CreateStudentCard";
import StudentsTable from "./StudentsTable";
import Panel from "./Panel";
import AccountSettings from "./AccountSettings"; // 👈 добавили
import type { Role, UserProfile } from "./types";

function Placeholder({ title, text }: { title: string; text?: string }) {
  return (
    <Panel className="p-3">
      <h5 className="text-white mb-2">{title}</h5>
      <p className="text-white-50 mb-0">
        {text || "Раздел скоро будет оформлен. Здесь появится полезный функционал."}
      </p>
    </Panel>
  );
}

export default function DashboardShell({
  role,
  email,
  expiresAt,
  profile,
}: {
  role?: Role;
  email?: string;
  expiresAt?: string | null;
  profile?: UserProfile | null;
}) {
  const sp = useSearchParams();
  const tab = sp.get("tab") || "overview";

  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  const expiresStr = expiresAt ? new Date(expiresAt).toLocaleDateString("de-DE") : "—";

  return (
    <section style={{ background: "#101011", paddingTop: "1.25rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div className="row g-4">
          {/* LEFT: навигация + центрированная плашка роли */}
          <div className="col-lg-3">
            <div className="d-flex justify-content-center mb-3">
              <RoleBadge role={role} />
            </div>
            <DashboardNav role={role} />
          </div>

          {/* RIGHT: контент */}
          <div className="col-lg-9 d-flex flex-column gap-3">
            {tab === "overview" && (
              <Panel className="p-3">
                <h4 className="text-white mb-2">Личный кабинет</h4>
                <div className="text-white-50">
                  <div><b className="text-white">E-mail:</b> {email || "—"}</div>
                  {!!fullName && <div><b className="text-white">Имя:</b> {fullName}</div>}
                </div>
              </Panel>
            )}

            {/* Общие разделы */}
            {tab === "materials" && <Placeholder title="Материалы" text="PDF/ссылки/теория — добавим позже." />}
            {tab === "schedule"  && <Placeholder title="Расписание" text="Здесь будет календарь занятий." />}
            {tab === "progress"  && <Placeholder title="Прогресс" text="Графики часов, спецпоездок и статус экзаменов." />}
            {tab === "payments"  && <Placeholder title="Платежи" text="История оплат и баланс." />}
            {tab === "support"   && <Placeholder title="Поддержка" text="Форма связи с автошколой." />}
            

            {/* Управление (инструктор/админ) */}
            {(role === "ADMIN" || role === "INSTRUCTOR") && tab === "create"   && <CreateStudentCard />}
            {(role === "ADMIN" || role === "INSTRUCTOR") && tab === "students" && <StudentsTable />}

            {/* Только админ */}
            {role === "ADMIN" && tab === "instructors" && <Placeholder title="Инструкторы" text="Список инструкторов, доступы, нагрузка." />}
            {role === "ADMIN" && tab === "courses"     && <Placeholder title="Курсы" text="Настройка групп/интенсивов." />}
            {role === "ADMIN" && tab === "news"        && <Placeholder title="Объявления" text="Рассылки, баннеры, алерты." />}

            {/* Настройки — ДОСТУПНЫ ВСЕМ */}
            {tab === "settings" && <AccountSettings />}
          </div>
        </div>

        {/* Лёгкий нижний отступ, чтобы футер не прилипал визуально */}
        <div style={{ height: 12 }} />
      </div>
    </section>
  );
}
