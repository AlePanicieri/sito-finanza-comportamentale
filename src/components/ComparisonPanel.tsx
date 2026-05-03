"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LumpSumResult, DCAResult } from "@/lib/calculations";
import { formatCurrency, formatPct, formatShortDate, pctColor } from "@/lib/formatters";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  lumpSum: LumpSumResult | null;
  dca: DCAResult | null;
  lumpSumAmount: number;
  dcaMonthly: number;
  currency: string;
}

function sampleArray<T>(arr: T[], step: number): T[] {
  if (arr.length <= 200) return arr;
  const result: T[] = [];
  for (let i = 0; i < arr.length; i += step) result.push(arr[i]);
  if (result[result.length - 1] !== arr[arr.length - 1]) result.push(arr[arr.length - 1]);
  return result;
}

export function ComparisonPanel({ lumpSum, dca, lumpSumAmount, dcaMonthly, currency }: Props) {
  if (!lumpSum && !dca) return null;

  // Costruisce serie temporale allineata per il grafico
  const lsMap = new Map<string, number>();
  if (lumpSum) {
    for (const p of lumpSum.portfolioHistory) lsMap.set(p.date, p.value);
  }
  const dcaMap = new Map<string, number>();
  if (dca) {
    for (const p of dca.portfolioHistory) dcaMap.set(p.date, p.value);
  }

  const allDates = Array.from(
    new Set([
      ...(lumpSum?.portfolioHistory.map((p) => p.date) ?? []),
      ...(dca?.portfolioHistory.map((p) => p.date) ?? []),
    ])
  ).sort();

  const rawChartData = allDates.map((date) => ({
    date,
    "Lump Sum": lsMap.get(date) ?? null,
    "PAC (DCA)": dcaMap.get(date) ?? null,
  }));

  const chartData = sampleArray(rawChartData, 7);

  const lsBetter =
    lumpSum && dca ? lumpSum.returnPct > dca.returnPct : lumpSum ? true : false;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-background border rounded-lg px-3 py-2 shadow-lg text-sm min-w-44">
        <div className="font-medium text-xs text-muted-foreground mb-2">
          {label ? formatShortDate(label) : ""}
        </div>
        {payload.map(
          (p) =>
            p.value !== null && (
              <div key={p.name} className="flex justify-between gap-4">
                <span className="text-xs" style={{ color: p.color }}>
                  {p.name}
                </span>
                <span className="font-semibold text-xs">
                  {formatCurrency(p.value, currency)}
                </span>
              </div>
            )
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Vincitore */}
      {lumpSum && dca && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-amber-500 shrink-0" />
              <div>
                <div className="font-semibold text-sm">
                  {lsBetter ? "Lump Sum" : "PAC (DCA)"} ha performato meglio in questo scenario
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Rendimento {lsBetter ? "Lump Sum" : "DCA"}:{" "}
                  <span className={`font-bold ${pctColor(lsBetter ? lumpSum.returnPct : dca.returnPct)}`}>
                    {formatPct(lsBetter ? lumpSum.returnPct : dca.returnPct)}
                  </span>{" "}
                  vs{" "}
                  <span className={`font-bold ${pctColor(lsBetter ? dca.returnPct : lumpSum.returnPct)}`}>
                    {formatPct(lsBetter ? dca.returnPct : lumpSum.returnPct)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabella comparativa */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Confronto scenari</CardTitle>
          <CardDescription>Dati al momento dell&apos;ultima esecuzione</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-medium text-muted-foreground text-xs">Metrica</th>
                {lumpSum && (
                  <th className="text-right py-2 px-4 font-medium text-blue-600 text-xs">
                    Lump Sum
                    <div className="text-[10px] text-muted-foreground font-normal">
                      {formatCurrency(lumpSumAmount, currency)} una tantum
                    </div>
                  </th>
                )}
                {dca && (
                  <th className="text-right py-2 pl-4 font-medium text-emerald-600 text-xs">
                    PAC (DCA)
                    <div className="text-[10px] text-muted-foreground font-normal">
                      {formatCurrency(dcaMonthly, currency)}/mese
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Capitale investito",
                  ls: lumpSum ? formatCurrency(lumpSum.totalInvested, currency) : null,
                  dca: dca ? formatCurrency(dca.totalInvested, currency) : null,
                },
                {
                  label: "Valore finale",
                  ls: lumpSum ? formatCurrency(lumpSum.finalValue, currency) : null,
                  dca: dca ? formatCurrency(dca.finalValue, currency) : null,
                },
                {
                  label: "Rendimento nominale",
                  ls: lumpSum ? formatPct(lumpSum.returnPct) : null,
                  dca: dca ? formatPct(dca.returnPct) : null,
                  lsColor: lumpSum ? pctColor(lumpSum.returnPct) : "",
                  dcaColor: dca ? pctColor(dca.returnPct) : "",
                },
                {
                  label: "Rendimento reale (2% inflaz.)",
                  ls: lumpSum ? formatPct(lumpSum.returnRealPct) : null,
                  dca: dca ? formatPct(dca.returnRealPct) : null,
                  lsColor: lumpSum ? pctColor(lumpSum.returnRealPct) : "",
                  dcaColor: dca ? pctColor(dca.returnRealPct) : "",
                },
                {
                  label: "Valore reale",
                  ls: lumpSum ? formatCurrency(lumpSum.finalValueReal, currency) : null,
                  dca: dca ? formatCurrency(dca.finalValueReal, currency) : null,
                },
                ...(lumpSum
                  ? [
                      {
                        label: "Peggior sessione",
                        ls: `${lumpSum.worstSessionPct.toFixed(2)}%`,
                        dca: null,
                        lsColor: "text-red-500",
                        dcaColor: "",
                      },
                    ]
                  : []),
              ].map((row) => (
                <tr key={row.label} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 pr-4 text-xs text-muted-foreground">{row.label}</td>
                  {lumpSum && (
                    <td className={`py-2.5 px-4 text-right text-xs font-medium ${row.lsColor ?? ""}`}>
                      {row.ls ?? "—"}
                    </td>
                  )}
                  {dca && (
                    <td className={`py-2.5 pl-4 text-right text-xs font-medium ${row.dcaColor ?? ""}`}>
                      {row.dca ?? "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Grafico sovrapposto */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Andamento a confronto</CardTitle>
            <CardDescription>
              Valore del portafoglio nel tempo per entrambe le strategie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {lumpSum && (
                  <Line
                    type="monotone"
                    dataKey="Lump Sum"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                  />
                )}
                {dca && (
                  <Line
                    type="monotone"
                    dataKey="PAC (DCA)"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center px-4">
        * I risultati escludono commissioni, dividendi e tasse. L&apos;inflazione è stimata al 2%/anno.
        I rendimenti passati non sono garanzia di rendimenti futuri.
      </p>
    </div>
  );
}
