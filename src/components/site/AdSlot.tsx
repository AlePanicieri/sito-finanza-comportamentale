import { AdUnit } from "./AdUnit";
import { ADSENSE_CLIENT } from "@/lib/adsense";

// Slot pubblicitario. Comportamento a seconda della configurazione:
// - Nessun NEXT_PUBLIC_ADSENSE_CLIENT  → placeholder discreto (sviluppo).
// - Client impostato + slot passato     → unità AdSense reale (manuale).
// - Client impostato + nessuno slot     → non renderizza nulla (lascia spazio
//   agli Auto Ads di AdSense, che scelgono da soli i posizionamenti).

interface AdSlotProps {
  /** ID dell'unità pubblicitaria creata nella dashboard AdSense */
  slot?: string;
  className?: string;
  /** Formato indicativo per l'altezza del placeholder */
  format?: "leaderboard" | "rectangle" | "inline";
}

const HEIGHTS: Record<NonNullable<AdSlotProps["format"]>, string> = {
  leaderboard: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  inline: "min-h-[120px]",
};

export function AdSlot({ slot, className = "", format = "leaderboard" }: AdSlotProps) {
  const adsenseClient = ADSENSE_CLIENT;

  if (adsenseClient) {
    // Unità manuale solo se abbiamo lo slot; altrimenti lasciamo fare agli Auto Ads.
    if (slot) {
      return <AdUnit client={adsenseClient} slot={slot} className={className} />;
    }
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed bg-muted/30 text-[11px] uppercase tracking-widest text-muted-foreground/60 ${HEIGHTS[format]} ${className}`}
      aria-hidden
    >
      Spazio pubblicitario
    </div>
  );
}
