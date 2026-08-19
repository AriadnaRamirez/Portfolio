"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export function HomeAboutTeaser() {
  const { t } = useLanguage();

  return (
    <section className="page-shell border-t border-border py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
        <div className="space-y-4">
          <p className="section-kicker">{t.home_about_kicker}</p>
          <div className="rule-accent" />
          <h2 className="section-title">{t.home_about_title}</h2>
        </div>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {t.resume_summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" prefetch className="btn-ghost inline-flex">
              {t.home_about_cta}
            </Link>
            <Link href="/experience" prefetch className="btn-text self-center px-1">
              {t.nav_experience} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
