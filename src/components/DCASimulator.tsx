"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calcDCA, DCAResult, PricePoint, DividendPoint } from "@/lib/calculations";
import { formatCurrency, formatPct, formatShortDate, pctColor } from "@/lib/formatters";
import { Info, Calendar, Coins } from "lucide-react";

interface Props {
  prices: PricePoint[];
  dividends?: DividendPoint[];
  currency: string;
  ticker: string;
  onResult?: (result: DCAResult, monthlyAmount: number, startDate: string, dayOfMonth: number) => void;
}

function sampleArray<T>(arr: T[], step: number): T[] {
  if (arr.length <= 200) return arr;
  const result: T[] = [];
  for (let i = 0; i < arr.length; i += step) result.push(arr[i]);
  if (result[result.length - 1] !== arr[arr.length - 1]) result.push(arr[arr.length - 1]);
  return result;
}

export function DCASimulator({ prices, dividends = [], currency, ticker, onResult }: Props) {
  const [monthlyAmount, setMonthlyAmount] = useState("500");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().split("T")[0];
  });
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [useEndDate, setUseEndDate] = useState(false);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<DCAResult | null>(null);

  const minDate = prices.length ? prices[0].date : "1990-01-01";
  const maxDate = new Date().toISOString().split("T")[0];

  function handleCalculate() {
    const amt = parseFloat(monthlyAmount);
    const day = parseInt(dayOfMonth, 10);
    if (!amt || amt <= 0 || !prices.length || !day) return;
    const end = useEndDate && endDate ? new Date(endDate) : undefined;
    const res = calcDCA(prices, amt, new Date(startDate), Math.min(Math.max(day, 1), 28), dividends, end);
    setResult(res);
    onResult?.(res, amt, startDate, day);
  }

  useEffect(() => {
    if (prices.length) handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  const chartData = result
    ? sampleArray(
        result.portfolioHistory.map((p) => ({
          date: p.date,
          "Valore portafoglio": p.value,
          "Totale versato": p.totalInvested,
          close: p.close,
        })),
        7
      )
    : [];

  const pacEndDateLabel = useEndDate && endDate && chartData.length
    ? chartData.reduce((best, p) =>
        Math.abs(new Date(p.date).getTime() - new Date(endDate).getTime()) <
        Math.abs(new Date(best.date).getTime() - new Date(endDate).getTime())
          ? p : best
      ).date
    : null;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string; payload: { close?: number } }>; label?: string }) => {
    if (!active || !payload?.length) return null;
    const versato = payload.find((p) => p.name === "Totale versato")?.value ?? 0;
    const portafoglio = payload.find((p) => p.name === "Valore portafoglio")?.value ?? 0;
    const guadagno = portafoglio - versato;
    const closePrice = payload[0]?.payload?.close;
    return (
      <div className="bg-background border rounded-lg px-3 py-2 shadow-lg text-sm min-w-44">
        <div className="font-medium text-xs text-muted-foreground mb-2">{label ? formatShortDate(label) : ""}</div>
        {closePrice !== undefined && (
          <div className="flex justify-between gap-4 mb-1.5 pb-1.5 border-b">
            <span className="text-xs text-muted-foreground">Prezzo azione</span>
            <span className="font-semibold text-xs">{formatCurrency(closePrice, currency)}</span>
          </div>
        )}
        {payload.map((p) => (
          <div key={p.name} className="flex justify-between gap-4">
            <span className="text-xs" style={{ color: p.color }}>{p.name}</span>
            <span className="font-semibold text-xs">{formatCurrency(p.value, currency)}</span>
          </div>
        ))}
        {versato > 0 && (
          <div className="mt-1.5 pt-1.5 border-t text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guadagno</span>
              <span className={`font-semibold ${pctColor(guadagno)}`}>
                {formatCurrency(guadagno, currency)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const gain = result ? result.finalValue - result.totalInvested : 0;

  return (
    <div className="space-y-6">
      {/* Parametri */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Parametri PAC (Piano di Accumulo)</CardTitle>
          <CardDescription>Versamento mensile ricorrente su {ticker}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <Label>Versamento mensile ({currency})</Label>
              <Input
                type="number"
                min={1}
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                placeholder="500"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Data di inizio</Label>
              <Input
                type="date"
                min={minDate}
                max={maxDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Giorno del mese (1–28)
              </Label>
              <Input
                type="number"
                min={1}
                max={28}
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                placeholder="1"
              />
            </div>
            <Button onClick={handleCalculate} className="w-full">
              Calcola
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useEndDate}
                onChange={(e) => setUseEndDate(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-primary"
              />
              <span className="text-sm text-muted-foreground">Imposta data di fine PAC</span>
            </label>
            {useEndDate && (
              <div className="flex items-center gap-2">
                <Label className="text-sm shrink-0">Fine versamenti</Label>
                <Input
                  type="date"
                  min={startDate}
                  max={new Date().toISOString().split("T")[0]}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-40"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Il giorno del mese influenza il prezzo di acquisto mensile — prova a cambiarlo per vedere la differenza.
            {useEndDate && " Il grafico mostra l'evoluzione del portafoglio fino ad oggi, anche dopo la fine dei versamenti."}
          </p>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* KPI */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground">Totale versato</div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.totalInvested, currency)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {result.installments} versamenti
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground">
                  {useEndDate && result.finalDate ? `Valore al ${formatShortDate(result.finalDate)}` : "Valore oggi"}
                </div>
                <div className="text-lg font-bold mt-1">
                  {formatCurrency(result.finalValue, currency)}
                </div>
                <div className={`text-sm font-semibold mt-0.5 ${pctColor(result.returnPct)}`}>
                  {formatPct(result.returnPct)}
                </div>
              </CardContent>
            </Card>
            <Card className={gain >= 0 ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-red-200 bg-red-50/50 dark:bg-red-950/10"}>
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground">Guadagno netto</div>
                <div className={`text-lg font-bold mt-1 ${pctColor(gain)}`}>
                  {formatCurrency(gain, currency)}
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
          </div>

          {/* Grafico */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Crescita del portafoglio PAC</CardTitle>
              <CardDescription>
                Valore di mercato vs capitale versato nel tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDCA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                  <Area
                    type="monotone"
                    dataKey="Totale versato"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    fill="url(#colorInvested)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="Valore portafoglio"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#colorDCA)"
                    dot={false}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {pacEndDateLabel && (
                    <ReferenceLine
                      x={pacEndDateLabel}
                      stroke="#000"
                      strokeWidth={2}
                      label={{ value: "Fine PAC", position: "insideTopRight", fontSize: 11, fill: "#000", fontWeight: "bold" }}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Dividendi */}
          {result.totalDividends > 0 && (
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900">
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-base">Rendita da dividendi</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-green-600">{formatCurrency(result.totalDividends, currency)}</span>
                    <span className="text-sm text-muted-foreground">+{result.totalDividendsPct.toFixed(1)}% sul versato</span>
                  </div>
                </div>
                <CardDescription>Calcolati sulle quote accumulate anno per anno · lordi, tassazione esclusa</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-2 px-3 font-medium">Anno</th>
                        <th className="text-right py-2 px-3 font-medium">Dividendo/quota</th>
                        <th className="text-right py-2 px-3 font-medium">Incassato</th>
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
                  <span>
                    Nel PAC le quote crescono mese dopo mese con ogni versamento. Ogni dividendo viene moltiplicato solo per le quote <span className="font-semibold">già accumulate fino a quella data</span> — non per quelle comprate dopo.
                    Per questo l&apos;incasso cresce anno dopo anno man mano che il portafoglio si accumula.
                    {" "}<span className="font-semibold">Dividendo incassato = Dividendo/quota × Quote detenute alla data di stacco</span>.
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Formula */}
          <Card className="bg-muted/30">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><span className="font-semibold">Quote mese n</span> = Versamento ÷ Prezzo del giorno {dayOfMonth} del mese</div>
                  <div><span className="font-semibold">Valore portafoglio</span> = Σ(Quote mese n) × Prezzo attuale</div>
                  <div><span className="font-semibold">Rendimento %</span> = (Valore finale − Totale versato) ÷ Totale versato × 100</div>
                  <div><span className="font-semibold">Valore reale</span> = Valore finale ÷ (1.02)^anni <span className="italic">(inflazione 2%/anno)</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
