import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("come-riconoscere-un-fuffaguru")!;

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
        Auto sportiva, spiaggia, laptop aperto sul grafico che va alle stelle. «Ho cambiato vita col
        trading, e insegno a te come farlo.» Il <em>fuffaguru</em> — il finfluencer che vende sogni
        invece di competenze — vive di un&apos;unica materia prima: la tua voglia di credere che
        esista una scorciatoia. Ecco sette bandiere rosse per riconoscerlo prima di dargli i tuoi
        soldi.
      </p>

      <h2>1. Promette rendimenti «garantiti»</h2>
      <p>
        È il segnale più netto di tutti. Nei mercati <strong>non esiste alcun rendimento garantito</strong>
        sopra quello dei titoli di Stato più sicuri — e comunque mai a due cifre. Chiunque ti prometta
        «il 10% al mese», «rendite sicure» o «zero rischio, alto guadagno» ti sta mentendo, punto. Il
        rischio e il rendimento atteso sono legati: non puoi alzare uno senza alzare l&apos;altro.
      </p>

      <h2>2. Mostra screenshot di profitti</h2>
      <p>
        Le schermate di conti con numeri verdi enormi sono la valuta del fuffaguru. Sono anche{" "}
        <strong>banali da falsificare</strong> (bastano gli strumenti demo o un editor) e, quando pure
        fossero vere, non ti mostrano il conto accanto che ha perso tutto. È survivorship bias
        confezionato apposta: vedi il vincitore di un giorno, mai le cento perdite che lo circondano.
      </p>

      <h2>3. Il suo guadagno sei tu, non i mercati</h2>
      <p>
        Fatti una domanda semplice: se avesse davvero un metodo per fare soldi facili sui mercati,
        perché passerebbe le giornate a vendere corsi su Instagram? La risposta è quasi sempre che{" "}
        <strong>il suo vero business sei tu</strong>: il corso a 997€, l&apos;abbonamento ai «segnali»,
        le commissioni del broker che ti invita a usare tramite il suo link di affiliazione.
      </p>
      <blockquote>
        Quando il prodotto è gratis, il prodotto sei tu. Quando il prodotto costa 997€ e promette
        ricchezza, il prodotto sei ancora tu.
      </blockquote>

      <h2>4. Crea urgenza artificiale</h2>
      <p>
        «Solo per oggi», «ultimi 3 posti», «i prezzi raddoppiano a mezzanotte». L&apos;urgenza serve a
        spegnere il pensiero critico e a farti decidere di pancia. Un investimento serio non scade come
        una promozione del supermercato. Se ti mettono fretta, è precisamente il momento di rallentare.
      </p>

      <h2>5. Ostenta ricchezza, non competenza</h2>
      <p>
        Guarda cosa mostra. Se il contenuto è fatto di auto, orologi e viaggi, e quasi mai di concetti,
        rischio, costi o dubbi, hai la risposta. Chi capisce davvero di mercati parla di{" "}
        <strong>diversificazione, orizzonte temporale, incertezza</strong> — argomenti poco
        fotogenici. La ricchezza esibita è la scenografia; la competenza, quando c&apos;è, è noiosa.
      </p>

      <h2>6. Niente rischi, niente dubbi, niente «dipende»</h2>
      <p>
        Un divulgatore onesto riempie le frasi di «dipende», «storicamente», «non è garantito». Il
        fuffaguru parla solo per certezze assolute, perché il dubbio non vende. Paradossalmente,{" "}
        <strong>più qualcuno è sicuro di sé sui mercati, meno dovresti fidarti</strong>. L&apos;umiltà
        di fronte all&apos;incertezza è il marchio di chi ha capito come funzionano.
      </p>

      <h2>7. Non è registrato, non è vigilato</h2>
      <p>
        Dare consulenza finanziaria personalizzata in Italia richiede requisiti e vigilanza (Consob,
        Albo dei consulenti finanziari). Il fuffaguru gira intorno all&apos;ostacolo con la formula
        «non è consulenza, è intrattenimento / educazione» — salvo poi dirti esattamente cosa comprare.
        Verifica sempre chi hai davanti: se maneggia i tuoi soldi o ti dice cosa fare dei tuoi soldi,
        deve poterlo fare per legge.
      </p>

      <h2>La regola che le riassume tutte</h2>
      <p>
        Se una proposta fa leva sulla <strong>paura di restare indietro</strong> e sulla{" "}
        <strong>promessa di una scorciatoia</strong>, tratta l&apos;autore come un venditore, non come
        un maestro. L&apos;educazione finanziaria vera è quasi sempre l&apos;opposto dello spettacolo:
        lenta, prudente, piena di «dipende», e onesta sul fatto che nessuno può garantirti nulla.
      </p>
      <p>
        Il modo migliore per immunizzarti è smettere di fidarti degli aneddoti e cominciare a guardare
        i numeri da solo. Il nostro <Link href="/">simulatore</Link> serve proprio a questo: nessuno che ti
        racconta quanto avresti guadagnato, solo i dati storici veri con cui verificarlo con le tue
        mani.
      </p>
    </ArticleShell>
  );
}
