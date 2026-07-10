import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import type { WpPost } from "@/lib/content-types";

interface PostCardProps {
  post: WpPost;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] hover:translate-y-[-2px]">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        {post.featuredImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.featuredImage.sourceUrl}
              alt={post.featuredImage.altText || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          {post.categories[0] && (
            <span className="mb-3 inline-flex w-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary-hover">
              {post.categories[0].name}
            </span>
          )}
          <h2 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-hover sm:text-xl">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" aria-hidden="true" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
