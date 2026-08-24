// Registro centrale delle guide. Ogni articolo ha una pagina statica in
// src/app/guide/<slug>/page.tsx; qui teniamo solo i metadati per l'indice,
// i link correlati e la SEO.

export interface ArticleMeta {
  slug: string;
  title: string;
  /** Titolo breve per liste/nav */
  shortTitle: string;
  /** Meta description (SEO) + sottotitolo */
  description: string;
  /** Estratto mostrato nelle card indice */
  excerpt: string;
  tag: string;
  /** Data ISO di pubblicazione */
  date: string;
  /** Minuti di lettura stimati */
  readingMinutes: number;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "se-avessi-investito-500-euro-al-mese",
    title: "«Se avessi investito 500€ al mese»: la domanda giusta e quella sbagliata",
    shortTitle: "Se avessi investito 500€ al mese",
    description:
      "Quanto avresti oggi con 500€ al mese? Dipende da quando, quanto e cosa. Come leggere davvero i numeri di un piano di accumulo, senza illusioni.",
    excerpt:
      "Tutti raccontano il caso fortunato. Ma la cifra finale di un PAC dipende da tre variabili che di solito nessuno ti dice. Vediamole con i numeri.",
    tag: "Simulazioni",
    date: "2026-08-24",
    readingMinutes: 6,
  },
  {
    slug: "pac-vs-investimento-unico",
    title: "PAC o investimento unico? Cosa dicono davvero i dati",
    shortTitle: "PAC o investimento unico?",
    description:
      "Piano di accumulo (DCA) contro versamento unico (lump sum): chi vince? La risposta storica sorprende, ma non è quella che pensi. Analisi neutra.",
    excerpt:
      "Statisticamente il versamento unico vince più spesso. Allora perché quasi tutti fanno un PAC — e perché spesso è comunque la scelta giusta?",
    tag: "Strategie",
    date: "2026-08-24",
    readingMinutes: 7,
  },
  {
    slug: "distorsione-temporale-investimenti",
    title: "Distorsione temporale: perché il tuo cervello sbaglia i conti sugli investimenti",
    shortTitle: "La distorsione temporale",
    description:
      "Recency bias, hindsight bias e l'illusione del «è sempre salito». I bias comportamentali che ti fanno vedere rendimenti che non esistono.",
    excerpt:
      "Lo stesso titolo, a 5 anni, poteva farti +180% o −40% a seconda di quando entravi. Il grafico che vedi oggi ti mente. Ecco perché.",
    tag: "Psicologia",
    date: "2026-08-24",
    readingMinutes: 6,
  },
  {
    slug: "come-riconoscere-un-fuffaguru",
    title: "Come riconoscere un fuffaguru della finanza in 7 segnali",
    shortTitle: "Riconoscere un fuffaguru",
    description:
      "Rendimenti garantiti, screenshot di profitti, corsi a 997€: la cassetta degli attrezzi per smascherare i finfluencer che promettono ricchezza sicura.",
    excerpt:
      "«Rendimento garantito», «segnali esclusivi», «solo per oggi». Sette bandiere rosse per distinguere l'educazione finanziaria dalla fuffa.",
    tag: "Difesa",
    date: "2026-08-24",
    readingMinutes: 5,
  },
  {
    slug: "quanto-serve-per-iniziare-a-investire",
    title: "Quanto serve per iniziare a investire? (spoiler: molto poco)",
    shortTitle: "Quanto serve per iniziare",
    description:
      "Non servono 10.000€: si parte da 50€ al mese. Ma il vero ingrediente non sono i soldi, è il tempo — ecco perché i risultati si vedono solo sul lungo periodo.",
    excerpt:
      "La barriera d'ingresso è un mito: bastano poche decine di euro. Il difficile non è la cifra, è la pazienza di aspettare che il tempo faccia il suo lavoro.",
    tag: "Per iniziare",
    date: "2026-08-24",
    readingMinutes: 6,
  },
  {
    slug: "interesse-composto",
    title: "L'interesse composto: la forza (onesta) del tempo",
    shortTitle: "L'interesse composto",
    description:
      "Interesse sull'interesse: come funziona davvero, la regola del 72, e perché nei mercati non è la 'crescita garantita' che ti vendono i guru.",
    excerpt:
      "L'avrebbero chiamato l'ottava meraviglia del mondo. È potente, ma non è magia né una promessa: ecco come funziona e dove finisce la favola.",
    tag: "Fondamentali",
    date: "2026-08-24",
    readingMinutes: 6,
  },
  {
    slug: "vivere-di-rendita-titoli-di-stato",
    title: "Quando un titolo di Stato ti paga la macchina: la rendita spiegata",
    shortTitle: "La rendita che paga la macchina",
    description:
      "Accumulato un capitale, la cedola di un titolo di Stato (tassata al 12,5%) può coprire la rata di un'auto lasciando intatto il capitale. Quando ha senso — e quando no.",
    excerpt:
      "Immagina che la rata dell'auto la paghi lo Stato, mentre i tuoi soldi restano tuoi. Si può fare — a certe condizioni. I numeri veri, senza favole.",
    tag: "Rendita",
    date: "2026-08-24",
    readingMinutes: 7,
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Restituisce gli altri articoli, per la sezione "Leggi anche". */
export function getRelated(slug: string, limit = 3): ArticleMeta[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
