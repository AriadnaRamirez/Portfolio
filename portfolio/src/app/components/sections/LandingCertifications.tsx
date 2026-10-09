"use client";

import { useId, useState } from "react";
import type { TranslationKey } from "@/app/components/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import { certificationIds, scholarshipIds } from "@/app/lib/site";
import { certificationOrg, scholarshipOrg } from "@/app/lib/orgs";
import { badges } from "@/app/lib/badges";
import { assetPath } from "@/app/lib/siteUrl";
import { OrgLogo } from "../ui/OrgLogo";
import { Reveal } from "../ui/Reveal";

type ScholarshipId = (typeof scholarshipIds)[number];

function ProgramPicker() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ScholarshipId | null>(null);
  const [shown, setShown] = useState<ScholarshipId>(scholarshipIds[0]);
  const [pinned, setPinned] = useState(false);
  const panelId = useId();

  const open = (id: ScholarshipId) => {
    setShown(id);
    setActive(id);
  };

  /** Mouse hover previews a program; a click pins it open (or closes it if already pinned). */
  const select = (id: ScholarshipId) => {
    if (active === id && pinned) {
      setActive(null);
      setPinned(false);
      return;
    }
    open(id);
    setPinned(true);
  };

  const [org, ...rest] = t[`sch_${shown}_program` as TranslationKey].split(" — ");
  const program = rest.join(" — ") || org;
  const detail = t[`sch_${shown}_org` as TranslationKey];
  const [when, ...descParts] = detail.split(" · ");
  const isOpen = active !== null;

  return (
    <div
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse" && !pinned) setActive(null);
      }}
    >
      <h3 className="font-mono-label text-muted">{t.landing_certs_programs_label}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {scholarshipIds.map((id) => {
          const selected = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => select(id)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse") return;
                  open(id);
                  if (active !== id) setPinned(false);
                }}
                aria-expanded={selected}
                aria-controls={panelId}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground/50"
                }`}
              >
                {t[`sch_${id}_program` as TranslationKey].split(" — ")[0]}
                <span
                  aria-hidden
                  className={`text-base leading-none transition-transform duration-300 ${selected ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id={panelId}
        role="region"
        aria-live="polite"
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <article
            key={shown}
            className="animate-fade mt-4 grid max-w-3xl gap-3 border-l-2 border-[var(--cat-ink)] bg-surface px-5 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:px-6"
          >
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-4">
                {scholarshipOrg[shown] ? (
                  <OrgLogo id={scholarshipOrg[shown]} className="opacity-100! grayscale-0!" />
                ) : null}
                {shown === "generation_aws" ? (
                  <OrgLogo id="aws" className="opacity-100! grayscale-0!" />
                ) : null}
              </div>
              <p className="font-mono-label text-[var(--cat-ink)]">{org}</p>
              <p className="mt-1 text-xs text-muted">{when}</p>
            </div>
            <div>
              <h4 className="font-display text-lg leading-snug text-foreground">{program}</h4>
              {descParts.length ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{descParts.join(" · ")}</p>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/** Cisco Networking Academy shields. They belong on the credential, not only inside a program. */
function BadgeRow() {
  const { t, lang } = useLanguage();
  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <ul className="mt-1 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <li key={badge.file} className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, local assets */}
            <img
              src={assetPath(`/badges/${badge.file}`)}
              alt=""
              width={83}
              height={83}
              loading="lazy"
              decoding="async"
              className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain"
            />
            <span className="min-w-0 leading-tight">
              <span className="block text-sm text-foreground">{badge.name}</span>
              <span className="block text-xs text-muted">
                {t.landing_badges_issued} {formatDate(badge.issued)}
              </span>
            </span>
          </li>
        ))}
    </ul>
  );
}

function CiscoBadgeCard({
  title,
  period,
  delay,
}: {
  title: string;
  period: string;
  delay: number;
}) {
  const { t } = useLanguage();
  const panelId = useId();
  const [pinned, setPinned] = useState(false);
  const [hover, setHover] = useState(false);
  const open = pinned || hover;

  const toggle = () => {
    if (pinned) {
      setPinned(false);
      setHover(false);
      return;
    }
    setPinned(true);
  };

  return (
    <Reveal variant="up" delay={delay} className={open ? "lg:col-span-2" : ""}>
      <article
        className="flex h-full flex-col gap-3 border border-border bg-background p-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex min-h-8 items-center justify-between gap-3">
          <OrgLogo id="cisco" className="max-h-7" />
          <p className="font-mono-label text-gradient">{period}</p>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          className="flex flex-1 cursor-pointer items-start justify-between gap-3 text-left"
        >
          <span>
            <h3 className="font-display text-base leading-snug text-foreground">{title}</h3>
            {open ? null : (
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {badges.length} · {t.landing_badges_title}
              </p>
            )}
          </span>
          <span
            aria-hidden
            className={`mt-0.5 text-lg leading-none text-muted transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
        <div
          id={panelId}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <BadgeRow />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function LandingCertifications() {
  const { t } = useLanguage();

  return (
    <section id="certs" className="cat-pink page-shell py-14 sm:py-16">
      <div className="max-w-xl space-y-3">
        <Reveal variant="left">
          <p className="section-kicker">{t.nav_certs}</p>
        </Reveal>
        <Reveal variant="blur" delay={100}>
          <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.08] text-foreground">
            {t.landing_certs_title_italic} {t.landing_certs_title_rest}
          </h2>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certificationIds.map((id, i) => {
          const title = t[`cert_${id}_title` as TranslationKey];
          const org = t[`cert_${id}_org` as TranslationKey];
          const period = t[`cert_${id}_period` as TranslationKey];
          if (id === "cisco_badges") {
            return <CiscoBadgeCard key={id} title={title} period={period} delay={(i % 3) * 70} />;
          }
          return (
            <Reveal key={id} variant="up" delay={(i % 3) * 70}>
              <article className="flex h-full flex-col gap-3 border border-border bg-background p-4">
                <div className="flex min-h-8 items-center justify-between gap-3">
                  {certificationOrg[id] ? <OrgLogo id={certificationOrg[id]} className="max-h-7" /> : <span />}
                  <p className="font-mono-label text-gradient">{period}</p>
                </div>
                <h3 className="font-display text-base leading-snug text-foreground">{title}</h3>
                <p className="mt-auto text-sm leading-relaxed text-muted">{org}</p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal variant="up" delay={120} className="mt-8">
        <ProgramPicker />
      </Reveal>
    </section>
  );
}
