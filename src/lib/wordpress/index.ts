export {
  getSiteSettings,
  getFaqs,
  getPosts,
  getPostBySlug,
  getAllPostSlugs,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
  getRelatedPosts,
  getAdjacentPosts,
  getCategories,
  getTags,
  getSitemapData,
  getRssPosts,
} from "@/lib/wordpress/fetchers";

export {
  CACHE_TAGS,
  REVALIDATE_SECONDS,
  executeQuerySafe,
  type GraphQLResult,
} from "@/lib/wordpress/graphql";
export { fallbackSiteSettings } from "@/lib/wordpress/fallbacks";
export { getBaseUrl } from "@/lib/wordpress/mappers";
