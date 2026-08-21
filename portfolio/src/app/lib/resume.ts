import { translations, type Lang } from "@/app/components/lib/translations";
import { certificationIds, educationIds, scholarshipIds, site } from "@/app/lib/site";

type Copy = { [K in keyof (typeof translations)["es"]]: string };

export type ResumeLine = { left: string; right?: string; sub?: string };
export type ResumeJob = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  nestedProjects?: { title: string; bullets: string[] }[];
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
  awardsLead: string;
  awards: string[];
  education: ResumeLine[];
  experience: ResumeJob[];
  projects: ResumeProject[];
  skills: ResumeLine[];
  honors: string[];
  certifications: ResumeLine[];
  languages: string[];
  filename: string;
};

export function buildResume(lang: Lang, t: Copy): ResumeModel {
  const linkedin = site.linkedin.replace(/^https?:\/\//, "").replace(/^www\./, "");
  const github = site.github.replace(/^https?:\/\//, "");
  const phone = `+52 ${site.phone}`;

  return {
    name: site.fullName.toUpperCase(),
    headline: t.resume_headline,
    location: t.resume_location,
    contactLine: `${site.email}  •  ${phone}  •  ${linkedin}  •  ${github}`,
    contacts: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: phone, href: site.phoneHref },
      { label: linkedin, href: site.linkedin },
      { label: github, href: site.github },
    ],
    summary: t.resume_summary,
    awardsLead: t.resume_awards_lead,
    awards: [
      t.resume_award_fulbright,
      t.resume_award_ja,
      t.resume_award_generation,
    ],
    education: educationIds.map((id) => ({
      left: t[`edu_${id}_school` as keyof Copy],
      right: t[`edu_${id}_period` as keyof Copy],
      sub: t[`edu_${id}_degree` as keyof Copy],
    })),
    experience: [
      {
        org: t.exp_grova_org,
        role: t.exp_grova_role,
        period: t.exp_grova_period,
        bullets: [
          t.exp_grova_b1,
          t.exp_grova_b2,
          t.exp_grova_b3,
          t.exp_grova_b4,
          t.exp_grova_b5,
        ],
        nestedProjects: [
          {
            title: t.exp_grova_p_hotel_title,
            bullets: [t.exp_grova_p_hotel_b1, t.exp_grova_p_hotel_b2],
          },
          {
            title: t.exp_grova_p_senda_title,
            bullets: [t.exp_grova_p_senda_b1, t.exp_grova_p_senda_b2],
          },
        ],
      },
      {
        org: t.exp_crm_org,
        role: t.exp_crm_role,
        period: t.exp_crm_period,
        bullets: [t.exp_crm_b1, t.exp_crm_b2],
      },
      {
        org: t.exp_rise_org,
        role: t.exp_rise_role,
        period: t.exp_rise_period,
        bullets: [t.exp_rise_b1, t.exp_rise_b2],
      },
      {
        org: t.exp_dulce_org,
        role: t.exp_dulce_role,
        period: t.exp_dulce_period,
        bullets: [t.exp_dulce_b1, t.exp_dulce_b2],
      },
      {
        org: t.exp_kansas_org,
        role: t.exp_kansas_role,
        period: t.exp_kansas_period,
        bullets: [t.exp_kansas_b1, t.exp_kansas_b2],
      },
    ],
    projects: [
      {
        title: t.resume_school_servi_title,
        bullets: [t.resume_school_servi_b1, t.resume_school_servi_b2, t.resume_school_servi_b3],
      },
      {
        title: t.resume_school_dulce_title,
        bullets: [
          t.resume_school_dulce_b1,
          t.resume_school_dulce_b2,
          t.resume_school_dulce_b3,
        ],
      },
      {
        title: t.resume_school_fram_title,
        bullets: [
          t.resume_school_fram_b1,
          t.resume_school_fram_b2,
          t.resume_school_fram_b3,
        ],
      },
    ],
    skills: [
      { left: t.resume_label_frontend, sub: t.resume_skills_frontend },
      { left: t.resume_label_backend, sub: t.resume_skills_backend },
      { left: t.resume_label_databases, sub: t.resume_skills_databases },
      { left: t.resume_label_testing, sub: t.resume_skills_testing },
      { left: t.resume_label_cloud, sub: t.resume_skills_cloud },
      { left: t.resume_label_vcs, sub: t.resume_skills_vcs },
      { left: t.resume_label_auth, sub: t.resume_skills_auth },
      { left: t.resume_label_methods, sub: t.resume_skills_methods },
    ],
    honors: [
      ...scholarshipIds.map(
        (id) =>
          `${t[`sch_${id}_program` as keyof Copy]} — ${t[`sch_${id}_org` as keyof Copy]}`,
      ),
      t.award_merito,
      t.award_raise,
      t.award_lasalle_2019,
      t.award_semilleros,
      t.award_omm_2015,
    ],
    certifications: certificationIds.map((id) => {
      const org = t[`cert_${id}_org` as keyof Copy];
      return {
        left: t[`cert_${id}_title` as keyof Copy],
        right: t[`cert_${id}_period` as keyof Copy],
        sub: org || undefined,
      };
    }),
    languages: [t.lang_es, t.lang_en],
    filename:
      lang === "es"
        ? "AriadnaMontserratRamirezMatias_CV_2026_ESP.pdf"
        : "AriadnaMontserratRamirezMatias_CV_2026_ENG.pdf",
  };
}
