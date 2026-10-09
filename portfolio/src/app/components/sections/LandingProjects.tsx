"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { projectIds } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function LandingProjects() {
  const { t, lang } = useLanguage();

  return (
    <section id="work" className="cat-violet page-shell pt-10 pb-20 sm:pt-12 sm:pb-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-5">
          <Reveal variant="left">
            <p className="section-kicker">{t.nav_work}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="font-display whitespace-nowrap text-[clamp(1.45rem,6.6vw,3.5rem)] leading-[1.02] text-foreground">
              {t.landing_projects_title}
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-10">
        {projectIds.map((id) => (
          <ProjectCard key={id} id={id} lang={lang} t={t} />
        ))}
      </div>
    </section>
  );
}
