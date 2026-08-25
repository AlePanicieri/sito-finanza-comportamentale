// Catalogo curato di titoli/asset più cercati. Genera pagine statiche dedicate
// (/simula/<ticker>) indicizzabili dai motori di ricerca e da ChatGPT Search,
// ognuna che intercetta una ricerca specifica ("se avessi investito in NVIDIA")
// e richiama il simulatore pre-caricato su quel titolo.

export interface Asset {
  ticker: string;
  name: string;
  category: "Azioni USA" | "Indici & ETF" | "Crypto" | "Azioni Italia";
  /** Frase unica per l'intro della pagina (evita contenuto duplicato) */
  blurb: string;
}

export const ASSETS: Asset[] = [
  {
    ticker: "AAPL",
    name: "Apple",
    category: "Azioni USA",
    blurb:
      "Il titolo più famoso al mondo, spesso citato come «l'investimento che avrei dovuto fare». Ma quanto avrei ottenuto davvero dipende tutto da quando fossi entrato.",
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    category: "Azioni USA",
    blurb:
      "Dopo anni piatti, Microsoft è tornata tra i titoli più capitalizzati al mondo. Un caso perfetto per vedere come il momento d'ingresso cambia tutto.",
  },
  {
    ticker: "NVDA",
    name: "Nvidia",
    category: "Azioni USA",
    blurb:
      "Il simbolo del boom dell'intelligenza artificiale, con una corsa che ha reso ricchi alcuni e lasciato a bocca asciutta chi è entrato tardi. L'esempio estremo del rischio.",
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    category: "Azioni USA",
    blurb:
      "Da libreria online a gigante globale: Amazon è la storia di crescita per eccellenza, ma anche di cali brutali lungo il percorso che hanno messo alla prova i nervi.",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet (Google)",
    category: "Azioni USA",
    blurb:
      "La società dietro Google e YouTube. Un colosso del digitale che permette di ragionare su cosa significhi investire in un'azienda ormai matura.",
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    category: "Azioni USA",
    blurb:
      "Il titolo più volatile e discusso degli ultimi anni: capace di moltiplicarsi e di dimezzarsi in pochi mesi. Un test di stomaco più che di portafoglio.",
  },
  {
    ticker: "SPY",
    name: "S&P 500",
    category: "Indici & ETF",
    blurb:
      "L'indice delle 500 maggiori aziende USA: la scelta più diffusa per chi vuole «il mercato» invece di scommettere su un singolo titolo. Diversificazione in un colpo solo.",
  },
  {
    ticker: "QQQ",
    name: "Nasdaq 100",
    category: "Indici & ETF",
    blurb:
      "L'indice tecnologico americano: più concentrato e più volatile dell'S&P 500, ha regalato rendimenti alti a chi ha retto le fasi di forte discesa.",
  },
  {
    ticker: "BTC-USD",
    name: "Bitcoin",
    category: "Crypto",
    blurb:
      "L'asset che più di ogni altro alimenta il sogno del «se solo avessi investito». Rendimenti stratosferici e crolli dell'80%: l'incarnazione del rischio estremo.",
  },
  {
    ticker: "ETH-USD",
    name: "Ethereum",
    category: "Crypto",
    blurb:
      "La seconda criptovaluta per dimensione. Come Bitcoin, mostra fino a che punto un asset può salire — e quanto può fare male quando scende.",
  },
  {
    ticker: "ENI.MI",
    name: "Eni",
    category: "Azioni Italia",
    blurb:
      "Uno dei pilastri della Borsa di Milano, noto per i dividendi generosi. Utile per capire il ruolo delle cedole oltre alla semplice rivalutazione del prezzo.",
  },
  {
    ticker: "ISP.MI",
    name: "Intesa Sanpaolo",
    category: "Azioni Italia",
    blurb:
      "La principale banca italiana, altro classico da dividendo di Piazza Affari. Un caso concreto per ragionare su titoli italiani invece dei soliti nomi americani.",
  },
];

export function getAsset(ticker: string): Asset | undefined {
  const t = ticker.toUpperCase();
  return ASSETS.find((a) => a.ticker.toUpperCase() === t);
}

export function getRelatedAssets(ticker: string, limit = 4): Asset[] {
  const current = getAsset(ticker);
  const others = ASSETS.filter((a) => a.ticker !== ticker);
  // Prima quelli della stessa categoria, poi gli altri
  const sorted = others.sort((a, b) => {
    const aSame = current && a.category === current.category ? 0 : 1;
    const bSame = current && b.category === current.category ? 0 : 1;
    return aSame - bSame;
  });
  return sorted.slice(0, limit);
}
