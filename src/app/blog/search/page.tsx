import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/ui/section-header";
import { searchPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cari Artikel",
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const { posts } = query
    ? await searchPosts(query, { first: 20 })
    : { posts: [] as Awaited<ReturnType<typeof searchPosts>>["posts"] };

  return (
    <main id="main-content" className="section-padding pt-28">
      <div className="section-container">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Cari" },
          ]}
        />

        <SectionHeader
          titleId="search-heading"
          kicker="Pencarian"
          title="Cari Artikel"
          description="Temukan artikel berdasarkan judul, konten, kategori, atau tag."
        />

        <form action="/blog/search" method="GET" className="mt-8 max-w-xl">
          <div className="flex gap-3">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Ketik kata kunci..."
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
              aria-label="Kata kunci pencarian"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Cari
            </button>
          </div>
        </form>

        {query && (
          <p className="mt-6 text-sm text-muted-foreground">
            {posts.length} hasil untuk &ldquo;{query}&rdquo;
          </p>
        )}

        {posts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : query ? (
          <p className="mt-12 text-center text-muted-foreground">
            Tidak ada artikel yang cocok.{" "}
            <Link href="/blog" className="text-primary-hover underline">
              Lihat semua artikel
            </Link>
          </p>
        ) : null}
      </div>
    </main>
  );
}
