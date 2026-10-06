"use client";

import Link from "next/link";
import type { TranslationKey } from "@/app/components/lib/translations";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  awardIds,
  certificationIds,
  educationIds,
  scholarshipIds,
  stackGroups,
} from "@/app/lib/site";
import { ResumeDownloadButton } from "../resume/ResumeDownloadButton";
import { SectionHeader } from "../ui/SectionHeader";
import { Tabs } from "../ui/Tabs";
import { TechIconRow } from "../ui/TechIcon";

function ProfilePanel() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div className="space-y-5">
        <p className="font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
          {t.about_intro}
        </p>
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {t.about_body}
        </p>
      </div>
      <aside className="flex flex-col border border-border bg-surface p-6 sm:p-8">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-highlight">
          {t.about_now_title}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground sm:text-base">
          {t.about_now_body}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" prefetch className="btn-primary w-fit">
            {t.nav_contact}
          </Link>
          <ResumeDownloadButton className="btn-ghost w-fit" />
        </div>
      </aside>
    </div>
  );
}

function StackPanel() {
  const { t } = useLanguage();
  const groups = [
    { title: t.stack_frontend, items: stackGroups.frontend },
    { title: t.stack_backend, items: stackGroups.backend },
    { title: t.stack_tools, items: stackGroups.tools },
  ];

  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-sm text-muted sm:text-base">{t.stack_subtitle}</p>
      <div className="grid gap-6 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="border-t border-border pt-5">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-highlight">
              {group.title}
            </h3>
            <TechIconRow className="mt-4" ids={group.items} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CredentialsPanel() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-highlight">
            {t.credentials_education}
          </h3>
          <ul className="mt-5 space-y-5">
            {educationIds.map((id) => (
              <li key={id} className="border-b border-border pb-5 last:border-0">
                <p className="font-display text-xl text-foreground">
                  {t[`edu_${id}_degree` as TranslationKey]}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {t[`edu_${id}_school` as TranslationKey]}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
                  {t[`edu_${id}_period` as TranslationKey]}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-highlight">
            {t.credentials_scholarships}
          </h3>
          <ul className="mt-5 space-y-5">
            {scholarshipIds.map((id) => (
              <li key={id} className="border-b border-border pb-5 last:border-0">
                <p className="font-display text-xl text-foreground">
                  {t[`sch_${id}_program` as TranslationKey]}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {t[`sch_${id}_org` as TranslationKey]}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-highlight">
            {t.credentials_languages}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground sm:text-base">
            <li>{t.lang_es}</li>
            <li>{t.lang_en}</li>
          </ul>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-highlight">
            {t.credentials_certs}
          </h3>
          <ul className="mt-5 space-y-5">
            {certificationIds.map((id) => {
              const org = t[`cert_${id}_org` as TranslationKey];
              return (
                <li key={id} className="border-b border-border pb-5 last:border-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-xl text-foreground">
                      {t[`cert_${id}_title` as TranslationKey]}
                    </p>
                    <p className="shrink-0 text-xs uppercase tracking-[0.12em] text-muted">
                      {t[`cert_${id}_period` as TranslationKey]}
                    </p>
                  </div>
                  {org ? (
                    <p className="mt-1 text-sm text-muted">{org}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-highlight">
            {t.credentials_awards}
          </h3>
          <ul className="mt-5 space-y-3">
            {awardIds.map((id) => (
              <li
                key={id}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:bg-highlight sm:text-base"
              >
                {t[`award_${id}` as TranslationKey]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="page-shell py-16 sm:py-24">
      <SectionHeader kicker={t.about_kicker} title={t.about_title} />

      <div className="mt-12 sm:mt-16">
        <Tabs
          items={[
            {
              id: "profile",
              label: t.about_tab_profile,
              content: <ProfilePanel />,
            },
            {
              id: "stack",
              label: t.about_tab_stack,
              content: <StackPanel />,
            },
            {
              id: "credentials",
              label: t.about_tab_credentials,
              content: <CredentialsPanel />,
            },
          ]}
        />
      </div>
    </section>
  );
}
