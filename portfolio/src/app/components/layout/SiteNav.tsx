"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { navPages } from "@/app/lib/site";
import { ResumeDownloadButton } from "../resume/ResumeDownloadButton";
import { LangToggle } from "../navbar/LangToggle";
import { ThemeToggle } from "../navbar/ThemeToggle";

export function SiteNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="page-shell flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          prefetch
          className="group flex flex-col no-underline"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-xl leading-none tracking-tight text-foreground transition group-hover:text-highlight sm:text-2xl sm:text-[1.65rem]">
            Ariadna Ramírez
          </span>
          <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
            {t.identity_line}
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navPages.map((link) => {
            const href =
              link.href === "/contact" && pathname === "/"
                ? "/#contact"
                : link.href;
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={href}
                  prefetch
                  className={`relative px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition ${
                    active
                      ? "text-highlight"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {t[link.key]}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-highlight transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ResumeDownloadButton className="btn-primary hidden !min-h-9 !w-auto !px-3 !py-2 !text-[0.62rem] sm:inline-flex" />
          <Link
            href="/resume"
            prefetch
            className={`hidden text-[0.7rem] font-semibold uppercase tracking-[0.16em] lg:inline-flex ${
              pathname === "/resume"
                ? "text-highlight"
                : "text-muted hover:text-highlight"
            }`}
          >
            {t.nav_resume}
          </Link>
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-border-strong text-xs font-semibold uppercase tracking-wider transition hover:border-highlight hover:text-highlight lg:hidden"
            aria-expanded={open}
            aria-label={open ? t.nav_close : t.nav_open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-border transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[36rem] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="page-shell flex flex-col gap-1 py-4">
          {navPages.map((link) => {
            const href =
              link.href === "/contact" && pathname === "/"
                ? "/#contact"
                : link.href;
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={href}
                prefetch
                onClick={() => setOpen(false)}
                className={`px-1 py-3 text-sm font-medium uppercase tracking-[0.14em] transition ${
                  active ? "text-highlight" : "text-foreground"
                }`}
              >
                {t[link.key]}
              </Link>
            );
          })}
          <Link
            href="/resume"
            prefetch
            onClick={() => setOpen(false)}
            className={`px-1 py-3 text-sm font-medium uppercase tracking-[0.14em] transition ${
              pathname === "/resume" ? "text-highlight" : "text-foreground"
            }`}
          >
            {t.nav_resume}
          </Link>
          <div className="mt-2 sm:hidden">
            <ResumeDownloadButton className="btn-primary" />
          </div>
          <div className="mt-3 flex gap-2 sm:hidden">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
