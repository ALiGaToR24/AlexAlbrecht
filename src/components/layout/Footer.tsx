"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footerWrap} py-5`}>
      {/* ВАЖНО: именно .container — он даёт боковые паддинги на всех брейкпоинтах */}
      <div className="container px-3 px-md-4">
        <div className="row g-4 align-items-start">
          {/* Brand / About */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Image src="/Logo.svg" width={32} height={30} alt="Prodriver247" />
              <span className="fw-semibold text-white">Prodriver247</span>
            </div>
            <p className="text-white-50 mb-0">
              Интенсивные курсы вождения категории B: структура, практика и уверенность на дороге.
            </p>
          </div>

          {/* Contacts */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white mb-3 text-uppercase small">Контакты</h6>
            <ul className="list-unstyled d-grid gap-2 mb-0">
              <li className="d-flex align-items-start gap-2 text-white-50">
                <i className="bi bi-geo-alt fs-6 opacity-75"></i>
                <span>Fahrschule Albrecht, NRW</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-envelope fs-6 opacity-75 text-white-50"></i>
                <Link className="link-light link-opacity-75 link-opacity-100-hover" href="mailto:info@prodriver247.de">
                  info@prodriver247.de
                </Link>
              </li>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-telephone fs-6 opacity-75 text-white-50"></i>
                <Link className="link-light link-opacity-75 link-opacity-100-hover" href="tel:+491234567890">
                  +49 123 456 7890
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white mb-3 text-uppercase small">Разделы</h6>
            <ul className="list-unstyled d-grid gap-2 mb-0">
              <li><Link className="link-light link-opacity-75 link-opacity-100-hover" href="/start">Start</Link></li>
              <li><Link className="link-light link-opacity-75 link-opacity-100-hover" href="/kurse">Kurse</Link></li>
              <li><Link className="link-light link-opacity-75 link-opacity-100-hover" href="/info">Info</Link></li>
              <li><Link className="link-light link-opacity-75 link-opacity-100-hover" href="/kontakt">Kontakt</Link></li>
              <li><Link className="link-light link-opacity-75 link-opacity-100-hover" href="/impressum">Impressum</Link></li>
              <li><Link className="link-light link-opacity-75 link-opacity-100-hover" href="/agb">AGB</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white mb-3 text-uppercase small">Мы в соцсетях</h6>
            <div className="d-flex flex-wrap gap-2">
              <a
                className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image src="/icons/instagram.svg" width={36} height={36} alt="Instagram" />
              </a>

              <a
                className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Image src="/icons/facebook.svg" width={36} height={36} alt="Facebook" />
              </a>

              <a
                className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                href="https://youtube.com/@yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Image src="/icons/youtube.svg" width={36} height={36} alt="YouTube" />
              </a>

              <a
                className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <Image src="/icons/telegram.svg" width={36} height={36} alt="Telegram" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
