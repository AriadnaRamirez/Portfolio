"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { navPages, site } from "@/app/lib/site";
import { SocialIcon } from "../ui/SocialIcon";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="page-shell grid gap-8 py-10 sm:grid-cols-[1.2fr_1fr] sm:items-start lg:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <p className="font-display text-2xl text-foreground">{site.name}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
            {t.footer_tagline}
          </p>
          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {navPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                prefetch
                className="text-xs uppercase tracking-[0.14em] text-muted transition hover:text-highlight"
              >
                {t[page.key]}
              </Link>
            ))}
            <Link
              href="/resume"
              prefetch
              className="text-xs uppercase tracking-[0.14em] text-muted transition hover:text-highlight"
            >
              {t.nav_resume}
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.14em] text-muted">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-highlight"
          >
            <SocialIcon kind="linkedin" className="h-3.5 w-3.5" />
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-highlight"
          >
            <SocialIcon kind="github" className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex max-w-full items-center gap-2 break-all normal-case tracking-normal transition hover:text-highlight"
          >
            <SocialIcon kind="email" className="h-3.5 w-3.5 shrink-0" />
            {site.email}
          </a>
        </div>

        <p className="text-xs text-muted sm:col-span-2 lg:col-span-1 lg:justify-self-end">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
