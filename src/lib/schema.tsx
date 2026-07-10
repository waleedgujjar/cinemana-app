import type { SiteConfigData, FaqItem, WpPost } from "@/lib/content-types";
import { siteConfig as fallbackSiteConfig } from "@/lib/site-config";

export function organizationSchema(config: SiteConfigData = fallbackSiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    logo: `${config.url}/opengraph-image`,
    description: config.description,
  };
}

export function webSiteSchema(config: SiteConfigData = fallbackSiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    url: config.url,
    description: config.description,
    inLanguage: "id",
    publisher: {
      "@type": "Organization",
      name: config.name,
    },
  };
}

export function softwareApplicationSchema(
  config: SiteConfigData = fallbackSiteConfig
) {
  const downloadUrl = config.downloadFile.startsWith("http")
    ? config.downloadFile
    : `${config.url}${config.downloadFile}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.downloadFileName,
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    softwareVersion: config.version.replace(/^v/, ""),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    description: config.description,
    url: config.url,
    downloadUrl,
    inLanguage: "id",
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webPageSchema(config: SiteConfigData = fallbackSiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${config.name} — ${config.mainKeyword}`,
    description: config.description,
    url: config.url,
    inLanguage: "id",
    isPartOf: {
      "@type": "WebSite",
      name: config.name,
      url: config.url,
    },
  };
}

export function blogPostingSchema(
  post: WpPost,
  config: SiteConfigData = fallbackSiteConfig
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: config.name,
      logo: {
        "@type": "ImageObject",
        url: `${config.url}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${config.url}/blog/${post.slug}`,
    },
    image: post.featuredImage?.sourceUrl,
    url: `${config.url}/blog/${post.slug}`,
    inLanguage: "id",
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
  config: SiteConfigData = fallbackSiteConfig
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${config.url}${item.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
