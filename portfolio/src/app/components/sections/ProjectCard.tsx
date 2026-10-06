"use client";

import Link from "next/link";
import type { Lang, TranslationKey } from "@/app/components/lib/translations";
import { caseStudyFor } from "@/app/lib/caseStudies";
import { projectMeta, type ProjectId } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { TechIconRow } from "../ui/TechIcon";
import { ProjectGallery } from "./ProjectGallery";

type Dict = Record<TranslationKey, string>;

type ProjectCardProps = {
  id: ProjectId;
  lang: Lang;
  t: Dict;
  compact?: boolean;
};

export function ProjectCard({ id, lang, t, compact = false }: ProjectCardProps) {
  const meta = projectMeta[id];
  const title = t[`projects_${id}_title` as TranslationKey];
  const role = t[`projects_${id}_role` as TranslationKey];
  const desc = t[`projects_${id}_desc` as TranslationKey];
  const badge = meta.badge[lang];
  const caseStudy = caseStudyFor(id);

  if (compact) {
    return (
      <article className="grid gap-6 py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center md:gap-10">
        <div className="min-w-0">
          <ProjectGallery id={id} title={title} t={t} compact />
        </div>
        <div className="min-w-0 space-y-3">
          <p className="font-mono-label text-accent">
            {badge}
          </p>
          <h3 className="font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="text-sm text-muted">{role}</p>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{desc}</p>
          <TechIconRow ids={meta.tech.slice(0, 4)} />
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-border py-12 last:border-b-0 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start lg:gap-12">
        <Reveal variant="clip" className="min-w-0">
          <ProjectGallery id={id} title={title} t={t} />
        </Reveal>
        <Reveal variant="up" delay={140} className="min-w-0 space-y-4 lg:pt-4">
          <p className="font-mono-label inline-flex rounded-full border border-border px-3 py-1">
            <span className="text-gradient">{badge}</span>
          </p>
          <h3 className="font-display text-3xl text-foreground sm:text-4xl">
            {title}
          </h3>
          <p className="text-[0.9375rem] font-medium text-foreground/80">{role}</p>
          <p className="line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">
            {desc}
          </p>
          <TechIconRow ids={meta.tech} />
          {meta.status ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted">
              {meta.status === "private" ? (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <rect x="3" y="7" width="10" height="7" rx="1.5" />
                  <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <circle cx="8" cy="8" r="5.5" />
                  <path d="M8 5v3l2 1.5" />
                </svg>
              )}
              {meta.status === "private" ? t.projects_status_private : t.projects_status_pending}
            </p>
          ) : null}
          {caseStudy || meta.links.length ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {caseStudy ? (
                <Link href={`/work/${caseStudy.slug}/`} className="btn-primary">
                  {t.cs_read} →
                </Link>
              ) : null}
              {meta.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t[link.labelKey]}: ${title}`}
                  className="btn-ghost"
                >
                  {t[link.labelKey]}
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </article>
  );
}
