"use client";

import type { Lang, TranslationKey } from "@/app/components/lib/translations";
import { projectMeta, type ProjectId } from "@/app/lib/site";
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

  if (compact) {
    return (
      <article className="grid gap-5 py-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-8 lg:gap-10 md:py-10">
        <div className="order-2 min-w-0 space-y-3 md:order-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-highlight">
            {badge}
          </p>
          <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="text-sm text-muted">{role}</p>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {desc}
          </p>
          <TechIconRow ids={meta.tech.slice(0, 4)} />
        </div>
        <div className="order-1 min-w-0 md:order-2">
          <ProjectGallery id={id} title={title} t={t} compact />
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-border py-8 last:border-b-0 sm:py-12 lg:py-14">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="order-2 min-w-0 space-y-3 sm:space-y-4 lg:order-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-highlight">
            {badge}
          </p>
          <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="text-sm text-muted sm:text-base">{role}</p>
          <p className="text-sm leading-relaxed text-muted sm:text-base">{desc}</p>
          <TechIconRow ids={meta.tech} />
          {meta.links.length > 0 ? (
            <div className="flex flex-wrap gap-4 pt-1">
              {meta.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text inline-flex min-h-11 items-center"
                >
                  {t[link.labelKey]} →
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <ProjectGallery id={id} title={title} t={t} />
        </div>
      </div>
    </article>
  );
}
