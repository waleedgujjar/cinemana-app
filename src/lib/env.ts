import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_WORDPRESS_URL: z.string().url().optional(),
  WORDPRESS_GRAPHQL_URL: z.string().url().optional(),
  WORDPRESS_AUTH_TOKEN: z.string().optional(),
  WORDPRESS_PREVIEW_SECRET: z.string().optional(),
  REVALIDATION_SECRET: z.string().optional(),
  WORDPRESS_WEBHOOK_SECRET: z.string().optional(),
  WORDPRESS_REVALIDATE_SECONDS: z.coerce.number().positive().default(3600),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  WORDPRESS_GRAPHQL_URL: process.env.WORDPRESS_GRAPHQL_URL,
  WORDPRESS_AUTH_TOKEN: process.env.WORDPRESS_AUTH_TOKEN,
  WORDPRESS_PREVIEW_SECRET: process.env.WORDPRESS_PREVIEW_SECRET,
  REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  WORDPRESS_WEBHOOK_SECRET: process.env.WORDPRESS_WEBHOOK_SECRET,
  WORDPRESS_REVALIDATE_SECONDS: process.env.WORDPRESS_REVALIDATE_SECONDS,
});

export function isWordPressConfigured(): boolean {
  return Boolean(env.WORDPRESS_GRAPHQL_URL);
}
