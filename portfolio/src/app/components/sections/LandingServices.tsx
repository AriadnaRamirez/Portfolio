"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { TranslationKey } from "@/app/components/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import { site, whatsappHref } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { SocialIcon } from "../ui/SocialIcon";

type FeatureId =
  | "design"
  | "mobile"
  | "hosting"
  | "seo"
  | "form"
  | "social"
  | "whatsapp"
  | "audit"
  | "migration"
  | "catalog"
  | "search"
  | "local"
  | "sitemap"
  | "console"
  | "login"
  | "database"
  | "api"
  | "cloud";

type ServiceId = "landing" | "business" | "redesign" | "catalog" | "seo" | "webapp";

/** Shared features come first and keep their icon, so overlaps read at a glance. */
const services: {
  id: ServiceId;
  features: FeatureId[];
  example?: { slug: string; label: string };
}[] = [
  { id: "landing", features: ["design", "mobile", "hosting", "form", "social"] },
  {
    id: "business",
    features: ["design", "mobile", "hosting", "seo", "whatsapp"],
    example: { slug: "crm", label: "Grupo CRM" },
  },
  {
    id: "redesign",
    features: ["design", "mobile", "seo", "audit", "migration"],
    example: { slug: "hmdv", label: "Hotel Marqués del Valle" },
  },
  {
    id: "catalog",
    features: ["mobile", "hosting", "catalog", "search", "whatsapp"],
    example: { slug: "crm", label: "Grupo CRM" },
  },
  {
    id: "seo",
    features: ["seo", "local", "sitemap", "console"],
    example: { slug: "crm", label: "Grupo CRM" },
  },
  {
    id: "webapp",
    features: ["login", "database", "api", "cloud"],
    example: { slug: "ccst", label: "CCST Study Lab" },
  },
];

const processSteps: FeatureId[] = ["whatsapp", "design", "api", "cloud"];

const faqIds = ["price", "domain", "edit", "content", "support"] as const;

const icons: Record<FeatureId | ServiceId, ReactNode> = {
  design: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.6 7.6" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
  hosting: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  seo: (
    <>
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </>
  ),
  form: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
  social: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  whatsapp: (
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
  ),
  audit: (
    <>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </>
  ),
  migration: (
    <>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  catalog: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.6-4.6" />
    </>
  ),
  local: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  sitemap: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  console: <path d="M18 20V10M12 20V4M6 20v-6" />,
  login: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.7-4 3-9 3s-9-1.3-9-3" />
      <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
    </>
  ),
  api: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  cloud: <path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  landing: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  business: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  redesign: (
    <>
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15" />
    </>
  ),
  webapp: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
};

function Icon({ id, className = "h-4 w-4" }: { id: FeatureId | ServiceId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icons[id]}
    </svg>
  );
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d={dir === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
    </svg>
  );
}

