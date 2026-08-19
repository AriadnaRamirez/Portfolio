"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import {
  projectIds,
  projectMeta,
  type ProjectCategory,
  type ProjectId,
} from "@/app/lib/site";
import { SectionHeader } from "../ui/SectionHeader";
import { Tabs } from "../ui/Tabs";
import { ProjectCard } from "./ProjectCard";

function ProjectList({
  ids,
  lang,
  t,
}: {
  ids: ProjectId[];
  lang: "es" | "en";
  t: ReturnType<typeof useLanguage>["t"];
}) {
  if (!ids.length) {
    return <p className="text-sm text-muted">—</p>;
  }

  return (
    <div className="border-t border-border">
      {ids.map((id) => (
        <ProjectCard key={id} id={id} lang={lang} t={t} />
      ))}
    </div>
  );
}

function filterBy(category?: ProjectCategory) {
  if (!category) return projectIds;
  return projectIds.filter((id) =>
    projectMeta[id].categories.includes(category),
  );
}

export function WorkSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="page-shell py-16 sm:py-24">
      <SectionHeader
        kicker={t.work_kicker}
        title={t.work_title}
        subtitle={t.work_subtitle}
      />

      <div className="mt-12 sm:mt-16">
        <Tabs
          items={[
            {
              id: "all",
              label: t.work_tab_all,
              content: (
                <ProjectList ids={filterBy()} lang={lang} t={t} />
              ),
            },
            {
              id: "fullstack",
              label: t.work_tab_fullstack,
              content: (
                <ProjectList ids={filterBy("fullstack")} lang={lang} t={t} />
              ),
            },
            {
              id: "frontend",
              label: t.work_tab_frontend,
              content: (
                <ProjectList ids={filterBy("frontend")} lang={lang} t={t} />
              ),
            },
            {
              id: "product",
              label: t.work_tab_product,
              content: (
                <ProjectList ids={filterBy("product")} lang={lang} t={t} />
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
