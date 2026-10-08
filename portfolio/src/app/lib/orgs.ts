export type OrgId =
  | "henry"
  | "ebac"
  | "lasalle"
  | "ku"
  | "cisco"
  | "generation"
  | "epam"
  | "hitss"
  | "ja"
  | "emtech";

/**
 * Logos live in /public/orgs. `size` balances optical weight: heavy wordmarks
 * render shorter, thin or detailed ones taller. `mono` is a hand-tuned gray
 * file shown at rest when plain grayscale breaks the shape (Henry's yellow
 * crossbar turns near-white and vanishes).
 */
export const orgs: Record<
  OrgId,
  { name: string; file: string; size: string; href: string; mono?: string }
> = {
  henry: {
    name: "SoyHenry",
    file: "henry.svg",
    mono: "henry-mono.svg",
    size: "h-[1.1rem]",
    href: "https://www.soyhenry.com/",
  },
  ebac: { name: "EBAC", file: "ebac.svg", size: "h-10", href: "https://ebac.mx/" },
  lasalle: {
    name: "Universidad La Salle Oaxaca",
    file: "lasalle.png",
    size: "h-10",
    href: "https://www.ulsaoaxaca.edu.mx/",
  },
  ku: { name: "The University of Kansas", file: "ku.svg", size: "h-8", href: "https://ku.edu/" },
  cisco: { name: "Cisco", file: "cisco.svg", size: "h-7", href: "https://www.netacad.com/" },
  generation: { name: "Generation México", file: "generation.png", size: "h-9", href: "https://mexico.generation.org/" },
  epam: { name: "EPAM", file: "epam.png", size: "h-7", href: "https://campus.epam.com/" },
  hitss: { name: "Global HITSS", file: "hitss.png", size: "h-8", href: "https://www.hitss.com/" },
  ja: { name: "Junior Achievement Americas", file: "ja.png", size: "h-9", href: "https://jaamericas.org/" },
  emtech: { name: "Emerging Technologies Institute", file: "emtech.png", size: "h-8", href: "https://emtech.digital/" },
};

export const educationOrg: Record<string, OrgId> = {
  henry: "henry",
  ebac: "ebac",
  lasalle: "lasalle",
  kansas_ms: "ku",
};

export const certificationOrg: Record<string, OrgId> = {
  henry_cert: "henry",
  ebac_ux: "ebac",
  ccst: "cisco",
  cisco_badges: "cisco",
  python: "emtech",
};

export const scholarshipOrg: Record<string, OrgId> = {
  generation_aws: "generation",
  epam: "epam",
  hitss: "hitss",
  mujer_digital: "ja",
};
