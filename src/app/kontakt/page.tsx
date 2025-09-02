import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Kontakt | Fahrschule Albrecht — Prodriver247",
    description: "Свяжитесь с нами: телефон, WhatsApp, почта, адрес. Форма для вопросов.",
};

export default function KontaktPage() {
    const cardStyle: React.CSSProperties = {
        background: "#141415",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
        borderRadius: 16,
    };

    return (
        <>
            <Navbar />
            <div className="nav-spacer" />
            <section style={{ background: "#101011" }} className="py-5">
                <div className="container">
                    <h1 className="text-white mb-2">Kontakt</h1>
                    <p className="text-white-50 mb-4">
                        Есть вопросы по записи, теории или практике? Напишите нам — поможем подобрать оптимальный план.
                    </p>

                    <div className="row g-4">
                        {/* Левая колонка — карточки контактов */}
                        <div className="col-lg-5">
                            <div className="p-3" style={cardStyle}>
                                <div className="text-white fw-semibold mb-2">Kontakt &amp; Social</div>
                                <ul className="list-unstyled m-0 text-white-50">
                                    <li className="mb-2">
                                        Telefon:{" "}
                                        <a className="link-light" href="tel:+49XXXXXXXXXX">
                                            +49&nbsp;XX&nbsp;XXX&nbsp;XX&nbsp;XX
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        E-Mail:{" "}
                                        <a className="link-light" href="mailto:info@prodriver247.de">
                                            info@prodriver247.de
                                        </a>
                                    </li>
                                    <li className="mb-2">Adresse: Musterstraße 1, 12345 Musterstadt</li>
                                </ul>

                                <div className="d-flex gap-2 mt-3">
                                    <a className="btn btn-success" href="https://wa.me/491234567890" target="_blank" rel="noopener noreferrer">
                                        WhatsApp
                                    </a>
                                    <Link href="/registration" className="btn btn-danger ms-auto">
                                        Записаться
                                    </Link>
                                </div>
                            </div>

                            <div className="p-3 mt-3" style={cardStyle}>
                                <div className="text-white fw-semibold mb-2">Öffnungszeiten Büro</div>
                                <p className="text-white-50 mb-0">
                                    По договорённости. Напишите нам в WhatsApp, и мы предложим удобное время в тот же день.
                                </p>
                            </div>
                        </div>

                        {/* Правая колонка — клиентская форма */}
                        <div className="col-lg-7">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Карта */}
                    <div className="mt-4">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6"> {/* уже и по центру */}
                                <div className="ratio ratio-4x3" style={cardStyle}>
                                    <iframe
                                        title="Google Maps — Bielefeld"
                                        src="https://www.google.com/maps?q=Bielefeld%2C%20Germany&output=embed"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        loading="lazy"
                                        style={{ border: 0, borderRadius: 16 }}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
