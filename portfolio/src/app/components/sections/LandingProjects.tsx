"use client";

import { useId, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectIds } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "./ProjectCard";

const FEATURED_COUNT = 3;

export function LandingProjects() {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLDivElement>(null);
  const featured = projectIds.slice(0, FEATURED_COUNT);
  const more = projectIds.slice(FEATURED_COUNT);

  const toggle = () => {
    if (expanded) toggleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setExpanded((v) => !v);
  };

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
        {featured.map((id) => (
          <ProjectCard key={id} id={id} lang={lang} t={t} />
        ))}
      </div>

      {more.length ? (
        <>
          <div
            id={panelId}
            inert={!expanded}
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden [&>article:first-child]:border-t">
              {more.map((id) => (
                <ProjectCard key={id} id={id} lang={lang} t={t} />
              ))}
            </div>
          </div>

          <div ref={toggleRef} className="flex items-center gap-4 pt-2">
            <span aria-hidden className="h-px flex-1 bg-border" />
            <button
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="btn-ghost"
            >
              {expanded ? t.projects_show_less : `${t.projects_show_all} (${projectIds.length})`}
              <svg
                viewBox="0 0 16 16"
                className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
              >
                <path d="M3 6l5 5 5-5" />
              </svg>
            </button>
            <span aria-hidden className="h-px flex-1 bg-border" />
          </div>
        </>
      ) : null}
    </section>
  );
}
