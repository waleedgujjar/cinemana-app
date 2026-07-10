import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { Pagination } from "@/components/blog/pagination";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getPostsByCategory } from "@/lib/wordpress";

export const revalidate = 3600;
export const dynamicParams = true;

const POSTS_PER_PAGE = 9;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ after?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getPostsByCategory(slug, { first: 1 });
  if (!category) return { title: "Kategori Tidak Ditemukan" };

  return {
    title: `Kategori: ${category.name}`,
    description: category.description ?? `Artikel dalam kategori ${category.name}.`,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { after } = await searchParams;

  const { result, category } = await getPostsByCategory(slug, {
    first: POSTS_PER_PAGE,
    after: after ?? null,
  });

  if (!category) notFound();

  return (
    <main id="main-content" className="section-padding pt-28">
      <div className="section-container">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: category.name },
          ]}
        />

        <SectionHeader
          titleId="category-heading"
          kicker="Kategori"
          title={category.name}
          description={
            category.description ??
            `${category.count ?? result.posts.length} artikel dalam kategori ini.`
          }
        />

        {result.posts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada artikel dalam kategori ini.
          </p>
        )}

        <Pagination
          hasNextPage={result.pageInfo.hasNextPage}
          hasPreviousPage={result.pageInfo.hasPreviousPage}
          nextCursor={result.pageInfo.endCursor}
          prevCursor={result.pageInfo.startCursor}
          basePath={`/blog/category/${slug}`}
        />
      </div>
    </main>
  );
}
