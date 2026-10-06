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
 * render shorter, thin or detailed ones taller.
 */
export const orgs: Record<OrgId, { name: string; file: string; size: string }> = {
  henry: { name: "SoyHenry", file: "henry.svg", size: "h-[1.1rem]" },
  ebac: { name: "EBAC", file: "ebac-mark.png", size: "h-8" },
  lasalle: { name: "Universidad La Salle Oaxaca", file: "lasalle.png", size: "h-10" },
  ku: { name: "The University of Kansas", file: "ku.svg", size: "h-8" },
  cisco: { name: "Cisco", file: "cisco.svg", size: "h-7" },
  generation: { name: "Generation México", file: "generation.png", size: "h-9" },
  epam: { name: "EPAM", file: "epam.png", size: "h-7" },
  hitss: { name: "Global HITSS", file: "hitss.png", size: "h-8" },
  ja: { name: "Junior Achievement Americas", file: "ja.png", size: "h-9" },
  emtech: { name: "Emerging Technologies Institute", file: "emtech.png", size: "h-8" },
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
