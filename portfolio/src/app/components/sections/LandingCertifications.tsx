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
              {scholarshipOrg[shown] ? (
                <OrgLogo id={scholarshipOrg[shown]} wrapperClassName="mb-3" className="opacity-100! grayscale-0!" />
              ) : null}
              <p className="font-mono-label text-[var(--cat-ink)]">{org}</p>
              <p className="mt-1 text-xs text-muted">{when}</p>
            </div>
            <div>
              <h4 className="font-display text-lg leading-snug text-foreground">{program}</h4>
              {descParts.length ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{descParts.join(" · ")}</p>
              ) : null}
              {shown === "mujer_digital" ? <BadgeRow /> : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/** Compact row of verified badges earned in the Mujer Digital program. */
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
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-xs text-muted">
        {t.landing_badges_title} · {badges.length}
      </p>
      <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {badges.map((badge) => (
          <li key={badge.file} className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, local assets */}
            <img
              src={assetPath(`/badges/${badge.file}`)}
              alt=""
              width={83}
              height={83}
              loading="lazy"
              decoding="async"
              className="h-7 w-7 shrink-0 rounded-md object-cover"
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
    </div>
  );
}

export function LandingCertifications() {
  const { t } = useLanguage();

  return (
    <section id="certs" className="cat-pink page-shell py-20 sm:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl space-y-5">
          <Reveal variant="left">
            <p className="section-kicker">{t.nav_certs}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="section-title">
              {t.landing_certs_title_italic} {t.landing_certs_title_rest}
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certificationIds.map((id, i) => {
          const title = t[`cert_${id}_title` as TranslationKey];
          const org = t[`cert_${id}_org` as TranslationKey];
          const period = t[`cert_${id}_period` as TranslationKey];
          return (
            <Reveal key={id} variant="up" delay={(i % 3) * 70}>
              <article className="group flex h-full flex-col gap-3 border border-border bg-background p-5">
                <div className="flex min-h-8 items-center justify-between gap-3">
                  {certificationOrg[id] ? <OrgLogo id={certificationOrg[id]} className="max-h-7" /> : <span />}
                  <p className="font-mono-label text-gradient">{period}</p>
                </div>
                <h3 className="font-display text-lg leading-snug text-foreground">{title}</h3>
                <p className="mt-auto text-sm leading-relaxed text-muted">
                  {org}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal variant="up" delay={120} className="mt-10">
        <ProgramPicker />
      </Reveal>
    </section>
  );
}
