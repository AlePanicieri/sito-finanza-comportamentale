import { ShieldAlert } from "lucide-react";

interface Props {
  className?: string;
}

// Manifesto/disclaimer sul rischio: è il messaggio centrale del sito.
// Usato in più punti (homepage, indice guide) per essere sempre ben visibile.
export function RiskDisclaimer({ className = "" }: Props) {
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
          <h2 className="text-base font-bold text-foreground">
            Non è un invito a investire
          </h2>
          <p>
            La finanza è <strong>rischio</strong>. Esistono titoli che falliscono, che
            vengono delistati e semplicemente spariscono — e mostrarlo è uno degli
            obiettivi di questo sito. Qui trovi i titoli più <strong>riconosciuti</strong> di
            ogni mercato, ma non è detto che ci siano tutti. È più che plausibile che un
            titolo ad altissimo rischio si riveli molto più remunerativo di questi… così come
            è altrettanto possibile che si riveli <strong>deleterio</strong>.
          </p>
          <blockquote className="border-l-2 border-amber-500/60 pl-4 italic text-muted-foreground">
            «Giocare in borsa vuol dire saper accettare che, quando le cose vanno male,
            perdi; e quando vanno bene, puoi perdere lo stesso.»
            <span className="block not-italic text-xs mt-1">
              — un professore, all&apos;università
            </span>
          </blockquote>
          <p>
            Per questo questo sito non è un invito a investire. È un invito a{" "}
            <strong>riflettere</strong>: se, per te, abbia più senso investire il tuo denaro
            oppure spenderlo — o risparmiarlo — in un altro modo.
          </p>
        </div>
      </div>
    </section>
  );
}
