import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostContent } from "@/components/blog/post-content";
import { PostNavigation } from "@/components/blog/pagination";
import { RelatedPosts } from "@/components/blog/related-posts";
import {
  blogPostingSchema,
  breadcrumbSchema,
  JsonLd,
} from "@/lib/schema";
import { buildPostMetadata } from "@/lib/seo";
import {
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getSiteSettings,
} from "@/lib/wordpress";

export const revalidate = 3600;
export const dynamicParams = true;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return buildPostMetadata(post, settings.siteConfig);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const [related, adjacent] = await Promise.all([
    getRelatedPosts(post),
    getAdjacentPosts(post),
  ]);

  const category = post.categories[0];
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(category
      ? [
          {
            label: category.name,
            href: `/blog/category/${category.slug}`,
          },
        ]
      : []),
    { label: post.title },
  ];

  const schemaBreadcrumbs = breadcrumbs
    .filter((b) => b.href || b.label === post.title)
    .map((b) => ({
      name: b.label,
      url: b.href ?? `/blog/${post.slug}`,
    }));

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post, settings.siteConfig),
          breadcrumbSchema(schemaBreadcrumbs, settings.siteConfig),
        ]}
      />
      <main id="main-content" className="section-padding pt-28">
        <article className="section-container max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          {post.featuredImage && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image
                src={post.featuredImage.sourceUrl}
                alt={post.featuredImage.altText || post.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {category && (
            <Link
              href={`/blog/category/${category.slug}`}
              className="mb-4 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary-hover transition-colors hover:bg-primary/25"
            >
              {category.name}
            </Link>
          )}

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-4" aria-hidden="true" />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </div>

          <div className="mt-10">
            <PostContent content={post.content} />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          <PostNavigation previous={adjacent.previous} next={adjacent.next} />
          <RelatedPosts posts={related} />
        </article>
      </main>
    </>
  );
}
