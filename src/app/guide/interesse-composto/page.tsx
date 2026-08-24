import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("interesse-composto")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `/guide/${meta.slug}` },
  openGraph: { title: meta.title, description: meta.description, type: "article" },
};

export default function Page() {
  return (
    <ArticleShell meta={meta}>
      <p>
        Viene attribuita a Einstein una frase che probabilmente non ha mai detto: «L&apos;interesse
        composto è l&apos;ottava meraviglia del mondo. Chi lo capisce, lo guadagna; chi non lo
        capisce, lo paga». Apocrifa o no, coglie qualcosa di vero. L&apos;interesse composto è il
        meccanismo che sta sotto quasi ogni ragionamento sensato su risparmio e investimento.
        Ma è anche uno dei più fraintesi — e uno dei più abusati dai venditori di sogni.
      </p>

      <h2>Cos&apos;è, in una frase</h2>
      <p>
        L&apos;interesse <strong>semplice</strong> lavora solo sul capitale iniziale.
        L&apos;interesse <strong>composto</strong> lavora anche sugli interessi già maturati:
        i guadagni generano altri guadagni. È «interesse sull&apos;interesse».
      </p>
      <p>
        Esempio con 1.000 euro al 10% annuo:
      </p>
      <ul>
        <li>Anno 1: 1.000 + 100 = <strong>1.100</strong></li>
        <li>Anno 2: 1.100 + 110 (il 10% ora è su 1.100, non su 1.000) = <strong>1.210</strong></li>
        <li>Anno 3: 1.210 + 121 = <strong>1.331</strong></li>
      </ul>
      <p>
        Quei pochi euro in più ogni anno sembrano nulla. Ma proiettati su decenni diventano la
        parte più grande del risultato. È una crescita <em>esponenziale</em>, non lineare:
        parte lenta e poi accelera.
      </p>

      <h2>La regola del 72 (matematica da bar)</h2>
      <p>
        Un trucco per stimare a mente in quanti anni un capitale raddoppia: dividi{" "}
        <strong>72 per il tasso di rendimento</strong>.
      </p>
      <ul>
        <li>Al 6% annuo → 72 ÷ 6 = <strong>12 anni</strong> per raddoppiare.</li>
        <li>Al 3% annuo → 72 ÷ 3 = <strong>24 anni</strong>.</li>
        <li>All&apos;8% annuo → 72 ÷ 8 = <strong>9 anni</strong>.</li>
      </ul>
      <p>
        Serve a farti sentire nelle ossa una cosa: piccole differenze di rendimento, su tempi
        lunghi, cambiano tutto. E lo stesso vale, in negativo, per i costi e l&apos;inflazione.
      </p>

      <h2>Il tempo conta più dei soldi</h2>
      <p>
        Ecco la lezione che i numeri insegnano meglio di qualsiasi predica. Due persone, stesso
        rendimento ipotetico del 7%:
      </p>
      <ul>
        <li><strong>Anna</strong> investe 200€/mese da 25 a 35 anni (10 anni), poi <em>smette</em> e lascia stare fino a 65.</li>
        <li><strong>Marco</strong> non fa nulla fino a 35, poi investe 200€/mese da 35 a 65 (30 anni).</li>
      </ul>
      <p>
        Marco versa il triplo dei soldi di Anna. Eppure, a 65 anni, spesso si ritrova con <em>meno</em>
        di lei — perché ai soldi di Anna hai dato vent&apos;anni in più di composto. Il fattore
        decisivo non è quanto metti, è <strong>da quanto tempo lavora</strong>.
      </p>

      <h2>Dove finisce la favola (la parte onesta)</h2>
      <p>
        Qui la maggior parte degli articoli si ferma, lasciandoti con l&apos;idea che basti
        «lasciar fare al composto» per diventare ricco. È una mezza verità, e le mezze verità
        in finanza sono pericolose. Tre precisazioni doverose:
      </p>
      <h3>1. Nei mercati il tasso non è fisso né garantito</h3>
      <p>
        Gli esempi con «il 7% ogni anno» sono utili per capire il meccanismo, ma <strong>ingannevoli</strong>
        se presi alla lettera. Un conto deposito ti dà un tasso certo; un investimento azionario
        no: fa +25% un anno, −18% un altro. La «media» del 7% emerge solo sul lungo periodo, e
        <em> attraversando</em> crolli che mettono alla prova i nervi. Chiunque ti prometta un
        rendimento composto <strong>garantito</strong> a due cifre ti sta{" "}
        <Link href="/guide/come-riconoscere-un-fuffaguru">vendendo fumo</Link>.
      </p>
      <h3>2. Il composto lavora anche contro di te</h3>
      <p>
        L&apos;inflazione è interesse composto al contrario: erode il potere d&apos;acquisto anno
        dopo anno. Anche i costi lo sono — una commissione annua dell&apos;1% non «costa l&apos;1%»,
        su trent&apos;anni ti mangia una fetta enorme del risultato finale. Lo stesso meccanismo
        che ti arricchisce, se ignorato, ti impoverisce.
      </p>
      <h3>3. Serve una cosa che i numeri non mostrano: restare</h3>
      <p>
        La curva esponenziale premia solo chi non interrompe il processo. Vendere nel panico
        durante un crollo spezza il composto proprio mentre sta per ingranare. Il rendimento
        del mercato e il rendimento dell&apos;<em>investitore</em> spesso divergono, ed è tutta
        questione di comportamento.
      </p>

      <h2>Vedilo all&apos;opera sui dati veri</h2>
      <p>
        Il modo migliore per capire l&apos;interesse composto è smettere di guardarlo in teoria.
        Nel nostro <Link href="/">simulatore</Link> puoi vedere come un versamento costante si
        sarebbe trasformato sui prezzi storici <em>reali</em> di un titolo: la curva piatta dei
        primi anni, l&apos;accelerazione successiva, e anche i crolli che il grafico liscio
        degli esempi non ti mostra mai. La teoria è elegante; i dati veri sono istruttivi.
      </p>
    </ArticleShell>
  );
}
