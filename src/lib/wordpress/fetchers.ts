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
import { isoToDateInput } from "@/lib/wordpress/date-input";
import {
  devWarn,
  getErrorMessage,
  isSchemaMissingError,
  isSeoRelatedError,
  type WpFetchStatus,
} from "@/lib/wordpress/errors";
import {
  ADJACENT_POSTS_QUERY,
  ADJACENT_POSTS_QUERY_BASE,
  CATEGORIES_QUERY,
  FAQS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_BY_SLUG_QUERY_BASE,
  POST_SLUGS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POSTS_BY_CATEGORY_QUERY_BASE,
  POSTS_BY_TAG_QUERY,
  POSTS_BY_TAG_QUERY_BASE,
  POSTS_QUERY,
  POSTS_QUERY_BASE,
  RELATED_POSTS_QUERY,
  RELATED_POSTS_QUERY_BASE,
  RSS_POSTS_QUERY,
  SITE_SETTINGS_QUERY,
  SITEMAP_POSTS_QUERY,
  TAGS_QUERY,
} from "@/lib/wordpress/queries";
import {
  CACHE_TAGS,
  executeQuerySafe,
  WordPressGraphQLError,
  type ExecuteQueryOptions,
  type GraphQLResult,
} from "@/lib/wordpress/graphql";
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

async function executePostQuery<T>(
  queryWithSeo: string,
  queryBase: string,
  variables?: Record<string, unknown>,
  options: ExecuteQueryOptions = {}
): Promise<T | null> {
  const seoResult = await executeQuerySafe<T>(queryWithSeo, variables, options);

  if (seoResult.data) {
    return seoResult.data;
  }

  const shouldFallback =
    seoResult.schemaMissing || isSeoRelatedError(seoResult.errors);

  if (shouldFallback) {
    devWarn(
      "[wordpress] SEO fields unavailable — falling back to base post query",
      seoResult.errors
    );
    const baseResult = await executeQuerySafe<T>(queryBase, variables, options);
    if (baseResult.data) {
      return baseResult.data;
    }
    if (baseResult.schemaMissing) {
      devWarn(
        "[wordpress] Base post query schema unavailable",
        baseResult.errors
      );
      return null;
    }
    if (baseResult.errors) {
      throw new WordPressGraphQLError(baseResult.errors.join(", "));
    }
    return null;
  }

  if (seoResult.errors) {
    throw new WordPressGraphQLError(seoResult.errors.join(", "));
  }

  return null;
}

function withFetchStatus(
  result: WpPostsResult,
  status: WpFetchStatus,
  message?: string
): WpPostsResult {
  return {
    ...result,
    fetchStatus: status,
    fetchMessage: message,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isWordPressConfigured()) {
    return fallbackSiteSettings;
  }

  try {
    const result = await executeQuerySafe<
      Parameters<typeof mapSiteSettings>[0]
    >(SITE_SETTINGS_QUERY, undefined, { tags: [CACHE_TAGS.siteSettings] });

    if (result.schemaMissing || !result.data?.acfOptionsSiteSettings) {
      devWarn(
        "[wordpress] acfOptionsSiteSettings unavailable — using fallback",
        result.errors
      );
      return fallbackSiteSettings;
    }

    return mapSiteSettings(result.data, getBaseUrl());
  } catch (error) {
    if (!isSchemaMissingError(error)) {
      devWarn("[wordpress] getSiteSettings failed:", error);
    }
    return fallbackSiteSettings;
  }
});

export const getFaqs = cache(async (): Promise<FaqItem[]> => {
  if (!isWordPressConfigured()) {
    return fallbackFaqItems;
  }

  try {
    const result = await executeQuerySafe<{
      faqs?: { nodes?: { title?: string; content?: string }[] };
    }>(FAQS_QUERY, undefined, { tags: [CACHE_TAGS.faqs] });

    if (result.schemaMissing || !result.data?.faqs) {
      devWarn("[wordpress] faqs query unavailable — using fallback", result.errors);
      return fallbackFaqItems;
    }

    const items = mapFaqItems(result.data.faqs?.nodes);
    return items.length ? items : fallbackFaqItems;
  } catch (error) {
    if (!isSchemaMissingError(error)) {
      devWarn("[wordpress] getFaqs failed:", error);
    }
    return fallbackFaqItems;
  }
});

const emptyPostsResult: WpPostsResult = {
  posts: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  },
  total: 0,
};

