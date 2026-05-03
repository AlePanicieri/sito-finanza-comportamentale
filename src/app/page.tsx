"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StockSearch } from "@/components/StockSearch";
import { TemporalDistortion } from "@/components/TemporalDistortion";
import { LumpSumSimulator } from "@/components/LumpSumSimulator";
import { DCASimulator } from "@/components/DCASimulator";
import { ComparisonPanel } from "@/components/ComparisonPanel";
import { useStockData } from "@/hooks/useStockData";
import { LumpSumResult, DCAResult, PricePoint } from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatters";
import {
  Brain,
  TrendingUp,
  BarChart2,
  GitCompare,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

const TABS = [
  { id: "distortion", label: "Distorsione Temporale", icon: Brain },
  { id: "lumpsum", label: "Lump Sum", icon: TrendingUp },
  { id: "dca", label: "PAC Mensile", icon: BarChart2 },
  { id: "compare", label: "Confronto", icon: GitCompare },
] as const;

type TabId = (typeof TABS)[number]["id"];

// Quanti anni di dati storici recuperare per avere abbastanza per la sezione Distorsione
const HISTORY_YEARS = 35;

export default function HomePage() {
  const [ticker, setTicker] = useState("");
  const [stockName, setStockName] = useState("");
  const [prices, setPrices] = useState<PricePoint[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [activeTab, setActiveTab] = useState<TabId>("distortion");
  const [hasLoaded, setHasLoaded] = useState(false);

  // Risultati simulazioni (per il pannello confronto)
  const [lsResult, setLsResult] = useState<LumpSumResult | null>(null);
  const [lsAmount, setLsAmount] = useState(10000);
  const [dcaResult, setDcaResult] = useState<DCAResult | null>(null);
  const [dcaMonthly, setDcaMonthly] = useState(500);

  const { loading, error, fetch: fetchStock } = useStockData();

  const loadStock = useCallback(
    async (sym: string, name?: string) => {
      if (!sym.trim()) return;
      const from = new Date();
      from.setFullYear(from.getFullYear() - HISTORY_YEARS);
      const result = await fetchStock(sym, from);
      if (result) {
        setPrices(result.quotes);
        setCurrency(result.meta.currency ?? "USD");
        setStockName(name ?? result.meta.shortName ?? sym);
        setHasLoaded(true);
        // Reset simulazioni
        setLsResult(null);
        setDcaResult(null);
      }
    },
    [fetchStock]
  );

  const handleTickerChange = (sym: string, name?: string) => {
    setTicker(sym);
    if (name) setStockName(name);
  };

  const handleSearch = () => {
    if (ticker.trim()) loadStock(ticker.trim().toUpperCase(), stockName);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">Finanza Comportamentale</div>
              <div className="text-[11px] text-muted-foreground leading-tight">Simulatore & Distorsione Temporale</div>
            </div>
          </div>
          <div className="flex-1 flex gap-2 max-w-lg">
            <StockSearch
              value={ticker}
              onChange={handleTickerChange}
              placeholder="Cerca ticker: AAPL, BTC-USD, MSFT..."
            />
            <button
              onClick={handleSearch}
              disabled={!ticker.trim() || loading}
              className="shrink-0 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Analizza</span>
            </button>
          </div>
          {hasLoaded && (
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="text-xs">
                {ticker.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground truncate max-w-32">{stockName}</span>
              <span className="text-xs text-muted-foreground">{currency}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stato iniziale */}
        {!hasLoaded && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
                <Brain className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Finanza Comportamentale</h1>
              <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
                Scopri quanto influisce la distorsione temporale sulle tue decisioni di investimento.
                Cerca un titolo per iniziare l&apos;analisi.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
              {[
                {
                  icon: Brain,
                  title: "Distorsione Temporale",
                  desc: "Vedi come il titolo performava nel passato, non solo oggi",
                },
                {
                  icon: TrendingUp,
                  title: "Simulazione Lump Sum",
                  desc: "Investimento unico: come avrei oscillato giornalmente?",
                },
                {
                  icon: BarChart2,
                  title: "PAC Mensile",
                  desc: "Versamento ricorrente: quale giorno del mese scegliere?",
                },
                {
                  icon: GitCompare,
                  title: "Confronto Strategie",
                  desc: "Lump Sum vs DCA: chi avrebbe vinto nel tuo caso?",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="border rounded-xl p-4 text-left hover:border-primary/40 transition-colors"
                >
                  <Icon className="h-5 w-5 text-primary mb-2" />
                  <div className="font-semibold text-sm mb-1">{title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>

            {/* Suggerimenti ticker */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">Prova con:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["AAPL", "MSFT", "BTC-USD", "SPY", "AMZN", "NVDA", "QQQ", "ENI.MI"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTicker(t);
                      loadStock(t);
                    }}
                    className="px-3 py-1 rounded-full border text-xs hover:bg-muted transition-colors font-mono"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-sm">Recupero {HISTORY_YEARS} anni di dati per {ticker.toUpperCase()}...</div>
          </div>
        )}

        {/* Errore */}
        {error && !loading && (
          <Card className="border-destructive/40 bg-destructive/5 max-w-lg mx-auto mt-12">
            <CardContent className="pt-6 pb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-sm mb-1">Impossibile caricare i dati</div>
                <div className="text-xs text-muted-foreground">{error}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Verifica che il ticker sia corretto (es. <code className="bg-muted px-1 rounded">AAPL</code>,{" "}
                  <code className="bg-muted px-1 rounded">BTC-USD</code>, <code className="bg-muted px-1 rounded">ENI.MI</code>).
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contenuto principale */}
        {hasLoaded && !loading && prices.length > 0 && (
          <>
            {/* Info stock */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-bold">{stockName || ticker.toUpperCase()}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                    {ticker.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">{currency}</span>
                  <span className="text-xs text-muted-foreground">
                    {prices.length} giorni di dati storici
                  </span>
                  {prices.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({prices[0].date} → {prices[prices.length - 1].date})
                    </span>
                  )}
                </div>
              </div>
              {prices.length > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatCurrency(prices[prices.length - 1].close, currency)}
                  </div>
                  <div className="text-xs text-muted-foreground">Ultimo prezzo disponibile</div>
                </div>
              )}
            </div>

            {/* Tab navigation */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <TabsTrigger key={id} value={id} className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">
                      {id === "distortion" ? "Distors." : id === "lumpsum" ? "Lump Sum" : id === "dca" ? "PAC" : "Confronto"}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="distortion">
                <TemporalDistortion prices={prices} ticker={ticker.toUpperCase()} currency={currency} />
              </TabsContent>

              <TabsContent value="lumpsum">
                <LumpSumSimulator
                  prices={prices}
                  currency={currency}
                  ticker={ticker.toUpperCase()}
                  onResult={(res, amt) => {
                    setLsResult(res);
                    setLsAmount(amt);
                  }}
                />
              </TabsContent>

              <TabsContent value="dca">
                <DCASimulator
                  prices={prices}
                  currency={currency}
                  ticker={ticker.toUpperCase()}
                  onResult={(res, monthly) => {
                    setDcaResult(res);
                    setDcaMonthly(monthly);
                  }}
                />
              </TabsContent>

              <TabsContent value="compare">
                {!lsResult && !dcaResult ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <GitCompare className="h-10 w-10 text-muted-foreground/50" />
                    <div className="text-sm font-medium">Nessuna simulazione da confrontare</div>
                    <div className="text-xs text-muted-foreground max-w-sm">
                      Esegui prima almeno una simulazione nella scheda{" "}
                      <button
                        onClick={() => setActiveTab("lumpsum")}
                        className="text-primary underline"
                      >
                        Lump Sum
                      </button>{" "}
                      o{" "}
                      <button
                        onClick={() => setActiveTab("dca")}
                        className="text-primary underline"
                      >
                        PAC Mensile
                      </button>
                      .
                    </div>
                  </div>
                ) : (
                  <ComparisonPanel
                    lumpSum={lsResult}
                    dca={dcaResult}
                    lumpSumAmount={lsAmount}
                    dcaMonthly={dcaMonthly}
                    currency={currency}
                  />
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-muted-foreground space-y-1">
          <p>
            Dati forniti da Yahoo Finance. Solo a scopo educativo — non costituisce consulenza finanziaria.
          </p>
          <p>
            Rendimenti storici non garantiscono risultati futuri. Dividendi esclusi dal calcolo.
          </p>
        </div>
      </footer>
    </div>
  );
}
