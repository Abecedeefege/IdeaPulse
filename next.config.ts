import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  // Serve the static preview builds of the two proposal sites that live in
  // public/spark (Vite SPA) and public/atlas (Next static export). Extension-
  // less page URLs need an explicit map to their index.html files; asset
  // requests (anything containing a dot) bypass these and hit public/ directly.
  async rewrites() {
    return [
      { source: "/spark", destination: "/spark/index.html" },
      { source: "/atlas", destination: "/atlas/index.html" },
      {
        source: "/atlas/:path((?!.*\\.).*)",
        destination: "/atlas/:path/index.html",
      },
    ];
  },
};

export default nextConfig;