export async function getPosts(
  options: {
    first?: number;
    after?: string | null;
    search?: string;
  } = {}
): Promise<WpPostsResult> {
  if (!isWordPressConfigured()) {
    devWarn("[wordpress] getPosts: WORDPRESS_GRAPHQL_URL is not configured");
    return withFetchStatus(
      emptyPostsResult,
      "not_configured",
      "WORDPRESS_GRAPHQL_URL is not set in environment"
    );
  }

  const { first = 10, after = null, search } = options;
  const preview = await isPreviewMode();
  const variables = { first, after, search: search || null };

  try {
    const data = await executePostQuery<{
      posts: {
        pageInfo: WpPostsResult["pageInfo"];
        nodes: Parameters<typeof mapWpPost>[0][];
      };
    }>(POSTS_QUERY, POSTS_QUERY_BASE, variables, {
      tags: [CACHE_TAGS.posts],
      preview,
    });

    if (!data) {
      return withFetchStatus(emptyPostsResult, "empty");
    }

    const result = mapPostsResult(data);
    return withFetchStatus(
      result,
      result.posts.length > 0 ? "ok" : "empty"
    );
  } catch (error) {
    const message = getErrorMessage(error);
    devWarn("[wordpress] getPosts failed:", message);
    return withFetchStatus(emptyPostsResult, "graphql_error", message);
  }
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  if (!isWordPressConfigured()) {
    devWarn(
      "[wordpress] getPostBySlug: WORDPRESS_GRAPHQL_URL is not configured"
    );
    return null;
  }

  const preview = await isPreviewMode();

  try {
    const data = await executePostQuery<{
      post: Parameters<typeof mapWpPost>[0] | null;
    }>(
      POST_BY_SLUG_QUERY,
      POST_BY_SLUG_QUERY_BASE,
      { slug },
      { tags: [CACHE_TAGS.posts, CACHE_TAGS.post(slug)], preview }
    );

    return data?.post ? mapWpPost(data.post) : null;
  } catch (error) {
    devWarn(`[wordpress] getPostBySlug(${slug}) failed:`, error);
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
      const result: GraphQLResult<SlugBatch> = await executeQuerySafe<SlugBatch>(
        POST_SLUGS_QUERY,
        { first: 100, after },
        { tags: [CACHE_TAGS.posts] }
      );

      if (result.schemaMissing || !result.data) {
        devWarn("[wordpress] getAllPostSlugs schema unavailable", result.errors);
        return [];
      }

      slugs.push(...result.data.posts.nodes);
      hasNextPage = result.data.posts.pageInfo.hasNextPage;
      after = result.data.posts.pageInfo.endCursor;
    }

    return slugs;
  } catch (error) {
    devWarn("[wordpress] getAllPostSlugs failed:", error);
    return [];
  }
}

export async function getPostsByCategory(
  slug: string,
  options: { first?: number; after?: string | null } = {}
): Promise<{ result: WpPostsResult; category: WpCategory | null }> {
  if (!isWordPressConfigured()) {
    return { result: emptyPostsResult, category: null };
  }

  const { first = 10, after = null } = options;

  try {
    const data = await executePostQuery<{
      posts: {
        pageInfo: WpPostsResult["pageInfo"];
        nodes: Parameters<typeof mapWpPost>[0][];
      };
      category: Parameters<typeof mapCategory>[0];
    }>(
      POSTS_BY_CATEGORY_QUERY,
      POSTS_BY_CATEGORY_QUERY_BASE,
      { categoryNames: [slug], categorySlug: slug, first, after },
      { tags: [CACHE_TAGS.posts, CACHE_TAGS.categories] }
    );

    if (!data) {
      return { result: emptyPostsResult, category: null };
    }

    return {
      result: mapPostsResult(data),
      category: mapCategory(data.category),
    };
  } catch (error) {
    devWarn(`[wordpress] getPostsByCategory(${slug}) failed:`, error);
    return { result: emptyPostsResult, category: null };
  }
}

export async function getPostsByTag(
  slug: string,
  options: { first?: number; after?: string | null } = {}
): Promise<{ result: WpPostsResult; tag: WpTag | null }> {
  if (!isWordPressConfigured()) {
    return { result: emptyPostsResult, tag: null };
  }

  const { first = 10, after = null } = options;

  try {
    const data = await executePostQuery<{
      posts: {
        pageInfo: WpPostsResult["pageInfo"];
        nodes: Parameters<typeof mapWpPost>[0][];
      };
      tag: Parameters<typeof mapTag>[0];
    }>(
      POSTS_BY_TAG_QUERY,
      POSTS_BY_TAG_QUERY_BASE,
      { tagSlugs: [slug], tagSlug: slug, first, after },
      { tags: [CACHE_TAGS.posts, CACHE_TAGS.tags] }
    );

    if (!data) {
      return { result: emptyPostsResult, tag: null };
    }

    return {
      result: mapPostsResult(data),
      tag: mapTag(data.tag),
    };
  } catch (error) {
    devWarn(`[wordpress] getPostsByTag(${slug}) failed:`, error);
    return { result: emptyPostsResult, tag: null };
  }
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

  const categoryIds = post.categories
    .map((c) => c.databaseId)
    .filter((id): id is number => typeof id === "number" && id > 0);

  if (!categoryIds.length) return [];

  try {
    const data = await executePostQuery<{
      posts: { nodes: Parameters<typeof mapWpPost>[0][] };
    }>(
      RELATED_POSTS_QUERY,
      RELATED_POSTS_QUERY_BASE,
      {
        categoryIn: categoryIds,
        notIn: [post.databaseId],
        first: limit,
      },
      { tags: [CACHE_TAGS.posts] }
    );

    if (!data) return [];

    return data.posts.nodes.map(mapWpPost);
  } catch (error) {
    devWarn("[wordpress] getRelatedPosts failed:", error);
    return [];
  }
}

