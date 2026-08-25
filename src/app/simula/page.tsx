import type { Metadata } from "next";
import Link from "next/link";
import { ASSETS, Asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Simula un titolo: quanto avresti oggi?",
  description:
    "Scegli un titolo o un indice e scopri quanto avresti oggi, sui dati storici reali: Apple, Nvidia, S&P 500, Bitcoin, Eni e altri. PAC, investimento unico e distorsione temporale.",
  alternates: { canonical: "/simula" },
};

const CATEGORY_ORDER: Asset["category"][] = [
  "Indici & ETF",
  "Azioni USA",
  "Azioni Italia",
  "Crypto",
];

export default function SimulaIndexPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Quanto avresti oggi?</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Scegli un titolo, un indice o una criptovaluta e guarda come sarebbe andato davvero un tuo
          investimento — sui <strong>dati storici reali</strong>, non su promesse. Ogni pagina ti
          mostra PAC mensile, investimento unico e l&apos;effetto del momento d&apos;ingresso.
        </p>
      </header>

      <div className="space-y-8">
        {CATEGORY_ORDER.map((cat) => {
          const items = ASSETS.filter((a) => a.category === cat);
          if (!items.length) return null;
          return (
            <section key={cat}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                {cat}
              </h2>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                {items.map((a) => (
                  <Link
                    key={a.ticker}
                    href={`/simula/${a.ticker}`}
                    className="group border rounded-xl p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                      {a.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{a.ticker}</div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
