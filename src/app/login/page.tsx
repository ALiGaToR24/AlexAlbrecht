import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="nav-spacer" />
      <section style={{ background:"#101011", minHeight:"100vh" }}>
        <div className="container py-5">
          <LoginCard />
        </div>
      </section>
      <Footer />
    </>
  );
}
