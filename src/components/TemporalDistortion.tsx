"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calcRollingWindows, HORIZON_OPTIONS, PricePoint, WindowPerformance } from "@/lib/calculations";
import { formatPct, pctColor } from "@/lib/formatters";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  prices: PricePoint[];
  ticker: string;
  currency: string;
}

export function TemporalDistortion({ prices, ticker, currency }: Props) {
  const [selectedHorizon, setSelectedHorizon] = useState<{ label: string; days: number }>(HORIZON_OPTIONS[4]); // 5 anni default
  const [windows, setWindows] = useState<WindowPerformance[]>([]);

  useEffect(() => {
    if (!prices.length) return;
    const result = calcRollingWindows(prices, selectedHorizon.days, 6);
    setWindows(result);
  }, [prices, selectedHorizon]);

  const availableWindows = windows.filter((w) => w.available);
  const currentReturn = availableWindows[0]?.returnPct ?? null;
  const prevReturn = availableWindows[1]?.returnPct ?? null;

  const chartData = windows.map((w) => ({
    name: w.label,
    return: w.available ? w.returnPct : null,
    available: w.available,
  }));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (!active || !payload?.length) return null;
    const val = payload[0].value;
    if (val === null) return null;
    return (
      <div className="bg-background border rounded-lg px-3 py-2 shadow-lg text-sm">
        <div className="font-medium text-xs text-muted-foreground mb-1">{label}</div>
        <div className={`font-bold text-base ${pctColor(val)}`}>{formatPct(val)}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Selettore orizzonte */}
      <div className="flex flex-wrap gap-2">
        {HORIZON_OPTIONS.map((h) => (
          <button
            key={h.days}
            onClick={() => setSelectedHorizon(h)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedHorizon.days === h.days
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>

      {/* Card insight principale */}
      {currentReturn !== null && prevReturn !== null && (
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <span className="font-semibold">Distorsione temporale:</span>{" "}
                oggi {ticker} mostra{" "}
                <span className={`font-bold ${pctColor(currentReturn)}`}>
                  {formatPct(currentReturn)}
                </span>{" "}
                negli ultimi {selectedHorizon.label.toLowerCase()}. Ma se avessi comprato{" "}
                {selectedHorizon.label.toLowerCase()} fa, la performance del periodo precedente era{" "}
                <span className={`font-bold ${pctColor(prevReturn)}`}>
                  {formatPct(prevReturn)}
                </span>
                .{" "}
                {Math.abs(currentReturn - prevReturn) > 20 && (
                  <span className="text-amber-700 dark:text-amber-400">
                    Una differenza significativa che potrebbe influenzare le aspettative.
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grafico a barre */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Performance per finestre temporali di {selectedHorizon.label}</CardTitle>
          <CardDescription>
            Ogni barra mostra la performance di {selectedHorizon.label} consecutivi. La prima barra è quella attuale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />
                <YAxis
                  tickFormatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(0)}%`}
                  tick={{ fontSize: 11 }}
                  width={55}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={2} />
                <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        !entry.available
                          ? "hsl(var(--muted))"
                          : entry.return === null
                          ? "hsl(var(--muted))"
                          : entry.return >= 0
                          ? index === 0
                            ? "#10b981"
                            : "#34d399"
                          : index === 0
                          ? "#ef4444"
                          : "#f87171"
                      }
                      opacity={!entry.available ? 0.3 : 1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
              Dati insufficienti per questo orizzonte temporale
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabella dettaglio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {windows.map((w, i) => (
          <Card key={i} className={`relative overflow-hidden ${!w.available ? "opacity-40" : ""}`}>
            {i === 0 && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-bl font-medium">
                PERIODO ATTUALE
              </div>
            )}
            <CardContent className="pt-4 pb-3">
              <div className="text-xs text-muted-foreground mb-1 pr-20">{w.label}</div>
              {w.available ? (
                <>
                  <div className={`text-2xl font-bold ${pctColor(w.returnPct)}`}>
                    {formatPct(w.returnPct)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {w.startDate} → {w.endDate}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {w.returnPct >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className="text-[11px] text-muted-foreground">
                      {currency} {w.startPrice.toFixed(2)} → {w.endPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground mt-2">Dati non disponibili</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
