"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top border-bottom ${styles.navbarCustom}`}
    >
      <div className="container-fluid">
        {/* Логотип + текст */}
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <Image src="/Logo.svg" width={60} height={58} alt="Logo" />
          <div className="d-flex flex-column lh-1">
            <span className="fw-bold text-white">Prodriver247</span>
            <small className="fw-light text-white">Fahrschule Albrecht</small>
          </div>
        </Link>

        {/* Бургер */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Центральные ссылки (схлопывающийся блок) */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="mainNavbar"
        >
          <ul className={`navbar-nav ${styles.navbarNav}`}>
            <li className="nav-item">
              <Link
                href="/start"
                className={`${styles.navItemFlex} ${styles.startButton}`}
              >
                <Image
                  src="/icons/start.svg"
                  width={24}
                  height={24}
                  alt="Start icon"
                />
                Start
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/login"
                className={`btn btn-primary ${styles.navItemFlex} ${styles.loginButton}`}
              >
                <Image
                  src="/icons/login.svg"
                  width={24}
                  height={24}
                  alt="Login icon"
                />
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/registration"
                className={`btn btn-outline-primary ${styles.navItemFlex} ${styles.registrationButton}`}
              >
                <Image
                  src="/icons/registration.svg"
                  width={24}
                  height={24}
                  alt="Registration icon"
                />
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/info"
                className={`nav-link ${styles.navItemFlex} ${styles.infoButton}`}
              >
                <Image
                  src="/icons/info.svg"
                  width={24}
                  height={24}
                  alt="Info icon"
                />
                Info
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/kontakt"
                className={`nav-link ${styles.navItemFlex} ${styles.kontaktButton}`}
              >
                <Image
                  src="/icons/kontakt.svg"
                  width={24}
                  height={24}
                  alt="Kontakt icon"
                />
                Kontakt
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/kurse"
                className={`nav-link ${styles.navItemFlex} ${styles.kurseButton}`}
              >
                <Image
                  src="/icons/kurse.svg"
                  width={24}
                  height={24}
                  alt="Kurse icon"
                />
                Kurse
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/impressum"
                className={`nav-link ${styles.navItemFlex} ${styles.impressiumButton}`}
              >
                Impressum
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/agb"
                className={`nav-link ${styles.navItemFlex} ${styles.agbButton}`}
              >
                AGB
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
