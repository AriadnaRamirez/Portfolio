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
const pillLinksMobile = new Set(["/#work", "/#skills", "/#contact"]);

function sectionIdFromHref(href: string) {
  const hash = href.includes("#") ? href.split("#")[1] : "";
  return hash || null;
}

export function SiteNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);

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
      <header className="relative z-40 bg-background">
        <nav className="page-shell flex items-center justify-between gap-4 py-5">
          <Link
            href="/"
            prefetch
            className="inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold tracking-tight text-foreground no-underline"
            onClick={() => setOpen(false)}
          >
            <span className="relative h-8 w-8 overflow-hidden rounded-[0.6rem] ring-1 ring-border">
              <Image src={avatarSrc} alt="" fill sizes="32px" className="object-cover" />
            </span>
            {site.name}
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <LangToggle />
              <ThemeToggle />
            </div>
            <span className="hidden md:inline-flex">
              <ResumeDownloadButton className="btn-ghost !min-h-9 !px-4 !py-1.5 !text-sm" />
            </span>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:bg-surface-2 md:hidden"
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

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            open ? "max-h-[36rem] border-t border-border opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="page-shell flex flex-col gap-1 py-5">
            {[...navPages, { href: "/resume", key: "nav_resume" as const }].map((link) => (
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

      <nav
        aria-label={t.nav_open}
        className="floating-nav animate-rise-delay fixed bottom-5 left-1/2 z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#2b2b2b]/90 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
      >
        <Link
          href="/"
          prefetch
          aria-label={site.name}
          className="relative mr-1 h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20"
        >
          <Image src={avatarSrc} alt="" fill sizes="32px" className="object-cover" />
        </Link>
        {navPages
          .filter((link) => link.href !== "/#contact")
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className={`rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                pillLinksMobile.has(link.href) ? "" : "hidden lg:inline-flex"
              } ${
                isLinkActive(link.href)
                  ? "bg-white/12 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t[link.key]}
            </Link>
          ))}
        <Link
          href="/#contact"
          prefetch
          className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold whitespace-nowrap text-[#242424] transition-colors duration-200 hover:bg-white/90"
        >
          {t.hero_cta_contact_primary}
        </Link>
      </nav>
    </>
  );
}
