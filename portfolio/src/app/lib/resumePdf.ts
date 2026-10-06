import type { Lang } from "@/app/components/lib/translations";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const resumePdfFiles = {
  es: {
    href: `${basePath}/cv/AriadnaRamirez_CV_2026_ESP.pdf`,
    filename: "AriadnaRamirez_CV_2026_ESP.pdf",
  },
  en: {
    href: `${basePath}/cv/AriadnaRamirez_CV_2026_ENG.pdf`,
    filename: "AriadnaRamirez_CV_2026_ENG.pdf",
  },
} as const;

export function getResumePdf(lang: Lang) {
  return resumePdfFiles[lang];
}
