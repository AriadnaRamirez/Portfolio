"use client";

import Image from "next/image";
import { useEffect, useId, useState, type ReactNode } from "react";
import type { TranslationKey } from "@/app/components/lib/translations";
import {
  projectKinds,
  projectMediaPath,
  projectMeta,
  projectShotCount,
  type MediaKind,
  type ProjectId,
} from "@/app/lib/site";

type Dict = Record<TranslationKey, string>;

const labelKey: Record<MediaKind, TranslationKey> = {
  desktop: "projects_media_desktop",
  tablet: "projects_media_tablet",
  mobile: "projects_media_mobile",
};

function projectUrl(id: ProjectId) {
  const live = projectMeta[id].links.find((l) => l.labelKey === "projects_link_live");
  if (!live) return "portfolio";
  return live.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function shotCaption(t: Dict, id: ProjectId, shot: number) {
  if (id === "hotel") {
    return shot === 1 ? t.projects_media_sticky_open : t.projects_media_sticky_closed;
  }
  return `${t.projects_shot_of} ${shot}`;
}

type ProjectGalleryProps = {
  id: ProjectId;
  title: string;
  t: Dict;
  compact?: boolean;
};

/** Dulce: fixed desktop frame; screenshots pre-cropped to match. */
function usesFixedDesktopFrame(id: ProjectId) {
  return id === "dulce";
}

function MediaImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}

function BrowserMockup({
  children,
  url = "ariadna.dev",
  /** Fixed frame for projects whose shots share one aspect (e.g. Dulce 15:8). */
  frameClassName = "aspect-[16/10]",
}: {
  children: ReactNode;
  url?: string;
  frameClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[color-mix(in_srgb,var(--foreground)_6%,var(--background))] shadow-[0_14px_40px_-26px_rgba(0,0,0,0.45)] sm:rounded-xl sm:shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
        <span className="flex gap-1 sm:gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#e06c75] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#e5c07b] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#98c379] sm:h-2.5 sm:w-2.5" />
        </span>
        <div className="ml-0.5 min-w-0 flex-1 truncate rounded-md border border-border bg-background px-2 py-0.5 text-[0.6rem] tracking-wide text-muted sm:ml-1 sm:px-2.5 sm:py-1 sm:text-xs">
          {url}
        </div>
      </div>
      <div className={`relative overflow-hidden bg-surface ${frameClassName}`}>
        {children}
      </div>
    </div>
  );
}

function TabletMockup({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[17rem] sm:max-w-[19rem]">
      <div className="rounded-[1.35rem] border-[0.55rem] border-[color-mix(in_srgb,var(--foreground)_88%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_88%,transparent)] p-1 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[0.85rem] bg-surface">
          {children}
        </div>
      </div>
      <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-[color-mix(in_srgb,var(--foreground)_35%,transparent)]" />
    </div>
  );
}

function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[10.5rem] sm:max-w-[11.5rem]">
      <div className="rounded-[1.6rem] border-[0.45rem] border-[color-mix(in_srgb,var(--foreground)_88%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_88%,transparent)] p-[0.2rem] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
        <div className="relative overflow-hidden rounded-[1.15rem] bg-surface">
          <div
            className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--foreground)_55%,transparent)]"
            aria-hidden
          />
          <div className="relative aspect-[9/19.5]">{children}</div>
        </div>
      </div>
      <span className="mx-auto mt-2 block h-1 w-7 rounded-full bg-[color-mix(in_srgb,var(--foreground)_35%,transparent)]" />
    </div>
  );
}

function DeviceFrame({
  kind,
  children,
  url,
  frameClassName,
}: {
  kind: MediaKind;
  children: ReactNode;
  url?: string;
  frameClassName?: string;
}) {
  if (kind === "desktop") {
    return (
      <BrowserMockup url={url} frameClassName={frameClassName}>
        {children}
      </BrowserMockup>
    );
  }
  if (kind === "tablet") return <TabletMockup>{children}</TabletMockup>;
  return <PhoneMockup>{children}</PhoneMockup>;
}

type LightboxState = { kind: MediaKind; shot: number };

function ImageLightbox({
  title,
  t,
  state,
  shotCount,
  onClose,
  onPrev,
  onNext,
  id,
}: {
  title: string;
  t: Dict;
  state: LightboxState;
  shotCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  id: ProjectId;
}) {
  const label = t[labelKey[state.kind]];
  const titleId = useId();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/85 p-0 backdrop-blur-sm animate-fade sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[min(100dvh,100%)] w-full max-w-5xl flex-col gap-2 overflow-y-auto p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-3 sm:p-0 sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 text-background sm:items-center">
          <p id={titleId} className="min-w-0 text-sm tracking-wide">
            <span className="font-display text-base sm:text-lg">{title}</span>
            <span className="mx-2 hidden text-background/50 sm:inline">·</span>
            <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.16em] sm:mt-0 sm:inline">
              {label} · {shotCaption(t, id, state.shot)}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 shrink-0 border border-background/40 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition hover:bg-background hover:text-foreground"
            aria-label={t.projects_lightbox_close}
          >
            {t.projects_lightbox_close} ✕
          </button>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <DeviceFrame
            kind={state.kind}
            url={projectUrl(id)}
            frameClassName={
              usesFixedDesktopFrame(id) ? "aspect-[15/8]" : undefined
            }
          >
            <MediaImage
              src={projectMediaPath(id, state.kind, state.shot)}
              alt={`${title} — ${label} ${state.shot}`}
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
          </DeviceFrame>
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="min-h-11 flex-1 border border-background/40 px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-background transition hover:bg-background hover:text-foreground sm:flex-none sm:px-4"
          >
            ← {t.projects_lightbox_prev}
          </button>
          <p className="shrink-0 text-xs uppercase tracking-[0.16em] text-background/70">
            {state.shot} / {shotCount}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="min-h-11 flex-1 border border-background/40 px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-background transition hover:bg-background hover:text-foreground sm:flex-none sm:px-4"
          >
            {t.projects_lightbox_next} →
          </button>
        </div>
      </div>
    </div>
  );
}

