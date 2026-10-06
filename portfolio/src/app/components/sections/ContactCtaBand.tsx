"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { site } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";

export function ContactCtaBand() {
  const { t } = useLanguage();

  return (
    <section className="cat-peach band-ink" aria-labelledby="mid-cta-heading">
      <div className="page-shell flex flex-col gap-8 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-2xl space-y-5">
          <Reveal variant="left">
            <p className="section-kicker">{t.mid_cta_kicker}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
          <h2
            id="mid-cta-heading"
            className="section-title !text-background"
          >
            <span className="font-display-italic">{t.mid_cta_title_italic}</span>{" "}
            {t.mid_cta_title_rest}
          </h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="max-w-lg text-base leading-relaxed opacity-75">
              {t.mid_cta_body}
            </p>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={250} className="flex shrink-0 flex-col gap-3 whitespace-nowrap sm:flex-row">
          <a href="#contact" className="btn-primary">
            {t.hero_cta_contact_primary}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            {t.hero_cta_primary}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
