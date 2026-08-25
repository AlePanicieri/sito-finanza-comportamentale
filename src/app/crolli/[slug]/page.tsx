import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingDown, Lightbulb } from "lucide-react";
import { Simulator } from "@/components/Simulator";
import { JsonLd } from "@/components/site/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { SCENARIOS, getScenario } from "@/lib/scenarios";
import { getArticle } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", { month: "long", year: "numeric" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getScenario(slug);
  if (!s) return {};
  const description = `${s.hook} Rivivi il crollo di ${s.name} con la simulazione sui dati reali: quanto avresti perso e cosa sarebbe successo restando investito.`;
  return {
    title: s.title,
    description,
    alternates: { canonical: `/crolli/${s.slug}` },
    openGraph: { title: s.title, description, type: "article" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scenario = getScenario(slug);
  if (!scenario) notFound();

  const others = SCENARIOS.filter((s) => s.slug !== scenario.slug).slice(0, 3);
  // Guide collegate al tema rischio/psicologia
  const relatedGuides = [
    getArticle("distorsione-temporale-investimenti"),
    getArticle("pac-vs-investimento-unico"),
    getArticle("come-riconoscere-un-fuffaguru"),
  ].filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: scenario.title,
          description: scenario.hook,
          inLanguage: "it-IT",
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}/crolli/${scenario.slug}`,
          about: scenario.name,
        }}
      />
      {/* Storia server-rendered (indicizzabile) */}
      <article className="max-w-3xl mx-auto px-4 pt-8">
        <Link
          href="/crolli"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Tutti i crolli
        </Link>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-2.5 py-0.5 font-medium">
            <TrendingDown className="h-3 w-3" />
            {scenario.crisis}
          </span>
          <span className="font-mono">{scenario.ticker}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-4">
          {scenario.title}
        </h1>

        <div className="space-y-4 text-[15px] leading-7 text-foreground/90">
          {scenario.what.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-amber-300/60 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold mb-1">La lezione</div>
              <p className="text-sm text-foreground/90 leading-relaxed">{scenario.lesson}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-muted/40 border p-4 text-sm text-muted-foreground">
          Qui sotto la simulazione parte da <strong className="text-foreground">{formatMonthYear(scenario.startDate)}</strong> —
          la data del crollo, <strong className="text-foreground">fissa</strong>. Cambia pure gli
          importi e passa da Lump Sum a PAC: le date restano quelle vere del disastro, così vedi la
          discesa reale e cosa sarebbe successo tenendo duro fino a oggi.
        </div>
      </article>

      {/* Simulatore pre-caricato, date bloccate sullo scenario */}
      <Simulator
        key={scenario.slug}
        initialTicker={scenario.ticker}
        initialName={scenario.name}
        initialStartDate={scenario.startDate}
        initialLumpSum={scenario.lumpSumAmount}
        initialMonthly={scenario.dcaMonthly}
        initialTab={scenario.defaultTab}
        datesLocked
      />

      {/* Link interni */}
      <section className="max-w-3xl mx-auto px-4 pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Altri crolli
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 mb-10">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/crolli/${s.slug}`}
              className="border rounded-lg p-4 hover:border-red-300 dark:hover:border-red-900 transition-colors"
            >
              <div className="text-[11px] text-muted-foreground mb-1">{s.crisis}</div>
              <div className="text-sm font-medium leading-snug">{s.name}</div>
            </Link>
          ))}
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Capire il rischio
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {relatedGuides.map((g) => (
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

        <p className="text-xs text-muted-foreground mt-8">
          Dati forniti da Yahoo Finance a solo scopo educativo. Rendimenti passati non garantiscono
          risultati futuri. Questo non è un consiglio d&apos;investimento.
        </p>
      </section>
    </div>
  );
}
