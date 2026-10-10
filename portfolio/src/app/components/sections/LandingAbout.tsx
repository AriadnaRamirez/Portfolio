"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { assetPath } from "@/app/lib/siteUrl";
import { Character } from "../ui/Character";
import { Reveal } from "../ui/Reveal";

const floaters = [
  { file: "react", label: "React", pos: "top-[16%] left-[7%]", delay: "0s" },
  { file: "typescript", label: "TypeScript", pos: "top-[36%] right-[6%]", delay: "-2s" },
  { file: "figma", label: "Figma", pos: "bottom-[24%] left-[5%]", delay: "-4s" },
  { file: "nodejs", label: "Node.js", pos: "bottom-[10%] right-[9%]", delay: "-1s" },
];

export function LandingAbout() {
  const { t } = useLanguage();
  const focus = [
    t.landing_about_focus_1,
    t.landing_about_focus_2,
    t.landing_about_focus_3,
    t.landing_about_focus_4,
    t.landing_about_focus_5,
  ];

  return (
    <section id="about" className="cat-teal page-shell py-24 sm:py-32 lg:py-10">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <Reveal variant="clip" className="lg:col-span-5">
          <div className="about-stage relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.75rem] border border-border lg:max-w-none">
            <div className="absolute inset-x-0 top-[10%] bottom-[5%] flex justify-center">
              <Character className="h-full" />
            </div>

            {floaters.map((f) => (
              <span
                key={f.file}
                style={{ animationDelay: f.delay }}
                className={`about-floater absolute ${f.pos} inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)] backdrop-blur`}
              >
                <img
                  src={assetPath(`/stack/${f.file}.svg`)}
                  alt=""
                  className="h-4 w-4"
                  loading="lazy"
                />
                {f.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="space-y-8 lg:col-span-7 lg:space-y-5 lg:pl-4">
          <Reveal variant="left">
            <p className="section-kicker">{t.nav_about}</p>
          </Reveal>
          <Reveal variant="blur" delay={100}>
            <h2 className="section-title">
              {t.agency_about_title}
            </h2>
          </Reveal>

          <Reveal variant="up" delay={260}>
            <p className="max-w-prose text-lg leading-relaxed text-muted">
              {t.agency_about_p1} {t.agency_about_p2}
            </p>
          </Reveal>

          <Reveal variant="scale" delay={200}>
            <h3 className="font-mono-label text-muted">{t.landing_about_focus_label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {focus.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,var(--cat-from),var(--cat-to))]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
