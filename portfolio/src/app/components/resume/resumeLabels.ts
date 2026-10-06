import { translations } from "@/app/components/lib/translations";
import type { ResumeVariant } from "@/app/lib/resumeContentShared";

type Copy = { [K in keyof (typeof translations)["es"]]: string };

export function resumeLabels(t: Copy, variant: ResumeVariant = "compact") {
  // Compact pack uses the full section names for a complete CV feel.
  if (variant === "compact") {
    return {
      profile: t.resume_section_profile,
      experience: t.resume_section_experience,
      projects: t.resume_section_projects_compact,
      programs: t.resume_section_programs,
      skills: t.resume_section_skills,
      education: t.resume_section_education,
      honors: t.resume_section_honors,
      certifications: t.resume_section_certs,
      languages: t.resume_section_languages,
      nestedProjectPrefix: t.resume_nested_project_prefix,
    };
  }

  return {
    education: t.resume_section_education,
    programs: t.resume_section_programs,
    experience: t.resume_section_experience,
    profile: t.resume_section_profile,
    projects: t.resume_section_projects,
    skills: t.resume_section_skills,
    honors: t.resume_section_honors,
    certifications: t.resume_section_certs,
    languages: t.resume_section_languages,
    nestedProjectPrefix: t.resume_nested_project_prefix,
  };
}
