import type { NextConfig } from "next";

const wordpressHostname =
  process.env.WORDPRESS_GRAPHQL_URL &&
  new URL(process.env.WORDPRESS_GRAPHQL_URL).hostname;

const WORDPRESS_CMS_HOST = "cms.sakuraschoolsimulator.net";

const wordpressImagePatterns = [
  {
    protocol: "https" as const,
    hostname: WORDPRESS_CMS_HOST,
    pathname: "/wp-content/uploads/**",
  },
  ...(wordpressHostname && wordpressHostname !== WORDPRESS_CMS_HOST
    ? [
        {
          protocol: "https" as const,
          hostname: wordpressHostname,
          pathname: "/wp-content/uploads/**",
        },
      ]
    : []),
];

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    qualities: [75, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      ...wordpressImagePatterns,
      {
        protocol: "https",
        hostname: "**.wp.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
