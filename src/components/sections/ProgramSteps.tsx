"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ProgramSteps.module.css";

type Step = {
  id: number;
  title: string;
  lead: string;
  points: string[];
};

const STEPS: Step[] = [
  { id: 1,  title: "Теоретические занятия", lead: "Теоретические занятия", points: ["Структура курса и материалы", "График и посещаемость", "Как готовиться эффективно"] },
  { id: 2,  title: "Базовое обучение",       lead: "Базовое обучение",       points: ["Контроль авто и безопасность", "Первый выезд: цели", "Коммуникация на дороге"] },
  { id: 3,  title: "Спецпоездки",            lead: "Специальные поездки",    points: ["Автобан", "Ночная поездка", "Загородная поездка"] },
  { id: 4,  title: "Знаки и разметка",       lead: "Verkehrszeichen",        points: ["Частые ошибки", "Разбор ситуаций", "Тренажёры"] },
  { id: 5,  title: "Вопросы по цифрам",      lead: "Zahlenfragen",           points: ["Ограничения", "Дистанции", "Тормозной путь"] },
  { id: 6,  title: "Подготовка к теории",    lead: "Подготовка к теории",    points: ["Тактика сдачи", "Моки-экзамены", "Работа над ошибками"] },
  { id: 7,  title: "Механика/автомат",       lead: "Обучение на МКПП/AT",    points: ["Трогание/эстакада", "Манёвры", "Парковки"] },
  { id: 8,  title: "К практическому",        lead: "Подготовка к практике",  points: ["Маршруты TÜV района", "Чек-лист допуска", "Психология экзамена"] },
  { id: 9,  title: "Практический экзамен",   lead: "Prüfungstag",            points: ["Разминка", "Части маршрута", "Типовые ловушки"] },
  { id: 10, title: "После экзамена",         lead: "После экзамена",         points: ["Оформление прав", "Первые поездки", "Повышение скилла"] },
];

// 2 минуты
const AUTO_MS = 5000;

export default function ProgramSteps() {
  const steps = useMemo(() => STEPS, []);
  const [active, setActive]       = useState(0);
  const [paused, setPaused]       = useState(false);
  const [progress, setProgress]   = useState(0); // 0..1

  const wrapRef  = useRef<HTMLDivElement>(null);
  const railRef  = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(Date.now());

  // показать/скрыть тени и стрелки по краям
  const [hasLeft, setHasLeft]   = useState(false);
  const [hasRight, setHasRight] = useState(false);

  const updateEdgeHints = () => {
    const el = railRef.current;
    if (!el) return;
    setHasLeft(el.scrollLeft > 2);
    setHasRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  // сброс таймера при смене шага и автоскролл к плитке
  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);

    const el = railRef.current;
    if (!el) return;
    const tiles = el.querySelectorAll<HTMLElement>(`.${styles.tile}`);
    const t = tiles[active];
    t?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  // плавный таймер + автопереключение
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / AUTO_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActive(i => (i + 1) % steps.length);
        startRef.current = Date.now();
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(id);
  }, [paused, steps.length]);

  // обработка теней/стрелок
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateEdgeHints();
    const onScroll = () => updateEdgeHints();
    const onResize = () => updateEdgeHints();
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  // пауза при hover/focus внутри секции
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const pause = () => setPaused(true);
    const resume = () => setPaused(false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, []);

  const goPrev = () => setActive(i => (i - 1 + steps.length) % steps.length);
  const goNext = () => setActive(i => (i + 1) % steps.length);

  // стрелки прокрутки ряда
  const scrollByTiles = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const firstTile = el.querySelector<HTMLElement>(`.${styles.tile}`);
    const step = firstTile ? firstTile.offsetWidth + 16 : 240;
    el.scrollBy({ left: dir * step * 3, behavior: "smooth" });
  };

  // навигация клавиатурой
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft")  goPrev();
  };

  return (
    <section className={`${styles.wrap} py-5`} ref={wrapRef}>
      <div className="container">
        <div className="mb-4">
          <h2 className={`${styles.title} text-white mb-1`}>Ablauf der Ausbildung</h2>
          <p className="text-white-50 mb-0">От первого занятия до уверенной сдачи экзамена.</p>
        </div>

        {/* Рельса с плитками + стрелки и тени */}
        <div className={`${styles.railWrap} ${hasLeft ? styles.showLeft : ""} ${hasRight ? styles.showRight : ""}`}>
          <button
            className={`${styles.railBtn} ${styles.left}`}
            onClick={() => scrollByTiles(-1)}
            aria-label="Прокрутить влево"
          >
            ‹
          </button>

          <div
            className={styles.rail}
            ref={railRef}
            role="tablist"
            aria-label="Steps"
            onKeyDown={onKeyDown}
          >
            {steps.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                aria-controls={`step-panel-${s.id}`}
                id={`step-tab-${s.id}`}
                className={`${styles.tile} ${i === active ? styles.tileActive : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.num}>{String(s.id).padStart(2, "0")}</span>
                <span className={styles.cap}>{s.title}</span>
              </button>
            ))}
          </div>

          <button
            className={`${styles.railBtn} ${styles.right}`}
            onClick={() => scrollByTiles(1)}
            aria-label="Прокрутить вправо"
          >
            ›
          </button>
        </div>

        {/* Визуальный таймер */}
        <div className={styles.timer} aria-hidden="true">
          <div className={styles.timerFill} style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Контент выбранного шага */}
        <div
          id={`step-panel-${steps[active].id}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${steps[active].id}`}
          className={`${styles.panel} mt-4`}
        >
          <div className="d-flex align-items-end gap-3 mb-2">
            <div className={styles.badgeNum}>{String(steps[active].id).padStart(2, "0")}</div>
            <h3 className="m-0 text-white">{steps[active].lead}</h3>
          </div>

          <ul className="mb-0">
            {steps[active].points.map((p, idx) => (
              <li key={idx} className={styles.point}>{p}</li>
            ))}
          </ul>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-light btn-sm" onClick={goPrev}>← Предыдущий</button>
            <button className="btn btn-light btn-sm" onClick={goNext}>Следующий →</button>
            <button
              className={`btn btn-sm ${paused ? "btn-danger" : "btn-outline-light"} ms-auto`}
              onClick={() => setPaused(p => !p)}
            >
              {paused ? "Автопрокрутка: пауза" : "Автопрокрутка: идёт"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
