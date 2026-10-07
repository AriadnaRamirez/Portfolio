export const site = {
  name: "Ariadna Ramírez",
  fullName: "Ariadna Montserrat Ramírez Matías",
  title: "Fullstack Web Developer | Frontend · React · TypeScript · UX/UI",
  location: "Mexico · Remote / Hybrid / On-site",
  linkedin: "https://www.linkedin.com/in/ariadnaramirez",
  github: "https://github.com/AriadnaRamirez",
  email: "ariadnamts98@gmail.com",
  phone: "951 218 9458",
  phoneHref: "tel:+529512189458",
  /** Portrait used in hero / about (under public/). */
  photo: "/images/ariadna.jpg",
  avatar: "/images/ariadna-avatar.png",
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

export type ProjectId = "crm" | "servi" | "senda" | "fram" | "hotel" | "dulce" | "ccst";

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
  | "wordpress"
  | "javascript"
  | "html"
  | "css"
  | "cursor"
  | "figmamake"
  | "nestjs"
  | "vercel"
  | "render"
  | "neon";

export const projectMeta: Record<
  ProjectId,
  {
    badge: { es: string; en: string };
    tech: TechId[];
    categories: ProjectCategory[];
    links: ProjectLink[];
    /** Shown instead of a live link when the project can't be visited. */
    status?: "private" | "pending";
    featured?: boolean;
    accent: string;
  }
> = {
  crm: {
    badge: {
      es: "Freelance · Trabajo Independiente",
      en: "Freelance · Independent work",
    },
    tech: ["html", "css", "javascript", "cursor"],
    categories: ["frontend", "product"],
    links: [
      {
        labelKey: "projects_link_live",
        href: "https://www.crmextintores.com.mx/",
      },
    ],
    featured: true,
    accent: "#c62828",
  },
  hotel: {
    badge: { es: "GROVA · HMDV · Rediseño", en: "GROVA · HMDV · Redesign" },
    tech: ["figma", "figmamake", "vite", "react", "typescript", "tailwind"],
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
  ccst: {
    badge: { es: "Proyecto personal · Fullstack", en: "Personal project · Fullstack" },
    tech: ["nextjs", "nestjs", "typescript", "postgresql", "vercel", "render", "neon", "cursor"],
    categories: ["fullstack", "product"],
    links: [
      {
        labelKey: "projects_link_live",
        href: "https://ccst-study-lab.vercel.app/",
      },
    ],
    featured: true,
    accent: "#1f1f1f",
  },
  senda: {
    badge: { es: "GROVA · Cliente privado", en: "GROVA · Private client" },
    tech: ["react", "typescript", "vite"],
    categories: ["frontend", "product"],
    // Private client work: no public live URL or GitHub.
    links: [],
    status: "private",
    featured: true,
    accent: "#5a252c",
  },
  servi: {
    badge: {
      es: "Proyecto estudiantil · Marketplace",
      en: "Student project · Marketplace",
    },
    tech: ["nextjs", "typescript", "tailwind", "oauth"],
    categories: ["fullstack", "product"],
    links: [],
    status: "pending",
    featured: true,
    accent: "#722f37",
  },
  // Kept in meta for assets/types; not listed on CV (excluded from projectIds).
  fram: {
    badge: { es: "Proyecto escolar · Fullstack", en: "Academic project · Fullstack" },
    tech: ["nextjs", "typescript", "nodejs", "postgresql"],
    categories: ["fullstack", "product"],
    links: [],
    accent: "#8b3a42",
  },
  dulce: {
    badge: { es: "Proyecto escolar · Fullstack", en: "Academic project · Fullstack" },
    tech: ["react", "vite", "nodejs", "postgresql"],
    categories: ["fullstack", "product"],
    links: [
      {
        labelKey: "projects_link_live",
        href: "https://dulceglaseado.com",
      },
    ],
    accent: "#e91e63",
  },
};

/** Shots per device. */
export const projectMediaShotCount: Partial<Record<ProjectId, number>> = {
  hotel: 6,
  dulce: 4,
  crm: 6,
  senda: 6,
  ccst: 6,
};

/** Screenshots of the site before the redesign, under /projects/<id>/before-<n>.webp. */
export const projectBeforeShotCount: Partial<Record<ProjectId, number>> = {
  hotel: 3,
  crm: 3,
};

export function projectBeforePath(id: ProjectId, shot: number) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}/projects/${id}/before-${shot}.webp`;
}

export function projectDesktopShots(id: ProjectId) {
  return Array.from({ length: projectShotCount(id) }, (_, i) =>
    projectMediaPath(id, "desktop", i + 1),
  );
}

export function projectBeforeShots(id: ProjectId) {
  return Array.from({ length: projectBeforeShotCount[id] ?? 0 }, (_, i) =>
    projectBeforePath(id, i + 1),
  );
}

/** Which device mockups to show; a phone frame overlays the desktop when mobile shots exist. */
export const projectMediaKinds: Partial<Record<ProjectId, MediaKind[]>> = {
  hotel: ["desktop", "mobile"],
  crm: ["desktop", "mobile"],
  ccst: ["desktop", "mobile"],
  senda: ["desktop"],
  servi: ["desktop"],
  dulce: ["desktop"],
  fram: ["desktop"],
};

/** Real screenshots replace SVG mockups when an extension is set per project/kind. */
const projectMediaExt: Partial<
  Record<ProjectId, Partial<Record<MediaKind, "png" | "jpg" | "webp">>>
> = {
  hotel: {
    desktop: "webp",
    mobile: "webp",
  },
  dulce: {
    desktop: "webp",
  },
  crm: {
    desktop: "webp",
    mobile: "webp",
  },
  senda: {
    desktop: "webp",
  },
  ccst: {
    desktop: "webp",
    mobile: "webp",
  },
};

export function projectShotCount(id: ProjectId) {
  return projectMediaShotCount[id] ?? 1;
}

export function projectKinds(id: ProjectId): MediaKind[] {
  return projectMediaKinds[id] ?? ["desktop"];
}

export function projectMediaPath(
  id: ProjectId,
  kind: MediaKind,
  shot = 1,
) {
  const count = projectShotCount(id);
  const n = Math.min(Math.max(shot, 1), count);
  const ext = projectMediaExt[id]?.[kind] ?? "svg";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (count > 1) return `${base}/projects/${id}/${kind}-${n}.${ext}`;
  return `${base}/projects/${id}/${kind}.${ext}`;
}

/** Display order: CRM → HMDV → CCST Study Lab → SENDA → ServiYApp (student). */
export const projectIds: ProjectId[] = ["crm", "hotel", "ccst", "senda", "servi"];

export const navPages = [
  { href: "/#work", key: "nav_work" as const },
  { href: "/#skills", key: "nav_skills" as const },
  { href: "/#certs", key: "nav_certs" as const },
  { href: "/#experience", key: "nav_experience" as const },
  { href: "/#about", key: "nav_about" as const },
  { href: "/#contact", key: "nav_contact" as const },
] as const;

/** Roles from the current CV (CRM current, then GROVA). */
export const experienceIds = ["crm", "grova"] as const;

export type ExperienceId = (typeof experienceIds)[number];

export const experienceBulletCounts: Record<ExperienceId, number> = {
  crm: 5,
  grova: 5,
};

export const educationIds = [
  "henry",
  "ebac",
  "lasalle",
  "kansas_ms",
] as const;

export const scholarshipIds = [
  "generation_aws",
  "epam",
  "hitss",
  "mujer_digital",
] as const;

export const certificationIds = [
  "henry_cert",
  "ebac_ux",
  "ccst",
  "cisco_badges",
  "python",
] as const;

export const awardIds = ["lasalle_valedictorian", "hermano_miguel"] as const;

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
  javascript: "JavaScript",
  html: "HTML5",
  css: "CSS3",
  cursor: "Cursor",
  figmamake: "Figma Make",
  nestjs: "NestJS",
  vercel: "Vercel",
  render: "Render",
  neon: "Neon",
};
