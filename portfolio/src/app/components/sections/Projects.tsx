// src/app/components/sections/Projects.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";


export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      badge: "SaaS / Dashboard",
      title: t.projects_grova_title,
      role: t.projects_grova_role,
      desc: t.projects_grova_desc,
      tech: ["Next.js", "NestJS", "PostgreSQL"],
    },
    {
      badge: "Marketplace / Servicios",
      title: t.projects_servi_title,
      role: t.projects_servi_role,
      desc: t.projects_servi_desc,
      tech: ["Next.js", "Node.js", "Socket.io"],
    },
    {
      badge: "E-commerce",
      title: t.projects_fram_title,
      role: t.projects_fram_role,
      desc: t.projects_fram_desc,
      tech: ["Next.js", "Tailwind", "UX/UI"],
    },
    {
      badge: "Wellness / Concept",
      title: t.projects_senda_title,
      role: t.projects_senda_role,
      desc: t.projects_senda_desc,
      tech: ["UX/UI", "Design System"],
    },
  ];

  return (
    <section
      id="projects"
      className="bg-background text-foreground border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-500 dark:text-neutral-400">
            {t.nav_projects}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            {t.projects_title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            {t.projects_subtitle}
          </p>
        </header>

        {/* Grid de proyectos */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((proj) => (
            <article
              key={proj.title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300">
                    {proj.badge}
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {proj.role}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold">
                  {proj.title}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {proj.desc}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {proj.tech.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-[11px] text-neutral-700 dark:text-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
