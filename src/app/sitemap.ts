import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/wordpress/mappers";
import { getSitemapData, getSiteSettings } from "@/lib/wordpress";
import { isWordPressConfigured } from "@/lib/env";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const baseUrl = settings.siteConfig.url || getBaseUrl();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  if (isWordPressConfigured()) {
    try {
      const { posts, categories, tags } = await getSitemapData();

      for (const post of posts) {
        entries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      for (const category of categories) {
        entries.push({
          url: `${baseUrl}/blog/category/${category.slug}`,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }

      for (const tag of tags) {
        entries.push({
          url: `${baseUrl}/blog/tag/${tag.slug}`,
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    } catch (error) {
      console.error("[sitemap] Failed to fetch WP data:", error);
    }
  }

  return entries;
}
