import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("distorsione-temporale-investimenti")!;

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
        Guardi il grafico di un titolo famoso. Una linea che parte in basso a sinistra e arriva in
        alto a destra. Il messaggio sembra ovvio: «è sempre salito, sarei stato uno sciocco a non
        comprarlo». Questa sensazione di ovvietà è un&apos;<strong>illusione</strong>, e ha un nome
        preciso in psicologia. Anzi, ne ha diversi.
      </p>

      <h2>Il grafico che vedi oggi ti mente</h2>
      <p>
        Ogni grafico storico è disegnato <em>all&apos;indietro</em>, partendo dal fatto che oggi
        quel titolo esiste ed è arrivato fin qui. Ma nel momento in cui avresti dovuto decidere,
        non sapevi come sarebbe finita. Lo stesso titolo, sullo stesso arco di 5 anni, poteva farti{" "}
        <strong>+180% o −40%</strong> a seconda di quando esattamente entravi e uscivi. La linea
        liscia e trionfale nasconde decine di sotto-periodi in cui avresti perso, sofferto, o
        venduto.
      </p>
      <p>
        Chiamiamo questa illusione <strong>distorsione temporale</strong>: la tendenza a proiettare
        sul passato la sicurezza che hai solo oggi, guardando il risultato finale. Il tuo cervello
        comprime la storia in un unico esito certo, e cancella tutti i bivi che sembravano
        spaventosi mentre li vivevi.
      </p>

      <h2>Tre bias che lavorano contro di te</h2>

      <h3>1. Hindsight bias (il senno di poi)</h3>
      <p>
        «Lo sapevo che sarebbe salito.» No, non lo sapevi. Dopo che un evento è accaduto, il cervello
        lo riscrive come se fosse stato prevedibile fin dall&apos;inizio. È il motivo per cui ogni
        crollo, a posteriori, sembra «annunciato» e ogni titolo vincente sembra «una scelta ovvia».
        Sul momento, ovvio non lo era per nessuno.
      </p>

      <h3>2. Recency bias (l&apos;ossessione per il recente)</h3>
      <p>
        Diamo un peso spropositato a ciò che è successo di recente. Dopo due anni di rialzi, ci
        convinciamo che salire sia lo stato naturale delle cose e ci buttiamo — spesso proprio in
        cima. Dopo un crollo, siamo certi che tutto continuerà a scendere e vendiamo — spesso proprio
        sul fondo. È il meccanismo che fa comprare caro e vendere a poco, con precisione quasi comica.
      </p>

      <h3>3. Survivorship bias (il cimitero invisibile)</h3>
      <p>
        Ammiriamo i titoli sopravvissuti e diventati giganti. Non vediamo il cimitero delle aziende
        che promettevano lo stesso e sono fallite, perché sono sparite dai grafici e dai discorsi.
        Giudicare gli investimenti solo dai vincitori è come giudicare la sicurezza della roulette
        intervistando solo chi ha vinto.
      </p>
      <blockquote>
        «È sempre salito» è vera solo per i titoli di cui parliamo oggi — e ne parliamo oggi proprio
        perché sono saliti. È un ragionamento circolare travestito da esperienza.
      </blockquote>

      <h2>Perché questo non significa «non investire»</h2>
      <p>
        Attenzione a non ribaltare l&apos;illusione al contrario. Riconoscere questi bias non porta
        alla conclusione «i mercati sono un imbroglio, stai alla larga». Porta a una conclusione più
        matura: <strong>l&apos;investimento va valutato per la sua distribuzione di esiti possibili,
        non per il singolo finale fortunato</strong> che ti viene mostrato. Un indice diversificato e
        di lungo periodo ha una distribuzione storicamente favorevole; una singola scommessa scelta
        col senno di poi non ha nessuna distribuzione — ha solo un aneddoto.
      </p>

      <h2>L&apos;antidoto pratico</h2>
      <p>
        Il modo migliore per neutralizzare la distorsione temporale è <strong>vedere i controfattuali</strong>:
        cosa sarebbe successo entrando in momenti diversi. È esattamente ciò che fa la scheda
        «Distorsione Temporale» del <Link href="/">simulatore</Link>. Prende lo stesso titolo e ti mostra
        il rendimento su finestre di tempo che partono da anni diversi, una accanto all&apos;altra.
      </p>
      <p>
        Quando vedi che lo stesso identico titolo, a seconda dell&apos;anno di partenza, va dal
        trionfo al disastro, la linea liscia perde il suo potere ipnotico. E cominci a fare la
        domanda giusta: non «quanto è salito?», ma «quanto ampio è il ventaglio di ciò che poteva
        succedermi?».
      </p>
      <p>
        Se vuoi toccare con mano il lato buio del ventaglio, dai un&apos;occhiata a{" "}
        <Link href="/crolli">I grandi crolli</Link>: casi reali — dot-com, Lehman, disastri
        single-stock — in cui entrare nel momento sbagliato significava anni, a volte decenni, sotto
        la pari.
      </p>
    </ArticleShell>
  );
}
