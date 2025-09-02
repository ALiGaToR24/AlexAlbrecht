import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Fahrschule Albrecht — Prodriver247",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  const stand = new Date().toLocaleDateString("de-DE");
  return (
    <section style={{ background: "#101011" }} className="py-5">
      <div className="container">
        <h1 className="text-white mb-4">Impressum</h1>

        <div className="text-white-50">
          <p className="mb-4">
            Angaben gemäß § 5 TMG und Verantwortliche/r i.S.d. § 55 Abs. 2 RStV.
          </p>

          <div className="mb-4">
            <h2 className="h5 text-white">Anbieter</h2>
            <p className="mb-1 text-white">
              <strong>Fahrschule Albrecht — Prodriver247</strong>
            </p>
            <p className="mb-1">
              {/* TODO: адрес */}
              Musterstraße&nbsp;1, 12345 Musterstadt
            </p>
            <p className="mb-1">
              {/* TODO: представитель */}
              Vertreten durch: Max Mustermann (Inhaber)
            </p>
            <p className="mb-1">
              {/* TODO: регистр, если есть */}
              Handelsregister: HRB&nbsp;—&nbsp;XXXXXX, Amtsgericht Musterstadt
            </p>
            <p className="mb-1">{/* TODO: USt-ID */}USt-IdNr.: DE123456789</p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Kontakt</h2>
            <p className="mb-1">
              Telefon: <a className="link-light" href="tel:+49XXXXXXXXX">+49&nbsp;XX&nbsp;XXX&nbsp;XX&nbsp;XX</a>
            </p>
            <p className="mb-1">
              E-Mail: <a className="link-light" href="mailto:info@prodriver247.de">info@prodriver247.de</a>
            </p>
            <p className="mb-1">
              Website: <Link className="link-light" href="/">prodriver247.de</Link>
            </p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Aufsichtsbehörde / Zuständige Stelle</h2>
            <p className="mb-1">
              {/* TODO: укажи местный орган/район */}
              Zuständige Fahrerlaubnisbehörde: Führerscheinstelle Musterstadt
            </p>
            <p className="mb-1">
              Gesetzliche Berufsbezeichnung: Fahrschule (Bundesrepublik Deutschland)
            </p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Berufshaftpflicht</h2>
            <p className="mb-1">
              {/* TODO: страховая, полис */}
              Versicherer: Muster Versicherung AG, Musterweg&nbsp;5, 12345 Musterstadt
            </p>
            <p className="mb-1">Räumlicher Geltungsbereich: Deutschland</p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Verbraucherstreitbeilegung</h2>
            <p className="mb-1">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a className="link-light ms-1" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mb-1">
              Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen (§&nbsp;36 VSBG).
            </p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß §&nbsp;7 Abs.&nbsp;1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§&nbsp;8 bis&nbsp;10 TMG sind wir als Diensteanbieter jedoch
              nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
              von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
              können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets
              der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="h5 text-white">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers.
            </p>
            <p className="mb-0">
              {/* TODO: укажи источники, если используешь стоковые изображения/иконки */}
              Bildnachweise: Eigenes Material und lizenzierte Quellen.
            </p>
          </div>

          <p className="mt-4">Stand: {stand}</p>

          <p className="small mt-2">
            Hinweis: Diese Seite ersetzt keine Rechtsberatung. Lass dein Impressum im Zweifel rechtlich prüfen.
          </p>
        </div>
      </div>
    </section>
  );
}
