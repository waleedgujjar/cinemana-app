import {
  isMissingFieldError,
  WordPressGraphQLError,
} from "@/lib/wordpress/graphql";

export type WpFetchStatus =
  | "ok"
  | "not_configured"
  | "graphql_error"
  | "empty";

export function devWarn(message: string, detail?: unknown): void {
  if (process.env.NODE_ENV === "development") {
    if (detail !== undefined) {
      console.warn(message, detail);
    } else {
      console.warn(message);
    }
  }
}

export function isSchemaMissingError(error: unknown): boolean {
  if (!(error instanceof WordPressGraphQLError)) return false;
  const parts = error.message.split(", ").filter(Boolean);
  return parts.length > 0 && parts.every(isMissingFieldError);
}

export function isSeoRelatedError(messages?: string[]): boolean {
  if (!messages?.length) return false;
  return messages.some((msg) => {
    const lower = msg.toLowerCase();
    return (
      lower.includes("seo") ||
      lower.includes("posttypeseo") ||
      lower.includes("seofields")
    );
  });
}

export function isSeoGraphQLError(error: unknown): boolean {
  if (!(error instanceof WordPressGraphQLError)) return false;
  return isSeoRelatedError(error.message.split(", "));
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof WordPressGraphQLError) return error.message;
  if (error instanceof Error) return error.message;
  return "Unknown WordPress fetch error";
}
