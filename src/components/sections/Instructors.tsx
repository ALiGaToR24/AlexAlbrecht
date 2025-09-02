"use client";

import Image from "next/image";
import styles from "./Instructors.module.css";

type Instructor = {
  id: string;
  name: string;
  photo: string;               // /instructors/alex.jpg
  languages: string[];         // ["RU","DE","EN"]
  transmissions: ("AT" | "MT")[];
  years: number;                // опыт
  bio?: string;
};

const TEAM: Instructor[] = [
  {
    id: "alex",
    name: "Alex Albrecht",
    photo: "/instructors/alex.jpg",
    languages: ["RU", "DE"],
    transmissions: ["AT", "MT"],
    years: 8,
    bio: "Механика без стресса. Методично разбираем типовые ловушки на экзамене.",
  }
];

export default function Instructors() {
  return (
    <section className={`${styles.wrap} py-5`}>
      <div className="container">
        <div className="text-center mb-4">
          <h2 className={`${styles.title} text-white mb-2`}>Наши инструкторы</h2>
          <p className="text-white-50 m-0">Опыт, языки и тип трансмиссии</p>
        </div>

        <div className="row g-4">
          {TEAM.map((i) => (
            <div key={i.id} className="col-lg-4 col-md-6">
              <article className={`${styles.card} h-100`}>
                <div className="d-flex align-items-center gap-3">
                  <div className={styles.avatar}>
                    <Image
                      src={i.photo}
                      alt={i.name}
                      width={112}
                      height={112}
                      priority={false}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="text-white mb-1">{i.name}</h5>
                    <div className={styles.muted}>Опыт {i.years} лет</div>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {i.languages.map((l) => (
                        <span key={l} className={`${styles.chip} ${styles.chipSoft}`}>{l}</span>
                      ))}
                      {i.transmissions.map((t) => (
                        <span key={t} className={`${styles.chip} ${t === "AT" ? styles.chipRed : styles.chipDark}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {i.bio && <p className={`${styles.bio} mt-3 mb-0`}>{i.bio}</p>}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
