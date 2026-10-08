"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/app/components/lib/translations";
import type { StoryStep } from "@/app/lib/caseStudies";
import { assetPath } from "@/app/lib/siteUrl";

function Frame({
  steps,
  active,
  url,
  lang,
}: {
  steps: StoryStep[];
  active: number;
  url?: string;
  lang: Lang;
}) {
  return (
    <div className="story-frame relative">
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-[0_40px_80px_-40px_rgba(20,20,40,0.45)]">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </span>
          {url ? (
            <span className="mx-auto truncate rounded-full bg-surface px-3 py-0.5 text-xs text-muted">{url}</span>
          ) : null}
          <span className="w-10" aria-hidden />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          {steps.map((s, i) => (
            <img
              key={s.image}
              src={assetPath(s.image)}
              alt={i === active ? s.title[lang] : ""}
              aria-hidden={i !== active}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {steps.some((s) => s.mobile) ? (
        <div className="absolute -right-4 -bottom-8 w-[22%] max-w-[9rem] rounded-[1.4rem] border-[0.35rem] border-foreground bg-foreground shadow-[0_24px_40px_-20px_rgba(20,20,40,0.5)] xl:-right-8">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.05rem] bg-surface">
            {steps.map((s, i) =>
              s.mobile ? (
                <img
                  key={s.mobile}
                  src={assetPath(s.mobile)}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null,
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Sticky product frame on the left, narrative steps scrolling on the right.
 * The step closest to the middle of the viewport drives the frame.
 */
export function ScrollStory({
  steps,
  lang,
  url,
  footer,
  problemLabel,
}: {
  steps: StoryStep[];
  lang: Lang;
  url?: string;
  footer?: React.ReactNode;
  problemLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-[max(6rem,calc(50dvh-17rem))]">
          <Frame steps={steps} active={active} url={url} lang={lang} />
          <ol className="mt-14 flex gap-2" aria-hidden>
            {steps.map((s, i) => (
              <li
                key={s.image}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-10 bg-[linear-gradient(90deg,var(--cat-from),var(--cat-to))]"
                    : "w-4 bg-border"
                }`}
              />
            ))}
          </ol>
        </div>
      </div>

      <div>
        {steps.map((s, i) => (
          <div
            key={s.image}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex flex-col justify-center py-8 lg:min-h-[78dvh] lg:py-0"
          >
            <div className="mb-6 overflow-hidden rounded-xl border border-border lg:hidden">
              <img
                src={assetPath(s.image)}
                alt={s.title[lang]}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
            <p className="font-mono-label text-gradient">{s.kicker[lang]}</p>
            {s.problem ? (
              <p className="mt-4 max-w-md border-l-2 border-border pl-4 text-sm leading-relaxed text-muted">
                {problemLabel ? <span className="font-mono-label mb-1 block">{problemLabel}</span> : null}
                {s.problem[lang]}
              </p>
            ) : null}
            <h3
              className={`${s.problem ? "mt-5" : "mt-3"} font-display text-3xl leading-tight text-foreground transition-opacity duration-500 sm:text-4xl ${
                i === active ? "lg:opacity-100" : "lg:opacity-55"
              }`}
            >
              {s.title[lang]}
            </h3>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
              {s.body[lang]}
            </p>
          </div>
        ))}
        {footer ? <div className="pb-4 lg:pb-[20dvh]">{footer}</div> : null}
      </div>
    </div>
  );
}
