export interface PricePoint {
  date: string;
  close: number;
}

export interface DividendPoint {
  date: string;
  amount: number;
}

export interface LumpSumResult {
  portfolioHistory: { date: string; value: number; valueReal: number }[];
  finalValue: number;
  finalValueReal: number;
  totalInvested: number;
  returnPct: number;
  returnRealPct: number;
  worstSessionPct: number;
  worstSession: number;
  periodsInNegative: number;
  totalPeriods: number;
  totalDividends: number;
  totalDividendsPct: number;
  dividendsByYear: { year: number; perShare: number; income: number }[];
}

export interface DCAResult {
  portfolioHistory: { date: string; value: number; totalInvested: number }[];
  finalValue: number;
  finalValueReal: number;
  totalInvested: number;
  returnPct: number;
  returnRealPct: number;
  installments: number;
}

export interface WindowPerformance {
  label: string;
  startDate: string;
  endDate: string;
  startPrice: number;
  endPrice: number;
  returnPct: number;
  available: boolean;
}

/** Deflaziona un valore nominale con inflazione al 2%/anno */
export function adjustForInflation(nominalValue: number, years: number): number {
  return nominalValue / Math.pow(1.02, years);
}

/** Calcola il numero di anni tra due date */
export function yearsBetween(from: Date, to: Date): number {
  return (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

/** Trova il punto prezzo più vicino a una data target */
export function findClosestPrice(
  prices: PricePoint[],
  targetDate: Date
): PricePoint | null {
  if (!prices.length) return null;
  const ts = targetDate.getTime();
  let best = prices[0];
  let bestDiff = Math.abs(new Date(best.date).getTime() - ts);
  for (const p of prices) {
    const diff = Math.abs(new Date(p.date).getTime() - ts);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = p;
    }
  }
  return best;
}

/** 
 * Calcola simulazione Lump Sum.
 * Acquisto unico al prezzo della data di partenza, valore del portafoglio ogni giorno.
 */
export function calcLumpSum(
  prices: PricePoint[],
  investedAmount: number,
  startDate: Date,
  dividends: DividendPoint[] = []
): LumpSumResult {
  const today = new Date();

  const startPoint = findClosestPrice(prices, startDate);
  if (!startPoint) {
    return {
      portfolioHistory: [],
      finalValue: 0,
      finalValueReal: 0,
      totalInvested: investedAmount,
      returnPct: 0,
      returnRealPct: 0,
      worstSessionPct: 0,
      worstSession: 0,
      periodsInNegative: 0,
      totalPeriods: 0,
      totalDividends: 0,
      totalDividendsPct: 0,
      dividendsByYear: [],
    };
  }

  const buyPrice = startPoint.close;
  const shares = investedAmount / buyPrice;

  // Filtra i prezzi dalla data di acquisto in poi
  const startTs = new Date(startPoint.date).getTime();
  const relevantPrices = prices.filter(
    (p) => new Date(p.date).getTime() >= startTs
  );

  let worstSessionPct = 0;
  let worstSession = 0;
  let periodsInNegative = 0;

  const portfolioHistory: { date: string; value: number; valueReal: number }[] = [];

  for (let i = 0; i < relevantPrices.length; i++) {
    const p = relevantPrices[i];
    const value = shares * p.close;
    const years = yearsBetween(new Date(startPoint.date), new Date(p.date));
    const valueReal = adjustForInflation(value, years);

    // Peggior sessione giornaliera
    if (i > 0) {
      const prevClose = relevantPrices[i - 1].close;
      const dailyPct = ((p.close - prevClose) / prevClose) * 100;
      const dailyAbs = (p.close - prevClose) * shares;
      if (dailyPct < worstSessionPct) {
        worstSessionPct = dailyPct;
        worstSession = dailyAbs;
      }
    }

    // Sotto il capitale investito
    if (value < investedAmount) periodsInNegative++;

    portfolioHistory.push({ date: p.date, value: Math.round(value * 100) / 100, valueReal: Math.round(valueReal * 100) / 100 });
  }

  const lastPoint = portfolioHistory[portfolioHistory.length - 1];
  const finalValue = lastPoint?.value ?? investedAmount;
  const years = yearsBetween(new Date(startPoint.date), today);
  const finalValueReal = adjustForInflation(finalValue, years);

  const returnPct = ((finalValue - investedAmount) / investedAmount) * 100;
  const returnRealPct = ((finalValueReal - investedAmount) / investedAmount) * 100;

  // Dividendi: filtra quelli dopo la data di acquisto, raggruppa per anno
  const byYear = new Map<number, number>();
  for (const d of dividends) {
    if (new Date(d.date).getTime() < startTs) continue;
    const year = new Date(d.date).getFullYear();
    byYear.set(year, (byYear.get(year) ?? 0) + d.amount);
  }
  const dividendsByYear = Array.from(byYear.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, perShare]) => ({
      year,
      perShare: Math.round(perShare * 10000) / 10000,
      income: Math.round(perShare * shares * 100) / 100,
    }));
  const totalDividends = Math.round(dividendsByYear.reduce((s, r) => s + r.income, 0) * 100) / 100;
  const totalDividendsPct = Math.round((totalDividends / investedAmount) * 10000) / 100;

  return {
    portfolioHistory,
    finalValue: Math.round(finalValue * 100) / 100,
    finalValueReal: Math.round(finalValueReal * 100) / 100,
    totalInvested: investedAmount,
    returnPct: Math.round(returnPct * 100) / 100,
    returnRealPct: Math.round(returnRealPct * 100) / 100,
    worstSessionPct: Math.round(worstSessionPct * 100) / 100,
    worstSession: Math.round(worstSession * 100) / 100,
    periodsInNegative,
    totalPeriods: portfolioHistory.length,
    totalDividends,
    totalDividendsPct,
    dividendsByYear,
  };
}

