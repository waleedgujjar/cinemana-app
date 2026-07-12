import { cache } from "react";
import { draftMode } from "next/headers";
import { isWordPressConfigured } from "@/lib/env";
import type {
  AdjacentPosts,
  FaqItem,
  SiteSettings,
  WpCategory,
  WpPost,
  WpPostsResult,
  WpTag,
} from "@/lib/content-types";
import {
  ADJACENT_POSTS_QUERY,
  CATEGORIES_QUERY,
  FAQS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POSTS_BY_TAG_QUERY,
  POSTS_QUERY,
  RELATED_POSTS_QUERY,
  RSS_POSTS_QUERY,
  SITE_SETTINGS_QUERY,
  SITEMAP_POSTS_QUERY,
  TAGS_QUERY,
} from "@/lib/wordpress/queries";
import { CACHE_TAGS, executeQuery } from "@/lib/wordpress/graphql";
import {
  fallbackFaqItems,
  fallbackSiteSettings,
} from "@/lib/wordpress/fallbacks";
import {
  getBaseUrl,
  mapCategory,
  mapFaqItems,
  mapPostsResult,
  mapSiteSettings,
  mapTag,
  mapWpPost,
} from "@/lib/wordpress/mappers";

async function isPreviewMode(): Promise<boolean> {
  const { isEnabled } = await draftMode();
  return isEnabled;
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isWordPressConfigured()) {
    return fallbackSiteSettings;
  }

  try {
    const data = await executeQuery<Parameters<typeof mapSiteSettings>[0]>(
      SITE_SETTINGS_QUERY,
      undefined,
      { tags: [CACHE_TAGS.siteSettings] }
    );
    return mapSiteSettings(data, getBaseUrl());
  } catch (error) {
    console.error("[wordpress] getSiteSettings failed:", error);
    return fallbackSiteSettings;
  }
});

export const getFaqs = cache(async (): Promise<FaqItem[]> => {
  if (!isWordPressConfigured()) {
    return fallbackFaqItems;
  }

  try {
    const data = await executeQuery<{
      faqs?: { nodes?: { title?: string; content?: string }[] };
    }>(FAQS_QUERY, undefined, { tags: [CACHE_TAGS.faqs] });
    const items = mapFaqItems(data.faqs?.nodes);
    return items.length ? items : fallbackFaqItems;
  } catch (error) {
    console.error("[wordpress] getFaqs failed:", error);
    return fallbackFaqItems;
  }
});

