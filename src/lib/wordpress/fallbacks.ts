import {
  aboutCopy,
  conclusionCopy,
  downloadGuideCopy,
  faqCopy,
  featuresCopy,
  footerCopy,
  gameplayCopy,
  heroCopy,
  navLinks,
  prosConsCopy,
  requirementsCopy,
  siteConfig,
  troubleshootingCopy,
  whatsNewCopy,
  whyDownloadCopy,
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

export const fallbackGameplayCopy = {
  id: gameplayCopy.id,
  kicker: gameplayCopy.kicker,
  title: gameplayCopy.title,
  description: gameplayCopy.description,
  steps: gameplayCopy.steps.map((s) => ({ ...s })),
};

export const fallbackRequirementsCopy = {
  id: requirementsCopy.id,
  kicker: requirementsCopy.kicker,
  title: requirementsCopy.title,
  description: requirementsCopy.description,
  minimum: requirementsCopy.minimum.map((i) => ({ ...i })),
  recommended: requirementsCopy.recommended.map((i) => ({ ...i })),
  note: requirementsCopy.note,
};

export const fallbackWhatsNewCopy = {
  id: whatsNewCopy.id,
  kicker: whatsNewCopy.kicker,
  title: whatsNewCopy.title,
  description: whatsNewCopy.description,
  highlights: [...whatsNewCopy.highlights],
  versionNote: whatsNewCopy.versionNote,
};

export const fallbackProsConsCopy = {
  id: prosConsCopy.id,
  kicker: prosConsCopy.kicker,
  title: prosConsCopy.title,
  description: prosConsCopy.description,
  pros: [...prosConsCopy.pros],
  cons: [...prosConsCopy.cons],
};

export const fallbackWhyDownloadCopy = {
  id: whyDownloadCopy.id,
  kicker: whyDownloadCopy.kicker,
  title: whyDownloadCopy.title,
  description: whyDownloadCopy.description,
  reasons: whyDownloadCopy.reasons.map((r) => ({ ...r })),
};

export const fallbackTroubleshootingCopy = {
  id: troubleshootingCopy.id,
  kicker: troubleshootingCopy.kicker,
  title: troubleshootingCopy.title,
  description: troubleshootingCopy.description,
  items: troubleshootingCopy.items.map((i) => ({ ...i })),
};
