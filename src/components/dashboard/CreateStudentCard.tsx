"use client";
import { useState } from "react";
import Panel from "./Panel";

export default function CreateStudentCard() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    plz: "",
    city: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/admin/create-student", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Ошибка");
      setState("ok");
      setMsg(data.mailed ? "Ученик создан. Письмо отправлено." : "Ученик создан (письмо не ушло).");
      setForm({ email: "", phone: "", firstName: "", lastName: "", address: "", plz: "", city: "" });
    } catch (err: any) {
      setState("err");
      setMsg(err.message || "Не удалось создать ученика");
    }
  }

  return (
    <Panel className="p-3">
      <h5 className="text-white mb-3">Добавить ученика</h5>
      <form onSubmit={submit} className="row g-2">
        <div className="col-md-6">
          <label className="form-label text-white-50">Email*</label>
          <input className="form-control" name="email" type="email" required value={form.email} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50">Tel. Nummer</label>
          <input className="form-control" name="phone" value={form.phone} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50">Name</label>
          <input className="form-control" name="firstName" value={form.firstName} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50">Nachname</label>
          <input className="form-control" name="lastName" value={form.lastName} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label text-white-50">Adresse</label>
          <input className="form-control" name="address" value={form.address} onChange={onChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label text-white-50">PLZ</label>
          <input className="form-control" name="plz" value={form.plz} onChange={onChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label text-white-50">Stadt</label>
          <input className="form-control" name="city" value={form.city} onChange={onChange} />
        </div>

        <div className="col-12 d-flex gap-2 mt-2">
          <button className="btn btn-danger" disabled={state === "loading"}>
            {state === "loading" ? "Создаём…" : "Создать"}
          </button>
          {state !== "idle" && (
            <div
              className={`alert mb-0 py-2 ${
                state === "ok" ? "alert-success" : state === "err" ? "alert-danger" : "alert-secondary"
              }`}
            >
              {msg || "…"}
            </div>
          )}
        </div>
      </form>
      <p className="text-white-50 small mb-0 mt-2">
        Ученику будет выдан доступ на <b>6 месяцев</b>. Письмо с логином и паролем уйдёт на указанный e-mail.
      </p>
    </Panel>
  );
}
