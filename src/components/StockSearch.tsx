"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useStockData } from "@/hooks/useStockData";
import { Search, X } from "lucide-react";

interface SearchResult {
  symbol: string;
  shortname: string;
  typeDisp: string;
  exchDisp: string;
}

interface Props {
  value: string;
  onChange: (ticker: string, shortName?: string) => void;
  placeholder?: string;
}

export function StockSearch({ value, onChange, placeholder = "Es. AAPL, BTC-USD, MSFT..." }: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const { search } = useStockData();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!query.trim() || query.length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }
    timerRef.current = setTimeout(async () => {
      const res = await search(query);
      setResults(res);
      setOpen(res.length > 0);
    }, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const typeColor: Record<string, string> = {
    Equity: "bg-blue-100 text-blue-700",
    ETF: "bg-purple-100 text-purple-700",
    Cryptocurrency: "bg-amber-100 text-amber-700",
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9 pr-8"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              if (results.length > 0) {
                onChange(results[0].symbol, results[0].shortname);
                setQuery(results[0].symbol);
              } else {
                onChange(query.trim().toUpperCase());
              }
              setOpen(false);
            }
          }}
        />
        {query && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setQuery("");
              onChange("");
              setResults([]);
              setOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full rounded-lg border bg-background shadow-lg overflow-hidden">
          {results.map((r) => (
            <button
              key={r.symbol}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted text-left transition-colors"
              onClick={() => {
                onChange(r.symbol, r.shortname);
                setQuery(r.symbol);
                setOpen(false);
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{r.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">{r.shortname}</div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {r.typeDisp && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${typeColor[r.typeDisp] ?? "bg-gray-100 text-gray-600"}`}>
                    {r.typeDisp}
                  </span>
                )}
                {r.exchDisp && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                    {r.exchDisp}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
