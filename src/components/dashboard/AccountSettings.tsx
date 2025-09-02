"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Panel from "@/components/dashboard/Panel"; // если нет Panel — замени на <div className="p-3" style={{background:"#141415", border:"1px solid rgba(255,255,255,.08)", borderRadius:16}}>

type Profile = {
  email: string;
  phone?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    address?: string;
    plz?: string;
    city?: string;
  }
};

export default function AccountSettings() {
  const [tab, setTab] = useState<"profile"|"security">("profile");

  return (
    <Panel className="p-3">
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab==="profile"?"active":""}`} onClick={() => setTab("profile")}>Профиль</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab==="security"?"active":""}`} onClick={() => setTab("security")}>Безопасность</button>
        </li>
      </ul>
      {tab==="profile" ? <ProfileForm/> : <ChangePasswordForm/>}
    </Panel>
  );
}

function ProfileForm() {
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ firstName:"", lastName:"", phone:"", address:"", plz:"", city:"" });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/account/profile", { cache: "no-store" });
      const data = await res.json();
      setLoading(false);
      if (data?.ok) {
        const u: Profile = data.user ?? {};
        setEmail(u.email || "");
        setForm({
          firstName: u.profile?.firstName || "",
          lastName:  u.profile?.lastName  || "",
          phone:     u.phone || "",
          address:   u.profile?.address   || "",
          plz:       u.profile?.plz       || "",
          city:      u.profile?.city      || "",
        });
      }
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const res  = await fetch("/api/account/profile", {
      method:"PATCH",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));
    setMsg(res.ok && data.ok ? "Сохранено" : (data.error || "Ошибка"));
  };

  if (loading) return <div className="text-white-50">Загрузка…</div>;

}

function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext]       = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow]       = useState(false);
  const [msg, setMsg]         = useState("");
  const [err, setErr]         = useState("");

  const type = show ? "text" : "password";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); setErr("");
    const res = await fetch("/api/account/change-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ current, next, confirm }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setMsg("Пароль изменён. Войдите заново…");
      setTimeout(() => signOut({ callbackUrl: "/login" }), 1100);
    } else {
      setErr(data.error || "Не удалось сменить пароль");
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label text-white-50">Текущий пароль</label>
          <input className="form-control" type={type} value={current} onChange={e=>setCurrent(e.target.value)}/>
        </div>
        <div className="col-md-4">
          <label className="form-label text-white-50">Новый пароль</label>
          <input className="form-control" type={type} value={next} onChange={e=>setNext(e.target.value)}/>
        </div>
        <div className="col-md-4">
          <label className="form-label text-white-50">Повторите новый</label>
          <div className="input-group">
            <input className="form-control" type={type} value={confirm} onChange={e=>setConfirm(e.target.value)}/>
            <button type="button" className="btn btn-outline-light" onClick={()=>setShow(s=>!s)} style={{width:48}} aria-label="Показать/скрыть">
              {show ? "🙈" : "👁"}
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 mt-3">
        <button className="btn btn-danger">Сменить пароль</button>
        {msg && <span className="text-success">{msg}</span>}
        {err && <span className="text-danger">{err}</span>}
      </div>
    </form>
  );
}
