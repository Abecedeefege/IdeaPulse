import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Allows embedding the export under a sub-path of another site,
  // e.g. ATLAS_BASE_PATH=/atlas for the branch-preview at /atlas.
  basePath: process.env.ATLAS_BASE_PATH || "",
};

export default nextConfig;
