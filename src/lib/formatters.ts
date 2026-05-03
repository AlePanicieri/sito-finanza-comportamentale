export function formatCurrency(
  value: number,
  currency: string = "EUR"
): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    month: "short",
    year: "2-digit",
  });
}

export function pctColor(value: number): string {
  if (value > 0) return "text-emerald-600";
  if (value < 0) return "text-red-500";
  return "text-gray-500";
}

export function pctBg(value: number): string {
  if (value > 10) return "bg-emerald-500";
  if (value > 0) return "bg-emerald-400";
  if (value > -10) return "bg-red-400";
  return "bg-red-600";
}
