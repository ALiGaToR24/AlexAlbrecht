"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const { status } = useSession();
  const isAuthed = status === "authenticated";
  const pathname = usePathname();
  const onDashboard = pathname?.startsWith("/dashboard");

  // 1) подгружаем bootstrap.bundle.js на клиенте (на всякий случай)
  useEffect(() => {
    // если уже подключено глобально — просто не помешает
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {});
  }, []);

  // 2) сохраняем высоту navbar в CSS-переменную --nav-h
  useEffect(() => {
    const setNavH = () => {
      const h = navRef.current?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    setNavH();
    window.addEventListener("resize", setNavH);
    return () => window.removeEventListener("resize", setNavH);
  }, []);

  const collapseId = "navCollapse"; // явный id, совпадает с data-bs-target

  return (
    <nav
      ref={navRef}
      className={`navbar navbar-expand-lg navbar-dark fixed-top border-bottom ${styles.navbarCustom}`}
    >
      <div className="container">
        {/* ЛОГО слева */}
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <Image src="/Logo.svg" width={60} height={58} alt="Logo" />
          <div className="d-flex flex-column lh-1">
            <span className="fw-bold text-white">Prodriver247</span>
            <small className="fw-light text-white-50">Fahrschule Albrecht</small>
          </div>
        </Link>

        {/* Бургер */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-controls={collapseId}
          aria-expanded="false"
          aria-label="Toggle navigation"
          // иногда полезно поднять z-index, чтобы ничего не перекрывало кнопку
          style={{ zIndex: 1051 }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Центр + Справа */}
        <div className="collapse navbar-collapse" id={collapseId}>
          {/* Ссылки — по центру */}
          <ul className={`navbar-nav mx-auto ${styles.navbarNav}`}>
            <li className="nav-item">
              <Link href="/" className={`${styles.navItemFlex} ${styles.startButton}`}>
                <Image src="/icons/start.svg" width={24} height={24} alt="Start icon" />
                Start
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/info" className={`nav-link ${styles.navItemFlex} ${styles.infoButton}`}>
                <Image src="/icons/info.svg" width={24} height={24} alt="Info icon" />
                Info
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/kontakt" className={`nav-link ${styles.navItemFlex} ${styles.kontaktButton}`}>
                <Image src="/icons/kontakt.svg" width={24} height={24} alt="Kontakt icon" />
                Kontakt
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/kurse" className={`nav-link ${styles.navItemFlex} ${styles.kurseButton}`}>
                <Image src="/icons/kurse.svg" width={24} height={24} alt="Kurse icon" />
                Kurse
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/impressum" className={`nav-link ${styles.navItemFlex} ${styles.impressiumButton}`}>
                Impressum
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/agb" className={`nav-link ${styles.navItemFlex} ${styles.agbButton}`}>
                AGB
              </Link>
            </li>
          </ul>

          {/* Справа: ЛК / Войти / Выйти */}
          <div className="d-flex align-items-center ms-lg-3 my-2 my-lg-0">
            {isAuthed ? (
              onDashboard ? (
                <button
                  className="btn btn-outline-light w-100 w-lg-auto"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Выйти
                </button>
              ) : (
                <Link href="/dashboard" className="btn btn-danger w-100 w-lg-auto">
                  Личный кабинет
                </Link>
              )
            ) : (
              <Link href="/login" className="btn btn-danger w-100 w-lg-auto">
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
