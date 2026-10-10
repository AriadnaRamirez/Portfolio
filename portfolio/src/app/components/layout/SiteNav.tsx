"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { navPages, site } from "@/app/lib/site";
import { assetPath } from "@/app/lib/siteUrl";
import { ResumeDownloadButton } from "../resume/ResumeDownloadButton";
import { LangToggle } from "../navbar/LangToggle";
import { ThemeToggle } from "../navbar/ThemeToggle";

const avatarSrc = assetPath(site.avatar);
const pillLinksDesktop = new Set(["/#work", "/#services", "/#about", "/#experience"]);
/** Sections without their own pill light up the closest one instead. */
const pillFallback: Record<string, string> = { skills: "experience", education: "experience", certs: "experience" };

function sectionIdFromHref(href: string) {
  const hash = href.includes("#") ? href.split("#")[1] : "";
  return hash || null;
}

export function SiteNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);

  useEffect(() => {
    let last = window.scrollY > 12;
    setScrolled(last);
    const onScroll = () => {
      const next = window.scrollY > 12;
      if (next === last) return;
      last = next;
      setScrolled(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash(null);
      return;
    }

    const ids = navPages
      .map((link) => sectionIdFromHref(link.href))
      .filter((id): id is string => Boolean(id));

    const update = () => {
      const offset = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveHash(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    const section = sectionIdFromHref(href);
    if (section) return pathname === "/" && activeHash === section;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        {t.nav_skip}
      </a>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className={`transition-[padding] duration-300 ease-out ${scrolled ? "px-3 pt-3 sm:px-5" : ""}`}>
        <div
          className={`transition-[border-radius,box-shadow,background-color] duration-300 ease-out ${
            scrolled
              ? "mx-auto w-fit max-w-full rounded-full border border-white/60 bg-background/80 shadow-[0_16px_40px_-20px_rgba(20,20,40,0.45)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-background/70"
              : "border-b border-white/50 bg-background/70 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-background/55"
          }`}
        >
        <nav className={`flex items-center ${scrolled ? "gap-1.5 p-1.5" : "page-shell justify-between gap-3 py-4 lg:py-3"}`}>
          <Link
            href="/"
            prefetch
            className="inline-flex shrink-0 items-center gap-2.5 font-display text-lg tracking-tight text-foreground no-underline sm:text-xl"
            onClick={() => setOpen(false)}
          >
            <span className={`relative h-8 w-8 overflow-hidden ring-1 ring-border ${scrolled ? "rounded-full" : "rounded-[0.6rem]"}`}>
              <Image src={avatarSrc} alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span className={scrolled ? "sr-only" : undefined}>{site.name}</span>
          </Link>

          <div className={`min-w-0 items-center gap-0.5 ${scrolled ? "flex" : "hidden lg:flex"}`}>
            {navPages
              .filter((link) => pillLinksDesktop.has(link.href))
              .map((link) => {
                const active =
                  isLinkActive(link.href) ||
                  (pathname === "/" && activeHash != null && `/#${pillFallback[activeHash]}` === link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch
                    className={`rounded-full px-2.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 sm:px-3 ${
                      link.href === "/#about" || link.href === "/#experience" ? "hidden lg:inline-flex" : "inline-flex"
                    } ${
                      active ? "bg-foreground/8 text-foreground" : "text-muted hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    {t[link.key]}
                  </Link>
                );
              })}
            <Link
              href="/#contact"
              prefetch
              className="ml-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-background transition-transform duration-200 motion-safe:hover:-translate-y-px"
            >
              {t.hero_cta_contact_primary}
            </Link>
          </div>

          <div className={`flex shrink-0 items-center gap-2 sm:gap-3 ${scrolled ? "lg:hidden" : ""}`}>
            <div className={`items-center gap-2 ${scrolled ? "hidden" : "hidden sm:flex"}`}>
              <LangToggle />
              <ThemeToggle />
            </div>
            <span className={scrolled ? "hidden" : "hidden md:inline-flex"}>
              <ResumeDownloadButton className="btn-ghost !min-h-9 !px-4 !py-1.5 !text-sm" />
            </span>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:bg-surface-2 lg:hidden"
              aria-expanded={open}
              aria-label={open ? t.nav_close : t.nav_open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>
        </div>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
            open ? "max-h-[44rem] border-t border-border bg-background/95 opacity-100 backdrop-blur-xl" : "max-h-0 opacity-0"
          }`}
        >
          <div className="page-shell flex flex-col gap-1 py-5">
            {navPages.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                  isLinkActive(link.href) ? "bg-surface-2 text-foreground" : "text-muted"
                }`}
              >
                {t[link.key]}
              </Link>
            ))}
            <div className="mt-3 max-w-xs">
              <ResumeDownloadButton className="btn-primary" />
            </div>
            <div className="mt-4 flex gap-2 sm:hidden">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[4.25rem] lg:h-16" />
    </>
  );
}
