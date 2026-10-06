import type { ReactNode } from "react";
import type { ResumeJob, ResumeLine, ResumeModel } from "@/app/lib/resume";

type Labels = {
  profile: string;
  education: string;
  programs: string;
  experience: string;
  projects: string;
  skills: string;
  honors: string;
  certifications: string;
  languages: string;
  nestedProjectPrefix: string;
};

type Props = {
  resume: ResumeModel;
  labels: Labels;
};

const serif = "font-[Times_New_Roman,Times,Georgia,serif]";

/** US Letter preview — matches PDF design (AriadnaRamirez_CV_2026). */
const letterPage =
  "harvard-resume relative mx-auto mb-6 box-border w-full max-w-[8.5in] min-h-[11in] bg-white px-[0.75in] py-[0.55in] text-black shadow-[0_18px_50px_rgba(12,12,12,0.12)] print:mb-0 print:min-h-0 print:shadow-none";

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
    <section className={first ? "mt-0" : "mt-4"}>
      <h2
        className={`${serif} mb-2 border-b border-black pb-0.5 text-[10.5px] font-bold uppercase tracking-[0.15em] text-black`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function DateRow({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <p className="min-w-0 flex-1 font-bold leading-[1.15]">{left}</p>
      {right ? (
        <p className="shrink-0 text-right text-[10px] leading-[1.15]">{right}</p>
      ) : null}
    </div>
  );
}

function LineBlock({ item }: { item: ResumeLine }) {
  return (
    <div className="mb-1.5 leading-[1.15] last:mb-0">
      <DateRow left={item.left} right={item.right} />
      {item.sub ? (
        <p className="mt-0.5 text-[10px] leading-[1.15]">{item.sub}</p>
      ) : null}
    </div>
  );
}

function Job({
  job,
  projectPrefix,
}: {
  job: ResumeJob;
  projectPrefix: string;
}) {
  const [lead, ...rest] = job.bullets;
  const hasNested = Boolean(job.nestedProjects?.length);

  return (
    <div className="mb-3 last:mb-0">
      <DateRow left={`${job.role} — ${job.org}`} right={job.period} />
      {hasNested && lead ? (
        <p className="mt-1 leading-[1.15]">{lead}</p>
      ) : job.bullets.length > 0 ? (
        <ul className="mt-1 list-disc space-y-1 pl-5 leading-[1.2]">
          {job.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {hasNested && rest.length > 0 ? (
        <ul className="mt-1 list-disc space-y-1 pl-5 leading-[1.2]">
          {rest.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {job.nestedProjects?.map((p) => (
        <div key={p.title} className="mt-2">
          <p className="font-bold leading-[1.15]">
            {projectPrefix} {p.title}
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 leading-[1.2]">
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
      {job.footerBullets?.map((line) => (
        <p key={line} className="mt-1.5 text-[9.5px] leading-[1.15]">
          {line}
        </p>
      ))}
    </div>
  );
}

export function HarvardResume({ resume, labels }: Props) {
  return (
    <div className={`${serif} space-y-6 text-[10.5px] leading-[1.15] text-black print:space-y-0`}>
      <article className={letterPage} data-page-size="letter">
        <header className="mb-3 text-center">
          <h1 className={`${serif} text-[16px] font-bold tracking-[0.16em]`}>
            {resume.name}
          </h1>
          <p className={`${serif} mt-2 text-[11px] italic`}>{resume.headline}</p>
          <p className={`${serif} mt-2 text-[10px]`}>
            {resume.contacts.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? " · " : null}
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-black no-underline hover:underline"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </p>
          {resume.location ? (
            <p className={`${serif} mt-1 text-[10px]`}>{resume.location}</p>
          ) : null}
        </header>

        <Section title={labels.profile} first>
          {resume.summary.split(/\n\n+/).map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-1 text-justify leading-[1.2] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </Section>

        <Section title={labels.experience}>
          {resume.experience.map((job) => (
            <Job
              key={`${job.org}-${job.period}`}
              job={job}
              projectPrefix={labels.nestedProjectPrefix}
            />
          ))}
        </Section>
      </article>

      <article className={letterPage} data-page-size="letter">
        <Section title={labels.projects} first>
          {resume.projects.map((project) => (
            <div key={project.title} className="mb-3 last:mb-0">
              <p className="font-bold leading-[1.15]">{project.title}</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 leading-[1.2]">
                {project.bullets.map((b) => (
                  <li key={b}>{b}</li>
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

        {resume.programs.length > 0 ? (
          <Section title={labels.programs}>
            {resume.programs.map((item) => (
              <LineBlock key={item.left} item={item} />
            ))}
          </Section>
        ) : null}

        <Section title={labels.skills}>
          {resume.skills.map((item) => (
            <p key={item.left} className="mb-1 leading-[1.15]">
              <span className="font-bold">{item.left}: </span>
              {item.sub}
            </p>
          ))}
        </Section>

        {resume.certifications.length > 0 ? (
          <Section title={labels.certifications}>
            {resume.certifications.map((item) => (
              <LineBlock key={item.left} item={item} />
            ))}
          </Section>
        ) : null}

        {resume.honors.length > 0 ? (
          <Section title={labels.honors}>
            <ul className="list-disc space-y-1 pl-5 leading-[1.2]">
              {resume.honors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {resume.languages.length > 0 ? (
          <Section title={labels.languages}>
            <p className="leading-[1.15]">{resume.languages.join(" · ")}</p>
          </Section>
        ) : null}
      </article>
    </div>
  );
}
