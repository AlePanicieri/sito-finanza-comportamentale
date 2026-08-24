import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("se-avessi-investito-500-euro-al-mese")!;

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
        È la frase che senti a ogni cena tra amici. Uno racconta del cugino che «ha messo
        via 500 euro al mese» e adesso ha un capitale invidiabile. Un altro giura che
        avrebbe potuto fare lo stesso, se solo avesse iniziato. La cifra finale, in questi
        racconti, è sempre tonda, grossa e sicura.
      </p>
      <p>
        La realtà è più interessante — e più utile. La domanda «quanto avrei oggi?» ha una
        risposta, ma dipende da <strong>tre variabili</strong> che di solito nessuno nomina.
        Capirle è la differenza tra prendere una decisione informata e inseguire un aneddoto.
      </p>

      <h2>La verità scomoda: spesso il PAC funziona</h2>
      <p>
        Partiamo da un punto onesto, perché qui non vendiamo paura. Un piano di accumulo (in
        inglese <em>dollar cost averaging</em>) su un indice azionario globale diversificato,
        mantenuto per vent&apos;anni o più, <strong>storicamente è cresciuto nella grande
        maggioranza dei periodi</strong>. Versare una cifra fissa ogni mese ti fa comprare di
        più quando i prezzi scendono e di meno quando salgono, e ti toglie dalla testa la
        domanda impossibile «è il momento giusto per entrare?».
      </p>
      <p>
        Quindi no, l&apos;investimento non è «una truffa». Il problema non è il PAC: è la{" "}
        <strong>certezza</strong> con cui viene raccontato. La cifra che ti promettono è quasi
        sempre il caso più fortunato, spacciato per regola.
      </p>

      <h2>Variabile 1 — Quando hai iniziato</h2>
      <p>
        Lo stesso versamento, iniziato in due anni diversi, produce risultati lontanissimi. Chi
        ha cominciato un PAC a inizio 2009, subito dopo il crollo, ha comprato per anni a prezzi
        bassi e ha cavalcato una delle più lunghe fasi di crescita della storia. Chi ha iniziato
        a fine 2021, poco prima di una correzione, ha passato i primi anni in rosso.
      </p>
      <p>
        Sul lungo termine le due traiettorie tendono ad avvicinarsi, ma il punto di partenza
        conta enormemente per i primi cinque-dieci anni — proprio quelli in cui è più facile
        spaventarsi e mollare.
      </p>

      <h2>Variabile 2 — Cosa hai comprato</h2>
      <p>
        «Ho investito» non vuol dire niente finché non dici <em>in cosa</em>. 500€ al mese in un
        indice mondiale, in una singola azione tecnologica, in Bitcoin o in un&apos;azienda che
        poi è fallita danno esiti che non hanno nulla in comune. Gli aneddoti da cena scelgono
        sempre, a posteriori, il vincitore. Nessuno ti racconta del PAC su un titolo che ha
        perso il 70% e non si è più ripreso.
      </p>
      <blockquote>
        Scegliere il vincitore <em>dopo</em> che ha vinto si chiama hindsight bias. È comodo,
        gratuito e completamente inutile per decidere oggi.
      </blockquote>

      <h2>Variabile 3 — Cosa succede in mezzo</h2>
      <p>
        Il grafico finale è liscio. Il percorso no. Un PAC ventennale attraversa quasi sempre
        almeno un paio di cali del 30-50%. La cifra tonda che ti raccontano dà per scontato che
        tu sia rimasto investito <strong>senza vendere nel momento peggiore</strong>. Ma è
        proprio lì che la maggior parte delle persone abbandona, trasformando una perdita
        temporanea sullo schermo in una perdita reale e definitiva.
      </p>
      <p>
        Il rendimento che conta non è quello del mercato: è quello che il tuo comportamento ti
        lascia effettivamente tenere.
      </p>

      <h2>E le tasse, i costi, l&apos;inflazione?</h2>
      <p>
        Un ultimo strato che gli aneddoti dimenticano sempre. In Italia sul guadagno paghi il{" "}
        <strong>26% di imposta</strong> (12,5% su alcuni titoli di Stato), c&apos;è un&apos;imposta
        di bollo dello 0,2% annuo sul capitale, e ci sono i costi dello strumento (il TER di un
        ETF). Soprattutto, i «100.000 euro» tra vent&apos;anni non varranno come 100.000 euro
        oggi: l&apos;inflazione erode il potere d&apos;acquisto. Il numero lordo è sempre più
        grande di quello che ti resta davvero in tasca.
      </p>

      <h2>Come usare il simulatore invece di fidarti dell&apos;aneddoto</h2>
      <p>
        Il nostro <Link href="/">simulatore</Link> non ti dà la cifra tonda dei racconti da cena. Fa
        una cosa più onesta: prende i <strong>prezzi storici reali</strong> di un titolo e ti
        mostra come sarebbe andato <em>quel</em> versamento, in <em>quel</em> periodo, con tutti
        i su e giù veri. Poi la scheda «Distorsione Temporale» ti fa vedere quanto sarebbe stato
        diverso lo stesso investimento cominciando in un anno differente.
      </p>
      <p>
        Non è per spingerti a investire, né per spaventarti. È per farti vedere il ventaglio dei
        risultati possibili — quello che l&apos;aneddoto nasconde — così la decisione la prendi
        tu, con i numeri davanti.
      </p>
    </ArticleShell>
  );
}
