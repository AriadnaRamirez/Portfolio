"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Tone = "plain" | "tint" | "frame";
type Cat = "violet" | "blue" | "pink" | "mint" | "peach" | "teal";

/**
 * Full-width wrapper that separates home sections: "tint" is an inset,
 * rounded panel washed with the category color; "frame" is the same shape
 * for sections that paint their own background; "plain" draws a gradient
 * rule across its top edge on entry.
 */
export function SectionBand({
  children,
  tone = "plain",
  cat,
}: {
  children: ReactNode;
  tone?: Tone;
  cat?: Cat;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-band section-band--${tone} ${cat ? `cat-${cat}` : ""} ${
        visible ? "is-visible" : ""
      }`}
    >
      {children}
    </div>
  );
}
