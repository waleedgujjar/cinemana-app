import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { Pagination } from "@/components/blog/pagination";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getPosts, getSiteSettings } from "@/lib/wordpress";

export const revalidate = 3600;

const POSTS_PER_PAGE = 9;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Blog",
    description: `Artikel dan panduan seputar ${settings.siteConfig.mainKeyword}.`,
    alternates: { canonical: "/blog" },
  };
}

interface BlogPageProps {
  searchParams: Promise<{ after?: string; before?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const { posts, pageInfo } = await getPosts({
    first: POSTS_PER_PAGE,
    after: params.after ?? null,
  });

  return (
    <main id="main-content" className="section-padding pt-28">
      <div className="section-container">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Blog" },
          ]}
        />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            titleId="blog-heading"
            kicker="Blog"
            title="Artikel & Panduan"
            description="Tips, panduan, dan berita terbaru seputar Sakura School Simulator APK."
          />
          <Link
            href="/blog/search"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            <Search className="size-4" aria-hidden="true" />
            Cari artikel
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada artikel. Tambahkan postingan di WordPress admin.
          </p>
        )}

        <Pagination
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          nextCursor={pageInfo.endCursor}
          prevCursor={pageInfo.startCursor}
        />
      </div>
    </main>
  );
}
