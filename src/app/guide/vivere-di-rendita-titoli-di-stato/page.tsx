import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("vivere-di-rendita-titoli-di-stato")!;

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
        Immagina questa scena: cambi l&apos;auto, la paghi a rate, e ogni mese la rata la copre
        una cedola che ti arriva da un titolo di Stato. Alla fine hai la macchina nuova, e il
        tuo capitale è ancora lì, intatto. Sembra un trucco. Non lo è — è una possibilità
        concreta, a certe condizioni. Ma proprio perché non è un trucco, va capita fino in
        fondo, numeri alla mano. Perché <strong>può</strong> avere senso. E può anche non averlo.
      </p>

      <h2>Il punto di partenza: prima il capitale</h2>
      <p>
        Mettiamo subito le cose in chiaro: questo non è un modo per «fare soldi dal nulla».
        È il <strong>premio</strong> che arriva <em>dopo</em> anni di disciplina. Prima devi
        accumulare un capitale — ed è esattamente ciò di cui parlano le altre guide:{" "}
        <Link href="/guide/quanto-serve-per-iniziare-a-investire">iniziare presto anche con poco</Link>{" "}
        e lasciare che l&apos;<Link href="/guide/interesse-composto">interesse composto</Link> faccia
        il suo lavoro. La rendita è il capitolo finale di quella storia, non il primo.
      </p>

      <h2>Come funziona un titolo di Stato</h2>
      <p>
        Un titolo di Stato (in Italia il più noto è il <strong>BTP</strong>) è un prestito che
        fai allo Stato. In cambio ricevi:
      </p>
      <ul>
        <li>una <strong>cedola</strong> periodica (l&apos;interesse), a un tasso noto in anticipo;</li>
        <li>la <strong>restituzione del capitale</strong> alla scadenza, al valore nominale.</li>
      </ul>
      <p>
        Se lo tieni fino a scadenza, sai in partenza quanto incassi. Per questo è considerato
        tra gli strumenti <strong>più sicuri</strong> — non «senza rischio» (un emittente può
        sempre, in teoria, avere problemi), ma di rischio basso rispetto alle azioni.
      </p>

      <h2>Il vantaggio fiscale che pochi conoscono</h2>
      <p>
        Ecco il dettaglio che rende i titoli di Stato interessanti per una rendita. In Italia i
        guadagni finanziari si tassano al <strong>26%</strong>… ma i titoli di Stato italiani
        (e di alcuni Paesi in «white list») godono di un&apos;aliquota agevolata del{" "}
        <strong>12,5%</strong>. Meno della metà. A parità di rendimento lordo, in tasca ti resta
        molto di più rispetto a un&apos;azione o a un ETF.
      </p>
      <p>
        Va aggiunta l&apos;<strong>imposta di bollo</strong> dello 0,2% annuo sul valore del
        deposito titoli. Piccola, ma per onestà mettiamola nel conto.
      </p>

      <h2>I numeri, senza favole</h2>
      <p>
        Facciamo un esempio con un capitale di <strong>100.000 euro</strong> e un titolo di
        Stato che rende il <strong>3,5% lordo</strong> l&apos;anno (un livello plausibile in
        certi periodi — non sempre disponibile):
      </p>
      <ul>
        <li>Cedola lorda: 100.000 × 3,5% = <strong>3.500€</strong>/anno</li>
        <li>Meno tasse (12,5%): −437€</li>
        <li>Meno imposta di bollo (0,2%): −200€</li>
        <li>= circa <strong>2.860€ netti</strong>/anno, cioè <strong>~240€ al mese</strong></li>
      </ul>
      <p>
        Ora guarda una rata d&apos;auto: un&apos;utilitaria da 15.000€ finanziata a tasso zero su
        60 mesi fa 250€/mese. La cedola netta del tuo titolo (~240€) copre quasi per intero
        quella rata. <strong>Risultato: guidi un&apos;auto nuova, le rate le paga lo Stato con la
        cedola, e i tuoi 100.000€ restano tuoi</strong> — pronti a tornare liquidi alla scadenza.
      </p>

      <h2>Quando ha senso — e quando è una trappola</h2>
      <p>
        Qui arriva la parte che i post da «vivi di rendita» saltano sempre. Che tu ci guadagni o
        no dipende da <strong>una sola cosa</strong>: il costo del finanziamento rispetto alla
        rendita netta del titolo.
      </p>
      <blockquote>
        Se il finanziamento costa <em>meno</em> di quanto rende il titolo, vinci. Se costa di
        più, stai semplicemente pagando per tenere fermi i tuoi soldi.
      </blockquote>
      <h3>Ha senso quando…</h3>
      <ul>
        <li>Il finanziamento è a <strong>tasso zero o molto basso</strong> (le promo dei concessionari esistono davvero). Lì la cedola copre la rata e il capitale continua a lavorare per te: è un vantaggio reale.</li>
        <li>Vuoi <strong>mantenere la liquidità</strong> e la flessibilità del capitale invece di svuotare il conto in un colpo.</li>
      </ul>
      <h3>È una trappola quando…</h3>
      <ul>
        <li>Il finanziamento costa <strong>più della rendita</strong> (es. prestito all&apos;8% contro un titolo al 3,5%). In quel caso pagare l&apos;auto in contanti ti costa meno: la «rendita che paga la rata» è un&apos;illusione contabile che ti fa perdere lo spread.</li>
        <li>Ti racconti che è «gratis». Non lo è mai: o sfrutti un finanziamento agevolato, o stai rinunciando a qualcosa.</li>
      </ul>

      <h2>Il senso profondo (ed è il messaggio di questo sito)</h2>
      <p>
        Al di là dei conti sull&apos;auto, c&apos;è una lezione più grande. Arrivare al punto in cui
        una <strong>rendita</strong> copre spese importanti della tua vita è ciò che trasforma il
        denaro da problema a strumento. Ma quel punto non si raggiunge con una scommessa fortunata
        né con un corso da 997€: si raggiunge <strong>risparmiando con costanza per anni</strong> e
        lasciando lavorare il tempo. La rendita è la ricompensa della pazienza, non una scorciatoia.
      </p>
      <p>
        Ed è anche il motivo per cui questo sito non ti dice «investi». Ti dice: <em>rifletti</em>.
        Perché la vera libertà non è comprare l&apos;auto oggi con i soldi che non hai, ma arrivare
        al giorno in cui potresti comprarla con la sola rendita — e magari scegliere di non farlo.
      </p>

      <p className="text-xs text-muted-foreground">
        Nota: i rendimenti dei titoli di Stato variano nel tempo e non sono garantiti nel loro
        valore reale (l&apos;inflazione può eroderli). Il capitale è restituito a scadenza salvo
        rischio emittente. Questo non è un consiglio d&apos;investimento.
      </p>
    </ArticleShell>
  );
}
