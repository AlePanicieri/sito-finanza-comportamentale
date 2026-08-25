import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp, TrendingDown, BarChart2, Brain, ArrowRight } from "lucide-react";
import { Simulator } from "@/components/Simulator";
import { ASSETS, getAsset, getRelatedAssets } from "@/lib/assets";
import { getScenariosByTicker } from "@/lib/scenarios";
import { ARTICLES } from "@/lib/articles";

// Solo i titoli curati generano una pagina (niente pagine "sottili" auto-generate).
export const dynamicParams = false;

export function generateStaticParams() {
  return ASSETS.map((a) => ({ ticker: a.ticker }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const asset = getAsset(decodeURIComponent(ticker));
  if (!asset) return {};
  const title = `Se avessi investito in ${asset.name} (${asset.ticker}): la simulazione`;
  const description = `Quanto avresti oggi se avessi investito in ${asset.name}? Simulazione sui dati storici reali: PAC mensile, investimento unico e distorsione temporale. Senza promesse.`;
  return {
    title,
    description,
    alternates: { canonical: `/simula/${asset.ticker}` },
    openGraph: { title, description, type: "article" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const asset = getAsset(decodeURIComponent(ticker));
  if (!asset) notFound();

  const related = getRelatedAssets(asset.ticker);
  const guides = ARTICLES.slice(0, 3);
  const scenarios = getScenariosByTicker(asset.ticker);

  return (
    <div>
      {/* Intro server-rendered (indicizzabile) */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <Link
          href="/simula"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Tutti i titoli
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium">{asset.category}</span>
          <span className="font-mono">{asset.ticker}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Se avessi investito in {asset.name}?
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">{asset.blurb}</p>
        <p className="text-sm leading-relaxed max-w-3xl text-foreground/80">
          Qui sotto trovi la simulazione su <strong>dati storici reali</strong> di {asset.name}:
          niente cifre inventate, ma come sarebbe andato <em>davvero</em> il tuo investimento, giorno
          per giorno. Puoi confrontare tre scenari e vedere quanto conta il momento in cui saresti
          entrato.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 max-w-3xl">
          <div className="border rounded-lg p-3">
            <BarChart2 className="h-4 w-4 text-primary mb-1.5" />
            <div className="text-sm font-semibold">PAC mensile</div>
            <div className="text-xs text-muted-foreground">Un versamento fisso ogni mese su {asset.name}.</div>
          </div>
          <div className="border rounded-lg p-3">
            <TrendingUp className="h-4 w-4 text-primary mb-1.5" />
            <div className="text-sm font-semibold">Investimento unico</div>
            <div className="text-xs text-muted-foreground">Una somma sola, entrata in un dato giorno.</div>
          </div>
          <div className="border rounded-lg p-3">
            <Brain className="h-4 w-4 text-primary mb-1.5" />
            <div className="text-sm font-semibold">Distorsione temporale</div>
            <div className="text-xs text-muted-foreground">Come cambia tutto a seconda di quando entri.</div>
          </div>
        </div>

        {scenarios.length > 0 && (
          <div className="max-w-3xl mb-2 space-y-2">
            {scenarios.map((s) => (
              <Link
                key={s.slug}
                href={`/crolli/${s.slug}`}
                className="flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-950 bg-red-50/50 dark:bg-red-950/10 p-4 hover:border-red-300 dark:hover:border-red-900 transition-colors group"
              >
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    Guarda cosa successe: {s.crisis}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.hook}{" "}
                    <span className="text-red-600 dark:text-red-400 font-medium inline-flex items-center gap-0.5">
                      Rivivi il crollo <ArrowRight className="h-3 w-3" />
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Simulatore interattivo, pre-caricato su questo titolo.
          key = ticker → si rimonta pulito navigando tra titoli diversi. */}
      <Simulator key={asset.ticker} initialTicker={asset.ticker} initialName={asset.name} />

      {/* Link interni (SEO + navigazione) */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Simula anche
        </h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 mb-10">
          {related.map((a) => (
            <Link
              key={a.ticker}
              href={`/simula/${a.ticker}`}
              className="border rounded-lg p-4 hover:border-primary/40 transition-colors"
            >
              <div className="text-[11px] text-muted-foreground mb-1">{a.category}</div>
              <div className="text-sm font-semibold leading-snug">{a.name}</div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{a.ticker}</div>
            </Link>
          ))}
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Prima di decidere, leggi
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="border rounded-lg p-4 hover:border-primary/40 transition-colors"
            >
              <div className="text-[11px] text-muted-foreground mb-1">{g.tag}</div>
              <div className="text-sm font-medium leading-snug">{g.shortTitle}</div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8 max-w-3xl">
          I dati sono forniti da Yahoo Finance a solo scopo educativo. Rendimenti passati non
          garantiscono risultati futuri. Questo non è un consiglio d&apos;investimento né un invito
          a comprare {asset.name}.
        </p>
      </section>
    </div>
  );
}
