import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { Pagination } from "@/components/blog/pagination";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getPostsByTag } from "@/lib/wordpress";

export const revalidate = 3600;
export const dynamicParams = true;

const POSTS_PER_PAGE = 9;

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ after?: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { tag } = await getPostsByTag(slug, { first: 1 });
  if (!tag) return { title: "Tag Tidak Ditemukan" };

  return {
    title: `Tag: ${tag.name}`,
    description: `Artikel dengan tag ${tag.name}.`,
    alternates: { canonical: `/blog/tag/${slug}` },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const { after } = await searchParams;

  const { result, tag } = await getPostsByTag(slug, {
    first: POSTS_PER_PAGE,
    after: after ?? null,
  });

  if (!tag) notFound();

  return (
    <main id="main-content" className="section-padding pt-28">
      <div className="section-container">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: `#${tag.name}` },
          ]}
        />

        <SectionHeader
          titleId="tag-heading"
          kicker="Tag"
          title={`#${tag.name}`}
          description={`${tag.count ?? result.posts.length} artikel dengan tag ini.`}
        />

        {result.posts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada artikel dengan tag ini.
          </p>
        )}

        <Pagination
          hasNextPage={result.pageInfo.hasNextPage}
          hasPreviousPage={result.pageInfo.hasPreviousPage}
          nextCursor={result.pageInfo.endCursor}
          prevCursor={result.pageInfo.startCursor}
          basePath={`/blog/tag/${slug}`}
        />
      </div>
    </main>
  );
}
