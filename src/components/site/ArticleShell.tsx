import Link from "next/link";
import { ArrowLeft, Clock, TrendingUp } from "lucide-react";
import { ArticleMeta, formatDate, getRelated } from "@/lib/articles";
import { AdSlot } from "./AdSlot";

// Stile "prose" realizzato con variant arbitrarie di Tailwind v4 (niente plugin).
const PROSE =
  "text-[15px] leading-7 text-foreground/90 " +
  "[&>h2]:text-xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-foreground " +
  "[&>h3]:text-base [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-foreground " +
  "[&>p]:mb-4 " +
  "[&>ul]:my-4 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:mb-2 [&>ul>li]:pl-1 " +
  "[&>ol]:my-4 [&>ol]:pl-5 [&>ol]:list-decimal [&>ol>li]:mb-2 [&>ol>li]:pl-1 " +
  "[&_strong]:font-semibold [&_strong]:text-foreground " +
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 " +
  "[&>blockquote]:border-l-2 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-6";

interface Props {
  meta: ArticleMeta;
  children: React.ReactNode;
}

export function ArticleShell({ meta, children }: Props) {
  const related = getRelated(meta.slug);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/guide"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Tutte le guide
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium">{meta.tag}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {meta.readingMinutes} min di lettura
            </span>
            <span>{formatDate(meta.date)}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-3">
            {meta.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">{meta.description}</p>
        </header>

        <AdSlot format="leaderboard" className="mb-8" />

        <div className={PROSE}>{children}</div>
      </article>

      {/* Disclaimer articolo */}
      <div className="mt-10 rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
        Questo articolo ha scopo puramente educativo e divulgativo. Non costituisce
        consulenza finanziaria, né un invito a comprare o vendere strumenti finanziari.
        I rendimenti passati non sono indicativi di quelli futuri.
      </div>

      <AdSlot format="rectangle" className="mt-8" />

      {/* CTA simulatore */}
      <div className="mt-10 rounded-xl border bg-card p-6 text-center">
        <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
        <div className="font-semibold mb-1">Prova con i numeri veri</div>
        <p className="text-sm text-muted-foreground mb-4">
          Scegli un titolo e guarda come sarebbe andato davvero un tuo investimento,
          giorno per giorno.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Apri il simulatore
        </Link>
      </div>

      {/* Correlati */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Leggi anche
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/guide/${a.slug}`}
                className="border rounded-lg p-4 hover:border-primary/40 transition-colors"
              >
                <div className="text-[11px] text-muted-foreground mb-1">{a.tag}</div>
                <div className="text-sm font-medium leading-snug">{a.shortTitle}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
