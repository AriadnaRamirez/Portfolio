export const site = {
  name: "Ariadna Ramírez",
  fullName: "Ariadna Montserrat Ramírez Matías",
  title: "Fullstack web developer · UX/UI · Cybersecurity · DevOps",
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

export type ProjectId = "servi" | "senda" | "fram" | "hotel";

export type MediaKind = "desktop" | "mobile" | "detail";

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
    badge: { es: "GROVA · Clínica", en: "GROVA · Clinic" },
    tech: ["react", "typescript"],
    categories: ["frontend", "product"],
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
};

/** Drop real screenshots here to replace SVG mockups:
 *  public/projects/{id}/desktop.jpg|png|webp
 *  public/projects/{id}/mobile.jpg|png|webp
 *  public/projects/{id}/detail.jpg|png|webp
 */
export function projectMediaPath(id: ProjectId, kind: MediaKind) {
  return `/projects/${id}/${kind}.svg`;
}

/** Display order: Hotel → Senda → Serviyapp → Framboyán */
export const projectIds: ProjectId[] = ["hotel", "senda", "servi", "fram"];

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
