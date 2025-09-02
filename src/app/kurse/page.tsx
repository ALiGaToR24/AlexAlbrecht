import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Kurse | Fahrschule Albrecht — Prodriver247",
    description: "Курсы, интенсивы, индивидуальные занятия. Расписание ближайших стартов.",
};

export default function KursePage() {
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
                    <h1 className="text-white mb-2">Kurse</h1>
                    <p className="text-white-50 mb-4">
                        Выберите формат: интенсивная группа, стандартный график или индивидуальные занятия на AT/MT.
                    </p>

                    {/* Карточки курсов */}
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="p-4 h-100" style={card}>
                                <div className="text-white fw-bold mb-1">Intensivkurs B (RU)</div>
                                <div className="text-white-50 small mb-3">2–4 недели</div>
                                <ul className="text-white-50 small mb-3">
                                    <li>Теория блоками + практика каждый день</li>
                                    <li>Подготовка к TÜV, моки-экзамены</li>
                                </ul>
                                <Link href="/registration" className="btn btn-danger w-100">
                                    Записаться
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 h-100" style={card}>
                                <div className="text-white fw-bold mb-1">Standardkurs B</div>
                                <div className="text-white-50 small mb-3">4–8 недель</div>
                                <ul className="text-white-50 small mb-3">
                                    <li>Гибкий график теории и практики</li>
                                    <li>Индивидуальный план по прогрессу</li>
                                </ul>
                                <Link href="/registration" className="btn btn-outline-light w-100">
                                    Записаться
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="p-4 h-100" style={card}>
                                <div className="text-white fw-bold mb-1">Einzelunterricht AT/MT</div>
                                <div className="text-white-50 small mb-3">по договорённости</div>
                                <ul className="text-white-50 small mb-3">
                                    <li>Парковки, маршруты, психология экзамена</li>
                                    <li>Адаптация под опыт и цели</li>
                                </ul>
                                <Link href="/kontakt" className="btn btn-outline-light w-100">
                                    Узнать детали
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Мини-расписание */}
                    <div className="mt-5">
                        <div className="p-3" style={card}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h2 className="h5 text-white m-0">Ближайшие старты</h2>
                                <Link href="/registration" className="btn btn-danger btn-sm">
                                    Забронировать место
                                </Link>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-dark table-borderless align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Курс</th>
                                            <th>Старт</th>
                                            <th>Длительность</th>
                                            <th>Места</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ verticalAlign: "middle" }}>
                                        <tr>
                                            <td>Intensivkurs B (RU)</td>
                                            <td>01.10.2025</td>
                                            <td>3 недели</td>
                                            <td><span className="badge bg-danger">Осталось 2</span></td>
                                            <td><Link href="/registration" className="btn btn-danger btn-sm">Записаться</Link></td>
                                        </tr>
                                        <tr>
                                            <td>Standardkurs B</td>
                                            <td>14.10.2025</td>
                                            <td>6 недель</td>
                                            <td><span className="badge bg-secondary">Есть</span></td>
                                            <td><Link href="/registration" className="btn btn-outline-light btn-sm">Записаться</Link></td>
                                        </tr>
                                        <tr>
                                            <td>Einzelunterricht (AT/MT)</td>
                                            <td>Гибко</td>
                                            <td>—</td>
                                            <td><span className="badge bg-secondary">По запросу</span></td>
                                            <td><Link href="/kontakt" className="btn btn-outline-light btn-sm">Связаться</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-white-50 small mt-2 mb-0">
                                Даты и места уточняются. Если нет подходящего старта — напишите нам, предложим индивидуальный план.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
