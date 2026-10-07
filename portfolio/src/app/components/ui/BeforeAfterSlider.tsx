"use client";

import { useState } from "react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  /** Accessible name for the range input. */
  label: string;
  alt: string;
  className?: string;
};

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
  alt,
  className = "",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className={`group relative aspect-[16/10] w-full touch-pan-y overflow-hidden rounded-2xl border border-border bg-surface select-none ${className}`}
    >
      <img
        src={after}
        alt={`${afterLabel}: ${alt}`}
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <img
        src={before}
        alt={`${beforeLabel}: ${alt}`}
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span
        aria-hidden
        className="absolute top-3 left-3 rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium text-background backdrop-blur transition-opacity duration-200"
        style={{ opacity: pos < 12 ? 0 : 1 }}
      >
        {beforeLabel}
      </span>
      <span
        aria-hidden
        className="absolute top-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur transition-opacity duration-200"
        style={{ opacity: pos > 88 ? 0 : 1 }}
      >
        {afterLabel}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#242424] shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform duration-200 group-active:scale-95 group-has-[input:focus-visible]:ring-2 group-has-[input:focus-visible]:ring-[#6a3df0]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={`${beforeLabel} ${pos}% · ${afterLabel} ${100 - pos}%`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
      />
    </div>
  );
}
