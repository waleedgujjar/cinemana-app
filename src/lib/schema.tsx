import { siteConfig } from "@/lib/site-config";
import { faqCopy } from "@/lib/site-config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description,
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "id",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    operatingSystem: "Android",
    applicationCategory: "EntertainmentApplication",
    softwareVersion: siteConfig.version.replace(/^v/, ""),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: `${siteConfig.url}${siteConfig.downloadFile}`,
    inLanguage: "id",
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCopy.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${siteConfig.name} — Platform Hiburan Premium`,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "id",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
