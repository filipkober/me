import type { NextConfig } from "next";
import { version, dependencies } from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ]
  },
  publicRuntimeConfig: {
    version,
    nextVersion: dependencies.next,
  }
};

export default nextConfig;
