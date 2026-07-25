import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Next.js doesn't auto-resolve directory index.html for public/ assets
      // the way traditional static hosts do, so /admin needs an explicit
      // rewrite to the Decap CMS entry point.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
