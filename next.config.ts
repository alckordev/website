import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress.validthemes.net",
        port: "",
        pathname: "/ambrox/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
