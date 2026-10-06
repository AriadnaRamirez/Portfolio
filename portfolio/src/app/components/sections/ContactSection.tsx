"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { site } from "@/app/lib/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { SocialIcon } from "../ui/SocialIcon";
import { ResumeDownloadButton } from "../resume/ResumeDownloadButton";
const emailHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Fullstack web developer opportunity — Portfolio",
)}`;

type ContactSectionProps = {
  headingLevel?: "h1" | "h2";
};

export function ContactSection({ headingLevel }: ContactSectionProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const as = headingLevel ?? (pathname === "/" ? "h2" : "h1");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = emailHref;
    }
  };

  return (
    <section id="contact" className="cat-peach page-shell py-24 sm:py-32">
      <SectionHeader
        as={as}
        kicker={t.contact_kicker}
        title={t.contact_title}
        subtitle={t.contact_subtitle}
      />

      <Reveal variant="up" className="mt-12 rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-card)] sm:p-10 lg:p-12">
        <p className="font-mono-label text-muted">{t.contact_email_label}</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <a
            href={emailHref}
            className="block break-all font-display text-[clamp(1.2rem,5vw,2.75rem)] leading-tight text-foreground transition-colors hover:text-[var(--cat-ink)]"
          >
            {site.email}
          </a>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={emailHref} className="btn-primary whitespace-nowrap">
              <SocialIcon kind="email" className="h-3.5 w-3.5" />
              {t.contact_cta_email_primary}
            </a>
            <button type="button" onClick={copyEmail} className="btn-ghost whitespace-nowrap" aria-live="polite">
              {copied ? t.contact_copied : t.contact_copy}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-[var(--cat-ink)]"
          >
            <SocialIcon kind="linkedin" className="h-4 w-4" />
            LinkedIn ↗
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-[var(--cat-ink)]"
          >
            <SocialIcon kind="github" className="h-4 w-4" />
            GitHub ↗
          </a>
          <ResumeDownloadButton className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-[var(--cat-ink)]" />
        </div>
      </Reveal>
    </section>
  );
}
