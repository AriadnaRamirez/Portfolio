"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  const item = (value: "es" | "en", label: string) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${
        lang === value
          ? "bg-background text-foreground shadow-[0_1px_2px_rgba(36,36,36,0.12)]"
          : "text-muted hover:text-foreground"
      }`}
      aria-pressed={lang === value}
    >
      {label}
    </button>
  );

  return (
    <div
      className="inline-flex items-center rounded-full bg-surface-2 p-0.5"
      role="group"
      aria-label="Language"
    >
      {item("es", "ES")}
      {item("en", "EN")}
    </div>
  );
}
