import { translations } from "@/app/components/lib/translations";

type Copy = { [K in keyof (typeof translations)["es"]]: string };

export function resumeLabels(t: Copy) {
  return {
    education: t.resume_section_education,
    experience: t.resume_section_experience,
    profile: t.resume_section_profile,
    projects: t.resume_section_projects,
    skills: t.resume_section_skills,
    honors: t.resume_section_honors,
    certifications: t.resume_section_certs,
    languages: t.resume_section_languages,
  };
}
