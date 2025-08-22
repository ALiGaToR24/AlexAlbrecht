import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import styles from "./Home.module.css";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import StepsSlider from "@/components/sections/StepsSlider";
import ProgramSteps from "@/components/sections/ProgramSteps";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className={`${styles.hero} d-flex align-items-center`}>
        <div className={styles.heroOverlay} />

        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img src="/Logo.svg" alt="logo" width={68} height={66} />
                <div className="text-white">
                  <div className="fw-semibold small-12">Prodriver247 | Fahrschule Albrecht</div>
                  <div className="opacity-75 small">Интенсивный курс вождения — Категория B</div>
                </div>
              </div>

              <h1 className={`${styles.heroTitle} text-white mb-3`}>
                Новый набор в&nbsp;русскоязычную группу
              </h1>

              <div className={`${styles.statusBar} mb-4`}>
                <span className={styles.dot}>•</span>
                <span>старт через <b className={styles.accent}>14 дней</b></span>
                <span className={styles.dot}>•</span>
                <span>осталось <b className={styles.accent}>2 места</b></span>
              </div>

              <div className="d-flex gap-3">
                <Link href="/registration" className="btn btn-danger btn-lg">
                  Записаться
                </Link>
              </div>
            </div>

            {/* карточка справа "Почему мы?" */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className={`${styles.glassCard} p-4 ms-lg-auto`}>
                <h5 className="text-white mb-3">Почему именно мы?</h5>
                <ul className={`${styles.list} text-white-50 mb-4`}>
                  <li>Опытные инструкторы и понятная программа</li>
                  <li>Гибкий график, быстрый прогресс</li>
                  <li>Подготовка к теории и практике без стресса</li>
                </ul>
                <Link href="/info" className={`btn btn-outline-light ${styles.moreInformationButton}`}>
                  Получить больше информации
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.darkSection} ${styles.sectionPadded}`}>
        <div className="container">

          {/* Ряд карточек */}
          <div className={`row ${styles.cardsRow} justify-content-center g-5`}>
            <div className="col-md-4">
              <article className={`${styles.featureCard} p-5 h-100`}>
                <div className="flex-grow-1">
                  <div className={styles.iconBox}>
                    <Image src="/icons/3.svg" width={100} height={100} alt="Иконка" />
                  </div>
                  <h5 className="text-danger mb-2">Индивидуальный план обучения</h5>
                  <p className="text-white">
                    Каждый ученик получает план, адаптированный под его уровень и цели, чтобы занятия проходили максимально эффективно.
                  </p>
                </div>
                <Link href="/info" className={styles.moreLink}>Узнать больше</Link>
              </article>
            </div>

            <div className="col-md-4">
              <article className={`${styles.featureCard} p-5 h-100 position-relative`}>
                {/* Иконка слева */}
                <div className="flex-grow-1">
                  <div className={styles.iconBox}>
                    <Image src="/icons/1.svg" width={100} height={100} alt="Иконка" />
                  </div>
                  <h5 className="mb-2"><span className="text-danger">Быстро и структурировано</span></h5>
                  <p className="text-white mb-4">
                    От первых занятий до готовности к экзамену — чёткая структура и оптимальные сроки без лишнего ожидания.
                  </p>
                </div>
                <Link href="/info" className={styles.moreLink}>Узнать больше</Link>
              </article>
            </div>

            <div className="col-md-4">
              <article className={`${styles.featureCard} p-5 h-100 position-relative`}>
                {/* Иконка слева */}
                <div className="flex-grow-1">
                  <div className={styles.iconBox}>
                    <Image src="/icons/2.svg" width={100} height={100} alt="Иконка" />
                  </div>
                  <h5 className="mb-2"><span className="text-danger">Погружение в мир дорог</span></h5>
                  <p className="text-white mb-4">
                    Учим не только правилам, но и умению чувствовать поток, получать удовольствие от поездки и открывать новое.
                  </p>
                </div>
                <Link href="/info" className={styles.moreLink}>Узнать больше</Link>
              </article>
            </div>
          </div>

          {/* Сплит-блок — сразу после карточек, в той же секции */}
          <div className={`row align-items-center ${styles.splitRow}`}>
            <div className="col-lg-5">
              <img src="/Etappen-ausbildung1.png" alt="Этапы обучения" className={styles.stepsImage} />
            </div>
            <div className="col-lg-7">
              <h2 className={`${styles.splitTitle} text-white mb-3`}>
                Мы даём каждому ученику чётко структурированное обучение
              </h2>
              <p className="text-white-50 mb-4">
                чтобы с минимальными затратами времени и денег как можно быстрее достичь цели.
              </p>
              <div className="d-flex gap-3">
                <Link href="/registration" className="btn btn-danger btn-lg">Записаться</Link>
                <Link href="/info" className="btn btn-outline-light btn-lg">Получить больше информации</Link>
              </div>
            </div>
          </div>
        </div>

      </section>
      <ProgramSteps></ProgramSteps>
      <Footer></Footer>
    </>
  );
}
