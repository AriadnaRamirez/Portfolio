"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { ResumeDownloadButton } from "../components/resume/ResumeDownloadButton";
import { getResumePdf } from "../lib/resumePdf";

export default function ResumePage() {
  const { lang, t } = useLanguage();
  const file = getResumePdf(lang);

  return (
    <div className="resume-page border-t border-border bg-[#eceae6] py-10 sm:py-14 dark:bg-[#121212]">
      <div className="resume-toolbar page-shell mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="section-kicker">{t.resume_kicker}</p>
          <h1 className="font-display text-3xl text-foreground sm:text-4xl">
            {t.resume_title}
          </h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ResumeDownloadButton />
          <a href={file.href} target="_blank" rel="noreferrer" className="btn-ghost">
            {lang === "es" ? "Abrir PDF" : "Open PDF"}
          </a>
          <Link href="/#about" prefetch className="btn-ghost">
            {t.nav_about}
          </Link>
        </div>
      </div>

      <div className="page-shell">
        <div className="mx-auto w-full max-w-[8.5in] overflow-hidden rounded-sm bg-white shadow-[0_18px_50px_rgba(12,12,12,0.12)]">
          <object
            key={file.href}
            data={`${file.href}#toolbar=1&navpanes=0&view=FitH`}
            type="application/pdf"
            className="block h-[min(1400px,calc(100vh-10rem))] w-full"
            aria-label={t.resume_title}
          >
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
              <p className="text-sm text-muted">
                {lang === "es"
                  ? "Tu navegador no puede mostrar el PDF aquí."
                  : "Your browser can’t display the PDF here."}
              </p>
              <a href={file.href} target="_blank" rel="noreferrer" className="btn-primary">
                {lang === "es" ? "Abrir CV en PDF" : "Open CV PDF"}
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
