"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { caseStudies } from "@/app/lib/caseStudies";
import { navPages, site } from "@/app/lib/site";
import { SocialIcon } from "../ui/SocialIcon";

const linkClass = "text-sm text-white/65 transition-colors duration-200 hover:text-white";
const iconLinkClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white hover:text-white";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-auto bg-[#111113] text-white dark:bg-[#0b0b0c]">
      <div
        aria-hidden
        className="h-px w-full bg-[linear-gradient(90deg,transparent,var(--tone-green)_12%,var(--grad-from)_38%,var(--grad-to)_62%,var(--tone-orange)_88%,transparent)] opacity-70"
      />

      {/* Bottom padding clears the floating nav pill. */}
      <div className="page-shell pt-12 pb-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-1 text-sm text-white/55">Fullstack Web Developer · React · TypeScript · UX/UI</p>
          </div>

          <div className="flex items-center gap-2">
            <a href={`mailto:${site.email}`} aria-label="Email" className={iconLinkClass}>
              <SocialIcon kind="email" className="h-4 w-4" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLinkClass}>
              <SocialIcon kind="linkedin" className="h-4 w-4" />
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLinkClass}>
              <SocialIcon kind="github" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav
          aria-label={t.footer_nav}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6"
        >
          {navPages.map((page) => (
            <Link key={page.href} href={page.href} prefetch className={linkClass}>
              {t[page.key]}
            </Link>
          ))}
          <Link href="/resume" prefetch className={linkClass}>
            {t.nav_resume_view}
          </Link>
        </nav>

        <nav
          aria-label={t.footer_case_studies}
          className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2"
        >
          <span className="text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
            {t.footer_case_studies}
          </span>
          {Object.values(caseStudies).map((cs) => (
            <Link key={cs.slug} href={`/work/${cs.slug}/`} prefetch className={linkClass}>
              {cs.client}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/mapa-del-sitio" prefetch className="transition-colors hover:text-white">
              {t.footer_sitemap}
            </Link>
            <a href="#main-content" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              {t.footer_top}
              <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
