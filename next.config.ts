import type { NextConfig } from "next";

const wordpressHostname =
  process.env.WORDPRESS_GRAPHQL_URL &&
  new URL(process.env.WORDPRESS_GRAPHQL_URL).hostname;

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      ...(wordpressHostname
        ? [
            {
              protocol: "https" as const,
              hostname: wordpressHostname,
              pathname: "/wp-content/uploads/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "**.wp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
