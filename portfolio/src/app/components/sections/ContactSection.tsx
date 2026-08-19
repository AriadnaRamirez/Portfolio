"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { site } from "@/app/lib/site";
import { SectionHeader } from "../ui/SectionHeader";
import { SocialIcon } from "../ui/SocialIcon";
import { ResumeDownloadButton } from "../resume/ResumeDownloadButton";

const emailHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Fullstack web developer opportunity — Portfolio",
)}`;

const channels = [
  {
    key: "linkedin" as const,
    labelKey: "contact_linkedin_label" as const,
    bodyKey: "contact_linkedin_body" as const,
    ctaKey: "contact_cta_linkedin" as const,
    href: site.linkedin,
    external: true,
    icon: "linkedin" as const,
    primary: true,
  },
  {
    key: "email" as const,
    labelKey: "contact_email_label" as const,
    bodyKey: "contact_email_body" as const,
    ctaKey: "contact_cta_email" as const,
    href: emailHref,
    external: false,
    icon: "email" as const,
    primary: true,
  },
  {
    key: "github" as const,
    labelKey: "contact_networks_label" as const,
    bodyKey: "contact_networks_body" as const,
    ctaKey: "contact_cta_github" as const,
    href: site.github,
    external: true,
    icon: "github" as const,
    primary: false,
  },
];

type ContactSectionProps = {
  headingLevel?: "h1" | "h2";
};

export function ContactSection({ headingLevel }: ContactSectionProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const as = headingLevel ?? (pathname === "/" ? "h2" : "h1");

  return (
    <section
      id="contact"
      className="page-shell border-t border-border py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-14">
        <SectionHeader
          as={as}
          kicker={t.contact_kicker}
          title={t.contact_title}
          subtitle={t.contact_subtitle}
        />

        <div className="space-y-4 lg:text-right">
          <p className="inline-flex items-center gap-2 border border-highlight/30 bg-highlight-soft px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-highlight">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" />
            {t.contact_availability}
          </p>
          <p className="text-sm text-muted lg:ml-auto lg:max-w-sm">
            {t.contact_response}
          </p>
        </div>
      </div>

      {/* Primary CTA band */}
      <div className="mt-10 border border-border bg-surface p-6 sm:mt-12 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl space-y-2">
            <p className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              {t.contact_cta_headline}
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {t.contact_cta_support}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <a href={emailHref} className="btn-primary whitespace-nowrap">
              <SocialIcon kind="email" className="h-3.5 w-3.5" />
              {t.contact_cta_email_primary}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost whitespace-nowrap"
            >
              <SocialIcon kind="linkedin" className="h-3.5 w-3.5" />
              {t.contact_cta_linkedin_primary}
            </a>
            <ResumeDownloadButton className="btn-ghost whitespace-nowrap" />
          </div>
        </div>
      </div>

      {/* Channel cards — whole card is the link */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.key}
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex flex-col gap-4 border border-border bg-background p-5 transition hover:border-highlight hover:bg-highlight-soft sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center border border-border text-highlight transition group-hover:border-highlight group-hover:bg-background">
                <SocialIcon kind={channel.icon} className="h-4 w-4" />
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted transition group-hover:text-highlight">
                {t[channel.ctaKey]} →
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                {t[channel.labelKey]}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {t[channel.bodyKey]}
              </p>
            </div>
            {channel.key === "email" ? (
              <p className="mt-auto break-all text-sm font-medium text-highlight">
                {site.email}
              </p>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
