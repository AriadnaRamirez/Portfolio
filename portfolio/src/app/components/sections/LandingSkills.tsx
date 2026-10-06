"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { stackGroups, type TechId } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { TechIconRow } from "../ui/TechIcon";
import { TechCarousel } from "./TechCarousel";

export function LandingSkills() {
  const { t } = useLanguage();
  const groups = [
    {
      title: t.landing_skills_1_title,
      body: t.landing_skills_1_body,
      tech: stackGroups.frontend,
    },
    {
      title: t.landing_skills_2_title,
      body: t.landing_skills_2_body,
      tech: stackGroups.backend,
    },
    {
      title: t.landing_skills_3_title,
      body: t.landing_skills_3_body,
      tech: ["figma"] as const satisfies readonly TechId[],
    },
    {
      title: t.landing_skills_4_title,
      body: t.landing_skills_4_body,
      tech: stackGroups.tools,
    },
  ];

  return (
    <section id="skills" className="cat-blue page-shell py-24 sm:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-5">
          <Reveal variant="left">
            <p className="section-kicker">{t.nav_skills}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="section-title">
              {t.landing_skills_title} {t.landing_skills_title_accent}
            </h2>
          </Reveal>
        </div>
      </div>

      <Reveal variant="clip" delay={120} className="mt-12">
        <TechCarousel label={t.landing_skills_subtitle} />
      </Reveal>

      <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.title} variant="up" delay={(i % 2) * 90}>
            <div className="space-y-3 border-t border-border pt-6">
              <h3 className="font-display text-2xl text-foreground">
                {g.title}
              </h3>
              <TechIconRow ids={g.tech} />
              <p className="text-sm leading-relaxed text-muted">{g.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
