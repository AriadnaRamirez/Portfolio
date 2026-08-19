"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { TranslationKey } from "@/app/components/lib/translations";
import {
  projectMediaPath,
  type MediaKind,
  type ProjectId,
} from "@/app/lib/site";

type Dict = Record<TranslationKey, string>;

const kinds: MediaKind[] = ["desktop", "mobile", "detail"];

const labelKey: Record<MediaKind, TranslationKey> = {
  desktop: "projects_media_desktop",
  mobile: "projects_media_mobile",
  detail: "projects_media_detail",
};

type ProjectGalleryProps = {
  id: ProjectId;
  title: string;
  t: Dict;
  compact?: boolean;
};

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

function ImageLightbox({
  title,
  t,
  index,
  onClose,
  onPrev,
  onNext,
  id,
}: {
  title: string;
  t: Dict;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  id: ProjectId;
}) {
  const kind = kinds[index];
  const label = t[labelKey[kind]];
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-3 backdrop-blur-sm animate-fade sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-5xl flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 text-background sm:items-center">
          <p id={titleId} className="min-w-0 text-sm tracking-wide">
            <span className="font-display text-base sm:text-lg">{title}</span>
            <span className="mx-2 hidden text-background/50 sm:inline">·</span>
            <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.16em] sm:mt-0 sm:inline">
              {label}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-background/40 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition hover:bg-background hover:text-foreground"
            aria-label={t.projects_lightbox_close}
          >
            {t.projects_lightbox_close} ✕
          </button>
        </div>

        <div className="relative aspect-[16/10] max-h-[70vh] w-full overflow-hidden border border-background/20 bg-background">
          <MediaImage
            src={projectMediaPath(id, kind)}
            alt={`${title} — ${label}`}
            className="object-contain object-center p-2 sm:p-4"
            sizes="90vw"
            priority
          />
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="border border-background/40 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-background transition hover:bg-background hover:text-foreground sm:px-4"
          >
            ← {t.projects_lightbox_prev}
          </button>
          <p className="text-xs uppercase tracking-[0.16em] text-background/70">
            {index + 1} / {kinds.length}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="border border-background/40 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-background transition hover:bg-background hover:text-foreground sm:px-4"
          >
            {t.projects_lightbox_next} →
          </button>
        </div>
      </div>
    </div>
  );
}

function Thumb({
  kind,
  title,
  t,
  id,
  onOpen,
  priority,
  className = "",
  tall = false,
}: {
  kind: MediaKind;
  title: string;
  t: Dict;
  id: ProjectId;
  onOpen: () => void;
  priority?: boolean;
  className?: string;
  tall?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group flex min-h-0 min-w-0 flex-col overflow-hidden border border-border bg-surface text-left transition hover:border-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${className}`}
    >
      <div
        className={`relative w-full flex-1 bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] ${
          tall ? "min-h-[11rem] aspect-[16/10] lg:aspect-auto" : "aspect-[16/10]"
        }`}
      >
        <MediaImage
          src={projectMediaPath(id, kind)}
          alt={`${title} — ${t[labelKey[kind]]}`}
          className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority={priority}
        />
      </div>
      <span className="block shrink-0 border-t border-border px-2.5 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-muted transition group-hover:text-highlight sm:px-3 sm:py-2">
        {t[labelKey[kind]]}
      </span>
    </button>
  );
}

export function ProjectGallery({
  id,
  title,
  t,
  compact = false,
}: ProjectGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (compact) {
    return (
      <div className="min-w-0 overflow-hidden border border-border bg-surface">
        <div className="relative aspect-[16/10] bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)]">
          <MediaImage
            src={projectMediaPath(id, "desktop")}
            alt={`${title} — desktop`}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {t.projects_evidence}
      </p>

      {/* Desktop main left + Mobile/Detail stack right (v1). Mobile: desktop full, then 2 thumbs. */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.7fr)] lg:grid-rows-2">
        <Thumb
          id={id}
          title={title}
          t={t}
          kind="desktop"
          onOpen={() => setLightbox(0)}
          priority={id === "hotel"}
          tall
          className="col-span-2 lg:col-span-1 lg:row-span-2"
        />
        <Thumb
          id={id}
          title={title}
          t={t}
          kind="mobile"
          onOpen={() => setLightbox(1)}
        />
        <Thumb
          id={id}
          title={title}
          t={t}
          kind="detail"
          onOpen={() => setLightbox(2)}
        />
      </div>

      {lightbox !== null ? (
        <ImageLightbox
          id={id}
          title={title}
          t={t}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() =>
            setLightbox((i) =>
              i === null ? 0 : (i - 1 + kinds.length) % kinds.length,
            )
          }
          onNext={() =>
            setLightbox((i) => (i === null ? 0 : (i + 1) % kinds.length))
          }
        />
      ) : null}
    </div>
  );
}
