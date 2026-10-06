"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { site, stackGroups } from "@/app/lib/site";
import { ResumeDownloadButton } from "../resume/ResumeDownloadButton";
import { SocialIcon } from "../ui/SocialIcon";
import { TechIconRow } from "../ui/TechIcon";

export function Hero() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const contactHref = pathname === "/" ? "#contact" : "/contact";

  return (
    <section className="page-shell relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
        <div className="animate-rise space-y-8">
          <div className="space-y-4">
            <p className="section-kicker">{t.hero_kicker}</p>
            <div className="rule-accent" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
              {t.hero_role}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,9vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-foreground">
              {site.name}
            </h1>
            <p className="max-w-xl font-display text-2xl font-normal leading-snug text-highlight sm:text-3xl">
              {t.hero_title}
            </p>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero_subtitle}
          </p>

          <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <SocialIcon kind="linkedin" className="h-3.5 w-3.5" />
              {t.hero_cta_primary}
            </a>
            <Link href="/work" prefetch className="btn-ghost">
              {t.hero_cta_secondary}
            </Link>
            <ResumeDownloadButton className="btn-ghost" />
            <a href={contactHref} className="btn-text self-center px-1 min-[480px]:px-2">
              {t.hero_cta_contact} →
            </a>
          </div>
        </div>

        <aside className="animate-rise-delay space-y-8 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
              {t.hero_stack_label}
            </p>
            <TechIconRow
              className="mt-4"
              ids={[
                ...stackGroups.frontend.slice(0, 3),
                ...stackGroups.backend.slice(0, 3),
              ]}
            />
          </div>

          <dl className="space-y-5">
            {[
              {
                label: t.hero_highlight_1_label,
                value: t.hero_highlight_1_value,
              },
              {
                label: t.hero_highlight_2_label,
                value: t.hero_highlight_2_value,
              },
              {
                label: t.hero_highlight_3_label,
                value: t.hero_highlight_3_value,
              },
            ].map((item) => (
              <div key={item.label} className="grid gap-1">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-highlight">
                  {item.label}
                </dt>
                <dd className="text-sm text-foreground sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {t.hero_location}
          </p>
        </aside>
      </div>
    </section>
  );
}
