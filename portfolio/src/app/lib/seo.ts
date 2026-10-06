import type { Metadata } from "next";
import { absoluteUrl } from "./siteUrl";

export const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "Ariadna Ramírez — Fullstack Web Developer · React · TypeScript · UX/UI",
};

/**
 * Per-route metadata. URLs are absolute because metadataBase would drop the
 * GitHub Pages basePath when resolving root-relative paths.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [OG_IMAGE] },
    twitter: { title, description, images: [OG_IMAGE.url] },
  };
}
