// components/sections/ContactSection.tsx
"use client";

import { useLanguage } from "@/app/context/LanguageContext";


export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="bg-background text-foreground border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <header className="space-y-2 text-center md:text-left">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-500 dark:text-neutral-400">
            {t.nav_contact}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">{t.contact_title}</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            {t.contact_subtitle}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Email */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">
                {t.contact_email_label}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Puedes escribirme directamente si quieres hablar de un proyecto,
                colaboración o algo más personal.
              </p>
            </div>
            <div className="mt-4">
              <a
                href="mailto:tu-correo@aqui.com"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition w-full md:w-auto"
              >
                {t.contact_cta_email}
              </a>
            </div>
          </div>

          {/* Redes */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">
                {t.contact_networks_label}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                También puedes conocer mejor mi trabajo y experiencia técnica en
                estas plataformas.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/tu-link"
                target="_blank"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                {t.contact_cta_linkedin}
              </a>
              <a
                href="https://github.com/tu-usuario"
                target="_blank"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                {t.contact_cta_github}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