/**
 * Calcola simulazione DCA (Dollar Cost Averaging).
 * Acquisto mensile di importo fisso al giorno del mese specificato.
 */
export function calcDCA(
  prices: PricePoint[],
  monthlyAmount: number,
  startDate: Date,
  dayOfMonth: number
): DCAResult {
  if (!prices.length) {
    return {
      portfolioHistory: [],
      finalValue: 0,
      finalValueReal: 0,
      totalInvested: 0,
      returnPct: 0,
      returnRealPct: 0,
      installments: 0,
    };
  }

  // Genera tutte le date di acquisto mensile dalla startDate ad oggi
  const today = new Date();
  const purchaseDates: Date[] = [];
  const cursor = new Date(startDate);

  // Allinea al giorno del mese
  cursor.setDate(Math.min(dayOfMonth, 28));

  while (cursor <= today) {
    purchaseDates.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  // Calcola acquisti effettivi
  let totalShares = 0;
  let totalInvested = 0;
  const purchases: { date: string; shares: number; price: number }[] = [];

  for (const pd of purchaseDates) {
    const point = findClosestPrice(prices, pd);
    if (!point) continue;
    const pointDate = new Date(point.date);
    // Non acquistare nel futuro o prima dei dati disponibili
    if (pointDate > today) continue;
    const shares = monthlyAmount / point.close;
    totalShares += shares;
    totalInvested += monthlyAmount;
    purchases.push({ date: point.date, shares, price: point.close });
  }

  if (!purchases.length) {
    return {
      portfolioHistory: [],
      finalValue: 0,
      finalValueReal: 0,
      totalInvested: 0,
      returnPct: 0,
      returnRealPct: 0,
      installments: 0,
    };
  }

  // Costruisce storia del portafoglio giorno per giorno
  const firstPurchaseDate = new Date(purchases[0].date);
  const startTs = firstPurchaseDate.getTime();
  const relevantPrices = prices.filter(
    (p) => new Date(p.date).getTime() >= startTs
  );

  // Mappa acquisti per data
  const purchaseMap = new Map<string, number>();
  let cumulativeShares = 0;
  for (const p of purchases) {
    purchaseMap.set(p.date, (purchaseMap.get(p.date) ?? 0) + p.shares);
  }

  let sharesHeld = 0;
  let investedSoFar = 0;
  const portfolioHistory: { date: string; value: number; totalInvested: number }[] = [];

  for (const p of relevantPrices) {
    if (purchaseMap.has(p.date)) {
      const newShares = purchaseMap.get(p.date)!;
      sharesHeld += newShares;
      investedSoFar += monthlyAmount;
      cumulativeShares = sharesHeld;
    }
    if (sharesHeld > 0) {
      portfolioHistory.push({
        date: p.date,
        value: Math.round(sharesHeld * p.close * 100) / 100,
        totalInvested: Math.round(investedSoFar * 100) / 100,
      });
    }
  }

  const finalValue = portfolioHistory[portfolioHistory.length - 1]?.value ?? 0;
  const years = yearsBetween(firstPurchaseDate, today);
  const finalValueReal = adjustForInflation(finalValue, years);

  const returnPct = totalInvested > 0 ? ((finalValue - totalInvested) / totalInvested) * 100 : 0;
  const returnRealPct = totalInvested > 0 ? ((finalValueReal - totalInvested) / totalInvested) * 100 : 0;

  return {
    portfolioHistory,
    finalValue: Math.round(finalValue * 100) / 100,
    finalValueReal: Math.round(finalValueReal * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    returnPct: Math.round(returnPct * 100) / 100,
    returnRealPct: Math.round(returnRealPct * 100) / 100,
    installments: purchases.length,
  };
}

/**
 * Calcola le finestre temporali mobili per la distorsione temporale.
 * Dato un orizzonte N (in anni o mesi), mostra la performance dello stesso
 * periodo in punti successivi del passato.
 */
export function calcRollingWindows(
  prices: PricePoint[],
  horizonDays: number,
  windowCount: number = 6
): WindowPerformance[] {
  const today = new Date();
  const windows: WindowPerformance[] = [];

  if (!prices.length) return [];

  const firstAvailable = new Date(prices[0].date);
  const lastAvailable = new Date(prices[prices.length - 1].date);

  // Tolleranza massima: 10% dell'orizzonte o 60 giorni, il maggiore
  const toleranceMs = Math.max(horizonDays * 0.1, 60) * 24 * 60 * 60 * 1000;

  for (let i = 0; i < windowCount; i++) {
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - i * horizonDays);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - horizonDays);

    const label = i === 0
      ? `Ultimi ${formatHorizonLabel(horizonDays)}`
      : `${formatDateLabel(endDate)} (${formatHorizonLabel(horizonDays)} prec.)`;

    // Se la finestra richiesta è fuori dal range dei dati disponibili → non disponibile
    const startOutOfRange = startDate.getTime() < firstAvailable.getTime() - toleranceMs;
    const endOutOfRange = endDate.getTime() > lastAvailable.getTime() + toleranceMs;

    if (startOutOfRange || endOutOfRange) {
      windows.push({
        label,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        startPrice: 0,
        endPrice: 0,
        returnPct: 0,
        available: false,
      });
      continue;
    }

    const endPoint = findClosestPrice(prices, endDate);
    const startPoint = findClosestPrice(prices, startDate);

    if (!endPoint || !startPoint) {
      windows.push({
        label,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        startPrice: 0,
        endPrice: 0,
        returnPct: 0,
        available: false,
      });
      continue;
    }

    // Verifica ulteriore: i prezzi trovati devono essere ragionevolmente vicini alle date richieste
    const startDrift = Math.abs(new Date(startPoint.date).getTime() - startDate.getTime());
    const endDrift = Math.abs(new Date(endPoint.date).getTime() - endDate.getTime());

    if (startDrift > toleranceMs || endDrift > toleranceMs) {
      windows.push({
        label,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        startPrice: 0,
        endPrice: 0,
        returnPct: 0,
        available: false,
      });
      continue;
    }

    const returnPct =
      ((endPoint.close - startPoint.close) / startPoint.close) * 100;

    windows.push({
      label,
      startDate: startPoint.date,
      endDate: endPoint.date,
      startPrice: Math.round(startPoint.close * 100) / 100,
      endPrice: Math.round(endPoint.close * 100) / 100,
      returnPct: Math.round(returnPct * 100) / 100,
      available: true,
    });
  }

  return windows;
}

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("it-IT", { month: "short", year: "numeric" });
}

function formatHorizonLabel(days: number): string {
  if (days >= 365 * 4) return `${Math.round(days / 365)} anni`;
  if (days >= 365) return `${Math.round(days / 365)} anno`;
  if (days >= 30) return `${Math.round(days / 30)} mesi`;
  return `${days} giorni`;
}

export const HORIZON_OPTIONS = [
  { label: "3 mesi", days: 90 },
  { label: "6 mesi", days: 180 },
  { label: "1 anno", days: 365 },
  { label: "2 anni", days: 730 },
  { label: "5 anni", days: 1825 },
  { label: "10 anni", days: 3650 },
] as const;
