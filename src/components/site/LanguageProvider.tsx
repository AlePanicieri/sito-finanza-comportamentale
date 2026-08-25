"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Lang, Translations, TRANSLATIONS } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "it",
  setLang: () => {},
  t: TRANSLATIONS.it,
});

const STORAGE_KEY = "fc-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Sempre "it" al primo render (server e client) per evitare mismatch di
  // idratazione; poi leggiamo la preferenza salvata.
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in TRANSLATIONS) setLangState(saved as Lang);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // storage non disponibile: ignoriamo, resta in memoria per la sessione.
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
