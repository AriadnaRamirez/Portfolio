"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import type { TranslationKey } from "@/app/components/lib/translations";
import { markLandingRestore, readLandingPosition } from "@/app/lib/landingScroll";

const sectionLabel: Record<string, TranslationKey> = {
  work: "nav_work",
  services: "nav_services",
  about: "nav_about",
  experience: "nav_experience",
  skills: "nav_skills",
  education: "nav_education",
  certs: "nav_certs",
  process: "process_kicker",
  faq: "faq_kicker",
  contact: "nav_contact",
};

export function Breadcrumbs({ current }: { current: string }) {
  const { t } = useLanguage();
  const [sectionId, setSectionId] = useState<string | null>(null);

  useEffect(() => {
    const id = readLandingPosition()?.id ?? null;
    setSectionId(id && sectionLabel[id] ? id : null);
  }, []);

  const labelKey = sectionId ? sectionLabel[sectionId] : null;

  return (
    <nav aria-label={t.breadcrumb_label} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" scroll={false} onClick={markLandingRestore} className="transition-colors hover:text-foreground">
            {t.nav_home}
          </Link>
        </li>
        {labelKey ? (
          <>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li>
              <Link href="/" scroll={false} onClick={markLandingRestore} className="transition-colors hover:text-foreground">
                {t[labelKey]}
              </Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true" className="text-border">
          /
        </li>
        <li aria-current="page" className="text-foreground">
          {current}
        </li>
      </ol>
    </nav>
  );
}
