import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Регистрация | Prodriver247" };

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    // 👇 ВАЖНО: headers() — async
    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host  = h.get("x-forwarded-host") ?? h.get("host");
    const url   = `${proto}://${host}/api/register`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      // При желании можно прочитать json и показать ошибку
      // const data = await res.json().catch(() => ({}));
      // throw new Error(data.error ?? "Register failed");
      return;
    }

    redirect("/login");
  }

  return (
    <section style={{ background: "#101011" }} className="py-5">
      <div className="container">
        <h1 className="text-white mb-3">Регистрация</h1>
        <form
          action={register}
          className="p-3"
          style={{
            background: "#141415",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
            borderRadius: 16,
            maxWidth: 480,
          }}
        >
          <div className="mb-3">
            <label className="form-label text-white-50">Имя</label>
            <input name="name" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white-50">E-mail</label>
            <input name="email" type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white-50">Пароль</label>
            <input name="password" type="password" className="form-control" required minLength={6} />
          </div>
          <button className="btn btn-danger">Создать аккаунт</button>
        </form>
      </div>
    </section>
  );
}
