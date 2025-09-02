import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Info | Fahrschule Albrecht — Prodriver247",
    description: "О нашей автошколе: подход, методика, группы на русском, интенсивные курсы.",
};

export default function InfoPage() {
    const card = {
        background: "#141415",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
        borderRadius: 18,
    };

    return (
        <>
            <Navbar />
            <div className="nav-spacer" />
            <section style={{ background: "#101011" }} className="py-5">
                <div className="container">
                    <h1 className="text-white mb-2">Info</h1>
                    <p className="text-white-50 mb-4">
                        Русскоязычные группы, чёткая структура обучения и сопровождение до сдачи. Готовим к теории и практике без стресса.
                    </p>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="p-4 h-100" style={card}>
                                <h5 className="text-white">Прозрачная программа</h5>
                                <p className="text-white-50 mb-0">
                                    От первых занятий до экзамена — понятные этапы, чек-листы и контроль прогресса.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 h-100" style={card}>
                                <h5 className="text-white">Интенсивный формат</h5>
                                <p className="text-white-50 mb-0">
                                    Ускоренное расписание, плотная запись на практику и спецпоездки без ожидания.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 h-100" style={card}>
                                <h5 className="text-white">Поддержка на русском</h5>
                                <p className="text-white-50 mb-0">
                                    Теория RU, материалы и сопровождение — на русском. Немецкий — по желанию.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mt-1">
                        <div className="col-lg-6">
                            <div className="p-4 h-100" style={card}>
                                <h5 className="text-white">Что входит</h5>
                                <ul className="text-white-50 mb-0">
                                    <li>Теоретические занятия (RU)</li>
                                    <li>Практика AT/MT + спецпоездки</li>
                                    <li>Тренажёр вопросов и моки-экзамены</li>
                                    <li>Подготовка к TÜV маршрутам</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-4 h-100" style={card}>
                                <h5 className="text-white">Как начать</h5>
                                <ol className="text-white-50 mb-0">
                                    <li>Оставить заявку на сайте или в WhatsApp</li>
                                    <li>Принести документы (Sehtest, Erste Hilfe, фото)</li>
                                    <li>Получить план занятий и стартовать</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <Link href="/registration" className="btn btn-danger btn-lg">
                            Записаться
                        </Link>
                        <Link href="/kontakt" className="btn btn-outline-light btn-lg">
                            Задать вопрос
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
