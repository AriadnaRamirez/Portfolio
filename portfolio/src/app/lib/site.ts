export const site = {
  name: "Ariadna Ramírez",
  fullName: "Ariadna Montserrat Ramírez Matías",
  title: "Fullstack web developer · UX/UI · Cybersecurity",
  location: "Mexico · Remote · Hybrid · On-site",
  linkedin: "https://www.linkedin.com/in/ariadnaramirez",
  github: "https://github.com/AriadnaRamirez",
  email: "ariadnamts98@gmail.com",
  phone: "951 218 9458",
  phoneHref: "tel:+529512189458",
  coreStack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Tailwind",
    "Figma",
  ] as const,
} as const;

export type ProjectLink = {
  labelKey: "projects_link_live" | "projects_link_github";
  href: string;
};

export type ProjectCategory = "fullstack" | "frontend" | "product";

export type ProjectId = "servi" | "senda" | "fram" | "hotel" | "dulce";

export type MediaKind = "desktop" | "tablet" | "mobile";

export type TechId =
  | "typescript"
  | "react"
  | "nextjs"
  | "nodejs"
  | "postgresql"
  | "mongodb"
  | "tailwind"
  | "figma"
  | "vite"
  | "oauth"
  | "seo"
  | "wordpress";

export const projectMeta: Record<
  ProjectId,
  {
    badge: { es: string; en: string };
    tech: TechId[];
    categories: ProjectCategory[];
    links: ProjectLink[];
    featured?: boolean;
    accent: string;
  }
> = {
  hotel: {
    badge: { es: "GROVA · Rediseño", en: "GROVA · Redesign" },
    tech: ["vite", "typescript", "tailwind", "figma"],
    categories: ["frontend", "product"],
    links: [
      {
        labelKey: "projects_link_live",
        href: "https://www.hotelmarquesdelvalle.com.mx/",
      },
    ],
    featured: true,
    accent: "#3d1f24",
  },
  senda: {
    badge: { es: "GROVA · Cliente privado", en: "GROVA · Private client" },
    tech: ["react", "typescript"],
    categories: ["frontend", "product"],
    // Private client work: no public live URL or GitHub.
    links: [],
    featured: true,
    accent: "#5a252c",
  },
  servi: {
    badge: { es: "Proyecto escolar", en: "Academic project" },
    tech: ["nextjs", "typescript", "tailwind", "postgresql", "oauth"],
    categories: ["fullstack", "product"],
    links: [],
    featured: true,
    accent: "#722f37",
  },
  fram: {
    badge: { es: "Proyecto escolar · E-commerce", en: "Academic project · E-commerce" },
    tech: ["nextjs", "typescript", "tailwind", "seo"],
    categories: ["frontend"],
    links: [],
    accent: "#8b3a42",
  },
  dulce: {
    badge: { es: "Proyecto escolar · Full stack", en: "Academic project · Full stack" },
    tech: ["react", "vite", "nodejs", "postgresql"],
    categories: ["fullstack", "product"],
    links: [
      {
        labelKey: "projects_link_live",
        href: "https://dulceglaseado.com",
      },
    ],
    featured: true,
    accent: "#e91e63",
  },
};

/** Shots per device (hotel: 1 sticky open, 2–5 sticky closed). */
export const projectMediaShotCount: Partial<Record<ProjectId, number>> = {
  hotel: 5,
  dulce: 4,
};

/** Which device mockups to show. Defaults to all three. */
export const projectMediaKinds: Partial<Record<ProjectId, MediaKind[]>> = {
  dulce: ["desktop"],
};

/** Real screenshots replace SVG mockups when an extension is set per project/kind. */
const projectMediaExt: Partial<
  Record<ProjectId, Partial<Record<MediaKind, "png" | "jpg" | "webp">>>
> = {
  hotel: {
    desktop: "png",
    tablet: "png",
    mobile: "png",
  },
  dulce: {
    desktop: "png",
  },
};

export function projectShotCount(id: ProjectId) {
  return projectMediaShotCount[id] ?? 1;
}

export function projectKinds(id: ProjectId): MediaKind[] {
  return projectMediaKinds[id] ?? ["desktop", "tablet", "mobile"];
}

export function projectMediaPath(
  id: ProjectId,
  kind: MediaKind,
  shot = 1,
) {
  const count = projectShotCount(id);
  const n = Math.min(Math.max(shot, 1), count);
  const ext = projectMediaExt[id]?.[kind] ?? "svg";
  if (count > 1) return `/projects/${id}/${kind}-${n}.${ext}`;
  return `/projects/${id}/${kind}.${ext}`;
}

/** Display order: Hotel → Senda → Serviyapp → Dulce Glaseado → Framboyán */
export const projectIds: ProjectId[] = ["hotel", "senda", "servi", "dulce", "fram"];

export const navPages = [
  { href: "/", key: "nav_home" as const },
  { href: "/work", key: "nav_work" as const },
  { href: "/experience", key: "nav_experience" as const },
  { href: "/about", key: "nav_about" as const },
  { href: "/contact", key: "nav_contact" as const },
] as const;

export const experienceIds = ["grova", "crm", "rise", "dulce", "kansas"] as const;

export type ExperienceId = (typeof experienceIds)[number];

export const experienceBulletCounts: Record<ExperienceId, number> = {
  grova: 7,
  crm: 2,
  rise: 2,
  dulce: 2,
  kansas: 2,
};

export const educationIds = [
  "generation_restart",
  "ja_cyber",
  "henry",
  "ebac",
  "lasalle",
  "kansas_ms",
] as const;

export const scholarshipIds = [
  "mujer_digital",
  "generation_aws",
  "fulbright",
] as const;

export const certificationIds = [
  "ccna",
  "toefl",
  "henry_cert",
  "python_data",
  "python_prog",
] as const;

export const awardIds = [
  "merito",
  "raise",
  "lasalle_2019",
  "semilleros",
  "omm_2015",
] as const;

export const stackGroups: Record<
  "frontend" | "backend" | "tools",
  readonly TechId[]
> = {
  frontend: ["typescript", "react", "nextjs", "tailwind", "figma"],
  backend: ["nodejs", "postgresql", "mongodb", "oauth"],
  tools: ["wordpress", "vite", "seo"],
};

export const techLabels: Record<TechId, string> = {
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  nodejs: "Node.js",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  tailwind: "Tailwind",
  figma: "Figma",
  vite: "Vite",
  oauth: "OAuth",
  seo: "SEO",
  wordpress: "WordPress",
};