function DeviceCarousel({
  kind,
  title,
  t,
  id,
  shotCount,
  priority,
  className = "",
}: {
  kind: MediaKind;
  title: string;
  t: Dict;
  id: ProjectId;
  shotCount: number;
  priority?: boolean;
  className?: string;
}) {
  const [shot, setShot] = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const next = () => setShot((s) => (s % shotCount) + 1);
  const prev = () => setShot((s) => ((s - 2 + shotCount) % shotCount) + 1);

  return (
    <div className={`min-w-0 ${className}`}>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group w-full text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
      >
        <DeviceFrame
          kind={kind}
          url={projectUrl(id)}
          frameClassName={
            usesFixedDesktopFrame(id) ? "aspect-[15/8]" : undefined
          }
        >
          <MediaImage
            src={projectMediaPath(id, kind, shot)}
            alt={`${title} — ${t[labelKey[kind]]} ${shot}`}
            className="object-cover object-top transition duration-300 group-hover:scale-[1.015]"
            sizes={
              kind === "desktop"
                ? "(max-width: 1024px) 100vw, 55vw"
                : "(max-width: 1024px) 45vw, 20vw"
            }
            priority={priority && shot === 1}
          />
        </DeviceFrame>
      </button>

      <div className="mt-2.5 flex flex-col items-center gap-2">
        <p className="text-center text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          {t[labelKey[kind]]}
          {shotCount > 1 ? (
            <>
              <span className="mx-1.5 text-border">·</span>
              {shotCaption(t, id, shot)}
            </>
          ) : null}
        </p>

        {shotCount > 1 ? (
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center text-sm text-muted transition hover:text-highlight"
              aria-label={t.projects_lightbox_prev}
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: shotCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setShot(n)}
                  className={`h-2 rounded-full transition sm:h-1.5 ${
                    n === shot
                      ? "w-5 bg-highlight"
                      : "w-2 bg-border hover:bg-muted sm:w-1.5"
                  }`}
                  aria-label={`${t.projects_shot_of} ${n}`}
                  aria-current={n === shot}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-9 w-9 items-center justify-center text-sm text-muted transition hover:text-highlight"
              aria-label={t.projects_lightbox_next}
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      {lightbox ? (
        <ImageLightbox
          id={id}
          title={title}
          t={t}
          state={{ kind, shot }}
          shotCount={shotCount}
          onClose={() => setLightbox(false)}
          onPrev={() => setShot((s) => ((s - 2 + shotCount) % shotCount) + 1)}
          onNext={() => setShot((s) => (s % shotCount) + 1)}
        />
      ) : null}
    </div>
  );
}

export function ProjectGallery({
  id,
  title,
  t,
  compact = false,
}: ProjectGalleryProps) {
  const shotCount = projectShotCount(id);
  const kindsShown = projectKinds(id);
  const hasDesktop = kindsShown.includes("desktop");
  const hasTablet = kindsShown.includes("tablet");
  const hasMobile = kindsShown.includes("mobile");
  const desktopOnly = hasDesktop && !hasTablet && !hasMobile;

  if (compact) {
    return (
      <div className="min-w-0">
        <BrowserMockup
          url={projectUrl(id)}
          frameClassName={
            usesFixedDesktopFrame(id) ? "aspect-[15/8]" : undefined
          }
        >
          <MediaImage
            src={projectMediaPath(id, "desktop", 1)}
            alt={`${title} — desktop`}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </BrowserMockup>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {t.projects_evidence}
      </p>

      {desktopOnly ? (
        <DeviceCarousel
          id={id}
          title={title}
          t={t}
          kind="desktop"
          shotCount={shotCount}
          priority
          className="mx-auto w-full max-w-3xl"
        />
      ) : (
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-end lg:gap-8">
          {hasDesktop ? (
            <DeviceCarousel
              id={id}
              title={title}
              t={t}
              kind="desktop"
              shotCount={shotCount}
              priority={id === "hotel"}
            />
          ) : null}

          {/* Tablet/phone mockups are hard to read on small screens — desktop only below lg */}
          {hasTablet || hasMobile ? (
            <div className="hidden grid-cols-2 items-end gap-4 sm:gap-6 lg:grid">
              {hasTablet ? (
                <DeviceCarousel
                  id={id}
                  title={title}
                  t={t}
                  kind="tablet"
                  shotCount={shotCount}
                />
              ) : null}
              {hasMobile ? (
                <DeviceCarousel
                  id={id}
                  title={title}
                  t={t}
                  kind="mobile"
                  shotCount={shotCount}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
