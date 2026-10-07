"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { caseStudies, type CaseStudy } from "@/app/lib/caseStudies";
import { assetPath } from "@/app/lib/siteUrl";
import { BeforeAfterSlider } from "../ui/BeforeAfterSlider";
import { Reveal } from "../ui/Reveal";
import { ScrollStory } from "../ui/ScrollStory";
import { TechIconRow } from "../ui/TechIcon";

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`hero-rise ${className}`} style={{ ["--rise-delay" as string]: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title?: string }) {
  return (
    <div className="max-w-2xl space-y-4">
      <Reveal variant="left">
        {title ? <p className="section-kicker">{kicker}</p> : <h2 className="section-kicker">{kicker}</h2>}
      </Reveal>
      {title ? (
        <Reveal variant="blur" delay={100}>
          <h2 className="section-title">{title}</h2>
        </Reveal>
      ) : null}
    </div>
  );
}

function BeforeAfterCompare({ pairs }: { pairs: NonNullable<CaseStudy["before"]> }) {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const pair = pairs[active];

  return (
    <figure className="overflow-visible rounded-none">
      <BeforeAfterSlider
        key={pair.image}
        before={assetPath(pair.image)}
        after={assetPath(pair.after)}
        beforeLabel={t.projects_before}
        afterLabel={t.projects_after}
        label={t.projects_compare}
        alt={pair.caption[lang]}
      />
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <figcaption className="max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
          <p className="font-mono-label text-xs">{t.cs_compare_hint}</p>
          <p>
            <span className="font-semibold text-foreground">{t.projects_before}:</span> {pair.caption[lang]}
          </p>
          <p>
            <span className="font-semibold text-foreground">{t.projects_after}:</span> {pair.afterCaption[lang]}
          </p>
        </figcaption>
        {pairs.length > 1 ? (
          <div role="group" aria-label={t.cs_before} className="flex shrink-0 gap-2">
            {pairs.map((p, i) => (
              <button
                key={p.image}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={p.caption[lang]}
                className={`overflow-hidden rounded-lg border-2 transition-[border-color,opacity] duration-200 ${
                  active === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={assetPath(p.after)} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-20 object-cover object-top" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </figure>
  );
}

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, lang } = useLanguage();
  const cs = caseStudies[slug];
  const host = cs.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const hero = cs.story[0];

  return (
    <article className="cat-violet">
      <header className="page-shell pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Rise>
          <Link href="/#work" className="btn-text inline-flex min-h-11 items-center text-sm">
            ← {t.cs_back}
          </Link>
        </Rise>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="space-y-6">
            <Rise>
              <p className="section-kicker">{t.cs_kicker}</p>
            </Rise>
            <Rise delay={100}>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] tracking-tight text-foreground">
                {cs.client}
              </h1>
            </Rise>
            <Rise delay={180}>
              <p className="max-w-xl text-lg leading-relaxed text-muted">{cs.summary[lang]}</p>
            </Rise>
            <Rise delay={240} className="flex flex-wrap gap-3">
              {cs.liveUrl ? (
                <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t.cs_view_live} <span aria-hidden>↗</span>
                </a>
              ) : null}
              <a href="#cs-story" className="btn-ghost">
                {t.cs_solution}
              </a>
            </Rise>
          </div>
          <Rise delay={200}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {cs.facts.map((f) => (
                <div key={f.label.en} className="bg-background p-4 sm:p-5">
                  <dt className="font-mono-label text-muted">{f.label[lang]}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">{f.value[lang]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <TechIconRow ids={cs.tech} />
            </div>
          </Rise>
        </div>
      </header>

      <Reveal variant="clip" className="page-shell">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(140deg,color-mix(in_srgb,var(--cat-from)_16%,var(--surface)),color-mix(in_srgb,var(--cat-to)_14%,var(--surface)))] px-4 pt-8 sm:px-14 sm:pt-14">
          <div className="overflow-hidden rounded-t-xl border border-b-0 border-border bg-background shadow-[0_40px_80px_-40px_rgba(20,20,40,0.45)]">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
              </span>
              {host ? (
                <span className="mx-auto truncate rounded-full bg-surface px-3 py-0.5 text-xs text-muted">{host}</span>
              ) : null}
              <span className="w-10" aria-hidden />
            </div>
            <img
              src={assetPath(hero.image)}
              alt={hero.title[lang]}
              className="aspect-[16/9] w-full object-cover object-top"
            />
          </div>
        </div>
      </Reveal>

      <section className="page-shell grid gap-12 py-24 sm:py-32 lg:grid-cols-2 lg:gap-16" aria-labelledby="cs-challenge">
        <div>
          <SectionHead kicker={t.cs_challenge} />
          <Reveal variant="up" delay={120}>
            <p id="cs-challenge" className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
              {cs.challenge[lang]}
            </p>
          </Reveal>
        </div>
        <div>
          <SectionHead kicker={t.cs_goals} />
          <ol className="mt-6 space-y-3">
            {cs.goals.map((g, i) => (
              <Reveal
                key={g.en}
                as="li"
                variant="up"
                delay={120 + i * 80}
                className="flex gap-4 rounded-2xl border border-border bg-background p-5"
              >
                <span className="font-display text-2xl leading-none text-gradient">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.9375rem] leading-relaxed text-foreground/85">{g[lang]}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {cs.before?.length ? (
        <section className="page-shell pb-24 sm:pb-32" aria-label={t.cs_before}>
          <SectionHead kicker={t.cs_before} />
          <Reveal variant="up" className="mt-10">
            <BeforeAfterCompare pairs={cs.before} />
          </Reveal>
        </section>
      ) : null}

      <section className="page-shell pb-24 sm:pb-32" aria-label={t.cs_process}>
        <SectionHead kicker={t.cs_process} />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {cs.process.map((p, i) => (
            <Reveal key={p.title.en} as="li" variant="up" delay={i * 90} className="bg-background p-6">
              <span className="font-mono-label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl text-foreground">{p.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body[lang]}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="cs-story" className="page-shell pb-16" aria-label={t.cs_solution}>
        <SectionHead kicker={t.cs_solution} />
        <div className="mt-6">
          <ScrollStory steps={cs.story} lang={lang} url={host} />
        </div>
      </section>

      <section className="page-shell pb-24 sm:pb-32" aria-label={t.cs_results}>
        <SectionHead kicker={t.cs_results} />
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {cs.results.map((r, i) => (
            <Reveal key={r.label.en} variant="up" delay={i * 90} className="bg-background p-6 sm:p-8">
              <dt className="sr-only">{r.label[lang]}</dt>
              <dd>
                <span className="block font-display text-4xl leading-none text-gradient sm:text-5xl">{r.value}</span>
                <span className="mt-3 block text-sm text-muted">{r.label[lang]}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
        {cs.resultsNote ? (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{cs.resultsNote[lang]}</p>
        ) : null}
        {cs.evidence ? (
          <Reveal variant="up" className="mt-10">
            <figure className="overflow-visible rounded-none">
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
                <img
                  src={assetPath(cs.evidence.image)}
                  alt={cs.evidence.caption[lang]}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
              </div>
              <figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{cs.evidence.caption[lang]}</figcaption>
            </figure>
          </Reveal>
        ) : null}

        {cs.testimonial ? (
          <Reveal variant="up" as="article" className="mt-10 rounded-2xl border border-border bg-background p-8 sm:p-10">
            <blockquote className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
              “{cs.testimonial.quote[lang]}”
            </blockquote>
            <p className="mt-5 text-sm text-muted">
              <span className="font-semibold text-foreground">{cs.testimonial.author}</span> · {cs.testimonial.role[lang]}
            </p>
          </Reveal>
        ) : null}
      </section>

      <section className="band-ink mx-[clamp(0.5rem,1.4vw,1.25rem)] mb-6 rounded-[clamp(1.5rem,3vw,2.75rem)]">
        <div className="page-shell flex flex-col gap-8 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="section-title !text-background">{t.cs_cta_title}</h2>
            <p className="text-base leading-relaxed opacity-75">{t.cs_cta_body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className="btn-primary">
              {t.hero_cta_contact_primary}
            </Link>
            <Link href="/#work" className="btn-ghost">
              {t.cs_more}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
