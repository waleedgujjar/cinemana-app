import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/wordpress";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${settings.siteConfig.url}/sitemap.xml`,
  };
}