export async function getAdjacentPosts(post: WpPost): Promise<AdjacentPosts> {
  if (!isWordPressConfigured()) {
    return { previous: null, next: null };
  }

  try {
    const data = await executePostQuery<{
      previous: { nodes: Parameters<typeof mapWpPost>[0][] };
      next: { nodes: Parameters<typeof mapWpPost>[0][] };
    }>(
      ADJACENT_POSTS_QUERY,
      ADJACENT_POSTS_QUERY_BASE,
      { date: isoToDateInput(post.date) },
      { tags: [CACHE_TAGS.posts] }
    );

    if (!data) {
      return { previous: null, next: null };
    }

    return {
      previous: data.previous.nodes[0]
        ? mapWpPost(data.previous.nodes[0])
        : null,
      next: data.next.nodes[0] ? mapWpPost(data.next.nodes[0]) : null,
    };
  } catch (error) {
    devWarn("[wordpress] getAdjacentPosts failed:", error);
    return { previous: null, next: null };
  }
}

export async function getCategories(): Promise<WpCategory[]> {
  if (!isWordPressConfigured()) return [];

  try {
    const result = await executeQuerySafe<{
      categories: { nodes: Parameters<typeof mapCategory>[0][] };
    }>(CATEGORIES_QUERY, undefined, { tags: [CACHE_TAGS.categories] });

    if (result.schemaMissing || !result.data) {
      devWarn("[wordpress] getCategories schema unavailable", result.errors);
      return [];
    }

    return result.data.categories.nodes
      .map(mapCategory)
      .filter((c): c is WpCategory => c !== null);
  } catch (error) {
    devWarn("[wordpress] getCategories failed:", error);
    return [];
  }
}

export async function getTags(): Promise<WpTag[]> {
  if (!isWordPressConfigured()) return [];

  try {
    const result = await executeQuerySafe<{
      tags: { nodes: Parameters<typeof mapTag>[0][] };
    }>(TAGS_QUERY, undefined, { tags: [CACHE_TAGS.tags] });

    if (result.schemaMissing || !result.data) {
      devWarn("[wordpress] getTags schema unavailable", result.errors);
      return [];
    }

    return result.data.tags.nodes.map(mapTag).filter((t): t is WpTag => t !== null);
  } catch (error) {
    devWarn("[wordpress] getTags failed:", error);
    return [];
  }
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
      const result: GraphQLResult<SitemapBatch> =
        await executeQuerySafe<SitemapBatch>(
        SITEMAP_POSTS_QUERY,
        { first: 100, after },
        { tags: [CACHE_TAGS.posts] }
      );

      if (result.schemaMissing || !result.data) {
        devWarn("[wordpress] getSitemapData schema unavailable", result.errors);
        return { posts: [], categories: [], tags: [] };
      }

      posts.push(...result.data.posts.nodes);
      categories = result.data.categories.nodes;
      tags = result.data.tags.nodes;
      hasNextPage = result.data.posts.pageInfo.hasNextPage;
      after = result.data.posts.pageInfo.endCursor;
    }

    return { posts, categories, tags };
  } catch (error) {
    devWarn("[wordpress] getSitemapData failed:", error);
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
    const result = await executeQuerySafe<{
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

    if (result.schemaMissing || !result.data) {
      devWarn("[wordpress] getRssPosts schema unavailable", result.errors);
      return [];
    }

    return result.data.posts.nodes.map((node) => ({
      title: node.title,
      slug: node.slug,
      excerpt: node.excerpt.replace(/<[^>]*>/g, "").trim(),
      date: node.date,
      modified: node.modified,
      author: node.author?.node?.name ?? "Admin",
    }));
  } catch (error) {
    devWarn("[wordpress] getRssPosts failed:", error);
    return [];
  }
}
