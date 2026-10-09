"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { projectIds } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function LandingProjects() {
  const { t, lang } = useLanguage();

  return (
    <section id="work" className="cat-violet page-shell py-24 sm:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl space-y-5">
          <Reveal variant="left">
            <p className="section-kicker">{t.nav_work}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="section-title">{t.landing_projects_title}</h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 border-t border-border">
        {projectIds.map((id) => (
          <ProjectCard key={id} id={id} lang={lang} t={t} />
        ))}
      </div>
    </section>
  );
}
