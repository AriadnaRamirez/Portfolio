// components/sections/AboutSection.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";


export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="bg-background text-foreground border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="max-w-5xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-500 dark:text-neutral-400">
            {t.nav_about}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">{t.about_title}</h2>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            {t.about_intro}
          </p>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            {t.about_body}
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5">
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>• {t.about_highlight_1}</li>
              <li>• {t.about_highlight_2}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5">
            <h3 className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-50">
              {t.about_now_title}
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {t.about_now_body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
