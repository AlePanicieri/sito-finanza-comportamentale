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
import { calcLumpSum, LumpSumResult, PricePoint, DividendPoint } from "@/lib/calculations";
import { formatCurrency, formatPct, formatShortDate, pctColor } from "@/lib/formatters";
import { useLang } from "@/components/site/LanguageProvider";
import { TrendingUp, TrendingDown, AlertTriangle, Info, Coins } from "lucide-react";

interface Props {
  prices: PricePoint[];
  dividends?: DividendPoint[];
  currency: string;
  ticker: string;
  /** Tasso d'inflazione annuo in percentuale (es. 2) */
  inflationRate: number;
  onInflationChange: (rate: number) => void;
  /** Importo preimpostato (modificabile) */
  initialAmount?: number;
  /** Data d'acquisto preimpostata (ISO) */
  initialStartDate?: string;
  /** Se true, la data è fissa e non modificabile (modalità scenario) */
  datesLocked?: boolean;
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

export function LumpSumSimulator({ prices, dividends = [], currency, ticker, inflationRate, onInflationChange, initialAmount, initialStartDate, datesLocked, onResult }: Props) {
  const { t } = useLang();
  const s = t.sim;
  const [amount, setAmount] = useState(initialAmount != null ? String(initialAmount) : "10000");
  const [startDate, setStartDate] = useState(() => {
    if (initialStartDate) return initialStartDate;
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
    const res = calcLumpSum(prices, amt, new Date(startDate), dividends, inflationRate / 100);
    setResult(res);
    onResult?.(res, amt, startDate);
  }

  useEffect(() => {
    if (prices.length) handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices, inflationRate]);

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
          <CardTitle className="text-base">{s.lsParamsTitle}</CardTitle>
          <CardDescription>{s.lsParamsDesc.replace("{ticker}", ticker)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <Label>{s.amount} ({currency})</Label>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{s.purchaseDate}</Label>
              <Input
                type="date"
                min={minDate}
                max={maxDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={datesLocked}
                title={datesLocked ? s.lockedDateTitle : undefined}
              />
              {datesLocked && (
                <p className="text-[10px] text-muted-foreground">{s.lockedDateNote}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>{s.inflationAnnual}</Label>
              <Input
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={inflationRate}
                onChange={(e) => onInflationChange(parseFloat(e.target.value) || 0)}
              />
            </div>
            <Button onClick={handleCalculate} className="w-full">
              {s.calculate}
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
                <div className="text-xs text-muted-foreground">{s.invested}</div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.totalInvested, currency)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground">{s.valueToday}</div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.finalValue, currency)}
                </div>
                <div className={`text-sm font-semibold mt-0.5 ${pctColor(result.returnPct)}`}>
                  {formatPct(result.returnPct)}
                </div>
                {result.annualizedReturnPct !== null && (
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    ≈ {formatPct(result.annualizedReturnPct)}{s.perYear}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  {s.realValue} <span className="text-[10px]">({s.inflAbbr} {inflationRate}%)</span>
                </div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.finalValueReal, currency)}
                </div>
                <div className={`text-sm font-semibold mt-0.5 ${pctColor(result.returnRealPct)}`}>
                  {formatPct(result.returnRealPct)}
                </div>
              </CardContent>
            </Card>
            <Card className={result.worstSessionPct < -5 ? "border-red-200 bg-red-50/50 dark:bg-red-950/10" : ""}>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  {s.worstSession}
                </div>
                <div className="text-lg font-bold mt-1 text-red-500">
                  {result.worstSessionPct.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {formatCurrency(result.worstSession, currency)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dividendi */}
          {result.totalDividends > 0 && (
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900">
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-base">{s.dividendsTitle}</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-green-600">{formatCurrency(result.totalDividends, currency)}</span>
                    <span className="text-sm text-muted-foreground">+{result.totalDividendsPct.toFixed(1)}% {s.pctOnInvested}</span>
                  </div>
                </div>
                <CardDescription>{s.lsDivDesc}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-2 px-3 font-medium">{s.divYear}</th>
                        <th className="text-right py-2 px-3 font-medium">{s.divPerShare}</th>
                        <th className="text-right py-2 px-3 font-medium">{s.divCashed}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.dividendsByYear.map((row) => (
                        <tr key={row.year} className="border-t hover:bg-muted/30 transition-colors">
                          <td className="py-2 px-3 font-medium">{row.year}</td>
                          <td className="py-2 px-3 text-right text-muted-foreground">{formatCurrency(row.perShare, currency)}</td>
                          <td className="py-2 px-3 text-right font-semibold">{formatCurrency(row.income, currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground border-t pt-3">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{s.lsDivNote}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Avviso periodi negativi */}
          {result.periodsInNegative > 0 && (
            <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>
                    {s.negPeriods
                      .replace("{n}", String(result.periodsInNegative))
                      .replace("{m}", String(result.totalPeriods))
                      .replace("{pct}", String(Math.round((result.periodsInNegative / result.totalPeriods) * 100)))}
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
                  <CardTitle className="text-base">{s.lsChartTitle}</CardTitle>
                  <CardDescription>{s.lsChartDesc}</CardDescription>
                </div>
                <button
                  onClick={() => setShowReal(!showReal)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    showReal ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {s.showReal}
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
                    label={{ value: s.investedLine, position: "insideTopRight", fontSize: 10, fill: "#f59e0b" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Valore nominale"
                    name={s.nominalValue}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorNominal)"
                    dot={false}
                  />
                  {showReal && (
                    <Area
                      type="monotone"
                      dataKey="Valore reale"
                      name={s.realValue}
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
                  {[
                    s.lsFormula1,
                    s.lsFormula2,
                    s.annualizedFormulaLs,
                    s.realFormula.replace("{rate}", String(inflationRate)),
                  ].map((line, i) => {
                    const idx = line.indexOf(" = ");
                    const label = idx >= 0 ? line.slice(0, idx) : line;
                    const rest = idx >= 0 ? line.slice(idx) : "";
                    return (
                      <div key={i}>
                        <span className="font-semibold">{label}</span>
                        {rest}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
