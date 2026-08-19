"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { navPages } from "@/app/lib/site";

export function PagePager() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const index = navPages.findIndex((page) => page.href === pathname);

  // Home already ends with contact; skip pager there for a cleaner close.
  if (index < 0 || pathname === "/" || pathname === "/resume") return null;

  const prev = index > 0 ? navPages[index - 1] : null;
  const next = index < navPages.length - 1 ? navPages[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Pagination"
      className="page-shell border-t border-border py-8"
    >
      <div className="flex items-stretch justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            prefetch
            className="group flex min-w-0 flex-1 flex-col gap-1 border border-transparent px-1 py-2 transition hover:border-border"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
              ← {t.pager_prev}
            </span>
            <span className="truncate font-display text-xl text-foreground transition group-hover:text-highlight sm:text-2xl">
              {t[prev.key]}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={next.href}
            prefetch
            className="group flex min-w-0 flex-1 flex-col items-end gap-1 border border-transparent px-1 py-2 text-right transition hover:border-border"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
              {t.pager_next} →
            </span>
            <span className="truncate font-display text-xl text-foreground transition group-hover:text-highlight sm:text-2xl">
              {t[next.key]}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
