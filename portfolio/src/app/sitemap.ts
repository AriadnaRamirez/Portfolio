import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/siteUrl";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/work/crm/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work/hmdv/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work/ccst/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work/serviyapp/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resume/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/mapa-del-sitio/", priority: 0.3, changeFrequency: "yearly" },
  ];

  return paths.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
