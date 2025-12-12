// context/LanguageContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Lang, translations } from "../components/lib/translations";

type LanguageContextType = {
  lang: Lang;
  t: typeof translations["es"];
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Lang | null;
    if (stored) setLangState(stored);
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    window.localStorage.setItem("lang", value);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], setLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
