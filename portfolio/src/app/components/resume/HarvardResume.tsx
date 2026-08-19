import type { ReactNode } from "react";
import type { ResumeJob, ResumeLine, ResumeModel } from "@/app/lib/resume";

type Labels = {
  profile: string;
  education: string;
  experience: string;
  projects: string;
  skills: string;
  honors: string;
  certifications: string;
  languages: string;
};

type HarvardResumeProps = {
  resume: ResumeModel;
  labels: Labels;
};

function Section({
  title,
  children,
  first = false,
}: {
  title: string;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <section className={first ? "mt-0" : "mt-3.5"}>
      <h2 className="mb-1.5 border-b border-black pb-1 font-[Times_New_Roman,Times,Georgia,serif] text-[11px] font-bold uppercase tracking-[0.12em] text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function DateRow({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <p className="min-w-0 flex-1 font-bold">{left}</p>
      {right ? (
        <p className="shrink-0 text-right text-[10px]">{right}</p>
      ) : null}
    </div>
  );
}

function LineBlock({ item }: { item: ResumeLine }) {
  return (
    <div className="mb-1.5 last:mb-0">
      <DateRow left={item.left} right={item.right} />
      {item.sub ? <p>{item.sub}</p> : null}
    </div>
  );
}

function Job({ job }: { job: ResumeJob }) {
  return (
    <div>
      <DateRow left={`${job.role} — ${job.org}`} right={job.period} />
      <ul className="mt-1 list-disc space-y-1.5 pl-5">
        {job.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {job.nestedProjects?.map((project) => (
        <div key={project.title} className="mt-2.5">
          <p className="font-bold italic">{project.title}</p>
          <ul className="mt-1 list-disc space-y-1.5 pl-5">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Header({ resume }: { resume: ResumeModel }) {
  return (
    <header className="mb-3 text-center">
      <h1 className="font-[Times_New_Roman,Times,Georgia,serif] text-[18px] font-bold tracking-[0.14em] text-black">
        {resume.name}
      </h1>
      <p className="mt-1.5 font-[Times_New_Roman,Times,Georgia,serif] text-[11.5px] italic text-black">
        {resume.headline}
      </p>
      <p className="mt-2 font-[Times_New_Roman,Times,Georgia,serif] text-[10px] text-black">
        {resume.location}
      </p>
      <p className="mt-1 font-[Times_New_Roman,Times,Georgia,serif] text-[10px] text-black">
        {resume.contactLine}
      </p>
      <div className="mt-3 h-px bg-black" />
    </header>
  );
}

function Sheet({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <article className="harvard-resume relative mx-auto mb-8 flex h-[11in] w-full max-w-[8.5in] flex-col overflow-hidden bg-white px-[42px] pb-10 pt-10 text-black shadow-[0_18px_50px_rgba(12,12,12,0.12)]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden font-[Times_New_Roman,Times,Georgia,serif] text-[10.5px] leading-relaxed text-black">
        {children}
      </div>
    </article>
  );
}

export function HarvardResume({ resume, labels }: HarvardResumeProps) {
  return (
    <div>
      <Sheet>
        <div className="flex min-h-0 flex-1 flex-col">
          <Header resume={resume} />
          <Section title={labels.profile} first>
            <p className="leading-relaxed">{resume.summary}</p>
            <p className="mt-2 font-bold">{resume.awardsLead}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {resume.awards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title={labels.experience}>
            <div className="space-y-3">
              {resume.experience.map((job) => (
                <Job key={`${job.org}-${job.period}`} job={job} />
              ))}
            </div>
          </Section>
        </div>
      </Sheet>

      <Sheet>
        <Section title={labels.projects} first>
          {resume.projects.map((project) => (
            <div key={project.title} className="mb-2 last:mb-0">
              <p className="font-bold">{project.title}</p>
              <ul className="list-disc space-y-1 pl-5">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title={labels.education}>
          {resume.education.map((item) => (
            <LineBlock key={item.left} item={item} />
          ))}
        </Section>

        <Section title={labels.skills}>
          {resume.skills.map((item) => (
            <p key={item.left} className="mb-1 last:mb-0">
              <span className="font-bold">{item.left}: </span>
              {item.sub}
            </p>
          ))}
        </Section>

        <Section title={labels.certifications}>
          {resume.certifications.map((item) => (
            <LineBlock key={item.left} item={item} />
          ))}
        </Section>

        <Section title={labels.honors}>
          <ul className="list-disc space-y-0.5 pl-5">
            {resume.honors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title={labels.languages}>
          <p>{resume.languages.join("  •  ")}</p>
        </Section>
      </Sheet>
    </div>
  );
}
