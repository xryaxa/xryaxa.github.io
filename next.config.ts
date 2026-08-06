import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files only, so the app is exported as static HTML.
 * This is a *user* site (xryaxa.github.io), which is served from the domain root —
 * no basePath/assetPrefix needed. Next's image optimizer needs a server, so it is
 * disabled; images are pre-sized and compressed at build time instead.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
