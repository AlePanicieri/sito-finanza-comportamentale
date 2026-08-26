import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi siamo e come funziona",
  description:
    "Cos'è Se Avessi Investito: un progetto indipendente di educazione finanziaria. Come funzionano le simulazioni, da dove arrivano i dati e cosa questo sito NON è.",
  alternates: { canonical: "/chi-siamo" },
};

const PROSE =
  "text-[15px] leading-7 text-foreground/90 " +
  "[&>h2]:text-xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-foreground " +
  "[&>p]:mb-4 " +
  "[&>ul]:my-4 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:mb-2 " +
  "[&_strong]:font-semibold [&_strong]:text-foreground " +
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2";

export default function ChiSiamoPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Chi siamo e come funziona",
          url: `${SITE_URL}/chi-siamo`,
          inLanguage: "it-IT",
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Chi siamo e come funziona</h1>

      <div className={PROSE}>
        <p>
          <strong>Se Avessi Investito</strong> è un progetto <strong>indipendente</strong> di
          educazione finanziaria. Non vendiamo prodotti, non gestiamo i tuoi soldi e non abbiamo
          nulla da collocarti. L&apos;unico obiettivo è aiutarti a <strong>ragionare</strong> con dati
          veri, invece che con gli aneddoti da bar o con le promesse dei guru.
        </p>

        <h2>La nostra missione</h2>
        <p>
          Tutti raccontano la storia fortunata: «se avessi investito in quel titolo, oggi sarei
          ricco». Quasi nessuno racconta il resto — i crolli dell&apos;80 o 90 per cento, i titoli
          che dopo vent&apos;anni non si sono ancora ripresi, gli anni passati in perdita. Questo
          sito serve a mostrare <strong>entrambi i lati</strong>: il sogno e il conto da pagare. Non
          per spaventarti né per spingerti a investire, ma per farti scegliere con gli occhi aperti.
        </p>

        <h2>Come funzionano le simulazioni</h2>
        <p>
          A differenza dei tanti calcolatori che proiettano un rendimento fisso inventato, noi
          usiamo i <strong>prezzi storici reali</strong> dei titoli. Nel dettaglio:
        </p>
        <ul>
          <li>
            <strong>Fonte dati:</strong> i prezzi provengono da Yahoo Finance, corretti per i
            frazionamenti azionari (split), così le serie storiche sono coerenti nel tempo.
          </li>
          <li>
            <strong>PAC e investimento unico:</strong> calcoliamo quante quote avresti comprato a
            ogni prezzo reale e quanto varrebbero oggi, giorno per giorno — con tutti i su e giù veri.
          </li>
          <li>
            <strong>Rendimento annualizzato:</strong> oltre al guadagno totale, mostriamo il
            rendimento annualizzato (XIRR/CAGR), l&apos;unica misura davvero confrontabile tra
            strategie diverse.
          </li>
          <li>
            <strong>Valore reale:</strong> puoi deflazionare i risultati per l&apos;inflazione (che
            imposti tu), perché mille euro tra vent&apos;anni non valgono mille euro di oggi.
          </li>
          <li>
            <strong>Dividendi:</strong> mostrati separatamente dalla rivalutazione del prezzo, al
            lordo della tassazione.
          </li>
        </ul>

        <h2>Cosa questo sito NON è</h2>
        <ul>
          <li>
            <strong>Non è consulenza finanziaria.</strong> Nulla di ciò che leggi è un consiglio
            personalizzato né un invito a comprare o vendere strumenti finanziari.
          </li>
          <li>
            <strong>Non è una promessa.</strong> I rendimenti passati non garantiscono in alcun modo
            quelli futuri. La finanza è rischio: i titoli possono perdere valore, fallire o essere
            delistati.
          </li>
          <li>
            <strong>Non è completo.</strong> Le simulazioni, salvo dove indicato, non includono
            commissioni e tasse; l&apos;inflazione è un&apos;assunzione, non un dato certo. Servono a
            capire ordini di grandezza e comportamenti, non a prevedere il tuo caso specifico.
          </li>
        </ul>

        <h2>Come ci manteniamo</h2>
        <p>
          Il sito è gratuito e si sostiene con la <strong>pubblicità</strong>. Non riceviamo
          commissioni da banche o broker e non abbiamo interesse a farti investire in qualcosa:
          questo ci permette di essere onesti anche quando i numeri dicono cose scomode.
        </p>

        <h2>Da dove partire</h2>
        <p>
          Prova il <Link href="/">simulatore</Link>, esplora <Link href="/simula">i titoli più
          cercati</Link>, guarda <Link href="/crolli">i grandi crolli</Link> della storia o leggi le{" "}
          <Link href="/guide">guide</Link>. E ricorda la domanda che dà il nome al sito: non solo
          «quanto avrei guadagnato?», ma «avrebbe avuto senso, per me, investire o spendere
          diversamente?».
        </p>
      </div>
    </main>
  );
}
