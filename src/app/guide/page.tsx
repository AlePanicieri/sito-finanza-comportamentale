import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { ARTICLES, formatDate } from "@/lib/articles";
import { AdSlot } from "@/components/site/AdSlot";
import { RiskDisclaimer } from "@/components/site/RiskDisclaimer";

export const metadata: Metadata = {
  title: "Guide alla finanza comportamentale",
  description:
    "Articoli chiari e senza fuffa su PAC, bias cognitivi, distorsione temporale e come riconoscere i finfluencer. Educazione finanziaria, non promesse.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Le guide</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Educazione finanziaria in italiano, senza promesse di ricchezza facile.
          Spieghiamo come funzionano davvero i piani di accumulo, quali trappole
          mentali distorcono i tuoi conti e come distinguere chi ti insegna qualcosa
          da chi ti vende fumo.
        </p>
      </header>

      <RiskDisclaimer className="mb-8" />

      <div className="grid gap-4">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/guide/${a.slug}`}
            className="group border rounded-xl p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium">{a.tag}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {a.readingMinutes} min
              </span>
              <span>{formatDate(a.date)}</span>
            </div>
            <h2 className="text-lg font-semibold leading-snug mb-1.5 group-hover:text-primary transition-colors">
              {a.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
          </Link>
        ))}
      </div>

      <AdSlot format="leaderboard" className="mt-8" />
    </main>
  );
}
