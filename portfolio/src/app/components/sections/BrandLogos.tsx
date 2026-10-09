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

        <Reveal variant="fade">
          <ul className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
            {brandIds.map((id) => {
              const brand = brands[id];
              return (
                <li key={id} className="border-b border-border odd:border-r lg:border-r lg:last:border-r-0">
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${brand.label[lang]} ↗`}
                    className="group relative flex h-full flex-col items-center px-4 pt-12 pb-8 text-center no-underline transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)] sm:px-6"
                  >
                    <span
                      aria-hidden
                      className="absolute top-4 right-4 text-sm text-muted opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      ↗
                    </span>
                    <span className="flex h-20 w-full items-center justify-center">
                      <BrandMark
                        id={id}
                        className="w-auto max-w-[78%]"
                      />
                    </span>
                    <span className="mt-10 block text-sm font-medium text-foreground">{brand.label[lang]}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {brand.sector[lang]}
                      <span className="hidden sm:inline"> · {brand.work[lang]}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
