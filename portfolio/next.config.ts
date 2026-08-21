import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoName = "Portfolio";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: appDir,
  turbopack: { root: appDir },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    // Used by static asset helpers so /projects/* resolve under GitHub Pages.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
