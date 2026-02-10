import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["images.unsplash.com", "unsplash.com"],
  },
};

export default nextConfig;
