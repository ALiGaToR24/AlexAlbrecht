import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DashboardShell } from "@/components/dashboard";
import { getDb } from "@/lib/mongo";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const email = (session.user?.email || "").toLowerCase();
  const role = (session.user?.role as any) || "STUDENT";

  // подхватываем расширенные поля
  let expiresAt: string | null = null;
  let profile: any = null;
  try {
    const db = await getDb();
    const user = await db.collection("users").findOne(
      { email },
      { projection: { expiresAt: 1, profile: 1 } }
    );
    if (user) {
      if (user.expiresAt) expiresAt = new Date(user.expiresAt).toISOString();
      if (user.profile)  profile   = user.profile;
    }
  } catch {
    // no-op
  }

  return (
    <>
      <Navbar />
      <div className="nav-spacer" />

      {/* Липкий футер: контейнер на всю высоту и дашборд растягиваем */}
      <div className="min-vh-100 d-flex flex-column" style={{ background: "#101011" }}>
        <div className="flex-grow-1">
          <DashboardShell role={role} email={email} expiresAt={expiresAt} profile={profile} />
        </div>
        <Footer />
      </div>
    </>
  );
}
