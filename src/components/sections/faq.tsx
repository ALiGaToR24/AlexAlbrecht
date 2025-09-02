"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./faq.module.css";

type QA = { q: string; a: React.ReactNode };

// Вопросы под твою автошколу
const DATA: QA[] = [
  {
    q: "Сколько длится интенсивный курс категории B?",
    a: (
      <>
        Обычно 2–4 недели в зависимости от расписания теории и скорости
        набора практических часов. Можно ускориться за счёт плотной записи
        на вождение.
      </>
    ),
  },
  {
    q: "Можно учиться и сдавать на автомате?",
    a: (
      <>
        Да. Обучаем как на «автомате», так и на «механике». Если сдаёшь на
        автомате, в правах будет отметка B78 (только AT).
      </>
    ),
  },
  {
    q: "Какие знания языка нужны?",
    a: (
      <>
        Мы ведём русскоязычные группы, вся теория и сопровождение — на русском.
        Для экзаменов подходит русский интерфейс приложений и официальных
        материалов.
      </>
    ),
  },
  {
    q: "Сколько стоит обучение?",
    a: (
      <>
        Цена зависит от пакета и количества практических занятий. Напиши нам —
        пришлём актуальный прайс и подберём оптимальный план.
      </>
    ),
  },
  {
    q: "Как проходит теория?",
    a: (
      <>
        Теория — блоками по темам с разбором типовых вопросов. Даём доступ к
        тренажёрам и составляем план подготовки под твоё время.
      </>
    ),
  },
  {
    q: "Есть рассрочка или поэтапная оплата?",
    a: (
      <>
        Да, возможна поэтапная оплата: стартовый взнос + занятия по мере
        прохождения. Уточни условия у администратора.
      </>
    ),
  },
  {
    q: "Сколько нужно практических часов?",
    a: (
      <>
        Средний диапазон — 10–20 занятий по 45/60 минут, зависит от опыта и
        целей. Инструктор подскажет оптимальный объём после первых поездок.
      </>
    ),
  },
  {
    q: "Где проходят экзамены и маршруты?",
    a: (
      <>
        Экзамены принимают в ближайшем TÜV. Мы заранее проезжаем типовые
        маршруты района и готовим чек-лист допуска.
      </>
    ),
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0); // раскрыт первый пункт

  return (
    <section className={`${styles.wrap} py-5`}>
      <div className="container">
        <h2 className={`${styles.title} text-white text-center mb-4`}>
          Frequently Asked Questions
        </h2>

        <div className="row g-4">
          {DATA.map((item, i) => (
            <div className="col-lg-6" key={i}>
              <FAQItem
                index={i}
                item={item}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: QA;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<number>(0);

  // плавное открытие/закрытие (анимируем max-height)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) setMaxH(el.scrollHeight);
    else setMaxH(0);
  }, [open, item.a]);

  return (
    <div className={`${styles.card} ${open ? styles.open : ""}`}>
      <button
        className={styles.header}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-control-${index}`}
      >
        <span className={styles.q}>{item.q}</span>

        {/* плюс/минус — вертикальная палка исчезает при открытии */}
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path className="h" d="M5 12h14" />
            <path className="v" d="M12 5v14" />
          </svg>
        </span>
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-control-${index}`}
        className={styles.panel}
        style={{ maxHeight: maxH }}
      >
        <div ref={contentRef} className={styles.inner}>
          {item.a}
        </div>
      </div>
    </div>
  );
}
