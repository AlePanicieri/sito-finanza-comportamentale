import { NextRequest, NextResponse } from "next/server";
import { findItalianStock } from "@/lib/italianStocks";
// yahoo-finance2 v3 exports a class that must be instantiated
import YahooFinanceClass from "yahoo-finance2";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const yahooFinance = new (YahooFinanceClass as any)();

// Yahoo cambia spesso lo schema delle risposte: quando i dati non combaciano,
// la libreria lancia FailedYahooValidationError. I dati grezzi sono però validi
// e disponibili in err.result: li recuperiamo invece di far fallire la richiesta.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function tolerant<T = any>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = err as any;
    if (e?.name === "FailedYahooValidationError" && e?.result !== undefined) {
      return e.result as T;
    }
    throw err;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const action = searchParams.get("action") ?? "history";

  if (!ticker) {
    return NextResponse.json({ error: "Ticker mancante" }, { status: 400 });
  }

  try {
    if (action === "search") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results: any = await tolerant(() => yahooFinance.search(ticker, { newsCount: 0 }));
      const allQuotes: Array<Record<string, string>> = results?.quotes ?? [];
      // Suffisso della Borsa Italiana (Milano): sito rivolto a un pubblico italiano,
      // quindi va sempre in cima.
      const ITALIAN_SUFFIX = ".MI";
      // Suffissi di listini secondari da mettere in fondo (stessa società, borsa minore)
      const SECONDARY_SUFFIXES = new Set([".VI", ".F", ".BE", ".MU", ".SG", ".HM", ".DU", ".TI", ".SW", ".DE"]);
      const suffixOf = (s: string) =>
        s.includes(".") ? "." + s.split(".").pop()!.toUpperCase() : "";

      const mapped = allQuotes
        .filter((q) => {
          const t = (q.typeDisp ?? "").toLowerCase();
          const sym = (q.symbol ?? "").toUpperCase();
          if (!sym) return false;
          if (sym.endsWith(".XD") || sym.endsWith(".EX")) return false;
          return t === "equity" || t === "etf" || t === "cryptocurrency" || t === "mutualfund" || t === "stock";
        })
        .map((q) => ({
          symbol: q.symbol ?? "",
          shortname: q.shortname ?? q.longname ?? "",
          typeDisp: q.typeDisp ?? "",
          exchDisp: q.exchDisp ?? "",
        }));

      // Ordinamento per priorità: Milano prima, poi listini principali,
      // poi US/altri, infine i listini secondari esteri. sort() è stabile,
      // quindi a parità di rango si conserva l'ordine di rilevanza di Yahoo.
      const rank = (sym: string) => {
        const suf = suffixOf(sym);
        if (suf === ITALIAN_SUFFIX) return 0;
        if (suf === "") return 1; // listino principale (es. AAPL, STLA)
        if (SECONDARY_SUFFIXES.has(suf)) return 3;
        return 2;
      };
      mapped.sort((a, b) => rank(a.symbol) - rank(b.symbol));

      const q = ticker.trim().toUpperCase();
      const hasMISymbol = () =>
        mapped.some((r) => r.symbol.toUpperCase().endsWith(ITALIAN_SUFFIX));

      // 1. Titoli italiani noti (FTSE MIB): Yahoo spesso non restituisce il
      //    listino di Milano per nomi/abbreviazioni (es. "unicredit", "bper").
      //    Li inseriamo in cima senza chiamate extra (mappa verificata).
      const known = findItalianStock(ticker);
      if (known && !mapped.some((r) => r.symbol.toUpperCase() === known.symbol)) {
        mapped.unshift({
          symbol: known.symbol,
          shortname: known.name,
          typeDisp: "Equity",
          exchDisp: "Milano",
        });
      }

      // 2. Fallback generico per titoli italiani non in mappa (es. dove
      //    nome = ticker, "ENEL" → ENEL.MI). Sondiamo <QUERY>.MI con quote(),
      //    solo se non c'è già un listino .MI e nessun risultato corrisponde
      //    esattamente alla query (per non sprecare chiamate sui titoli USA).
      const hasExactBase = mapped.some((r) => r.symbol.toUpperCase().split(".")[0] === q);
      if (!hasMISymbol() && !hasExactBase && /^[A-Z0-9]{2,10}$/.test(q)) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const probe: any = await tolerant(() => yahooFinance.quote(`${q}.MI`));
          if (probe?.symbol) {
            mapped.unshift({
              symbol: probe.symbol,
              shortname: probe.shortName ?? probe.longName ?? "",
              typeDisp: probe.quoteType === "ETF" ? "ETF" : "Equity",
              exchDisp: probe.fullExchangeName ?? "Milan",
            });
          }
        } catch {
          // Nessun listino italiano corrispondente: ignoriamo.
        }
      }

      return NextResponse.json({ quotes: mapped.slice(0, 8) });
    }

    if (!from) {
      return NextResponse.json({ error: "Data di inizio mancante" }, { status: 400 });
    }

    const period1 = new Date(from);
    const period2 = to ? new Date(to) : new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const historical: any = await tolerant(() =>
      yahooFinance.chart(
        ticker,
        { period1, period2, interval: "1d", events: "div" },
        { fetchOptions: {} }
      )
    );

    const rawQuotes: Array<{
      date: Date | string;
      close: number | null;
      open: number | null;
      high: number | null;
      low: number | null;
      volume: number | null;
    }> = historical?.quotes ?? historical?.indicators?.quote?.[0] ?? [];

    const quotes = rawQuotes
      .filter((q) => q.close !== null && q.close !== undefined)
      .map((q) => ({
        date: q.date instanceof Date ? q.date.toISOString().split("T")[0] : String(q.date).split("T")[0],
        close: q.close as number,
        open: q.open as number | null,
        high: q.high as number | null,
        low: q.low as number | null,
        volume: q.volume as number | null,
      }));

    const meta = {
      symbol: historical?.meta?.symbol ?? ticker,
      currency: historical?.meta?.currency ?? "USD",
      shortName: historical?.meta?.shortName ?? historical?.meta?.longName ?? ticker,
    };

    const rawDividends: Array<{ date: Date | string; amount: number }> =
      historical?.events?.dividends ?? [];
    const dividends = rawDividends.map((d) => ({
      date: d.date instanceof Date ? d.date.toISOString().split("T")[0] : String(d.date).split("T")[0],
      amount: d.amount,
    }));

    return NextResponse.json({ quotes, meta, dividends });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: `Impossibile recuperare dati: ${message}` }, { status: 500 });
  }
}
