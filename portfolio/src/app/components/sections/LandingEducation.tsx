"use client";

import type { TranslationKey } from "@/app/components/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import { educationIds } from "@/app/lib/site";
import { educationOrg } from "@/app/lib/orgs";
import { OrgLogo } from "../ui/OrgLogo";
import { Reveal } from "../ui/Reveal";

export function LandingEducation() {
  const { t } = useLanguage();

  return (
    <section id="education" className="cat-mint page-shell py-20 sm:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-5">
          <Reveal variant="left">
            <p className="section-kicker">{t.landing_edu_title}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="section-title">{t.landing_edu_subtitle}</h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 border-t border-border">
        {educationIds.map((id, i) => {
          const degree = t[`edu_${id}_degree` as TranslationKey];
          const school = t[`edu_${id}_school` as TranslationKey];
          const period = t[`edu_${id}_period` as TranslationKey];
          return (
            <Reveal key={id} variant="up" delay={i * 90}>
              <article className="group grid gap-3 border-b border-border py-6 sm:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] sm:items-center sm:gap-10 sm:py-7">
                <div className="flex items-center justify-between gap-4">
                  {educationOrg[id] ? <OrgLogo id={educationOrg[id]} /> : null}
                  <p className="font-mono-label">
                    <span className="text-gradient">{period}</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground sm:text-xl">{degree}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{school}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
