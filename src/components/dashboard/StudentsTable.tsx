"use client";
import { useEffect, useState } from "react";
import Panel from "./Panel";
import type { Student } from "./types";
import { useToast } from "@/components/ui/ToastProvider";

/** Утилита для форматирования дат */
function formatDate(d?: string | Date) {
  if (!d) return "—";
  const dd = new Date(d);
  return dd.toLocaleDateString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" });
}
/** Достаём строковый id из разных форматов */
function idOf(x: any) {
  return typeof x?._id === "string" ? x._id : x?._id?.$oid || x?._id?.toString?.() || "";
}

/** Программно показать Bootstrap-модалку */
async function showStudentModal() {
  const el = document.getElementById("studentModal");
  if (!el) return;
  // динамически подгружаем только модуль modal (без типов — норм для рантайма)
  const { default: Modal } = await import("bootstrap/js/dist/modal");
  // @ts-ignore — у bootstrap нет d.ts в пакете
  Modal.getOrCreateInstance(el).show();
}

export default function StudentsTable() {
  const [items, setItems] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const [selected, setSelected] = useState<Student | null>(null);
  const [edit, setEdit] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    plz: "",
    city: "",
  });
  const [months, setMonths] = useState(6);
  const [busy, setBusy] = useState<"" | "save" | "extend" | "delete">("");


  const toast = useToast();

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/students?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      toast.error("Не удалось загрузить список учеников");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // первичная загрузка

  const onSearch = (e: React.FormEvent) => { e.preventDefault(); load(); };


  /** Открыть модалку и проставить состояние */
  const open = async (st: Student) => {
    setSelected(st);
    setEdit({
      phone: st.phone || "",
      firstName: st.profile?.firstName || "",
      lastName: st.profile?.lastName || "",
      address: st.profile?.address || "",
      plz: st.profile?.plz || "",
      city: st.profile?.city || "",
    });
    setMonths(6);
    await showStudentModal();
  };

  const save = async () => {
    if (!selected) return;
    setBusy("save");
    const id = idOf(selected);
    const res = await fetch(`/api/admin/students/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(edit),
    });
    setBusy("");
    if (res.ok) {
      toast.success("Изменения были сохранены");
      await load();
      const upd = (await (await fetch(`/api/admin/students?q=${encodeURIComponent(selected.email)}`)).json()).items?.[0];
      if (upd) setSelected(upd);
    } else {
      toast.error("Не удалось сохранить изменения");
    }

  };

  const extend = async () => {
    if (!selected) return;
    setBusy("extend");
    const id = idOf(selected);
    const res = await fetch(`/api/admin/students/${id}/extend`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ months }),
    });
    setBusy("");
    if (res.ok) {
      const data = await res.json();
      setSelected({ ...(selected as any), expiresAt: data.expiresAt });
      await load();
      toast.success("Доступ был продлён");
    } else {
      toast.error("Не удалось продлить доступ");
    }
  };

  const remove = async () => {
    if (!selected) return;
    if (!confirm("Удалить ученика?")) return;
    setBusy("delete");
    const id = idOf(selected);
    const res = await fetch(`/api/admin/students/${id}`, { method: "DELETE" });
    setBusy("");
    if (res.ok) {
      setSelected(null);
      await load();
      toast.success("Ученик был удален");
    } else {
      toast.error("Не удалось удалить ученика");
    }
  };

  return (
    <Panel className="p-3">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h5 className="text-white m-0">Ученики</h5>
        <form className="ms-auto d-flex gap-2" onSubmit={onSearch}>
          <input
            className="form-control"
            placeholder="Поиск: email/тел/имя…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ minWidth: 240 }}
          />
          <button className="btn btn-outline-light">Найти</button>
        </form>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Email</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Доступ до</th>
              <th>Статус</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center text-white-50">Загрузка…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-white-50">Пусто</td></tr>
            ) : (
              items.map((s) => {
                const fullName = [s.profile?.firstName, s.profile?.lastName].filter(Boolean).join(" ");
                const expired = s.expiresAt ? new Date(s.expiresAt) < new Date() : false;
                return (
                  <tr key={idOf(s)}>
                    <td className="text-white">{s.email}</td>
                    <td className="text-white-50">{fullName || "—"}</td>
                    <td className="text-white-50">{s.phone || "—"}</td>
                    <td className="text-white-50">{formatDate(s.expiresAt)}</td>
                    <td>
                      <span className={`badge ${expired ? "bg-secondary" : "bg-success"}`}>
                        {expired ? "Истёк" : "Активен"}
                      </span>
                    </td>
                    <td className="text-end">
                      {/* type="button" на всякий случай, чтобы не триггерить submit где-то выше */}
                      <button type="button" className="btn btn-sm btn-outline-light" onClick={() => open(s)}>
                        Открыть
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bootstrap modal (одна на страницу) */}
      <div className="modal fade" id="studentModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ background: "#141415", color: "#fff" }}>
            <div className="modal-header border-secondary">
              <h5 className="modal-title">Ученик</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {!selected ? (
                <div className="text-white-50">Нет данных</div>
              ) : (
                <>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label text-white-50">Email</label>
                      <input className="form-control" value={selected.email} disabled />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white-50">Телефон</label>
                      <input
                        className="form-control"
                        value={edit.phone}
                        onChange={(e) => setEdit((s) => ({ ...s, phone: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white-50">Имя</label>
                      <input
                        className="form-control"
                        value={edit.firstName}
                        onChange={(e) => setEdit((s) => ({ ...s, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white-50">Фамилия</label>
                      <input
                        className="form-control"
                        value={edit.lastName}
                        onChange={(e) => setEdit((s) => ({ ...s, lastName: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white-50">Адрес</label>
                      <input
                        className="form-control"
                        value={edit.address}
                        onChange={(e) => setEdit((s) => ({ ...s, address: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-white-50">PLZ</label>
                      <input
                        className="form-control"
                        value={edit.plz}
                        onChange={(e) => setEdit((s) => ({ ...s, plz: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-white-50">Stadt</label>
                      <input
                        className="form-control"
                        value={edit.city}
                        onChange={(e) => setEdit((s) => ({ ...s, city: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                    <button className="btn btn-light" disabled={busy === "save"} onClick={save}>
                      {busy === "save" ? "Сохраняем…" : "Сохранить"}
                    </button>

                    <div className="ms-auto d-flex align-items-center gap-2">
                      <span className="text-white-50">Продлить на</span>
                      <input
                        type="number"
                        min={1}
                        max={36}
                        className="form-control"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        style={{ width: 88 }}
                      />
                      <span className="text-white-50">мес.</span>
                      <button className="btn btn-outline-light" disabled={busy === "extend"} onClick={extend}>
                        {busy === "extend" ? "Продляем…" : "Продлить"}
                      </button>
                      <button className="btn btn-outline-danger" disabled={busy === "delete"} onClick={remove}>
                        {busy === "delete" ? "Удаляем…" : "Удалить"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 small text-white-50">
                    Доступ до: <b className="text-white">{formatDate(selected.expiresAt)}</b>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
