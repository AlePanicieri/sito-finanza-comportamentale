import type { Metadata } from "next";
import Link from "next/link";
import { TrendingDown } from "lucide-react";
import { SCENARIOS, CRISIS_ORDER } from "@/lib/scenarios";

export const metadata: Metadata = {
  title: "I grandi crolli: quando c'era davvero da piangere",
  description:
    "Titoli crollati dell'80-99%, alcuni mai più tornati al picco. Rivivi i grandi crolli della storia — dot-com, Lehman, single-stock — con simulazioni sui dati reali.",
  alternates: { canonical: "/crolli" },
};

export default function CrolliIndexPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/40 mb-4">
          <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">I grandi crolli</h1>
        <div className="space-y-3 text-muted-foreground leading-relaxed max-w-2xl">
          <p>
            Gli ultimi anni hanno visto boom dell&apos;AI, guerre e pandemie — e nonostante gli
            scenari incerti, sono stati tempi di vacche grasse. Facile, così, convincersi che
            «investire renda sempre».
          </p>
          <p>
            Ma ci sono stati anni in cui c&apos;era <strong className="text-foreground">davvero da
            piangere</strong>. Titoli crollati dell&apos;80, del 90, quasi del 100 per cento. Alcuni
            che dopo vent&apos;anni non hanno <em>ancora</em> recuperato. Altri che hanno messo
            dieci o quindici anni a rialzare la testa. Questo sito nasce anche per questo: per
            mostrare il lato che di solito nessuno racconta.
          </p>
          <p>
            Scegli un crollo qui sotto: rilanceremo la simulazione — Lump Sum e PAC — con le{" "}
            <strong className="text-foreground">date vere del disastro fissate</strong>, così puoi
            vedere con i tuoi occhi quanto è duro guardare il capitale sprofondare, e cosa sarebbe
            successo restando investito sul lungo periodo.
          </p>
        </div>
      </header>

      <div className="space-y-8">
        {CRISIS_ORDER.map((crisis) => {
          const items = SCENARIOS.filter((s) => s.crisis === crisis);
          if (!items.length) return null;
          return (
            <section key={crisis}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                {crisis}
              </h2>
              <div className="grid gap-4">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/crolli/${s.slug}`}
                    className="group border rounded-xl p-5 hover:border-red-300 dark:hover:border-red-900 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <span className="font-mono">{s.ticker}</span>
                      <span>·</span>
                      <span>{s.name}</span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug mb-1.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.hook}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-10 max-w-2xl">
        A solo scopo educativo. Rendimenti passati non garantiscono risultati futuri. Mostrare i
        crolli non è un invito a evitare i mercati, ma a capire il rischio prima di correrlo.
      </p>
    </main>
  );
}
