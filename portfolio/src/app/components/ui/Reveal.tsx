"use client";

import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type RevealVariant =
  | "fade"
  | "up"
  | "blur"
  | "scale"
  | "left"
  | "right"
  | "tilt"
  | "swing"
  | "drop"
  | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "li" | "article";
};

/** Long staggers make scrolling feel like waiting for content. */
const MAX_DELAY = 360;

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
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
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade",
  as: Tag = "div",
}: RevealProps) {
  const { ref, visible } = useInView<HTMLElement>();
  const style = {
    ["--reveal-delay" as string]: `${Math.min(delay, MAX_DELAY)}ms`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={style}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Word-by-word entrance. Words in `gradient` get one continuous gradient
 * sliced across them, since each word is its own inline-block.
 */
export function SplitWords({
  text,
  gradient,
  className = "",
  delay = 0,
  instant = false,
}: {
  text: string;
  gradient?: string;
  className?: string;
  delay?: number;
  /** Animate on first paint with CSS only; use above the fold. */
  instant?: boolean;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const plain = text ? text.split(" ") : [];
  const accent = gradient ? gradient.split(" ") : [];
  const words = [
    ...plain.map((w) => ({ w, g: -1 })),
    ...accent.map((w, i) => ({ w, g: i })),
  ];
  const label = [text, gradient].filter(Boolean).join(" ");

  return (
    <span
      ref={ref}
      style={{ ["--base-delay" as string]: `${delay}ms` } as CSSProperties}
      className={`split-words ${instant ? "split-words--instant" : visible ? "is-visible" : ""} ${className}`}
    >
      <span className="sr-only">{label}</span>
      {words.map(({ w, g }, i) => {
        const style: CSSProperties & Record<string, string | number> = {
          ["--i"]: i,
        };
        if (g >= 0) {
          style.backgroundSize = `${accent.length * 100}% 100%`;
          style.backgroundPosition =
            accent.length > 1 ? `${(g / (accent.length - 1)) * 100}% 0` : "0 0";
        }
        return (
          <Fragment key={`${w}-${i}`}>
            {g === 0 && plain.length > 0 ? <br /> : null}
            <span
              aria-hidden
              className={`word ${g >= 0 ? "text-gradient-fill" : ""}`}
              style={style}
            >
              {w}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
