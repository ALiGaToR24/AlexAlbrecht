"use client";

import Image from "next/image";
import styles from "./StepsSlider.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type StepInfo = {
  id: number;               // 1..9
  title: string;            // краткий заголовок шага (на мини-карточке)
  slideTitle: string;       // большой заголовок шага в розовой карточке
  image: string;            // картинка слева
  bullets: string[];        // пункты справа
};

const STEPS: StepInfo[] = [
  {
    id: 1,
    title: "Теоретические занятия",
    slideTitle: "Теоретические занятия",
    image: "/slides/step-1.jpg",
    bullets: [
      "Структура курса и материалы",
      "График и требования посещаемости",
      "Как готовиться к теории эффективно",
    ],
  },
  {
    id: 2,
    title: "Базовое обучение",
    slideTitle: "Базовое обучение",
    image: "/slides/step-2.jpg",
    bullets: [
      "Основы управления авто",
      "Первый выезд: цели и чек-лист",
      "Правила безопасности и коммуникации",
    ],
  },
  {
    id: 3,
    title: "Специальные поездки",
    slideTitle: "Специальные поездки",
    image: "/slides/step-3.jpg",
    bullets: [
      "Автобан, ночная и загородная поездки",
      "Разбор типичных ошибок",
      "Как фиксировать прогресс",
    ],
  },
  // ...добавишь остальные шаги по желанию (до 9)
];

export default function StepsSlider() {
  return (
    <section className={`${styles.wrap} py-5`}>
      <div className="container">
        {/* Заголовок блока */}
        <div className="mb-4">
          <h2 className={`${styles.title} text-white mb-1`}>Ablauf der Ausbildung</h2>
          <p className="text-white-50 mb-0">
            Путь к правам: от теории до уверенной сдачи практического экзамена.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          className={styles.swiper}
        >
          {STEPS.map((step, index) => (
            <SwiperSlide key={step.id}>
              {/* Верхняя «лента» с мини-карточками шагов */}
              <div className={`d-none d-md-grid ${styles.stepsRail}`}>
                {Array.from({ length: 9 }).map((_, i) => {
                  const num = i + 1;
                  const isActive = num === step.id;
                  return (
                    <div
                      key={num}
                      className={`${styles.stepSmall} ${isActive ? styles.active : ""}`}
                    >
                      <div className={styles.stepNum}>
                        {num.toString().padStart(2, "0")}
                      </div>
                      <div className={styles.stepCaption}>
                        {STEPS.find(s => s.id === num)?.title ?? "—"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Розовая большая карточка шага */}
              <div className={styles.hotCard}>
                <div className={styles.hotNum}>
                  {step.id.toString().padStart(2, "0")}
                </div>
                <div className={styles.hotTitle}>{step.slideTitle}</div>
              </div>

              {/* Контент слайда */}
              <div className="row g-4 align-items-stretch mt-4">
                {/* Картинка слева */}
                <div className="col-12 col-lg-5">
                  <div className={styles.mediaCard}>
                    <Image
                      src={step.image}
                      alt={step.slideTitle}
                      width={1000}
                      height={700}
                      className="img-fluid rounded-4"
                    />
                  </div>
                </div>

                {/* Список/контент справа */}
                <div className="col-12 col-lg-7">
                  <div className={styles.contentPanel}>
                    <ol className={`${styles.stepsList} mb-0`}>
                      {step.bullets.map((b, i) => (
                        <li key={i}>
                          <div className={styles.itemHead}>
                            0{step.id}-{(i + 1).toString().padStart(2, "0")}
                          </div>
                          <div className={styles.itemText}>{b}</div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
