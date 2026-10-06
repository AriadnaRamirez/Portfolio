"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { site } from "@/app/lib/site";
import { assetPath } from "@/app/lib/siteUrl";
import { HandNote } from "../ui/HandNote";
import { Reveal, SplitWords } from "../ui/Reveal";

const photoSrc = assetPath(site.photo);

export function LandingHero() {
  const { t } = useLanguage();
  const [role, ...rest] = t.identity_line.split(" | ");
  const focus = rest.join(" | ").replace(/ · /g, "\u00a0· ");

  const highlights = [
    { label: t.hero_highlight_2_label, value: t.hero_highlight_2_value },
    { label: t.hero_highlight_3_label, value: t.hero_highlight_3_value },
  ];

  return (
    <section className="hero-wash relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <div className="page-shell grid min-h-[calc(100dvh-4.5rem)] grid-cols-1 content-center gap-16 pt-10 pb-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-12">
        <div className="lg:col-span-7">
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

          <div
            className="hero-rise mt-9 flex flex-col gap-3 min-[480px]:flex-row"
            style={{ ["--rise-delay" as string]: "260ms" }}
          >
            <a href="#contact" className="btn-primary">
              {t.hero_cta_contact_primary}
            </a>
            <a href="#work" className="btn-ghost">
              {t.hero_cta_secondary}
            </a>
          </div>

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
                className="object-cover object-center"
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
