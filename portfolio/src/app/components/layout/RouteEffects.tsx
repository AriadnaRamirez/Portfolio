"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import {
  captureLandingPosition,
  consumeLandingRestore,
  readLandingPosition,
  restoreLandingPosition,
} from "@/app/lib/landingScroll";

/*
 * Sections render lazily (content-visibility), so a long jump to an anchor can
 * land off by the difference between estimated and real heights. Once the
 * scroll settles, snap the target back to its intended position.
 */
let settleTimer = 0;

const USER_SCROLL = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

function stopSettling() {
  window.clearTimeout(settleTimer);
  USER_SCROLL.forEach((type) => window.removeEventListener(type, stopSettling));
}

function settleOn(id: string, tries = 10) {
  const el = document.getElementById(id);
  if (!el) return stopSettling();
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (Math.abs(el.getBoundingClientRect().top - margin) > 4) {
    el.scrollIntoView({ behavior: "instant", block: "start" });
  }
  // Sections rendered by the jump can still shift the target for a few frames.
  if (tries > 1) settleTimer = window.setTimeout(() => settleOn(id, tries - 1), 100);
  else stopSettling();
}

let returning = false;
let ignoreAnchorsUntil = 0;

if (typeof window !== "undefined") {
  window.addEventListener(
    "popstate",
    () => {
      returning = true;
      ignoreAnchorsUntil = performance.now() + 1400;
      stopSettling();
    },
    true,
  );
}

function watchAnchor(id: string) {
  if (performance.now() < ignoreAnchorsUntil) return;
  window.clearTimeout(settleTimer);
  const done = () => {
    window.removeEventListener("scrollend", done);
    window.clearTimeout(settleTimer);
    USER_SCROLL.forEach((type) => window.addEventListener(type, stopSettling, { passive: true }));
    window.requestAnimationFrame(() => settleOn(id));
  };
  window.addEventListener("scrollend", done, { once: true });
  settleTimer = window.setTimeout(done, 1200);
}

export function RouteEffects({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (pathname !== "/") return;
    captureLandingPosition();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => captureLandingPosition());
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute("href") ?? "";
      if (!href || href.startsWith("#")) return;
      try {
        const url = new URL(a.href, window.location.href);
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          captureLandingPosition();
        }
      } catch {
        /* ignore odd hrefs */
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    const fromHistory = returning;
    returning = false;
    const flagged = consumeLandingRestore();
    const saved = readLandingPosition();

    if (first.current) {
      first.current = false;
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (nav?.type === "back_forward" && saved) {
        ignoreAnchorsUntil = performance.now() + 1400;
        stopSettling();
        restoreLandingPosition();
        return;
      }
      if (id) watchAnchor(id);
      return;
    }

    if (pathname === "/" && (fromHistory || flagged) && saved) {
      ignoreAnchorsUntil = performance.now() + 1400;
      stopSettling();
      restoreLandingPosition();
      return;
    }
    if (id) {
      watchAnchor(id);
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element | null)?.closest?.("a[href*='#']")?.getAttribute("href");
      const id = href?.split("#")[1];
      if (id) watchAnchor(id);
    };
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (id) watchAnchor(id);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      stopSettling();
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <div key={pathname} className="page-enter flex min-h-0 flex-1 flex-col">
      {children}
    </div>
  );
}
