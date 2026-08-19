import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoName = "Portfolio";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: appDir,
  turbopack: { root: appDir },
  ...(isGithubPages ? { basePath: `/${repoName}` } : {}),
};

export default nextConfig;
