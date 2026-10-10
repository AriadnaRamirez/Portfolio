export const brandIds = [
  "grova",
  "crm",
  "hmdv",
  "fitplus",
] as const;

export type BrandId = (typeof brandIds)[number];

type Localized = { es: string; en: string };

export const brands: Record<
  BrandId,
  {
    name: string;
    href?: string;
    /** Short label for accessibility */
    label: Localized;
    sector: Localized;
    /** What I did for the brand, a few words */
    work: Localized;
    /** Optional logo under /public */
    logo?: string;
    /** Light mark used on dark backgrounds */
    logoDark?: string;
    logoClassName?: string;
  }
> = {
  grova: {
    name: "GROVA",
    href: "https://grova.mx/",
    label: { es: "GROVA Marketing", en: "GROVA Marketing" },
    sector: { es: "Agencia de marketing", en: "Marketing agency" },
    work: { es: "Desarrollo por proyectos", en: "Project-based development" },
    logo: "/brands/grova.png",
    logoDark: "/brands/grova-white.png",
    logoClassName: "h-11 sm:h-12",
  },
  crm: {
    name: "CRM Extintores",
    href: "https://www.crmextintores.com.mx/",
    label: {
      es: "Grupo CRM Extintores",
      en: "Grupo CRM Extintores",
    },
    sector: { es: "Seguridad contra incendios", en: "Fire safety" },
    work: { es: "Sitio + catálogo end-to-end", en: "End-to-end site + catalog" },
    logo: "/brands/crm.webp",
    logoClassName: "h-8 sm:h-9",
  },
  hmdv: {
    name: "HMDV",
    href: "https://www.hotelmarquesdelvalle.com.mx/",
    label: {
      es: "Hotel Marqués del Valle",
      en: "Hotel Marqués del Valle",
    },
    sector: { es: "Hotelería", en: "Hospitality" },
    work: { es: "UX/UI + frontend", en: "UX/UI + frontend" },
    logo: "/brands/hmdv.png",
    logoDark: "/brands/hmdv-white.png",
    logoClassName: "h-14 sm:h-16",
  },
  fitplus: {
    name: "FitPlus",
    href: "https://fitplus.com.mx/",
    label: { es: "FitPlus by LH", en: "FitPlus by LH" },
    sector: { es: "Fitness", en: "Fitness" },
    work: { es: "WordPress · campañas", en: "WordPress · campaigns" },
    logo: "/brands/fitplus.png",
    logoClassName:
      "h-12 sm:h-14 brightness-[.6] group-hover:brightness-100 dark:group-hover:brightness-0",
  },
};