/** What the client holds at the end of each step, drawn as the object itself. */
function Deliverable({ n, title, meta }: { n: number; title: string; meta: string }) {
  if (n === 1) {
    return (
      <div className="relative flex h-full items-center gap-3.5 rounded-xl border border-border bg-background px-4 py-3.5 shadow-[0_14px_30px_-24px_rgba(20,20,40,0.45)]">
        <span aria-hidden className="relative grid h-12 w-10 shrink-0 place-items-center rounded-md border border-border bg-surface">
          <span className="absolute top-0 right-0 h-3 w-3 rounded-bl-md border-b border-l border-border bg-background" />
          <span className="mt-1 flex w-5 flex-col gap-1">
            <span className="h-0.5 rounded bg-[var(--cat-ink)]" />
            <span className="h-0.5 rounded bg-border-strong" />
            <span className="h-0.5 w-3 rounded bg-border-strong" />
          </span>
        </span>
        <p className="min-w-0">
          <span className="block font-display text-lg leading-tight text-foreground">{title}</span>
          <span className="mt-0.5 block text-[13px] text-muted">{meta}</span>
        </p>
      </div>
    );
  }

  if (n === 2) {
    return (
      <div className="relative flex h-full flex-col justify-between rounded-xl border border-border bg-background px-4 py-3.5 shadow-[0_14px_30px_-24px_rgba(20,20,40,0.45)]">
        <div aria-hidden className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-[var(--cat-from)]" />
          <span className="-ml-3 h-6 w-6 rounded-full border-2 border-background bg-[var(--cat-to)]" />
          <span className="-ml-3 h-6 w-6 rounded-full border-2 border-background bg-foreground" />
          <span className="ml-2 font-display text-lg leading-none text-foreground">Aa</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
            OK
          </span>
        </div>
        <p className="mt-3">
          <span className="block font-display text-lg leading-tight text-foreground">{title}</span>
          <span className="mt-0.5 block text-[13px] text-muted">{meta}</span>
        </p>
      </div>
    );
  }

  if (n === 3) {
    return (
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-background shadow-[0_14px_30px_-24px_rgba(20,20,40,0.45)]">
        <div aria-hidden className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
        </div>
        <div className="px-4 py-3">
          <p className="flex min-w-0 items-center gap-2 rounded-full bg-surface px-3 py-1.5">
            <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-3.5 w-3.5 shrink-0 text-[var(--cat-ink)]">
              <path d="M6.5 9.5l3-3M7 4.5l1-1a2.5 2.5 0 0 1 3.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 0 1 4.5 9l1-1" />
            </svg>
            <span className="truncate text-sm font-medium text-foreground">{title}</span>
          </p>
          <span className="mt-2 block text-[13px] text-muted">{meta}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col justify-center rounded-xl bg-foreground px-4 py-3.5 text-background shadow-[0_18px_36px_-22px_rgba(20,20,40,0.6)]">
      <p className="flex items-center gap-2">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-display text-lg leading-tight">{title}</span>
      </p>
      <span className="mt-1 block text-[13px] text-background/65">{meta}</span>
    </div>
  );
}

const mailto = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

const SWIPE_PX = 48;

/** Slides fully in view per breakpoint; mirrors the `--v` CSS variable. */
function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const sync = () => setPerView(lg.matches ? 3 : sm.matches ? 2 : 1);
    sync();
    lg.addEventListener("change", sync);
    sm.addEventListener("change", sync);
    return () => {
      lg.removeEventListener("change", sync);
      sm.removeEventListener("change", sync);
    };
  }, []);
  return perView;
}

/**
 * Infinite carousel: slides render three times and the index lives in the
 * middle copy; once a transition lands outside it, the track jumps back by one
 * copy without animating.
 */
function useCarousel(count: number) {
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const move = (delta: number) => setIndex((i) => i + delta);
  const goTo = (target: number) => setIndex(count + target);

  const settle = () => {
    if (index >= count && index < count * 2) return;
    setAnimate(false);
    setIndex(count + (((index - count) % count) + count) % count);
  };

  return {
    index,
    active: (((index - count) % count) + count) % count,
    animate,
    move,
    goTo,
    settle,
  };
}

