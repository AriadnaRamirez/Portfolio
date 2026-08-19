"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { buildResume } from "@/app/lib/resume";
import { resumeLabels } from "./resumeLabels";

type ResumeDownloadButtonProps = {
  className?: string;
};

export function ResumeDownloadButton({ className }: ResumeDownloadButtonProps) {
  const { lang, t } = useLanguage();
  const [busy, setBusy] = useState(false);

  async function onDownload() {
    if (busy) return;
    setBusy(true);
    try {
      const [{ pdf }, { HarvardResumePdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./HarvardResumePdf"),
      ]);
      const resume = buildResume(lang, t);
      const blob = await pdf(
        <HarvardResumePdf resume={resume} labels={resumeLabels(t)} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resume.filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={busy}
      className={className ?? "btn-primary"}
    >
      {busy ? t.resume_downloading : t.resume_download}
    </button>
  );
}
