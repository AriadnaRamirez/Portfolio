// components/sections/StackSection.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";


export default function StackSection() {
  const { t } = useLanguage();

  const frontend = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ];

  const backend = ["Node.js", "NestJS", "Express", "PostgreSQL", "MongoDB", "REST APIs"];

  const tools = [
    "Git & GitHub",
    "Figma",
    "Vercel",
    "Render",
    "Postman",
    "Notion",
  ];

  return (
    <section
      id="stack"
      className="bg-background text-foreground border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-500 dark:text-neutral-400">
            {t.nav_stack}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">{t.stack_title}</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            {t.stack_subtitle}
          </p>
        </header>

        <div className="space-y-6">
          <StackGroup title={t.stack_frontend} items={frontend} />
          <StackGroup title={t.stack_backend} items={backend} />
          <StackGroup title={t.stack_tools} items={tools} />
        </div>
      </div>
    </section>
  );
}

function StackGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5">
      <h3 className="text-sm font-semibold mb-3 text-neutral-800 dark:text-neutral-100">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-[11px] text-neutral-700 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-900"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
