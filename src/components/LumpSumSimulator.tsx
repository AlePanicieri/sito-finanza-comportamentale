"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calcLumpSum, LumpSumResult, PricePoint } from "@/lib/calculations";
import { formatCurrency, formatPct, formatShortDate, pctColor } from "@/lib/formatters";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";

interface Props {
  prices: PricePoint[];
  currency: string;
  ticker: string;
  onResult?: (result: LumpSumResult, amount: number, startDate: string) => void;
}

const DISPLAY_STEP = 7; // campiona ogni 7 giorni per il grafico

function sampleArray<T>(arr: T[], step: number): T[] {
  if (arr.length <= 200) return arr;
  const result: T[] = [];
  for (let i = 0; i < arr.length; i += step) {
    result.push(arr[i]);
  }
  if (result[result.length - 1] !== arr[arr.length - 1]) {
    result.push(arr[arr.length - 1]);
  }
  return result;
}

export function LumpSumSimulator({ prices, currency, ticker, onResult }: Props) {
  const [amount, setAmount] = useState("10000");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().split("T")[0];
  });
  const [result, setResult] = useState<LumpSumResult | null>(null);
  const [showReal, setShowReal] = useState(false);

  const minDate = prices.length ? prices[0].date : "1990-01-01";
  const maxDate = new Date().toISOString().split("T")[0];

  function handleCalculate() {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || !prices.length) return;
    const res = calcLumpSum(prices, amt, new Date(startDate));
    setResult(res);
    onResult?.(res, amt, startDate);
  }

  useEffect(() => {
    if (prices.length) handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  const chartData = result
    ? sampleArray(
        result.portfolioHistory.map((p) => ({
          date: p.date,
          "Valore nominale": p.value,
          "Valore reale": p.valueReal,
          invested: parseFloat(amount) || 0,
        })),
        DISPLAY_STEP
      )
    : [];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-background border rounded-lg px-3 py-2 shadow-lg text-sm min-w-40">
        <div className="font-medium text-xs text-muted-foreground mb-2">{label ? formatShortDate(label) : ""}</div>
        {payload.map((p) => (
          <div key={p.name} className="flex justify-between gap-4">
            <span className="text-xs" style={{ color: p.color }}>{p.name}</span>
            <span className="font-semibold text-xs">{formatCurrency(p.value, currency)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Parametri */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Parametri investimento</CardTitle>
          <CardDescription>Investimento unico in {ticker}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-1.5">
              <Label>Importo ({currency})</Label>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Data di acquisto</Label>
              <Input
                type="date"
                min={minDate}
                max={maxDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <Button onClick={handleCalculate} className="w-full">
              Calcola
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground">Investito</div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.totalInvested, currency)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground">Valore oggi</div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.finalValue, currency)}
                </div>
                <div className={`text-sm font-semibold mt-0.5 ${pctColor(result.returnPct)}`}>
                  {formatPct(result.returnPct)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  Valore reale <span className="text-[10px]">(inflaz. 2%)</span>
                </div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.finalValueReal, currency)}
                </div>
                <div className={`text-sm font-semibold mt-0.5 ${pctColor(result.returnRealPct)}`}>
                  {formatPct(result.returnRealPct)}
                </div>
              </CardContent>
            </Card>
            <Card className={result.maxDrawdownPct > 20 ? "border-red-200 bg-red-50/50 dark:bg-red-950/10" : ""}>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  Max drawdown
                </div>
                <div className="text-lg font-bold mt-1 text-red-500">
                  -{result.maxDrawdownPct.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {formatCurrency(result.maxDrawdown, currency)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avviso periodi negativi */}
          {result.periodsInNegative > 0 && (
            <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>
                    Per <span className="font-semibold">{result.periodsInNegative}</span> giorni su{" "}
                    <span className="font-semibold">{result.totalPeriods}</span> ({Math.round((result.periodsInNegative / result.totalPeriods) * 100)}%
                    del tempo) il portafoglio era <span className="font-semibold text-red-500">in perdita</span> rispetto all&apos;investimento iniziale.
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grafico */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="text-base">Andamento del portafoglio</CardTitle>
                  <CardDescription>Oscillazioni giornaliere del valore dell&apos;investimento</CardDescription>
                </div>
                <button
                  onClick={() => setShowReal(!showReal)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    showReal ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  Mostra valore reale
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNominal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={formatShortDate}
                    minTickGap={60}
                  />
                  <YAxis
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11 }}
                    width={45}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={parseFloat(amount) || 0}
                    stroke="#f59e0b"
                    strokeDasharray="6 3"
                    strokeWidth={1.5}
                    label={{ value: "Investito", position: "insideTopRight", fontSize: 10, fill: "#f59e0b" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Valore nominale"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorNominal)"
                    dot={false}
                  />
                  {showReal && (
                    <Area
                      type="monotone"
                      dataKey="Valore reale"
                      stroke="#8b5cf6"
                      strokeWidth={1.5}
                      strokeDasharray="4 2"
                      fill="url(#colorReal)"
                      dot={false}
                    />
                  )}
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Formula */}
          <Card className="bg-muted/30">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><span className="font-semibold">Quote acquistate</span> = Importo ÷ Prezzo acquisto</div>
                  <div><span className="font-semibold">Valore nominale</span> = Quote × Prezzo corrente</div>
                  <div><span className="font-semibold">Valore reale</span> = Valore nominale ÷ (1.02)^anni <span className="italic">(inflazione 2%/anno)</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
