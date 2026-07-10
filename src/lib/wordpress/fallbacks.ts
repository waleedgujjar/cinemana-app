import {
  aboutCopy,
  conclusionCopy,
  downloadGuideCopy,
  faqCopy,
  featuresCopy,
  footerCopy,
  heroCopy,
  navLinks,
  siteConfig,
} from "@/lib/site-config";
import type { FaqItem, SiteSettings } from "@/lib/content-types";

export const fallbackSiteSettings: SiteSettings = {
  siteConfig: { ...siteConfig },
  heroCopy: {
    kicker: heroCopy.kicker,
    headline: heroCopy.headline,
    subhead: heroCopy.subhead,
    ctaPrimary: heroCopy.ctaPrimary,
    ctaSecondary: heroCopy.ctaSecondary,
    stats: heroCopy.stats.map((s) => ({ ...s })),
    trust: heroCopy.trust.map((t) => ({ ...t })),
    backgroundImage: "/images/hero-sakura-wide.png",
  },
  downloadGuideCopy: {
    id: downloadGuideCopy.id,
    kicker: downloadGuideCopy.kicker,
    title: downloadGuideCopy.title,
    description: downloadGuideCopy.description,
    steps: downloadGuideCopy.steps.map((s) => ({ ...s })),
    promoImage: "/images/download-promo.png",
  },
  aboutCopy: {
    id: aboutCopy.id,
    kicker: aboutCopy.kicker,
    title: aboutCopy.title,
    subtitle: aboutCopy.subtitle,
    paragraphs: [...aboutCopy.paragraphs],
    features: [...aboutCopy.features],
    stats: aboutCopy.stats.map((s) => ({ ...s })),
    cta: aboutCopy.cta,
    promoImage: "/images/about-promo.png",
  },
  featuresCopy: {
    id: featuresCopy.id,
    kicker: featuresCopy.kicker,
    title: featuresCopy.title,
    description: featuresCopy.description,
    items: featuresCopy.items.map((i) => ({ ...i })),
  },
  faqCopy: {
    id: faqCopy.id,
    kicker: faqCopy.kicker,
    title: faqCopy.title,
    description: faqCopy.description,
    items: faqCopy.items.map((i) => ({ ...i })),
  },
  conclusionCopy: { ...conclusionCopy },
  navLinks: navLinks.map((l) => ({ ...l })),
  footerCopy: {
    tagline: footerCopy.tagline,
    links: footerCopy.links.map((l) => ({ ...l })),
  },
};

export const fallbackFaqItems: FaqItem[] = faqCopy.items.map((item) => ({
  question: item.question,
  answer: item.answer,
}));
