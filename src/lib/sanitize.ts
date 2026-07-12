import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "a",
  "img",
  "blockquote",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "div",
  "span",
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Rewrites absolute WordPress CMS links in post HTML to frontend blog URLs.
 * e.g. https://cms.example.com/my-post/ → https://example.com/blog/my-post
 */
export function rewriteCmsLinks(html: string): string {
  const cmsUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!cmsUrl || !siteUrl) return html;

  try {
    const cmsHost = new URL(cmsUrl).host;
    const siteOrigin = new URL(siteUrl).origin;
    const hostPattern = escapeRegExp(cmsHost);

    // Match CMS post permalinks: /slug/ or /yyyy/mm/slug/ — map last segment to /blog/slug
    const cmsLinkPattern = new RegExp(
      `https?://(?:www\\.)?${hostPattern}(/[^"'\\s>]+)`,
      "gi"
    );

    return html.replace(cmsLinkPattern, (_match, path: string) => {
      const segments = path.replace(/\/+$/, "").split("/").filter(Boolean);
      if (!segments.length) return `${siteOrigin}/blog`;

      const slug = segments[segments.length - 1];
      if (slug === "blog" || slug === "category" || slug === "tag") {
        return `${siteOrigin}${path}`;
      }

      return `${siteOrigin}/blog/${slug}`;
    });
  } catch {
    return html;
  }
}

export function sanitizePostContent(html: string): string {
  const rewritten = rewriteCmsLinks(html);

  return sanitizeHtml(rewritten, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      "*": ["class", "id"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}
