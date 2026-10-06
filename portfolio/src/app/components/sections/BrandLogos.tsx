"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { brandIds, brands } from "@/app/lib/brands";
import { BrandMark } from "../ui/BrandMark";
import { Reveal } from "../ui/Reveal";

export function BrandLogos() {
  const { t, lang } = useLanguage();

  return (
    <section className="cat-mint" aria-labelledby="brands-heading">
      <div className="page-shell py-20 sm:py-24">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Reveal variant="left">
              <p className="section-kicker">{t.brands_kicker}</p>
            </Reveal>
            <Reveal variant="blur" delay={100}>
              <h2 id="brands-heading" className="section-title">
                <span className="font-display-italic">{t.brands_title_italic}</span>{" "}
                {t.brands_title_rest}
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up" delay={180}>
            <p className="max-w-sm text-base leading-relaxed text-muted lg:text-right">
              {t.brands_subtitle}
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {brandIds.map((id, i) => {
            const brand = brands[id];
            return (
              <Reveal key={id} as="li" variant="up" delay={i * 90}>
                <a
                  href={brand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${brand.label[lang]} ↗`}
                  className="brand-tile group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-background no-underline transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_srgb,var(--cat-from)_14%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative flex aspect-[4/3] items-center justify-center px-6">
                    <BrandMark
                      id={id}
                      className="w-auto max-w-[80%] opacity-75 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </span>
                  <span className="relative flex items-end justify-between gap-3 border-t border-border px-4 py-3.5 sm:px-5">
                    <span className="min-w-0">
                      <span className="block text-sm leading-snug font-semibold text-foreground">
                        {brand.label[lang]}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-muted">
                        {brand.sector[lang]}
                        <span className="hidden sm:inline"> · {brand.work[lang]}</span>
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-sm text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
