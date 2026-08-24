import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("pac-vs-investimento-unico")!;

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
        Hai una somma da parte — un&apos;eredità, una liquidazione, dei risparmi accumulati. La
        domanda è vecchia come il mercato: <strong>la investo tutta subito o un po&apos; alla
        volta?</strong> Da un lato l&apos;investimento unico (<em>lump sum</em>), dall&apos;altro
        il piano di accumulo (<em>dollar cost averaging</em>, o DCA). La risposta dei dati è
        chiara. Il motivo per cui quasi tutti fanno il contrario lo è ancora di più.
      </p>

      <h2>Cosa dicono i numeri</h2>
      <p>
        Studi su decenni di dati di mercato — il più citato è quello di Vanguard — arrivano
        sempre alla stessa conclusione: <strong>investire tutto subito ha battuto il DCA in circa
        due terzi dei periodi storici</strong>. La ragione è semplice e poco romantica: i mercati
        azionari, in media, salgono più spesso di quanto scendano. Ogni euro che tieni fermo in
        attesa del «momento giusto» è un euro che, in media, sta perdendo il rendimento del
        periodo.
      </p>
      <p>
        Detta brutalmente: se il tuo unico obiettivo è massimizzare il rendimento atteso e i soldi
        li hai già tutti disponibili oggi, la matematica premia il lump sum.
      </p>

      <h2>Allora perché quasi nessuno lo fa?</h2>
      <p>
        Perché non siamo fogli di calcolo. «In media» nasconde l&apos;altro terzo dei casi: quelli
        in cui investi tutto lunedì e martedì il mercato crolla del 20%. Il rendimento atteso non
        ti aiuta a dormire la notte dopo aver visto un anno di stipendio evaporare in una settimana.
      </p>
      <blockquote>
        Il lump sum vince più spesso, ma quando perde fa più male. Il DCA rinuncia a un po&apos; di
        rendimento medio in cambio di molte meno notti insonni.
      </blockquote>
      <p>
        Il DCA è, prima di tutto, uno <strong>strumento psicologico</strong>. Spalmando gli ingressi
        riduci il <em>regret</em>, il rimpianto di aver scelto il giorno sbagliato. E riduci il
        rischio più concreto di tutti: quello di farti prendere dal panico e vendere tutto al primo
        crollo. Un piano leggermente meno redditizio che riesci a mantenere batte un piano ottimale
        che abbandoni.
      </p>

      <h2>Due situazioni diverse che vengono confuse</h2>
      <p>
        Attenzione a una distinzione che genera metà della confusione su questo tema:
      </p>
      <ul>
        <li>
          <strong>Hai già una somma disponibile.</strong> Qui il confronto lump sum contro DCA è
          reale: decidi se entrare subito o diluire. È il caso degli studi sopra.
        </li>
        <li>
          <strong>Investi lo stipendio mano a mano.</strong> Qui il PAC non è una scelta, è
          l&apos;unico modo possibile: i soldi arrivano un mese alla volta. Non stai «scegliendo il
          DCA», stai investendo ciò che hai quando ce l&apos;hai. Ed è perfettamente sensato.
        </li>
      </ul>

      <h2>Una via di mezzo ragionevole</h2>
      <p>
        Se hai una somma importante ma il pensiero di investirla tutta in un colpo ti paralizza,
        una soluzione pragmatica è diluire l&apos;ingresso su un orizzonte <strong>breve</strong> —
        qualche mese, non anni. Catturi buona parte del rendimento atteso del lump sum, ma ti
        proteggi dallo scenario peggiore del «tutto nel giorno sbagliato». Non è la scelta
        matematicamente ottima, è quella che ti fa restare nel piano. E restare nel piano è ciò che
        conta davvero.
      </p>

      <h2>Provalo sui dati veri</h2>
      <p>
        Le medie degli studi sono utili, ma vederlo sul <em>tuo</em> caso lo è di più. Nel{" "}
        <Link href="/">simulatore</Link> puoi eseguire una simulazione Lump Sum e una PAC sullo stesso
        titolo e nello stesso periodo, poi confrontarle nella scheda «Confronto». Scoprirai che la
        risposta cambia parecchio a seconda del titolo e degli anni che scegli — ed è esattamente il
        punto: non esiste un vincitore assoluto, esiste quello adatto alla tua situazione e al tuo
        stomaco.
      </p>
    </ArticleShell>
  );
}
