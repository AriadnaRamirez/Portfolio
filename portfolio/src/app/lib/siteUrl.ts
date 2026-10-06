/** Canonical production site (GitHub Pages). Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ariadnaramirez.github.io/Portfolio";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute URL for a path like `/` or `/work/`. Avoids double basePath. */
export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // SITE_URL already includes /Portfolio on GitHub Pages.
  return `${SITE_URL.replace(/\/$/, "")}${normalized === "/" ? "/" : normalized}`;
}

export function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
