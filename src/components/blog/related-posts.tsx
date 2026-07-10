import type { WpPost } from "@/lib/content-types";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/ui/section-header";

interface RelatedPostsProps {
  posts: WpPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="related-posts-heading" className="mt-16">
      <SectionHeader
        titleId="related-posts-heading"
        kicker="Artikel Terkait"
        title="Baca Juga"
        align="left"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
