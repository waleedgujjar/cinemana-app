import type { Metadata } from "next";
import type { WpPost, WpSeo } from "@/lib/content-types";
import type { SiteConfigData } from "@/lib/content-types";

export function buildPostMetadata(
  post: WpPost,
  siteConfig: SiteConfigData
): Metadata {
  const seo: WpSeo | null = post.seo;
  const title = seo?.title ?? post.title;
  const description =
    seo?.metaDesc ?? post.excerpt.slice(0, 160) ?? siteConfig.description;
  const ogImage =
    seo?.opengraphImage?.sourceUrl ??
    post.featuredImage?.sourceUrl ??
    `${siteConfig.url}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: seo?.opengraphTitle ?? title,
      description: seo?.opengraphDescription ?? description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      images: [{ url: ogImage, alt: post.featuredImage?.altText ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.opengraphTitle ?? title,
      description: seo?.opengraphDescription ?? description,
      images: [ogImage],
    },
  };
}
