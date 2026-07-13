import { WordPressGraphQLError } from "@/lib/wordpress/graphql";

export type WpFetchStatus =
  | "ok"
  | "not_configured"
  | "graphql_error"
  | "empty";

export function isSeoGraphQLError(error: unknown): boolean {
  if (!(error instanceof WordPressGraphQLError)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("seo") ||
    msg.includes("posttypeseo") ||
    msg.includes("cannot query field")
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof WordPressGraphQLError) return error.message;
  if (error instanceof Error) return error.message;
  return "Unknown WordPress fetch error";
}
