"use client";

import type { TranslationKey } from "@/app/components/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import { brands, type BrandId } from "@/app/lib/brands";
import { experienceIds, type ExperienceId } from "@/app/lib/site";
import Link from "next/link";
import { useId, useState } from "react";
import { BrandMark } from "../ui/BrandMark";
import { Reveal } from "../ui/Reveal";

/** Internal paths open the case study; external URLs open the live site. */
type Project = ({ brand: BrandId } | { name: string }) & { href?: string };

const entries: Record<
  ExperienceId,
  {
    current?: boolean;
    stats: { value: string; label: TranslationKey }[];
    projects: Project[];
    stack: string[];
    /** Bullet numbers shown behind the toggle; b1 is the summary. */
    details: number[];
  }
> = {
  crm: {
    current: true,
    stats: [
      { value: "50+", label: "exp_crm_s1" },
      { value: "SEO", label: "exp_crm_s2" },
      { value: "E2E", label: "exp_crm_s3" },
    ],
    projects: [{ brand: "crm", href: "/work/crm/" }],
    stack: ["HTML5", "CSS3", "JavaScript", "Cursor", "SEO", "Vercel"],
    details: [2, 3, 4, 5],
  },
  grova: {
    stats: [
      { value: "12", label: "exp_grova_s1" },
      { value: "3", label: "exp_grova_s2" },
      { value: "ES/EN", label: "exp_grova_s3" },
    ],
    projects: [
      { name: "SENDA" },
      { brand: "hmdv", href: "/work/hmdv/" },
      { brand: "fitplus", href: brands.fitplus.href },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Formik",
      "Yup",
      "Zustand",
      "Tailwind CSS",
      "Material UI",
      "REST APIs",
      "JWT",
      "WordPress",
    ],
    details: [2, 3, 4],
  },
};

const chipClass =
  "inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80";

function ProjectChip({ project }: { project: Project }) {
  const { t } = useLanguage();
  const name = "name" in project ? project.name : brands[project.brand].name;
  const content =
    "brand" in project ? (
      <BrandMark id={project.brand} className="h-8! w-auto max-w-28 rounded-none!" />
    ) : (
      name
    );

  if (!project.href) return <span className={chipClass}>{content}</span>;

  const linkClass = `${chipClass} transition-colors hover:border-foreground hover:text-foreground`;
  if (project.href.startsWith("/")) {
    return (
      <Link href={project.href} aria-label={`${t.cs_read}: ${name}`} className={linkClass}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.projects_link_live}: ${name}`}
      className={linkClass}
    >
      {content}
    </a>
  );
}

function ExperienceEntry({ id, index }: { id: ExperienceId; index: number }) {
  const { t } = useLanguage();
  const entry = entries[id];
  const k = (suffix: string) => t[`exp_${id}_${suffix}` as TranslationKey];
  const periodParts = k("period").split(" · ");
  const dates = periodParts.find((p) => /\d/.test(p)) ?? periodParts[0];
  const meta = periodParts.filter((p) => p !== dates);
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <li className="relative pl-9 sm:pl-14">
      <span
        aria-hidden
        className="absolute top-9 left-0 grid h-6 w-6 place-items-center rounded-full border border-border bg-background sm:top-10"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,var(--cat-from),var(--cat-to))]" />
        {entry.current ? (
          <span className="absolute inset-0 animate-ping rounded-full border border-[var(--cat-from)] opacity-40 motion-reduce:hidden" />
        ) : null}
      </span>

      <Reveal
        as="article"
        variant="up"
        delay={index * 120}
        className="rounded-[1.75rem] border border-border bg-background p-5 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.3)] sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-mono-label text-gradient">{dates}</p>
              {entry.current ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--cat-from)_12%,transparent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--cat-ink)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {t.exp_current}
                </span>
              ) : null}
              {meta.length ? <p className="text-xs text-muted">{meta.join(" · ")}</p> : null}
            </div>
            <h3 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">{k("role")}</h3>
            <p className="mt-1 text-base font-medium text-foreground/70">{k("org")}</p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{k("b1")}</p>

            <p className="mt-6 font-mono-label text-muted">{t.exp_projects}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {entry.projects.map((p) => (
                <ProjectChip key={"name" in p ? p.name : p.brand} project={p} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-3 overflow-hidden rounded-2xl border border-border bg-[color-mix(in_srgb,var(--cat-from)_5%,var(--background))]">
              {entry.stats.map((s) => (
                <div key={s.label} className="min-w-0 border-r border-border p-3 last:border-r-0 sm:p-5">
                  <dt className="sr-only">{t[s.label]}</dt>
                  <dd className="hyphens-auto break-words">
                    <span className="block font-display text-xl leading-none text-gradient sm:text-3xl">
                      {s.value}
                    </span>
                    <span className="mt-2 block text-xs leading-snug text-muted">{t[s.label]}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="font-mono-label text-muted">{t.exp_stack}</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {entry.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-md bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)] px-2 py-1 text-xs text-foreground/75"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <div
                id={detailsId}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <ul className="min-h-0 space-y-3 overflow-hidden">
                  {entry.details.map((n, i) => (
                    <li
                      key={n}
                      className={`relative pl-5 text-sm leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[linear-gradient(135deg,var(--cat-from),var(--cat-to))] ${
                        i === 0 ? "pt-1" : ""
                      }`}
                    >
                      {k(`b${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={detailsId}
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                <span
                  aria-hidden
                  className={`grid h-5 w-5 place-items-center rounded-full border border-border text-xs transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
                {open ? t.exp_less : `${entry.details.length} ${t.exp_more}`}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

export function LandingExperience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="cat-violet page-shell py-24 sm:py-32">
      <div className="max-w-2xl space-y-5">
        <Reveal variant="left">
          <p className="section-kicker">{t.nav_experience}</p>
        </Reveal>
        <Reveal variant="blur" delay={100}>
          <h2 className="section-title">{t.landing_exp_title}</h2>
        </Reveal>
        <Reveal variant="up" delay={180}>
          <p className="max-w-lg text-lg leading-relaxed text-muted">{t.landing_exp_subtitle}</p>
        </Reveal>
      </div>

      <ol className="relative mt-14 space-y-6 before:absolute before:top-10 before:bottom-10 before:left-[11px] before:w-px before:bg-[linear-gradient(to_bottom,var(--cat-from),var(--cat-to),transparent)]">
        {experienceIds.map((id, i) => (
          <ExperienceEntry key={id} id={id} index={i} />
        ))}
      </ol>

      <Reveal variant="fade" className="mt-8 pl-10 sm:pl-14">
        <Link href="/resume" prefetch className="btn-text inline-flex min-h-11 items-center">
          {t.exp_full_cv} →
        </Link>
      </Reveal>
    </section>
  );
}
