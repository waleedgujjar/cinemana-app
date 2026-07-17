import { env } from "@/lib/env";

export const REVALIDATE_SECONDS = env.WORDPRESS_REVALIDATE_SECONDS;

export const CACHE_TAGS = {
  siteSettings: "site-settings",
  posts: "posts",
  post: (slug: string) => `post-${slug}`,
  categories: "categories",
  tags: "tags",
  faqs: "faqs",
} as const;

export class WordPressGraphQLError extends Error {
  constructor(
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "WordPressGraphQLError";
  }
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export interface ExecuteQueryOptions {
  tags?: string[];
  revalidate?: number | false;
  preview?: boolean;
}

export interface GraphQLResult<T> {
  data: T | null;
  schemaMissing: boolean;
  errors?: string[];
}

export function isMissingFieldError(message: string): boolean {
  return /cannot query field/i.test(message);
}

function classifyGraphQLErrors(
  errors: { message: string }[]
): { schemaMissing: boolean; messages: string[] } {
  const messages = errors.map((e) => e.message);
  const schemaMissing = messages.every(isMissingFieldError);
  return { schemaMissing, messages };
}

export async function executeQuerySafe<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: ExecuteQueryOptions = {}
): Promise<GraphQLResult<T>> {
  const endpoint = env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) {
    throw new WordPressGraphQLError("WORDPRESS_GRAPHQL_URL is not configured");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.preview && env.WORDPRESS_AUTH_TOKEN) {
    headers.Authorization = `Basic ${Buffer.from(env.WORDPRESS_AUTH_TOKEN).toString("base64")}`;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate:
        options.revalidate !== undefined
          ? options.revalidate
          : REVALIDATE_SECONDS,
      tags: options.tags ?? [],
    },
  });

  if (!response.ok) {
    throw new WordPressGraphQLError(
      `GraphQL request failed: ${response.status} ${response.statusText}`
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    const { schemaMissing, messages } = classifyGraphQLErrors(json.errors);

    if (schemaMissing) {
      return {
        data: null,
        schemaMissing: true,
        errors: messages,
      };
    }

    throw new WordPressGraphQLError(messages.join(", "), json.errors);
  }

  if (!json.data) {
    throw new WordPressGraphQLError("GraphQL response contained no data");
  }

  return {
    data: json.data,
    schemaMissing: false,
  };
}

export async function executeQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: ExecuteQueryOptions = {}
): Promise<T> {
  const result = await executeQuerySafe<T>(query, variables, options);

  if (result.schemaMissing || result.data === null) {
    throw new WordPressGraphQLError(
      result.errors?.join(", ") ?? "GraphQL response contained no data",
      result.errors
    );
  }

  return result.data;
}
