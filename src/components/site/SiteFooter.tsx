import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-3 text-sm">
        <div className="space-y-2">
          <div className="font-bold">Finanza Comportamentale</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Uno strumento educativo per capire come i bias mentali distorcono le
            decisioni di investimento. Simula, confronta, ragiona.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            Naviga
          </div>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Simulatore
              </Link>
            </li>
            <li>
              <Link href="/guide" className="text-muted-foreground hover:text-foreground">
                Guide
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            Avvertenze
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Contenuto a solo scopo educativo. Non è consulenza finanziaria. I
            rendimenti storici non garantiscono risultati futuri. Dati di mercato
            forniti da Yahoo Finance.
          </p>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Finanza Comportamentale — Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
