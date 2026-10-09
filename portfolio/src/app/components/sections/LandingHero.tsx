"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { site } from "@/app/lib/site";
import { assetPath } from "@/app/lib/siteUrl";
import { Flag } from "../ui/Flag";
import { HandNote } from "../ui/HandNote";
import { SocialIcon } from "../ui/SocialIcon";
import { Reveal, SplitWords } from "../ui/Reveal";

const photoSrc = assetPath(site.photo);

const socials = [
  { kind: "linkedin", label: "LinkedIn", href: site.linkedin },
  { kind: "github", label: "GitHub", href: site.github },
  { kind: "email", label: site.email, href: `mailto:${site.email}` },
  { kind: "whatsapp", label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` },
] as const;

export function LandingHero() {
  const { t } = useLanguage();
  const [role, ...rest] = t.identity_line.split(" | ");
  const focus = rest.join(" | ").replace(/ · /g, "\u00a0· ");

  const highlights = [
    {
      label: t.hero_highlight_2_label,
      value: (
        <>
          {t.hero_highlight_2_value}
          <span className="mt-1.5 block text-xs font-normal text-muted">{t.hero_timezone}</span>
        </>
      ),
    },
    {
      label: t.hero_highlight_3_label,
      value: (
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2">
            <Flag country="mx" />
            <span>
              {t.hero_lang_es} <span className="font-normal text-muted">· {t.hero_lang_es_level}</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Flag country="us" className="mt-[0.2rem] h-3.5 w-5" />
            <span>
              {t.hero_lang_en} <span className="font-normal text-muted">· {t.hero_lang_en_level}</span>
              <span className="block text-xs font-normal text-muted">{t.hero_lang_toefl}</span>
            </span>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <section className="hero-wash relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <div className="page-shell grid min-h-[calc(100dvh-4.5rem)] grid-cols-1 content-center gap-16 pt-10 pb-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-12">
        <div className="lg:col-span-7">
          <p className="hero-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.hero_open_to}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.02] text-foreground"
          >
            <SplitWords text={role} gradient={focus} delay={60} instant />
          </h1>

          <p
            className="hero-rise mt-7 max-w-[34rem] text-lg leading-[1.6] text-muted"
            style={{ ["--rise-delay" as string]: "150ms" }}
          >
            {t.agency_hero_subtitle}
          </p>
          <p
            className="hero-rise mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-foreground"
            style={{ ["--rise-delay" as string]: "200ms" }}
          >
            {t.hero_client_line}{" "}
            <a href="#services" className="group inline-flex items-center gap-1 font-semibold text-[var(--cat-ink,currentColor)] underline decoration-1 underline-offset-4 hover:decoration-2">
              {t.hero_client_link}
              <span aria-hidden className="btn-arrow">→</span>
            </a>
          </p>

          <div
            className="hero-rise mt-9 flex flex-col gap-3 min-[480px]:flex-row"
            style={{ ["--rise-delay" as string]: "260ms" }}
          >
            <Link href="/resume" className="btn-primary" data-umami-event="hero-cv">
              {t.hero_cta_cv}
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
            <a href="#services" className="btn-ghost" data-umami-event="hero-quote">
              {t.hero_cta_quote}
            </a>
          </div>

          <ul
            className="hero-rise mt-6 flex items-center gap-2"
            style={{ ["--rise-delay" as string]: "310ms" }}
          >
            {socials.map((s) => (
              <li key={s.kind}>
                <a
                  href={s.href}
                  {...(s.kind === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-foreground hover:text-foreground"
                >
                  <SocialIcon kind={s.kind} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <dl className="mt-12 grid max-w-md grid-cols-2 gap-6">
              {highlights.map((item, i) => (
                <div
                  key={item.label}
                  className="hero-rise"
                  style={{ ["--rise-delay" as string]: `${360 + i * 90}ms` }}
                >
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-semibold text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="hero-clip">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-card)]">
              <Image
                src={photoSrc}
                alt={`${site.name} — ${t.identity_line}`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 90vw, 36vw"
                className="hero-parallax object-cover object-center"
              />
            </figure>
          </div>

          <Reveal variant="drop" delay={900} className="absolute -top-12 left-2 hidden sm:block">
            <HandNote arrow="down-right" color="var(--hero-note-1)" className="-rotate-3">
              {t.hero_note_me}
            </HandNote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
