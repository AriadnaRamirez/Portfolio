import { translations, type Lang } from "@/app/components/lib/translations";
import { getResumeCopy, type ResumeVariant } from "@/app/lib/resumeContent";
import { site } from "@/app/lib/site";

type Copy = { [K in keyof (typeof translations)["es"]]: string };

export type ResumeLine = { left: string; right?: string; sub?: string };
export type ResumeJob = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  nestedProjects?: { title: string; bullets: string[] }[];
  footerBullets?: string[];
};
export type ResumeProject = {
  title: string;
  bullets: string[];
};

export type ResumeModel = {
  name: string;
  headline: string;
  location: string;
  contactLine: string;
  contacts: { label: string; href: string }[];
  summary: string;
  education: ResumeLine[];
  programs: ResumeLine[];
  experience: ResumeJob[];
  projects: ResumeProject[];
  skills: ResumeLine[];
  honors: string[];
  certifications: ResumeLine[];
  languages: string[];
  filename: string;
  variant: ResumeVariant;
};

export function buildResume(
  lang: Lang,
  _t: Copy,
  variant: ResumeVariant = "compact",
): ResumeModel {
  const linkedin = site.linkedin.replace(/^https?:\/\//, "").replace(/^www\./, "");
  const github = site.github.replace(/^https?:\/\//, "");
  const phone = `+52 ${site.phone}`;
  const copy = getResumeCopy(lang, variant);
  const langTag = lang === "es" ? "ESP" : "ENG";
  const variantTag = variant === "extended" ? "_EXT" : "";

  return {
    name: site.fullName.toUpperCase(),
    headline: copy.headline,
    location: copy.location,
    contactLine: `${site.email}  •  ${phone}  •  ${linkedin}  •  ${github}`,
    contacts: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: phone, href: site.phoneHref },
      { label: linkedin, href: site.linkedin },
      { label: github, href: site.github },
    ],
    summary: copy.summary,
    education: copy.education,
    programs: copy.programs,
    experience: copy.experience,
    projects: copy.projects,
    skills: copy.skills,
    honors: copy.honors,
    certifications: copy.certifications,
    languages: copy.languages,
    variant,
    filename: `AriadnaMontserratRamirezMatias_CV_2026_${langTag}${variantTag}.pdf`,
  };
}
