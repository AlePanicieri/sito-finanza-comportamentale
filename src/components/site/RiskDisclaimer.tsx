"use client";

import { ShieldAlert } from "lucide-react";
import { useLang } from "./LanguageProvider";

interface Props {
  className?: string;
}

// Manifesto/disclaimer sul rischio: è il messaggio centrale del sito.
// Multilingua (IT/EN/FR/DE/ES) tramite il selettore di lingua.
export function RiskDisclaimer({ className = "" }: Props) {
  const { t } = useLang();
  const d = t.disclaimer;

  return (
    <section
      className={`rounded-xl border border-amber-300/60 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/5 p-5 sm:p-6 ${className}`}
      aria-label="Avvertenza sul rischio"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-lg bg-amber-200/60 dark:bg-amber-500/20 p-2">
          <ShieldAlert className="h-5 w-5 text-amber-700 dark:text-amber-400" />
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
          <h2 className="text-base font-bold text-foreground">{d.title}</h2>
          <p>{d.p1}</p>
          <blockquote className="border-l-2 border-amber-500/60 pl-4 italic text-muted-foreground">
            {d.quote}
            <span className="block not-italic text-xs mt-1">{d.quoteAttr}</span>
          </blockquote>
          <p>{d.p2}</p>
        </div>
      </div>
    </section>
  );
}
