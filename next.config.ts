import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compiler: {
    removeConsole: true, // Remove console.logs in production
  },
  // Optimize bundle
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
