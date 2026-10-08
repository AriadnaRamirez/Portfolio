"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
export default function NotFound() {
  const { t } = useLanguage();
  const links = [
    { href: "/#work", label: t.nav_work },
    { href: "/#skills", label: t.nav_skills },
    { href: "/resume/", label: t.nav_resume },
    { href: "/#contact", label: t.nav_contact },
  ];

  return (
    <section className="cat-violet page-shell flex min-h-[70dvh] flex-col justify-center py-24">
      <meta name="robots" content="noindex" />
      <p className="section-kicker is-visible">{t.nf_kicker}</p>
      <p
        aria-hidden
        className="text-gradient-fill mt-6 font-display text-[clamp(6rem,20vw,13rem)] leading-[0.85] tracking-tight"
      >
        404
      </p>
      <h1 className="section-title mt-6 max-w-2xl">{t.nf_title}</h1>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{t.nf_body}</p>

      <div className="mt-9 flex flex-col gap-3 min-[480px]:flex-row">
        <Link href="/" className="btn-primary">
          {t.nf_home}
        </Link>
        <Link href="/#work" className="btn-ghost">
          {t.hero_cta_secondary}
        </Link>
      </div>

      <nav aria-label={t.nf_links} className="mt-14 border-t border-border pt-6">
        <p className="font-mono-label text-muted">{t.nf_links}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
