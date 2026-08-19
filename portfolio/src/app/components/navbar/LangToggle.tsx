"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="inline-flex border border-border-strong text-xs"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`px-3 py-2 font-semibold uppercase tracking-wider transition ${
          lang === "es"
            ? "bg-foreground text-background"
            : "text-muted hover:bg-highlight-soft hover:text-foreground"
        }`}
        aria-pressed={lang === "es"}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`border-l border-border-strong px-3 py-2 font-semibold uppercase tracking-wider transition ${
          lang === "en"
            ? "bg-foreground text-background"
            : "text-muted hover:bg-highlight-soft hover:text-foreground"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
