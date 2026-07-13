/**
 * ISR revalidate window in seconds.
 * Route files must export `export const revalidate = 3600` as a literal
 * (Next.js segment config cannot use imported values).
 * Keep aligned with WORDPRESS_REVALIDATE_SECONDS in .env.production.
 */
export const REVALIDATE_SECONDS = 3600;
