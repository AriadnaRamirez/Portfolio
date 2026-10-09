"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { TranslationKey } from "@/app/components/lib/translations";
import { caseStudyFor } from "@/app/lib/caseStudies";
import { prefetchShot } from "@/app/lib/shotImage";
import { assetPath } from "@/app/lib/siteUrl";
import { BeforeAfterSlider } from "../ui/BeforeAfterSlider";
import {
  projectBeforeShots,
  projectDesktopShots,
  projectKinds,
  projectMediaPath,
  projectMeta,
  type ProjectId,
} from "@/app/lib/site";

type Dict = Record<TranslationKey, string>;
type Mode = "after" | "before";

function projectUrl(id: ProjectId) {
  const live = projectMeta[id].links.find((l) => l.labelKey === "projects_link_live");
  if (!live) return "";
  return live.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function shotCaption(t: Dict, id: ProjectId, shot: number, mode: Mode = "after") {
  if (mode === "before") return t.projects_before_caption;
  const specific = t[`projects_${id}_shot_${shot}` as TranslationKey];
  return specific ?? `${t.projects_shot_of} ${shot}`;
}

/** Dulce: screenshots are pre-cropped to 15:8. */
function frameAspect(id: ProjectId) {
  return id === "dulce" ? "aspect-[15/8]" : "aspect-[16/10]";
}

const pad = (n: number) => String(n).padStart(2, "0");

/** 240px previews generated under /projects/<id>/thumbs/. */
const thumbOf = (src: string) => src.replace(/\/([^/]+\.webp)$/, "/thumbs/$1");

/** Screenshots have a downscaled copy under /sm/ (840px wide, 300px for phone shots). */
const SHOT_FILE = /\/((desktop|mobile|before|after)-\d+\.webp)$/;
function srcSetOf(src: string) {
  const match = src.match(SHOT_FILE);
  if (!match) return undefined;
  const phone = match[2] === "mobile";
  return `${src.replace(SHOT_FILE, "/sm/$1")} ${phone ? 300 : 840}w, ${src} ${phone ? 780 : 1440}w`;
}

function useShots(count: number) {
  const [shot, setShot] = useState(1);
  const next = useCallback(() => setShot((s) => (s % count) + 1), [count]);
  const prev = useCallback(
    () => setShot((s) => ((s - 2 + count) % count) + 1),
    [count],
  );
  return { shot, setShot, next, prev };
}

/** Horizontal swipe on touch/pen; mouse drags are ignored so clicks stay clicks. */
function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<number | null>(null);
  return {
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") start.current = e.clientX;
    },
    onPointerUp: (e: PointerEvent) => {
      if (start.current === null) return;
      const dx = e.clientX - start.current;
      start.current = null;
      if (Math.abs(dx) < 40) return;
      if (dx > 0) onPrev();
      else onNext();
    },
  };
}

function BrowserChrome({ url, children, aspect }: { url: string; children: ReactNode; aspect: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-[0_30px_60px_-30px_rgba(20,20,40,0.35)]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 sm:px-4 sm:py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-border sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-border sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-border sm:h-2.5 sm:w-2.5" />
        </span>
        {url ? (
          <div className="mx-auto min-w-0 max-w-[60%] truncate rounded-full bg-surface px-3 py-0.5 text-center text-[0.65rem] tracking-wide text-muted sm:text-xs">
            {url}
          </div>
        ) : (
          <span className="flex-1" aria-hidden />
        )}
        <span className="w-8 sm:w-10" aria-hidden />
      </div>
      <div className={`relative overflow-hidden bg-surface ${aspect}`}>{children}</div>
    </div>
  );
}

function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.4rem] border-[0.35rem] border-foreground bg-foreground shadow-[0_24px_40px_-20px_rgba(20,20,40,0.5)]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.05rem] bg-surface">
        {children}
      </div>
    </div>
  );
}

/**
 * Only the active shot loads at first; once someone switches shots, its
 * neighbours mount too and stay mounted to crossfade without flashing empty.
 */
