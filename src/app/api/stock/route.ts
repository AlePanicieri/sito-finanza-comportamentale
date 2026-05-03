import { NextRequest, NextResponse } from "next/server";
// yahoo-finance2 v3 exports a class that must be instantiated
import YahooFinanceClass from "yahoo-finance2";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const yahooFinance = new (YahooFinanceClass as any)();

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
      const results: any = await yahooFinance.search(ticker, { newsCount: 0 });
      const allQuotes: Array<Record<string, string>> = results?.quotes ?? [];
      // Suffissi di listinggi secondari da mettere in fondo (stessa società, borsa minore)
      const SECONDARY_SUFFIXES = new Set([".VI", ".F", ".BE", ".MU", ".SG", ".HM", ".DU", ".TI", ".SW", ".DE"]);

      const quotes = allQuotes
        .filter((q) => {
          const t = (q.typeDisp ?? "").toLowerCase();
          const sym = (q.symbol ?? "").toUpperCase();
          if (sym.endsWith(".XD") || sym.endsWith(".EX")) return false;
          return t === "equity" || t === "etf" || t === "cryptocurrency" || t === "mutualfund" || t === "stock";
        })
        .slice(0, 16)
        .map((q) => ({
          symbol: q.symbol ?? "",
          shortname: q.shortname ?? q.longname ?? "",
          typeDisp: q.typeDisp ?? "",
          exchDisp: q.exchDisp ?? "",
        }))
        .sort((a, b) => {
          const suffix = (s: string) => s.includes(".") ? "." + s.split(".").pop()!.toUpperCase() : "";
          const aSecondary = SECONDARY_SUFFIXES.has(suffix(a.symbol)) ? 1 : 0;
          const bSecondary = SECONDARY_SUFFIXES.has(suffix(b.symbol)) ? 1 : 0;
          return aSecondary - bSecondary;
        })
        .slice(0, 8);
      return NextResponse.json({ quotes });
    }

    if (!from) {
      return NextResponse.json({ error: "Data di inizio mancante" }, { status: 400 });
    }

    const period1 = new Date(from);
    const period2 = to ? new Date(to) : new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const historical: any = await yahooFinance.chart(
      ticker,
      { period1, period2, interval: "1d", events: "div" },
      { fetchOptions: {} }
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
