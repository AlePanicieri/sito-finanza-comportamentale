"use client";

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StockSearch } from "@/components/StockSearch";
import { TemporalDistortion } from "@/components/TemporalDistortion";
import { LumpSumSimulator } from "@/components/LumpSumSimulator";
import { DCASimulator } from "@/components/DCASimulator";
import { ComparisonPanel } from "@/components/ComparisonPanel";
import { useStockData } from "@/hooks/useStockData";
import { LumpSumResult, DCAResult, PricePoint, DividendPoint } from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatters";
import { ARTICLES } from "@/lib/articles";
import { AdSlot } from "@/components/site/AdSlot";
import { RiskDisclaimer } from "@/components/site/RiskDisclaimer";
import Link from "next/link";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  BarChart2,
  GitCompare,
  AlertCircle,
  Loader2,
  RefreshCw,
  ArrowRight,
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

interface Props {
  /** Se impostato, il simulatore carica subito questo titolo e nasconde l'intro */
  initialTicker?: string;
  initialName?: string;
  /** Preset per la modalità "scenario" (pagine /crolli) */
  initialStartDate?: string;
  initialLumpSum?: number;
  initialMonthly?: number;
  initialTab?: TabId;
  /** Se true, le date dei simulatori sono fisse e non modificabili */
  datesLocked?: boolean;
}

