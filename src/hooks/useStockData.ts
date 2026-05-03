import { useState, useCallback } from "react";
import { PricePoint } from "@/lib/calculations";

interface StockMeta {
  symbol: string;
  currency: string;
  shortName: string;
}

interface FetchResult {
  quotes: PricePoint[];
  meta: StockMeta;
}

export function useStockData() {
  const [data, setData] = useState<FetchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (ticker: string, fromDate: Date, toDate?: Date) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        ticker,
        from: fromDate.toISOString().split("T")[0],
      });
      if (toDate) params.set("to", toDate.toISOString().split("T")[0]);

      const res = await window.fetch(`/api/stock?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Errore API");
      setData(json as FetchResult);
      return json as FetchResult;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Errore sconosciuto";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return [];
    try {
      const res = await window.fetch(`/api/stock?ticker=${encodeURIComponent(query)}&action=search`);
      const json = await res.json();
      return (json.quotes ?? []) as { symbol: string; shortname: string; typeDisp: string; exchDisp: string }[];
    } catch {
      return [];
    }
  }, []);

  return { data, loading, error, fetch, search };
}
