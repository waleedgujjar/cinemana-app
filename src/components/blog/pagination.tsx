import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WpPost } from "@/lib/content-types";

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor?: string | null;
  prevCursor?: string | null;
  basePath?: string;
  searchParams?: Record<string, string>;
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextCursor,
  prevCursor,
  basePath = "/blog",
  searchParams = {},
}: PaginationProps) {
  if (!hasNextPage && !hasPreviousPage) return null;

  function buildUrl(cursor: string | null | undefined, direction: "next" | "prev") {
    const params = new URLSearchParams(searchParams);
    if (cursor) {
      params.set(direction === "next" ? "after" : "before", cursor);
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  return (
    <nav
      aria-label="Paginasi blog"
      className="mt-12 flex items-center justify-between gap-4"
    >
      {hasPreviousPage && prevCursor ? (
        <Link
          href={buildUrl(prevCursor, "prev")}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Sebelumnya
        </Link>
      ) : (
        <span />
      )}
      {hasNextPage && nextCursor ? (
        <Link
          href={buildUrl(nextCursor, "next")}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          Selanjutnya
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

interface PostNavigationProps {
  previous: WpPost | null;
  next: WpPost | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Navigasi artikel"
      className="mt-12 grid gap-4 border-t section-divider pt-10 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="glass-card group rounded-2xl p-5 transition-colors hover:border-primary/30"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ChevronLeft className="size-3.5" aria-hidden="true" />
            Artikel Sebelumnya
          </span>
          <p className="mt-2 font-medium text-foreground transition-colors group-hover:text-primary-hover">
            {previous.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="glass-card group rounded-2xl p-5 text-right transition-colors hover:border-primary/30 sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            Artikel Selanjutnya
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </span>
          <p className="mt-2 font-medium text-foreground transition-colors group-hover:text-primary-hover">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