export function Simulator({
  initialTicker,
  initialName,
  initialStartDate,
  initialLumpSum,
  initialMonthly,
  initialTab,
  datesLocked,
}: Props) {
  const [ticker, setTicker] = useState(initialTicker ?? "");
  const [stockName, setStockName] = useState(initialName ?? "");
  const [prices, setPrices] = useState<PricePoint[]>([]);
  const [dividends, setDividends] = useState<DividendPoint[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [activeTab, setActiveTab] = useState<TabId>(initialTab ?? "distortion");
  const [hasLoaded, setHasLoaded] = useState(false);

  // Risultati simulazioni (per il pannello confronto)
  const [lsResult, setLsResult] = useState<LumpSumResult | null>(null);
  const [lsAmount, setLsAmount] = useState(10000);
  const [dcaResult, setDcaResult] = useState<DCAResult | null>(null);
  const [dcaMonthly, setDcaMonthly] = useState(500);

  // Tasso d'inflazione annuo (%) condiviso tra i simulatori e il confronto
  const [inflationRate, setInflationRate] = useState(2);

  const { loading, error, fetch: fetchStock } = useStockData();

  const loadStock = useCallback(
    async (sym: string, name?: string) => {
      if (!sym.trim()) return;
      const from = new Date();
      from.setFullYear(from.getFullYear() - HISTORY_YEARS);
      const result = await fetchStock(sym, from);
      if (result) {
        setPrices(result.quotes);
        setDividends(result.dividends ?? []);
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

  // Caricamento automatico quando il simulatore è incorporato in una pagina
  // dedicata. Lo stato `ticker` è già inizializzato con initialTicker, quindi
  // qui basta avviare il fetch dei dati.
  useEffect(() => {
    if (initialTicker) {
      loadStock(initialTicker.toUpperCase(), initialName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTicker]);

  const handleTickerChange = (sym: string, name?: string) => {
    setTicker(sym);
    if (name) setStockName(name);
  };

  const handleSearch = () => {
    if (ticker.trim()) loadStock(ticker.trim().toUpperCase(), stockName);
  };

  const showIntro = !initialTicker;

  return (
    <div className="bg-background">
      {/* Barra di ricerca del tool. Nascosta durante l'intro della homepage,
          dove la ricerca è protagonista nell'hero. */}
      {(!showIntro || hasLoaded || loading) && (
      <div className="border-b bg-background/95 backdrop-blur sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
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
      </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stato iniziale (solo in homepage, non nelle pagine dedicate) */}
        {showIntro && !hasLoaded && !loading && (
          <div className="flex flex-col items-center justify-center text-center gap-8 pt-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                «Se avessi investito 500€ al mese, oggi avrei…»
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Forse una fortuna. Forse molto meno di quanto ti raccontano. Qui non trovi
                promesse: scegli un titolo vero e guarda come sarebbe andato davvero il tuo
                investimento, giorno per giorno, sui <strong className="text-foreground font-semibold">dati storici reali</strong>.
                Poi impara a riconoscere i bias — e i fuffaguru — che ti fanno vedere guadagni che non esistono.
              </p>
            </div>

            {/* Ricerca protagonista nell'hero, con microcopy che guida l'utente */}
            <div className="w-full max-w-xl">
              <p className="text-sm font-medium mb-2">
                Scrivi il nome o il ticker di un titolo — ti guidiamo noi passo passo
              </p>
              <div className="flex gap-2">
                <StockSearch
                  value={ticker}
                  onChange={handleTickerChange}
                  placeholder="Es. Apple, AAPL, Bitcoin, ENI.MI…"
                />
                <button
                  onClick={handleSearch}
                  disabled={!ticker.trim() || loading}
                  className="shrink-0 bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Analizza
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-left">
                Scelto il titolo, ti spieghiamo passo dopo passo come leggere ogni sezione.
              </p>
            </div>

            <RiskDisclaimer className="w-full max-w-3xl text-left" />

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

            {/* Titoli più cercati → pagine dedicate (link interni per la SEO) */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">Simula i titoli più cercati:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["AAPL", "MSFT", "BTC-USD", "SPY", "AMZN", "NVDA", "QQQ", "ENI.MI"].map((t) => (
                  <Link
                    key={t}
                    href={`/simula/${t}`}
                    className="px-3 py-1 rounded-full border text-xs hover:bg-muted transition-colors font-mono"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Richiamo "I grandi crolli" */}
            <Link
              href="/crolli"
              className="w-full max-w-3xl text-left rounded-xl border border-red-200 dark:border-red-950 bg-red-50/50 dark:bg-red-950/10 p-5 hover:border-red-300 dark:hover:border-red-900 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-lg bg-red-100 dark:bg-red-950/40 p-2">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-sm mb-0.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    I grandi crolli — quando c&apos;era da piangere
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Titoli crollati dell&apos;80-99%, alcuni mai più tornati al picco. Rivivi
                    dot-com, Lehman e i disastri single-stock con le date vere fissate.{" "}
                    <span className="text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-0.5">
                      Guarda i crolli <ArrowRight className="h-3 w-3" />
                    </span>
                  </p>
                </div>
              </div>
            </Link>

            <AdSlot format="leaderboard" className="w-full max-w-3xl" />

            {/* Teaser guide */}
            <div className="w-full max-w-3xl text-left">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-lg font-bold tracking-tight">Prima di iniziare, leggi</h2>
                <Link
                  href="/guide"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  Tutte le guide <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {ARTICLES.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/guide/${a.slug}`}
                    className="border rounded-xl p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="text-[11px] text-muted-foreground mb-1">
                      {a.tag} · {a.readingMinutes} min
                    </div>
                    <div className="font-semibold text-sm mb-1 leading-snug">{a.shortTitle}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{a.excerpt}</div>
                  </Link>
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
                <div className="mb-4 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Come si usa:</strong> il Lump Sum risponde a
                  «e se avessi messo una cifra <em>tutta insieme</em>, in un certo giorno?». Cambia
                  l&apos;importo e la data d&apos;acquisto e guarda quanto avrebbe oscillato — e per
                  quanto tempo saresti stato in perdita prima di (forse) recuperare.
                </div>
                <LumpSumSimulator
                  prices={prices}
                  dividends={dividends}
                  currency={currency}
                  ticker={ticker.toUpperCase()}
                  inflationRate={inflationRate}
                  onInflationChange={setInflationRate}
                  initialAmount={initialLumpSum}
                  initialStartDate={initialStartDate}
                  datesLocked={datesLocked}
                  onResult={(res, amt) => {
                    setLsResult(res);
                    setLsAmount(amt);
                  }}
                />
              </TabsContent>

              <TabsContent value="dca">
                <div className="mb-4 rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Come si usa:</strong> il PAC è la strategia di
                  chi versa <em>un po&apos; ogni mese</em>, come con lo stipendio. Cambia il
                  versamento mensile e il giorno del mese: vedrai che comprare con costanza — anche
                  durante i crolli — abbassa il prezzo medio d&apos;acquisto.
                </div>
                <DCASimulator
                  prices={prices}
                  dividends={dividends}
                  currency={currency}
                  ticker={ticker.toUpperCase()}
                  inflationRate={inflationRate}
                  onInflationChange={setInflationRate}
                  initialMonthly={initialMonthly}
                  initialStartDate={initialStartDate}
                  datesLocked={datesLocked}
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
                    inflationRate={inflationRate}
                  />
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}
