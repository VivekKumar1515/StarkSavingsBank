import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a0.anyrgb.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'static1.srcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
