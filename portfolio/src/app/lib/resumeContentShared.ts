import type { ResumeJob, ResumeLine, ResumeProject } from "@/app/lib/resume";

/** Shared CV content shape for compact and extended variants. */
export type ResumeCopy = {
  headline: string;
  location: string;
  summary: string;
  experience: ResumeJob[];
  projects: ResumeProject[];
  education: ResumeLine[];
  programs: ResumeLine[];
  skills: ResumeLine[];
  certifications: ResumeLine[];
  honors: string[];
  languages: string[];
};

export type ResumeVariant = "compact" | "extended";
