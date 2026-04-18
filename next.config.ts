import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local /public images are served by default.
    // Add external hostnames here if you ever switch to remote AI-generated images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
