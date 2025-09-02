import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Вход | Prodriver247",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="nav-spacer" />
      <section style={{ background: "#101011" }} className="py-4">
        <div
          className="container d-flex align-items-center"
          style={{ minHeight: "calc(100vh - var(--nav-h,72px) - 140px)" }}
        >
          <div className="row justify-content-center w-100">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5">
              <LoginForm />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
