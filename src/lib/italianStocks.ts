// Mappa dei principali titoli italiani (FTSE MIB e affini) con ticker della
// Borsa Italiana (suffisso .MI). Serve perché la ricerca di Yahoo spesso NON
// restituisce il listino di Milano per nomi comuni o abbreviazioni
// (es. "unicredit", "bper"), privilegiando i listini esteri (Francoforte,
// OTC...). Tutti i ticker sono stati verificati con quote().

export interface ItalianStock {
  symbol: string;
  name: string;
}

// Chiavi = termini di ricerca normalizzati (minuscolo). Più alias possono
// puntare allo stesso titolo.
export const ITALIAN_STOCKS: Record<string, ItalianStock> = {
  unicredit: { symbol: "UCG.MI", name: "UniCredit" },
  unicredito: { symbol: "UCG.MI", name: "UniCredit" },
  ucg: { symbol: "UCG.MI", name: "UniCredit" },
  intesa: { symbol: "ISP.MI", name: "Intesa Sanpaolo" },
  "intesa sanpaolo": { symbol: "ISP.MI", name: "Intesa Sanpaolo" },
  intesasanpaolo: { symbol: "ISP.MI", name: "Intesa Sanpaolo" },
  isp: { symbol: "ISP.MI", name: "Intesa Sanpaolo" },
  bper: { symbol: "BPE.MI", name: "BPER Banca" },
  "bper banca": { symbol: "BPE.MI", name: "BPER Banca" },
  "banco bpm": { symbol: "BAMI.MI", name: "Banco BPM" },
  bancobpm: { symbol: "BAMI.MI", name: "Banco BPM" },
  bami: { symbol: "BAMI.MI", name: "Banco BPM" },
  mediolanum: { symbol: "BMED.MI", name: "Banca Mediolanum" },
  "banca mediolanum": { symbol: "BMED.MI", name: "Banca Mediolanum" },
  "banca generali": { symbol: "BGN.MI", name: "Banca Generali" },
  fineco: { symbol: "FBK.MI", name: "FinecoBank" },
  finecobank: { symbol: "FBK.MI", name: "FinecoBank" },
  mediobanca: { symbol: "MB.MI", name: "Mediobanca" },
  unipol: { symbol: "UNI.MI", name: "Unipol" },
  enel: { symbol: "ENEL.MI", name: "Enel" },
  eni: { symbol: "ENI.MI", name: "Eni" },
  generali: { symbol: "G.MI", name: "Assicurazioni Generali" },
  "assicurazioni generali": { symbol: "G.MI", name: "Assicurazioni Generali" },
  ferrari: { symbol: "RACE.MI", name: "Ferrari" },
  stellantis: { symbol: "STLAM.MI", name: "Stellantis" },
  moncler: { symbol: "MONC.MI", name: "Moncler" },
  poste: { symbol: "PST.MI", name: "Poste Italiane" },
  "poste italiane": { symbol: "PST.MI", name: "Poste Italiane" },
  leonardo: { symbol: "LDO.MI", name: "Leonardo" },
  telecom: { symbol: "TIT.MI", name: "Telecom Italia (TIM)" },
  "telecom italia": { symbol: "TIT.MI", name: "Telecom Italia (TIM)" },
  tim: { symbol: "TIT.MI", name: "Telecom Italia (TIM)" },
  pirelli: { symbol: "PIRC.MI", name: "Pirelli & C" },
  prysmian: { symbol: "PRY.MI", name: "Prysmian" },
  snam: { symbol: "SRG.MI", name: "Snam" },
  terna: { symbol: "TRN.MI", name: "Terna" },
  a2a: { symbol: "A2A.MI", name: "A2A" },
  campari: { symbol: "CPR.MI", name: "Davide Campari" },
  diasorin: { symbol: "DIA.MI", name: "DiaSorin" },
  hera: { symbol: "HER.MI", name: "Hera" },
  italgas: { symbol: "IG.MI", name: "Italgas" },
  inwit: { symbol: "INW.MI", name: "Inwit" },
  nexi: { symbol: "NEXI.MI", name: "Nexi" },
  recordati: { symbol: "REC.MI", name: "Recordati" },
  saipem: { symbol: "SPM.MI", name: "Saipem" },
  tenaris: { symbol: "TEN.MI", name: "Tenaris" },
  amplifon: { symbol: "AMP.MI", name: "Amplifon" },
  interpump: { symbol: "IP.MI", name: "Interpump Group" },
  erg: { symbol: "ERG.MI", name: "ERG" },
};

/** Cerca un titolo italiano per termine (match esatto o per prefisso univoco). */
export function findItalianStock(query: string): ItalianStock | undefined {
  const q = query.trim().toLowerCase().replace(/\s+/g, " ");
  if (!q) return undefined;

  // 1. Match esatto sull'alias.
  if (ITALIAN_STOCKS[q]) return ITALIAN_STOCKS[q];

  // 2. Match per prefisso, ma solo se punta a un unico titolo (evita ambiguità
  //    tipo "banca ..." che matcha più voci).
  if (q.length >= 3) {
    const hits = new Set<string>();
    let match: ItalianStock | undefined;
    for (const [alias, stock] of Object.entries(ITALIAN_STOCKS)) {
      if (alias.startsWith(q)) {
        hits.add(stock.symbol);
        match = stock;
      }
    }
    if (hits.size === 1) return match;
  }

  return undefined;
}
