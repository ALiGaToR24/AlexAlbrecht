"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ProgramSteps.module.css";

/* ---------- данные ---------- */

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

const AUTO_MS = 120_000; // 2 минуты

/* ---------- утилиты ---------- */

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function isSectionInView(el: HTMLElement | null) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.top < vh * 0.7 && r.bottom > vh * 0.3;
}

/* ---------- компонент ---------- */

export default function ProgramSteps() {
  const steps = useMemo(() => STEPS, []);
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);  // пауза только при скрытии вкладки
  const [progress, setProgress] = useState(0);      // 0..1
  const [inView, setInView]     = useState(false);
  const [hasLeft, setHasLeft]   = useState(false);
  const [hasRight, setHasRight] = useState(false);

  const wrapRef       = useRef<HTMLDivElement>(null);
  const railRef       = useRef<HTMLDivElement>(null);
  const startRef      = useRef<number>(Date.now());
  const tilesRef      = useRef<(HTMLButtonElement | null)[]>([]);
  const stepWidthRef  = useRef<number>(240);

  /* видимость секции + автопауза при скрытии вкладки */
  useEffect(() => {
    const update = () => setInView(isSectionInView(wrapRef.current));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* подсказки по краям и ширина шага */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateEdges = () => {
      setHasLeft(rail.scrollLeft > 2);
      setHasRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
      const first = tilesRef.current[0];
      if (first) stepWidthRef.current = first.offsetWidth + 22; // 22px — gap
    };

    updateEdges();
    rail.addEventListener("scroll", updateEdges);

    const ro = new ResizeObserver(updateEdges);
    ro.observe(rail);
    window.addEventListener("resize", updateEdges);

    return () => {
      rail.removeEventListener("scroll", updateEdges);
      ro.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  /* авто-таймер (только при видимости секции) */
  useEffect(() => {
    if (paused || !inView) return;
    const id = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / AUTO_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActive((i) => (i + 1) % steps.length);
        startRef.current = Date.now();
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(id);
  }, [paused, inView, steps.length]);

  /* при смене шага — центрируем РЕЛЬСУ (только когда секция в кадре) */
  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);

    if (!inView || prefersReducedMotion) return;
    const rail = railRef.current;
    const tile = tilesRef.current[active];
    if (!rail || !tile) return;

    const targetLeft = tile.offsetLeft - (rail.clientWidth - tile.clientWidth) / 2;
    rail.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [active, inView]);

  /* клавиатура */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((i) => (i + 1) % steps.length);
    if (e.key === "ArrowLeft")  setActive((i) => (i - 1 + steps.length) % steps.length);
  };

  const scrollByTiles = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * stepWidthRef.current * 3, behavior: "smooth" });
  };

  return (
    <section className={`${styles.wrap} py-5`} ref={wrapRef}>
      <div className="container">
        <div className="mb-4">
          <h2 className={`${styles.title} text-white mb-1`}>Ablauf der Ausbildung</h2>
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
                ref={(el) => { tilesRef.current[i] = el as (HTMLButtonElement | null); }}
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

        {/* Панель контента с анимацией для активного шага */}
        <div
          id={`step-panel-${steps[active].id}`}
          role="tabpanel"
          aria-labelledby={`step-tab-${steps[active].id}`}
          className={`${styles.panel} mt-4`}
        >
          {/* key={active} — чтобы анимация проигрывалась при каждом переключении */}
          <div key={active} className={styles.panelAnim}>
            <div className={`d-flex align-items-end gap-3 mb-2 ${styles.panelHeader}`}>
              <div className={`${styles.badgeNum} ${styles.badgeAnim}`}>
                {String(steps[active].id).padStart(2, "0")}
              </div>
              <h3 className={`m-0 text-white ${styles.leadAnim}`}>{steps[active].lead}</h3>
            </div>

            <ul className={`${styles.points} mb-0`}>
              {steps[active].points.map((p, idx) => (
                <li
                  key={idx}
                  className={`${styles.point} ${styles.pointAnim}`}
                  style={{ ["--i" as any]: idx }}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