export function LandingServices() {
  const { t } = useLanguage();
  const tk = (key: string) => t[key as TranslationKey];
  const perView = usePerView();
  const carousel = useCarousel(services.length);
  const { index, active } = carousel;
  const pad = (n: number) => String(n).padStart(2, "0");
  const slides = [...services, ...services, ...services];
  const swipeX = useRef<number | null>(null);

  return (
    <section id="services" className="cat-peach">
      <div className="page-shell py-24 sm:py-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <Reveal variant="left">
              <p className="section-kicker">{t.nav_services}</p>
            </Reveal>
            <Reveal variant="blur" delay={100}>
              <h2 className="section-title">{t.services_title}</h2>
            </Reveal>
            <Reveal variant="up" delay={180}>
              <p className="text-lg leading-relaxed text-muted">{t.services_subtitle}</p>
            </Reveal>
          </div>
          <Reveal variant="up" delay={220} className="hidden shrink-0 sm:block">
            <a
              href={whatsappHref(t.wa_quote_msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-umami-event="whatsapp"
              data-umami-event-from="services-header"
            >
              <SocialIcon kind="whatsapp" className="h-4 w-4" />
              {t.services_cta}
            </a>
          </Reveal>
        </div>

        <Reveal variant="up" delay={140} className="mt-12">
          <div role="region" aria-roledescription="carousel" aria-label={t.nav_services}>
            <div
              className="-my-4 touch-pan-y overflow-x-clip py-4 [--gap:1rem] [--v:1.12] sm:[--gap:1.25rem] sm:[--v:2.2] sm:[mask-image:linear-gradient(to_right,#000_calc(100%-7rem),transparent)] lg:[--v:3.25]"
              onPointerDown={(e) => {
                swipeX.current = e.clientX;
              }}
              onPointerUp={(e) => {
                if (swipeX.current === null) return;
                const dx = e.clientX - swipeX.current;
                swipeX.current = null;
                if (Math.abs(dx) > SWIPE_PX) carousel.move(dx < 0 ? 1 : -1);
              }}
            >
              <ul
                onTransitionEnd={(e) => {
                  if (e.target === e.currentTarget && e.propertyName === "transform") carousel.settle();
                }}
                className={`flex gap-[var(--gap)] ${
                  carousel.animate ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0" : ""
                }`}
                style={{ transform: `translateX(calc(${index} * -1 * (100% + var(--gap)) / var(--v)))` }}
              >
                {slides.map((service, i) => {
                  const n = i % services.length;
                  const visible = i >= index && i < index + perView;
                  const title = tk(`service_${service.id}_title`);
                  return (
                    <li
                      key={`${service.id}-${i}`}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${n + 1} ${t.services_of} ${services.length}: ${title}`}
                      aria-hidden={!visible}
                      inert={!visible}
                      className="w-[calc((100%-(var(--v)-1)*var(--gap))/var(--v))] shrink-0"
                    >
                      <article className="flex h-full flex-col border border-border bg-background p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_48px_-32px_rgba(20,20,40,0.45)] sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,color-mix(in_srgb,var(--cat-from)_20%,transparent),color-mix(in_srgb,var(--cat-to)_20%,transparent))] text-[var(--cat-ink)]">
                            <Icon id={service.id} className="h-5 w-5" />
                          </span>
                          <span aria-hidden className="font-display text-4xl leading-none text-foreground/10 tabular-nums">
                            {pad(n + 1)}
                          </span>
                        </div>
                        <h3 className="mt-6 font-display text-2xl leading-tight text-foreground">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {tk(`service_${service.id}_for`)}
                        </p>
                        <p className="mt-6 font-mono-label text-muted">{t.services_includes}</p>
                        <ul className="mt-3 space-y-2.5">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                              <Icon id={feature} className="h-4 w-4 shrink-0 text-[var(--cat-ink)]" />
                              {tk(`feature_${feature}`)}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-7">
                          <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
                            <a
                              href={whatsappHref(`${t.wa_service_msg} ${title}.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-umami-event="whatsapp"
                              data-umami-event-from={`service-${service.id}`}
                              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_86%,var(--background))]"
                            >
                              {t.services_quote}
                              <span aria-hidden className="btn-arrow">→</span>
                            </a>
                            {service.example ? (
                              <Link
                                href={`/work/${service.example.slug}/`}
                                title={service.example.label}
                                className="group inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
                              >
                                {t.services_view_example}
                                <span aria-hidden className="btn-arrow">→</span>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-4 sm:gap-6">
              <p className="font-mono-label shrink-0 tabular-nums text-muted" aria-live="polite">
                <span className="text-foreground">{pad(active + 1)}</span> / {pad(services.length)}
              </p>
              <div className="flex flex-1 items-center">
                {services.map((service, i) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => carousel.goTo(i)}
                    aria-label={tk(`service_${service.id}_title`)}
                    aria-current={i === active ? "true" : undefined}
                    className="group/dot flex h-6 min-w-6 items-center justify-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-7 bg-[linear-gradient(90deg,var(--cat-from),var(--cat-to))]"
                          : "w-1.5 bg-border group-hover/dot:bg-muted"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex shrink-0 gap-2">
                {(["prev", "next"] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => carousel.move(dir === "prev" ? -1 : 1)}
                    aria-label={dir === "prev" ? t.services_prev : t.services_next}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <Arrow dir={dir} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div id="process" className="mt-24 scroll-mt-24 sm:mt-32">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="space-y-5 lg:col-span-7">
              <Reveal variant="left">
                <p className="section-kicker">{t.process_kicker}</p>
              </Reveal>
              <Reveal variant="blur" delay={100}>
                <h2 className="section-title">{t.process_title}</h2>
              </Reveal>
            </div>
            <Reveal variant="up" delay={180} className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-muted">{t.process_subtitle}</p>
            </Reveal>
          </div>

          <Reveal variant="fade" className="group/process mt-14">
            <ol className="relative grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-border lg:block">
                <span className="block h-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--cat-from),var(--cat-to))] transition-transform duration-[1600ms] ease-out group-[.is-visible]/process:scale-x-100 motion-reduce:transition-none" />
              </span>
              {processSteps.map((step, i) => {
                const n = i + 1;
                return (
                  <li key={n} className="relative flex flex-col border-t border-border pt-6 lg:border-t-0 lg:pt-10">
                    <span
                      aria-hidden
                      style={{ transitionDelay: `${200 + i * 350}ms` }}
                      className="absolute top-0 left-0 hidden h-[11px] w-[11px] rounded-full border border-border-strong bg-background transition-colors duration-500 group-[.is-visible]/process:border-transparent group-[.is-visible]/process:bg-[linear-gradient(135deg,var(--cat-from),var(--cat-to))] lg:block"
                    />
                    <div className="flex items-center gap-3 text-muted">
                      <span className="font-mono-label tabular-nums">{pad(n)}</span>
                      <span aria-hidden className="h-px w-6 bg-border" />
                      <Icon id={step} className="h-4 w-4 text-[var(--cat-ink)]" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl leading-tight text-foreground">
                      <span className="sr-only">
                        {t.process_step} {n}:{" "}
                      </span>
                      {tk(`process_${n}_title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{tk(`process_${n}_body`)}</p>
                    <div
                      style={{ transitionDelay: `${450 + i * 300}ms` }}
                      className="mt-auto pt-6 opacity-0 translate-y-4 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-visible]/process:translate-y-0 group-[.is-visible]/process:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                    >
                      <p className="sr-only">{t.process_get}:</p>
                      <div className="lg:h-[9rem]">
                        <Deliverable
                          n={n}
                          title={tk(`process_${n}_get`)}
                          meta={tk(`process_${n}_meta`)}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <div className="mt-24 grid gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <Reveal variant="left">
                <p className="section-kicker">{t.faq_kicker}</p>
              </Reveal>
              <Reveal variant="blur" delay={100}>
                <h3 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">{t.faq_title}</h3>
              </Reveal>
            </div>
            <Reveal variant="up" delay={120} className="lg:col-span-8">
              <div className="border-t border-border">
                {faqIds.map((id) => (
                  <details key={id} className="group/faq border-b border-border">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-[var(--cat-ink)] [&::-webkit-details-marker]:hidden">
                      {tk(`faq_${id}_q`)}
                      <span
                        aria-hidden
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-lg leading-none text-muted transition-transform duration-300 group-open/faq:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-muted">{tk(`faq_${id}_a`)}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal variant="up" className="mt-16">
            <div className="flex flex-col gap-6 border-t border-border pt-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h3 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                  {t.services_cta_title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{t.services_cta_body}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref(t.wa_quote_msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  data-umami-event="whatsapp"
                  data-umami-event-from="services-cta"
                >
                  <SocialIcon kind="whatsapp" className="h-4 w-4" />
                  {t.services_cta_whatsapp}
                </a>
                <a href={mailto(t.services_quote_subject)} className="btn-ghost" data-umami-event="contact-email">
                  {t.services_cta_email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
