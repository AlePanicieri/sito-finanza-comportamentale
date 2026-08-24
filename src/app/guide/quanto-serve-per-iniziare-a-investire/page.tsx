import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/site/ArticleShell";
import { getArticle } from "@/lib/articles";

const meta = getArticle("quanto-serve-per-iniziare-a-investire")!;

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
        «Investire è roba da ricchi.» È forse la convinzione più diffusa — e più sbagliata.
        L&apos;idea che serva un gruzzolo importante per cominciare tiene lontane dai mercati
        proprio le persone a cui il tempo gioverebbe di più. La verità è banale: per
        <strong> iniziare</strong> bastano poche decine di euro. Il difficile non è la cifra.
      </p>

      <h2>Il minimo reale: 25-50 euro</h2>
      <p>
        Oggi la maggior parte dei broker e delle piattaforme di piano di accumulo (PAC)
        permette di versare da <strong>25-50 euro al mese</strong>, spesso a zero commissioni
        sull&apos;acquisto. Merito degli <em>ETF frazionabili</em>: non devi comprare
        un&apos;intera quota da centinaia di euro, ne compri una frazione. Con 50 euro possiedi
        un pezzetto di un indice che contiene centinaia o migliaia di aziende in tutto il mondo.
      </p>
      <p>
        Quindi no, non ti serve un capitale. Ti serve iniziare. Ma attenzione: «poco» ha una
        conseguenza che nessuno ti dice, ed è la parte più importante di questo articolo.
      </p>

      <h2>La verità scomoda: con poco, all&apos;inizio non succede niente</h2>
      <p>
        Se versi 50 euro al mese, dopo un anno hai investito 600 euro. Anche con un ottimo
        +10%, il tuo «guadagno» è 60 euro. Sessanta euro. Dopo dodici mesi di disciplina.
        È qui che il 90% delle persone si scoraggia e molla, convinto che «non ne valga la pena».
      </p>
      <blockquote>
        Investire poco funziona, ma i risultati non si vedono in mesi: si vedono in anni.
        Chi non lo sa, abbandona proprio quando dovrebbe restare.
      </blockquote>
      <p>
        Il motore che rende l&apos;investimento sensato non è l&apos;importo, è il{" "}
        <strong>tempo</strong>. E il tempo lavora lentamente all&apos;inizio, poi accelera.
      </p>

      <h2>Perché i risultati si vedono solo sul lungo periodo</h2>
      <p>
        La crescita di un investimento non è una linea retta: è una curva che parte quasi
        piatta e poi si impenna. Il motivo è l&apos;<Link href="/guide/interesse-composto">interesse
        composto</Link>: i guadagni, restando investiti, generano a loro volta altri guadagni.
        Ma perché questo effetto valanga diventi visibile, serve una palla di neve già
        abbastanza grande — e ci vogliono anni per costruirla.
      </p>
      <p>
        Un esempio concreto. 200 euro al mese, con un rendimento medio ipotetico del 6% annuo:
      </p>
      <ul>
        <li>Dopo <strong>5 anni</strong>: hai versato 12.000€, ne hai circa 14.000. Carino, niente di che.</li>
        <li>Dopo <strong>10 anni</strong>: versati 24.000€, ne hai circa 33.000. Ora si vede.</li>
        <li>Dopo <strong>20 anni</strong>: versati 48.000€, ne hai circa 92.000. Quasi il doppio di quanto hai messo.</li>
        <li>Dopo <strong>30 anni</strong>: versati 72.000€, ne hai circa 200.000.</li>
      </ul>
      <p>
        Guarda i numeri: nei primi 5 anni il «guadagno» è modesto. È tra il ventesimo e il
        trentesimo anno che succede la magia — non perché il rendimento cambi, ma perché il
        capitale su cui lavora è ormai grande. <strong>Chi inizia presto e resta, vince sul
        tempo, non sull&apos;importo.</strong> Attenzione però: quel 6% è un&apos;ipotesi, non una
        garanzia — nei mercati reali ci sono anni negativi, e i risultati veri li vedi solo
        restando investito attraverso le tempeste.
      </p>

      <h2>Allora quanto versare?</h2>
      <p>
        La risposta giusta non è «il massimo possibile», è <strong>una cifra che puoi
        mantenere per anni senza accorgertene troppo</strong>. Meglio 50 euro al mese per
        vent&apos;anni che 500 euro per sei mesi prima di arrenderti. La costanza batte
        l&apos;intensità, perché è il tempo — non lo sforzo di un momento — a fare il lavoro.
      </p>
      <p>Una regola di buon senso, in ordine di priorità:</p>
      <ol>
        <li>Prima costruisci un <strong>fondo di emergenza</strong> (3-6 mesi di spese) su un conto liquido. Questo non si investe.</li>
        <li>Poi destina all&apos;investimento una quota <strong>fissa e sostenibile</strong> di ciò che ti avanza ogni mese.</li>
        <li>Automatizzala (versamento ricorrente) così non devi «decidere» ogni mese: la decisione è la parte che si sbaglia.</li>
      </ol>

      <h2>I tre errori del principiante</h2>
      <ul>
        <li><strong>Aspettare «il momento giusto».</strong> Non esiste. Il momento giusto per far partire il tempo è sempre il più presto possibile.</li>
        <li><strong>Mettere troppo, troppo in fretta.</strong> Un versamento insostenibile ti fa mollare al primo imprevisto.</li>
        <li><strong>Guardare il conto ogni giorno.</strong> Sul breve è rumore che genera solo ansia (e vendite di panico). Il segnale arriva sugli anni.</li>
      </ul>

      <h2>Provalo con i numeri veri</h2>
      <p>
        Le cifre qui sopra usano un rendimento medio ipotetico. Il nostro{" "}
        <Link href="/">simulatore</Link> fa qualcosa di più onesto: prende i prezzi storici
        <em> reali</em> di un titolo e ti mostra come sarebbe andato davvero un PAC da 50, 100
        o 200 euro al mese — con tutti i su e giù veri, non una curva liscia. Scegli quanto
        versare e per quanti anni, e guarda con i tuoi occhi dove fa la differenza il tempo.
      </p>
    </ArticleShell>
  );
}
