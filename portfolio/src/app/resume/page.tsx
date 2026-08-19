"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { buildResume } from "@/app/lib/resume";
import { HarvardResume } from "../components/resume/HarvardResume";
import { ResumeDownloadButton } from "../components/resume/ResumeDownloadButton";
import { resumeLabels } from "../components/resume/resumeLabels";

export default function ResumePage() {
  const { lang, t } = useLanguage();
  const resume = buildResume(lang, t);

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
          <Link href="/about" prefetch className="btn-ghost">
            {t.nav_about}
          </Link>
        </div>
      </div>

      <div className="page-shell">
        <HarvardResume resume={resume} labels={resumeLabels(t)} />
      </div>
    </div>
  );
}
