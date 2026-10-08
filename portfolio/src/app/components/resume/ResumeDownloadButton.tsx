"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { getResumePdf } from "@/app/lib/resumePdf";

type ResumeDownloadButtonProps = {
  className?: string;
};

export function ResumeDownloadButton({ className }: ResumeDownloadButtonProps) {
  const { lang, t } = useLanguage();
  const file = getResumePdf(lang);

  return (
    <a
      href={file.href}
      download={file.filename}
      data-umami-event="cv-download"
      data-umami-event-lang={lang}
      className={className ?? "btn-primary"}
    >
      {t.resume_download}
    </a>
  );
}
