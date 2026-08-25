// Catalogo curato dei "grandi crolli": crisi storiche che mostrano il lato duro
// dell'investire — titoli crollati dell'80-99%, alcuni mai più tornati al picco.
// Ogni scenario rilancia il simulatore pre-caricato sul titolo con le DATE FISSE
// del crollo (Lump Sum + PAC), importi modificabili, per far vivere la discesa e
// il risultato sul lungo periodo.

export interface Scenario {
  slug: string;
  title: string;
  /** Etichetta del gruppo di crisi */
  crisis: string;
  ticker: string;
  name: string;
  /** Data d'ingresso fissa (ISO) — bloccata nel simulatore */
  startDate: string;
  /** Scheda da mostrare per prima */
  defaultTab: "lumpsum" | "dca";
  /** Importi preimpostati (modificabili dall'utente) */
  lumpSumAmount?: number;
  dcaMonthly?: number;
  /** Frase breve per la card nell'indice */
  hook: string;
  /** Paragrafi "cosa successe" */
  what: string[];
  /** La lezione da portare a casa */
  lesson: string;
}

export const SCENARIOS: Scenario[] = [
  {
    slug: "cisco-dot-com",
    title: "Cisco: il picco del 2000 mai più rivisto",
    crisis: "Bolla dot-com (2000)",
    ticker: "CSCO",
    name: "Cisco Systems",
    startDate: "2000-03-27",
    defaultTab: "lumpsum",
    lumpSumAmount: 10000,
    hook: "Nel marzo 2000 era l'azienda più preziosa al mondo. Chi comprò allora, oltre vent'anni dopo, è ancora sotto.",
    what: [
      "Alla fine di marzo 2000 Cisco Systems era la società con la maggiore capitalizzazione del pianeta: costruiva le fondamenta di Internet e sembrava un investimento senza rischio. Il titolo aveva superato gli 80 dollari.",
      "Quando la bolla dot-com scoppiò, Cisco crollò di circa l'85% nei due anni successivi. Non era un'azienda fallita: continuò a fatturare miliardi, a essere profittevole, a esistere ancora oggi.",
      "Eppure il prezzo di quel picco non è mai più stato rivisto. A oltre due decenni di distanza, chi comprò nel marzo 2000 non ha ancora recuperato il capitale investito — nonostante Cisco sia rimasta una grande azienda.",
    ],
    lesson:
      "«Grande azienda» non significa «buon investimento a qualsiasi prezzo». Ciò che paghi conta quanto ciò che compri: pagare troppo, anche il titolo giusto, può tenerti sott'acqua per una vita.",
  },
  {
    slug: "amazon-dot-com",
    title: "Amazon e la bolla dot-com: il vincitore che crollò del 90%",
    crisis: "Bolla dot-com (2000)",
    ticker: "AMZN",
    name: "Amazon",
    startDate: "2000-01-01",
    defaultTab: "lumpsum",
    lumpSumAmount: 10000,
    hook: "Oggi è un colosso. Ma chi entrò nel 2000 vide il proprio investimento perdere circa il 90% prima di rivedere la luce.",
    what: [
      "Amazon è l'esempio preferito di chi dice «avrei dovuto investirci». Ed è vero: sul lunghissimo periodo è stata una delle storie di crescita più straordinarie di sempre.",
      "Ma la strada è stata un massacro. Chi comprò a inizio 2000, in piena euforia dot-com, vide il titolo perdere circa il 90% entro il 2001. Diecimila euro diventarono, sulla carta, circa mille.",
      "Ci vollero anni solo per tornare in pari, e la fede di restare investiti attraverso un crollo che sembrava definitivo. Chi vendette nel panico — la maggioranza — trasformò la perdita sullo schermo in una perdita reale.",
    ],
    lesson:
      "Anche i più grandi vincitori hanno attraversato cali brutali. Il rendimento che conta non è quello del titolo, ma quello che il tuo stomaco ti permette di tenere restando investito.",
  },
  {
    slug: "nasdaq-2000",
    title: "Il Nasdaq che ci mise 15 anni a tornare in pari",
    crisis: "Bolla dot-com (2000)",
    ticker: "QQQ",
    name: "Nasdaq 100",
    startDate: "2000-03-10",
    defaultTab: "lumpsum",
    lumpSumAmount: 10000,
    hook: "Non un singolo titolo, ma un intero indice tecnologico: crollò dell'80% e servirono circa 15 anni per recuperare.",
    what: [
      "«Compra un indice, così sei diversificato e stai tranquillo.» È un buon consiglio, ma non è una polizza contro il dolore. Il Nasdaq 100 lo dimostra.",
      "Dal picco del marzo 2000, l'indice tecnologico americano perse circa l'80% nei due anni e mezzo successivi. Non un titolo isolato: cento tra le maggiori aziende tech del mondo, tutte insieme.",
      "Chi entrò sul massimo del 2000 dovette aspettare circa quindici anni — fino al 2015 — per rivedere il valore iniziale. Un'intera fase della vita passata a tornare al punto di partenza.",
    ],
    lesson:
      "La diversificazione riduce il rischio di azzerarti, non quello di soffrire. L'orizzonte temporale conta enormemente: «lungo periodo» a volte significa quindici anni, non cinque.",
  },
  {
    slug: "unicredit-lehman",
    title: "Unicredit prima di Lehman: la blue chip che bruciò il capitale",
    crisis: "Crisi finanziaria (2008)",
    ticker: "UCG.MI",
    name: "UniCredit",
    startDate: "2007-05-01",
    defaultTab: "lumpsum",
    lumpSumAmount: 10000,
    hook: "Una delle banche più solide d'Europa, un titolo «da cassettista». Poi arrivò il 2008 — e il capitale non tornò più.",
    what: [
      "Prima della crisi del 2008, UniCredit era considerata una blue chip da tenere in cassetto senza pensieri: grande, storica, italiana. Molti risparmiatori la avevano in portafoglio proprio per «sicurezza».",
      "La crisi finanziaria travolse le banche di tutto il mondo. UniCredit crollò, e negli anni successivi le ripetute ricapitalizzazioni e i raggruppamenti azionari diluirono enormemente il valore per chi era entrato prima.",
      "Il risultato, aggiustato per le operazioni sul capitale, è impietoso: chi comprò nel 2007 ha visto quasi azzerarsi l'investimento e, a distanza di quasi vent'anni, è ancora largamente in perdita.",
    ],
    lesson:
      "«Blue chip» e «da cassettista» non sono sinonimi di «sicuro». Anche un colosso apparentemente solido può distruggere capitale — e le banche, per la loro leva, sono tra i casi più estremi.",
  },
  {
    slug: "sp500-pac-2008",
    title: "Un PAC sull'S&P 500 iniziato prima del 2008",
    crisis: "Crisi finanziaria (2008)",
    ticker: "SPY",
    name: "S&P 500",
    startDate: "2007-10-01",
    defaultTab: "dca",
    dcaMonthly: 500,
    hook: "«Con il PAC sull'indice non puoi sbagliare.» Chi iniziò nell'ottobre 2007 restò in perdita secca per anni.",
    what: [
      "Il piano di accumulo sull'S&P 500 è oggi il consiglio più diffuso: versa ogni mese, resta diversificato, dormi sereno. È una strategia sensata — ma «sensata» non vuol dire «indolore».",
      "Chi avviò un PAC nell'ottobre 2007, poco prima del picco, vide il mercato crollare di oltre il 50% nell'anno successivo. Ogni versamento comprava a prezzi in caduta, e per anni il valore del portafoglio restò sotto la somma versata.",
      "La buona notizia — ed è il rovescio della medaglia — è che proprio comprare durante il crollo abbassò il prezzo medio: chi ebbe la disciplina di continuare a versare, col tempo, fu ampiamente ripagato.",
    ],
    lesson:
      "Persino il PAC «sicuro» sull'indice richiede di sopportare anni in perdita. La differenza tra il disastro e il successo non è la strategia: è restare, versamento dopo versamento, quando tutto sembra andare a rotoli.",
  },
  {
    slug: "amd-rischio",
    title: "AMD: anni a perdere metà del capitale, poi il boom",
    crisis: "Rischio single-stock",
    ticker: "AMD",
    name: "AMD",
    startDate: "2013-01-02",
    defaultTab: "lumpsum",
    lumpSumAmount: 10000,
    hook: "Per anni un investimento su AMD valeva metà. Poi esplose di venti volte. Ma allora non potevi saperlo.",
    what: [
      "AMD è la storia che i fuffaguru raccontano al contrario. Chi comprò all'inizio del 2013 vide il titolo languire e scendere: diecimila euro valsero, per lunghi tratti, circa cinquemila. Anni interi a guardare il proprio investimento dimezzato.",
      "Poi, dal 2016-2017, la svolta: con il ritorno alla competitività e il boom dei chip, AMD si moltiplicò di oltre venti volte. Chi aveva retto fu ripagato in modo straordinario.",
      "Il punto è che, seduti nel 2014 con l'investimento a metà, nessuno poteva sapere se AMD sarebbe risorta o fallita come tante sue rivali. Il lieto fine sembra ovvio solo col senno di poi.",
    ],
    lesson:
      "Il rischio estremo è a doppio taglio: può moltiplicare o dimezzare, e per anni sembra solo la seconda. Per ogni AMD che è esplosa, ci sono decine di titoli simili che non si sono mai più ripresi — e non li ricorda nessuno.",
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}

/** Scenari che riguardano un dato ticker (per il cross-link da /simula). */
export function getScenariosByTicker(ticker: string): Scenario[] {
  const t = ticker.toUpperCase();
  return SCENARIOS.filter((s) => s.ticker.toUpperCase() === t);
}

/** Ordine dei gruppi di crisi nell'indice. */
export const CRISIS_ORDER = [
  "Bolla dot-com (2000)",
  "Crisi finanziaria (2008)",
  "Rischio single-stock",
];
