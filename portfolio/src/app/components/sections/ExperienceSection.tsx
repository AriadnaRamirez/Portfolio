"use client";

import type { TranslationKey } from "@/app/components/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  experienceBulletCounts,
  experienceIds,
  type ExperienceId,
} from "@/app/lib/site";
import { SectionHeader } from "../ui/SectionHeader";

function ExperienceEntry({ id }: { id: ExperienceId }) {
  const { t } = useLanguage();
  const count = experienceBulletCounts[id];
  const role = t[`exp_${id}_role` as TranslationKey];
  const org = t[`exp_${id}_org` as TranslationKey];
  const period = t[`exp_${id}_period` as TranslationKey];
  const bullets = Array.from({ length: count }, (_, i) =>
    t[`exp_${id}_b${i + 1}` as TranslationKey],
  );

  return (
    <article className="grid gap-6 border-b border-border py-10 last:border-b-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-10">
      <div className="space-y-2">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-highlight">
          {period}
        </p>
        <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {role}
        </h3>
        <p className="text-sm text-muted sm:text-base">{org}</p>
      </div>
      <ul className="space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:bg-highlight sm:text-base"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="page-shell py-16 sm:py-24">
      <SectionHeader
        kicker={t.experience_kicker}
        title={t.experience_title}
        subtitle={t.experience_subtitle}
      />

      <div className="mt-12 border-t border-border sm:mt-16">
        {experienceIds.map((id) => (
          <ExperienceEntry key={id} id={id} />
        ))}
      </div>
    </section>
  );
}
