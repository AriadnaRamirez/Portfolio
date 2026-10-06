import type { Lang } from "@/app/components/lib/translations";
import { getCompactResumeCopy } from "@/app/lib/resumeContentCompact";
import { getExtendedResumeCopy } from "@/app/lib/resumeContentExtended";
import type { ResumeCopy, ResumeVariant } from "@/app/lib/resumeContentShared";

export type { ResumeCopy, ResumeVariant } from "@/app/lib/resumeContentShared";

/** Default for download and /resume preview is the compact 2-page CV. */
export function getResumeCopy(
  lang: Lang,
  variant: ResumeVariant = "compact",
): ResumeCopy {
  return variant === "extended"
    ? getExtendedResumeCopy(lang)
    : getCompactResumeCopy(lang);
}