export async function getPosts(options: {
  first?: number;
  after?: string | null;
  search?: string;
} = {}): Promise<WpPostsResult> {
  if (!isWordPressConfigured()) {
    return { posts: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null }, total: 0 };
  }

  const { first = 10, after = null, search } = options;
  const preview = await isPreviewMode();

  const data = await executeQuery<{
    posts: {
      pageInfo: WpPostsResult["pageInfo"];
      nodes: Parameters<typeof mapWpPost>[0][];
    };
  }>(
    POSTS_QUERY,
    { first, after, search: search || null },
    { tags: [CACHE_TAGS.posts], preview }
  );

  return mapPostsResult(data);
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  if (!isWordPressConfigured()) return null;

  const preview = await isPreviewMode();

  try {
    const data = await executeQuery<{
      post: Parameters<typeof mapWpPost>[0] | null;
    }>(
      POST_BY_SLUG_QUERY,
      { slug },
      { tags: [CACHE_TAGS.posts, CACHE_TAGS.post(slug)], preview }
    );

    return data.post ? mapWpPost(data.post) : null;
  } catch (error) {
    console.error(`[wordpress] getPostBySlug(${slug}) failed:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<
  { slug: string; modified: string }[]
> {
  if (!isWordPressConfigured()) return [];

  try {
    const slugs: { slug: string; modified: string }[] = [];
    let after: string | null = null;
    let hasNextPage = true;

    type SlugBatch = {
      posts: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        nodes: { slug: string; modified: string }[];
      };
    };

    while (hasNextPage) {
      const data: SlugBatch = await executeQuery<SlugBatch>(
        POST_SLUGS_QUERY,
        { first: 100, after },
        { tags: [CACHE_TAGS.posts] }
      );

      slugs.push(...data.posts.nodes);
      hasNextPage = data.posts.pageInfo.hasNextPage;
      after = data.posts.pageInfo.endCursor;
    }

    return slugs;
  } catch (error) {
    console.error("[wordpress] getAllPostSlugs failed:", error);
    return [];
  }
}

export async function getPostsByCategory(
  slug: string,
  options: { first?: number; after?: string | null } = {}
): Promise<{ result: WpPostsResult; category: WpCategory | null }> {
  if (!isWordPressConfigured()) {
    return {
      result: {
        posts: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
        total: 0,
      },
      category: null,
    };
  }

  const { first = 10, after = null } = options;
  const data = await executeQuery<{
    posts: {
      pageInfo: WpPostsResult["pageInfo"];
      nodes: Parameters<typeof mapWpPost>[0][];
    };
    category: Parameters<typeof mapCategory>[0];
  }>(
    POSTS_BY_CATEGORY_QUERY,
    { slug: [slug], first, after },
    { tags: [CACHE_TAGS.posts, CACHE_TAGS.categories] }
  );

  return {
    result: mapPostsResult(data),
    category: mapCategory(data.category),
  };
}

export async function getPostsByTag(
  slug: string,
  options: { first?: number; after?: string | null } = {}
): Promise<{ result: WpPostsResult; tag: WpTag | null }> {
  if (!isWordPressConfigured()) {
    return {
      result: {
        posts: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
        total: 0,
      },
      tag: null,
    };
  }

  const { first = 10, after = null } = options;
  const data = await executeQuery<{
    posts: {
      pageInfo: WpPostsResult["pageInfo"];
      nodes: Parameters<typeof mapWpPost>[0][];
    };
    tag: Parameters<typeof mapTag>[0];
  }>(
    POSTS_BY_TAG_QUERY,
    { slug: [slug], first, after },
    { tags: [CACHE_TAGS.posts, CACHE_TAGS.tags] }
  );

  return {
    result: mapPostsResult(data),
    tag: mapTag(data.tag),
  };
}

export async function searchPosts(
  query: string,
  options: { first?: number; after?: string | null } = {}
): Promise<WpPostsResult> {
  return getPosts({ ...options, search: query });
}

export async function getRelatedPosts(
  post: WpPost,
  limit = 3
): Promise<WpPost[]> {
  if (!isWordPressConfigured() || !post.categories.length) return [];

  const categoryIds = post.categories.map((c) => c.slug);

  try {
    const data = await executeQuery<{
      posts: { nodes: Parameters<typeof mapWpPost>[0][] };
    }>(
      RELATED_POSTS_QUERY,
      {
        categoryIn: categoryIds,
        notIn: [post.databaseId],
        first: limit,
      },
      { tags: [CACHE_TAGS.posts] }
    );

    return data.posts.nodes.map(mapWpPost);
  } catch {
    return [];
  }
}

export async function getAdjacentPosts(post: WpPost): Promise<AdjacentPosts> {
  if (!isWordPressConfigured()) {
    return { previous: null, next: null };
  }

  try {
    const data = await executeQuery<{
      previous: { nodes: Parameters<typeof mapWpPost>[0][] };
      next: { nodes: Parameters<typeof mapWpPost>[0][] };
    }>(
      ADJACENT_POSTS_QUERY,
      { date: post.date },
      { tags: [CACHE_TAGS.posts] }
    );

    return {
      previous: data.previous.nodes[0]
        ? mapWpPost(data.previous.nodes[0])
        : null,
      next: data.next.nodes[0] ? mapWpPost(data.next.nodes[0]) : null,
    };
  } catch {
    return { previous: null, next: null };
  }
}

export async function getCategories(): Promise<WpCategory[]> {
  if (!isWordPressConfigured()) return [];

  const data = await executeQuery<{
    categories: { nodes: Parameters<typeof mapCategory>[0][] };
  }>(CATEGORIES_QUERY, undefined, { tags: [CACHE_TAGS.categories] });

  return data.categories.nodes
    .map(mapCategory)
    .filter((c): c is WpCategory => c !== null);
}

export async function getTags(): Promise<WpTag[]> {
  if (!isWordPressConfigured()) return [];

  const data = await executeQuery<{
    tags: { nodes: Parameters<typeof mapTag>[0][] };
  }>(TAGS_QUERY, undefined, { tags: [CACHE_TAGS.tags] });

  return data.tags.nodes.map(mapTag).filter((t): t is WpTag => t !== null);
}

export async function getSitemapData(): Promise<{
  posts: { slug: string; modified: string }[];
  categories: { slug: string }[];
  tags: { slug: string }[];
}> {
  if (!isWordPressConfigured()) {
    return { posts: [], categories: [], tags: [] };
  }

  try {
    const posts: { slug: string; modified: string }[] = [];
    let after: string | null = null;
    let hasNextPage = true;
    let categories: { slug: string }[] = [];
    let tags: { slug: string }[] = [];

    type SitemapBatch = {
      posts: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        nodes: { slug: string; modified: string }[];
      };
      categories: { nodes: { slug: string }[] };
      tags: { nodes: { slug: string }[] };
    };

    while (hasNextPage) {
      const data: SitemapBatch = await executeQuery<SitemapBatch>(
        SITEMAP_POSTS_QUERY,
        { first: 100, after },
        { tags: [CACHE_TAGS.posts] }
      );

      posts.push(...data.posts.nodes);
      categories = data.categories.nodes;
      tags = data.tags.nodes;
      hasNextPage = data.posts.pageInfo.hasNextPage;
      after = data.posts.pageInfo.endCursor;
    }

    return { posts, categories, tags };
  } catch (error) {
    console.error("[wordpress] getSitemapData failed:", error);
    return { posts: [], categories: [], tags: [] };
  }
}

export async function getRssPosts(): Promise<
  {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    modified: string;
    author: string;
  }[]
> {
  if (!isWordPressConfigured()) return [];

  try {
    const data = await executeQuery<{
      posts: {
        nodes: {
          title: string;
          slug: string;
          excerpt: string;
          date: string;
          modified: string;
          author?: { node?: { name?: string } };
        }[];
      };
    }>(RSS_POSTS_QUERY, { first: 20 }, { tags: [CACHE_TAGS.posts] });

    return data.posts.nodes.map((node) => ({
      title: node.title,
      slug: node.slug,
      excerpt: node.excerpt.replace(/<[^>]*>/g, "").trim(),
      date: node.date,
      modified: node.modified,
      author: node.author?.node?.name ?? "Admin",
    }));
  } catch (error) {
    console.error("[wordpress] getRssPosts failed:", error);
    return [];
  }
}
