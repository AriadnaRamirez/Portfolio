// components/navbar/LangToggle.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";


export function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-gray-300 dark:border-gray-600 text-xs">
      <button
        onClick={() => setLang("es")}
        className={`px-3 py-1 rounded-full ${
          lang === "es" ? "bg-gray-900 text-white dark:bg-white dark:text-black" : ""
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full ${
          lang === "en" ? "bg-gray-900 text-white dark:bg-white dark:text-black" : ""
        }`}
      >
        EN
      </button>
    </div>
  );
}
