import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB | Fahrschule Albrecht — Prodriver247",
  description: "Allgemeine Geschäftsbedingungen für Kurse und Fahrunterricht.",
};

export default function AGBPage() {
  const stand = new Date().toLocaleDateString("de-DE");
  return (
    <section style={{ background: "#101011" }} className="py-5">
      <div className="container">
        <h1 className="text-white mb-4">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <div className="text-white-50">
          <p className="mb-4">
            Diese AGB regeln das Vertragsverhältnis zwischen der <strong className="text-white">Fahrschule Albrecht — Prodriver247</strong> (nachfolgend „Fahrschule“) und
            den Fahrschülerinnen und Fahrschülern (nachfolgend „Kund:innen“).
          </p>

          <ol className="mb-4">
            <li className="mb-3">
              <h2 className="h5 text-white">Vertragsschluss &amp; Anmeldung</h2>
              <p className="mb-2">
                Der Vertrag kommt durch persönliche Anmeldung in der Fahrschule oder über die Website zustande. Minderjährige benötigen
                die Zustimmung der gesetzlichen Vertreter.
              </p>
              <p className="mb-0">
                Bei Online-Anmeldung erhältst du eine Bestätigung per E-Mail. (Siehe ggf. <Link className="link-light" href="/impressum">Impressum</Link>.)
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Leistungsumfang</h2>
              <p className="mb-2">
                Die Fahrschule erbringt theoretischen Unterricht und praktische Fahrstunden zur Vorbereitung auf die Prüfungen der Klasse B.
                Umfang, Zeiten und Inhalte richten sich nach StVO, FeV und den internen Planungen der Fahrschule.
              </p>
              <ul>
                <li>Theorie gemäß gesetzlichem Mindestumfang und Terminplan.</li>
                <li>Praktische Ausbildung; Sonderfahrten (Autobahn, Nacht, Landstraße) separat.</li>
                <li>Unterrichtsmaterialien/Apps ggf. separat zu buchen.</li>
              </ul>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Preise &amp; Zahlung</h2>
              <p className="mb-2">
                Es gelten die zum Zeitpunkt der Anmeldung gültigen Preise. Sämtliche Preise verstehen sich in EUR inkl. gesetzlicher USt.
              </p>
              <ul>
                <li>Anmeldegebühr, Theorie-Pauschalen, Fahrstundensätze, Prüfungs-/Vorstellungskosten gemäß Preisliste.</li>
                <li>Zahlung per Überweisung, EC oder Bar nach Vereinbarung. Ratenzahlung ggf. möglich.</li>
              </ul>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Termine &amp; Absagen (praktisch)</h2>
              <p className="mb-2">
                Vereinbarte Fahrstunden sind verbindlich. Absagen müssen spätestens 24&nbsp;Stunden vor Beginn erfolgen. Bei späterer
                Absage oder Nichterscheinen kann die Fahrstunde berechnet werden.
              </p>
              <p className="mb-0">
                Verspätungen verkürzen die Fahrzeit. Sicherheitsrelevante Gründe können zum Abbruch führen (z. B. ungeeignete Schuhe,
                gesundheitliche Einschränkungen).
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Pflichten der Kund:innen</h2>
              <ul>
                <li>Wahrheitsgemäße Angaben, Mitführen erforderlicher Dokumente.</li>
                <li>Beachtung der Weisungen der Fahrlehrer:innen und der StVO.</li>
                <li>Keine Teilnahme unter Einfluss von Alkohol/Drogen/Medikamenten; Mitteilung relevanter gesundheitlicher Umstände.</li>
              </ul>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Prüfungen &amp; Voraussetzungen</h2>
              <p className="mb-2">
                Zur Prüfungsanmeldung ist die vollständige Ausbildung erforderlich. Die Fahrschule kann eine Prüfungsanmeldung ablehnen,
                sofern Prüfungsreife nicht vorliegt. Prüfungsgebühren (TÜV/Dekra) sind separat an den jeweiligen Träger zu entrichten.
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Haftung &amp; Versicherung</h2>
              <p className="mb-2">
                Die Fahrzeuge sind haftpflicht- und vollkaskoversichert. Bei grober Fahrlässigkeit oder Vorsatz kann eine
                Selbstbeteiligung anfallen. Für mitgebrachte Gegenstände wird keine Haftung übernommen.
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Rücktritt, Kündigung &amp; Widerruf</h2>
              <p className="mb-2">
                Eine ordentliche Kündigung ist jederzeit möglich; bereits erbrachte Leistungen sind zu vergüten. Bei Verträgen, die
                ausschließlich per Fernkommunikation geschlossen wurden, besteht ggf. ein gesetzliches Widerrufsrecht (s. Widerrufsbelehrung).
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Urheber- &amp; Nutzungsrechte</h2>
              <p className="mb-0">
                Lehrmaterialien (Texte, Grafiken, Aufgaben) sind urheberrechtlich geschützt. Eine Weitergabe oder Nutzung außerhalb der
                Ausbildung ist ohne Zustimmung nicht gestattet.
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Datenschutz</h2>
              <p className="mb-0">
                Wir verarbeiten personenbezogene Daten im Rahmen der Ausbildung und Organisation gemäß DSGVO. Details in unserer{" "}
                <Link className="link-light" href="/datenschutz">Datenschutzerklärung</Link>.
              </p>
            </li>

            <li className="mb-3">
              <h2 className="h5 text-white">Schlussbestimmungen</h2>
              <p className="mb-0">
                Es gilt deutsches Recht. Gerichtsstand ist — soweit zulässig — der Sitz der Fahrschule. Sollten einzelne Bestimmungen
                unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.
              </p>
            </li>
          </ol>

          <hr className="border-secondary" />

          <h2 className="h5 text-white mt-4">Widerrufsbelehrung (nur bei Fernabsatz)</h2>
          <p className="mb-2">
            Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt
            14&nbsp;Tage ab dem Tag des Vertragsabschlusses.
          </p>
          <p className="mb-2">
            Um dein Widerrufsrecht auszuüben, musst du uns (Fahrschule Albrecht — Prodriver247, {/* TODO: адрес */} Musterstraße&nbsp;1,
            12345 Musterstadt, E-Mail: <a className="link-light" href="mailto:info@prodriver247.de">info@prodriver247.de</a>) mittels
            einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über deinen Entschluss informieren.
          </p>
          <p className="mb-2">
            Zur Wahrung der Frist reicht es aus, dass du die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Frist
            absendest.
          </p>
          <p className="mb-4">
            Hast du verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so hast du uns einen angemessenen Betrag
            zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem du uns von der Ausübung des Widerrufsrechts hinsichtlich dieses
            Vertrags unterrichtest, bereits erbrachten Leistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Leistungen
            entspricht.
          </p>

          <h3 className="h6 text-white">Muster-Widerrufsformular</h3>
          <pre className="text-white-50 bg-dark p-3 rounded-3" style={{ whiteSpace: "pre-wrap" }}>
{`(Wenn du den Vertrag widerrufen willst, fülle bitte dieses Formular aus und sende es zurück.)
An: Fahrschule Albrecht — Prodriver247, Musterstraße 1, 12345 Musterstadt
E-Mail: info@prodriver247.de

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:
— Bestellt am (*)/erhalten am (*):
— Name des/der Verbraucher(s):
— Anschrift des/der Verbraucher(s):
— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
— Datum:
(*) Unzutreffendes streichen.`}
          </pre>

          <p className="mt-4">Stand: {stand}</p>
          <p className="small mt-2">
            Hinweis: Diese AGB sind eine Vorlage und ersetzen keine Rechtsberatung. Bitte lasse den Text bei Bedarf juristisch prüfen.
          </p>
        </div>
      </div>
    </section>
  );
}
