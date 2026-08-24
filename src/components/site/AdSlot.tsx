// Segnaposto per unità pubblicitarie (es. Google AdSense).
// Finché NEXT_PUBLIC_ADSENSE_CLIENT non è configurato, mostra un placeholder
// discreto. Dopo l'approvazione AdSense basterà popolare questo componente con
// il tag <ins className="adsbygoogle" .../> e caricare lo script nel layout.

interface AdSlotProps {
  /** Etichetta interna (non mostrata all'utente) */
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

export function AdSlot({ className = "", format = "leaderboard" }: AdSlotProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // In produzione, con AdSense configurato, qui andrà l'unità reale.
  if (adsenseClient) {
    return (
      <div className={className} aria-hidden>
        {/* TODO: <ins className="adsbygoogle" data-ad-client={adsenseClient} ... /> */}
      </div>
    );
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
