"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LANGS, Lang } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";
import { Flag } from "./Flag";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-md border px-2 py-1.5 hover:bg-muted transition-colors"
        aria-label="Cambia lingua / Change language"
      >
        <Flag code={lang} />
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border bg-background shadow-lg overflow-hidden z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-muted transition-colors ${
                l.code === lang ? "bg-muted/60 font-medium" : ""
              }`}
            >
              <Flag code={l.code} />
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
