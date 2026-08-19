"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectIds, projectMeta, type ProjectId } from "@/app/lib/site";
import { ProjectCard } from "./ProjectCard";

export function HomeWorkPreview() {
  const { t, lang } = useLanguage();
  // Keep home focused: top two priorities
  const featured = projectIds
    .filter((id) => projectMeta[id].featured)
    .slice(0, 2) as ProjectId[];

  return (
    <section className="page-shell border-t border-border py-16 sm:py-24">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="section-kicker">{t.home_work_kicker}</p>
          <div className="rule-accent" />
          <h2 className="section-title">{t.home_work_title}</h2>
          <p className="text-base text-muted sm:text-lg">{t.home_work_subtitle}</p>
        </div>
        <Link href="/work" prefetch className="btn-ghost shrink-0 self-start sm:self-auto">
          {t.home_work_cta}
        </Link>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {featured.map((id) => (
          <ProjectCard key={id} id={id} lang={lang} t={t} compact />
        ))}
      </div>
    </section>
  );
}
