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