function ShotStack({
  srcs,
  active,
  title,
  sizes,
  priority,
  fit = "cover",
}: {
  srcs: string[];
  active: number;
  title: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const count = srcs.length;
  const wrap = (n: number) => ((n - 1 + count) % count) + 1;
  const [mounted, setMounted] = useState(() => new Set([active]));
  const initial = useRef(active);
  const moved = useRef(false);

  useEffect(() => {
    if (active === initial.current && !moved.current) return;
    moved.current = true;
    setMounted((prev) => {
      const near = [wrap(active - 1), active, wrap(active + 1)];
      if (near.every((n) => prev.has(n))) return prev;
      return new Set([...prev, ...near]);
    });
  }, [active, count]);

  return (
    <>
      {srcs.map((src, i) => {
        const n = i + 1;
        if (n !== active && !mounted.has(n)) return null;
        const eager = priority && n === 1;
        return (
          // eslint-disable-next-line @next/next/no-img-element -- static export can't resize, so variants are prebuilt in /sm/
          <img
            key={src}
            src={src}
            srcSet={srcSetOf(src)}
            alt={n === active ? `${title} — ${n}/${srcs.length}` : ""}
            aria-hidden={n !== active}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
            className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover object-top"} transition-opacity duration-500 ease-out ${
              n === active ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </>
  );
}

function ArrowButton({
  dir,
  onClick,
  label,
  tone = "light",
}: {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
  tone?: "light" | "dark";
}) {
  const toneClass =
    tone === "dark"
      ? "border-white/25 text-white hover:bg-white hover:text-black"
      : "border-border text-foreground hover:border-foreground hover:bg-foreground hover:text-background";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 ${toneClass}`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        {dir === "prev" ? <path d="M10 3 5 8l5 5" /> : <path d="m6 3 5 5-5 5" />}
      </svg>
    </button>
  );
}

function Lightbox({
  title,
  t,
  srcs,
  caption,
  shot,
  setShot,
  onPrev,
  onNext,
  onClose,
}: {
  title: string;
  t: Dict;
  srcs: string[];
  caption: (shot: number) => string;
  shot: number;
  setShot: (n: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useSwipe(onPrev, onNext);
  const count = srcs.length;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[#0d0d10]/95 text-white backdrop-blur-md animate-fade"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p id={titleId} className="min-w-0 truncate text-sm">
          <span className="font-display text-base">{title}</span>
          <span className="ml-3 text-white/50">{caption(shot)}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.projects_lightbox_close}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-black"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="m3.5 3.5 9 9m0-9-9 9" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
        {...swipe}
      >
        <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
          <div className="relative aspect-[16/10] max-h-[72dvh] overflow-hidden rounded-lg">
            <ShotStack srcs={srcs} active={shot} title={title} sizes="100vw" priority fit="contain" />
          </div>
        </div>
        {count > 1 ? (
          <>
            <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 sm:block" onClick={(e) => e.stopPropagation()}>
              <ArrowButton dir="prev" onClick={onPrev} label={t.projects_lightbox_prev} tone="dark" />
            </div>
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 sm:block" onClick={(e) => e.stopPropagation()}>
              <ArrowButton dir="next" onClick={onNext} label={t.projects_lightbox_next} tone="dark" />
            </div>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          className="flex items-center justify-center gap-2 overflow-x-auto px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          onClick={(e) => e.stopPropagation()}
        >
          {srcs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setShot(i + 1)}
              aria-label={caption(i + 1)}
              aria-current={i + 1 === shot}
              className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md transition duration-200 sm:h-14 sm:w-24 ${
                i + 1 === shot ? "opacity-100 ring-2 ring-white" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image src={thumbOf(src)} alt="" fill unoptimized sizes="96px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type ProjectGalleryProps = {
  id: ProjectId;
  title: string;
  t: Dict;
  compact?: boolean;
};

export function ProjectGallery({ id, title, t, compact = false }: ProjectGalleryProps) {
  const afterShots = projectDesktopShots(id);
  const beforeShots = projectBeforeShots(id);
  const [mode, setMode] = useState<Mode>("after");
  const srcs = mode === "before" ? beforeShots : afterShots;
  const count = srcs.length;
  const hasMobile = projectKinds(id).includes("mobile") && mode === "after";
  const { shot, setShot, next, prev } = useShots(count);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const swipe = useSwipe(prev, next);
  const url = projectUrl(id);
  const aspect = frameAspect(id);
  const caption = (n: number) => shotCaption(t, id, n, mode);
  const comparePair = mode === "before" ? caseStudyFor(id)?.before?.[shot - 1] : undefined;

  useEffect(() => {
    const shots = projectBeforeShots(id);
    if (!shots.length) return;
    const timer = window.setTimeout(() => {
      shots.forEach((src) => prefetchShot(src));
    }, 400);
    return () => window.clearTimeout(timer);
  }, [id]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setShot(1);
  };

  if (compact) {
    return (
      <BrowserChrome url={url} aspect={aspect}>
        <ShotStack srcs={afterShots.slice(0, 1)} active={1} title={title} sizes="(max-width: 768px) 100vw, 40vw" />
      </BrowserChrome>
    );
  }

  return (
    <div className="min-w-0">
      {beforeShots.length ? (
        <div
          role="group"
          aria-label={t.projects_compare}
          className="mb-3 inline-flex rounded-full border border-border bg-background p-1 text-xs font-medium"
        >
          {(["after", "before"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              aria-pressed={mode === m}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors duration-200 ${
                mode === m ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {m === "before" ? (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
                </svg>
              ) : null}
              {m === "after" ? t.projects_current : t.projects_view_compare}
            </button>
          ))}
        </div>
      ) : null}

      <div
        className={`relative overflow-hidden rounded-2xl bg-[linear-gradient(140deg,color-mix(in_srgb,var(--cat-from,var(--grad-from))_14%,var(--surface)),color-mix(in_srgb,var(--cat-to,var(--grad-to))_12%,var(--surface)))] px-4 pt-6 sm:px-10 sm:pt-10 ${
          hasMobile ? "pb-10 sm:pb-14" : "pb-0"
        }`}
        {...(comparePair ? {} : swipe)}
      >
        {comparePair ? (
          <div className="translate-y-px [&>div]:rounded-b-none [&>div]:border-b-0">
            <BrowserChrome url={url} aspect={aspect}>
              <BeforeAfterSlider
                key={comparePair.image}
                before={srcs[shot - 1]}
                after={assetPath(comparePair.after)}
                beforeLabel={t.projects_before}
                afterLabel={t.projects_current}
                label={t.projects_compare}
                alt={title}
                className="h-full aspect-auto! rounded-none! border-0!"
              />
            </BrowserChrome>
          </div>
        ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          <div
            className={`gallery-rise transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 motion-reduce:group-hover:translate-y-0 ${
              hasMobile ? "" : "translate-y-px [&>div]:rounded-b-none [&>div]:border-b-0"
            }`}
          >
            <BrowserChrome url={url} aspect={aspect}>
              <ShotStack
                key={mode}
                srcs={srcs}
                active={shot}
                title={title}
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </BrowserChrome>
          </div>
          {mode === "before" ? (
            <span className="pointer-events-none absolute top-12 left-3 rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium text-background backdrop-blur sm:top-14">
              {t.projects_before}
            </span>
          ) : null}
          <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/85 px-3 py-1.5 text-xs font-medium text-background opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />
            </svg>
            {t.projects_lightbox_open}
          </span>
        </button>
        )}

        {hasMobile ? (
          <div className="pointer-events-none absolute right-4 bottom-4 w-[22%] max-w-[9.5rem] sm:right-8 sm:bottom-6">
            <PhoneChrome>
              <ShotStack
                srcs={afterShots.map((_, i) => projectMediaPath(id, "mobile", i + 1))}
                active={shot}
                title={title}
                sizes="(max-width: 640px) 90px, 150px"
              />
            </PhoneChrome>
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none]">
            {srcs.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setShot(i + 1)}
                aria-label={caption(i + 1)}
                aria-current={i + 1 === shot}
                className={`relative h-11 w-16 shrink-0 overflow-hidden rounded-md border transition duration-200 sm:h-12 sm:w-[4.5rem] ${
                  i + 1 === shot
                    ? "border-foreground opacity-100"
                    : "border-border opacity-55 hover:opacity-90"
                }`}
              >
                <Image
                  src={thumbOf(src)}
                  alt=""
                  fill
                  unoptimized
                  sizes="72px"
                  loading="lazy"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
          <p className="hidden shrink-0 font-mono-label tabular-nums text-muted sm:block">
            {pad(shot)} / {pad(count)}
          </p>
          <div className="flex shrink-0 gap-2">
            <ArrowButton dir="prev" onClick={prev} label={t.projects_lightbox_prev} />
            <ArrowButton dir="next" onClick={next} label={t.projects_lightbox_next} />
          </div>
        </div>
      ) : null}

      {open
        ? createPortal(
            <Lightbox
              title={title}
              t={t}
              srcs={srcs}
              caption={caption}
              shot={shot}
              setShot={setShot}
              onPrev={prev}
              onNext={next}
              onClose={close}
            />,
            document.body,
          )
        : null}
    </div>
  );
}
