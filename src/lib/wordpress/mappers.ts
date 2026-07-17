import type {
  AboutCopy,
  ConclusionCopy,
  DownloadGuideCopy,
  FaqCopy,
  FaqItem,
  FeatureItem,
  FeaturesCopy,
  FooterCopy,
  HeroCopy,
  IconName,
  NavLink,
  SiteConfigData,
  SiteSettings,
  WpAuthor,
  WpCategory,
  WpImage,
  WpPost,
  WpPostsResult,
  WpSeo,
  WpTag,
} from "@/lib/content-types";
import { siteConfig } from "@/lib/site-config";
import { fallbackSiteSettings } from "@/lib/wordpress/fallbacks";

const ICON_NAMES: IconName[] = [
  "Smartphone",
  "Download",
  "Sparkles",
  "Film",
  "Radio",
  "MonitorSmartphone",
  "Zap",
  "Shield",
  "Heart",
];

function parseIcon(value: string | null | undefined): IconName {
  if (value && ICON_NAMES.includes(value as IconName)) {
    return value as IconName;
  }
  return "Zap";
}

function mapMedia(
  node: {
    sourceUrl?: string;
    altText?: string;
    mediaDetails?: { width?: number; height?: number };
  } | null
    | undefined
): WpImage | null {
  if (!node?.sourceUrl) return null;
  return {
    sourceUrl: node.sourceUrl,
    altText: node.altText ?? "",
    width: node.mediaDetails?.width,
    height: node.mediaDetails?.height,
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function mapWpSeo(
  seo: {
    title?: string;
    metaDesc?: string;
    canonical?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: { sourceUrl?: string; altText?: string } | null;
  } | null
    | undefined
): WpSeo | null {
  if (!seo) return null;
  return {
    title: seo.title,
    metaDesc: seo.metaDesc,
    canonical: seo.canonical,
    opengraphTitle: seo.opengraphTitle,
    opengraphDescription: seo.opengraphDescription,
    opengraphImage: seo.opengraphImage?.sourceUrl
      ? {
          sourceUrl: seo.opengraphImage.sourceUrl,
          altText: seo.opengraphImage.altText ?? "",
        }
      : null,
  };
}

export function mapWpPost(node: {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  modified: string;
  featuredImage?: { node?: Parameters<typeof mapMedia>[0] };
  author?: { node?: { name: string; slug: string } };
  categories?: { nodes?: { databaseId?: number; name: string; slug: string }[] };
  tags?: { nodes?: { name: string; slug: string }[] };
  seo?: Parameters<typeof mapWpSeo>[0];
}): WpPost {
  const featuredImage = mapMedia(node.featuredImage?.node);
  const author: WpAuthor = {
    name: node.author?.node?.name ?? "Admin",
    slug: node.author?.node?.slug ?? "admin",
  };

  return {
    id: node.id,
    databaseId: node.databaseId,
    title: node.title,
    slug: node.slug,
    excerpt: stripHtml(node.excerpt),
    content: node.content ?? "",
    date: node.date,
    modified: node.modified,
    featuredImage,
    author,
    categories:
      node.categories?.nodes?.map((c) => ({
        databaseId: c.databaseId,
        name: c.name,
        slug: c.slug,
      })) ?? [],
    tags: node.tags?.nodes ?? [],
    seo: mapWpSeo(node.seo),
  };
}

export function mapPostsResult(data: {
  posts: {
    pageInfo: WpPostsResult["pageInfo"];
    nodes: Parameters<typeof mapWpPost>[0][];
  };
}): WpPostsResult {
  return {
    posts: data.posts.nodes.map(mapWpPost),
    pageInfo: data.posts.pageInfo,
    total: data.posts.nodes.length,
  };
}

interface WpSiteSettingsResponse {
  acfOptionsSiteSettings?: {
    siteSettingsFields?: {
      siteMeta?: {
        name?: string;
        shortName?: string;
        version?: string;
        description?: string;
        locale?: string;
        mainKeyword?: string;
        downloadFileName?: string;
        downloadFileUrl?: string;
      };
      hero?: {
        kicker?: string;
        headline?: string;
        subhead?: string;
        ctaPrimary?: string;
        ctaSecondary?: string;
        backgroundImage?: { node?: Parameters<typeof mapMedia>[0] };
        stats?: { value?: string; label?: string }[];
        trust?: { label?: string }[];
      };
      downloadGuide?: {
        sectionId?: string;
        kicker?: string;
        title?: string;
        description?: string;
        promoImage?: { node?: Parameters<typeof mapMedia>[0] };
        steps?: {
          number?: string;
          icon?: string;
          title?: string;
          description?: string;
        }[];
      };
      about?: {
        sectionId?: string;
        kicker?: string;
        title?: string;
        subtitle?: string;
        paragraphs?: { text?: string }[];
        features?: { text?: string }[];
        stats?: { value?: string; label?: string }[];
        cta?: string;
        promoImage?: { node?: Parameters<typeof mapMedia>[0] };
      };
      features?: {
        sectionId?: string;
        kicker?: string;
        title?: string;
        description?: string;
        items?: { icon?: string; title?: string; description?: string }[];
      };
      faqSection?: {
        sectionId?: string;
        kicker?: string;
        title?: string;
        description?: string;
      };
      conclusion?: {
        title?: string;
        description?: string;
        cta?: string;
      };
      navigation?: {
        navLinks?: { label?: string; href?: string }[];
        footerLinks?: { label?: string; href?: string }[];
        footerTagline?: string;
      };
    };
  };
}

function mapNavLinks(
  links: { label?: string; href?: string }[] | undefined,
  fallback: NavLink[]
): NavLink[] {
  if (!links?.length) return fallback;
  const mapped = links
    .filter((l) => l.label && l.href)
    .map((l) => ({ label: l.label!, href: l.href! }));
  return mapped.length ? mapped : fallback;
}

function resolveDownloadUrl(
  cmsUrl: string | null | undefined,
  fallbackUrl: string
): string {
  if (cmsUrl?.startsWith("http")) return cmsUrl;
  return fallbackUrl;
}

export function mapSiteSettings(
  data: WpSiteSettingsResponse,
  baseUrl: string
): SiteSettings {
  const fields = data.acfOptionsSiteSettings?.siteSettingsFields;
  const fb = fallbackSiteSettings;

  if (!fields) return fb;

  const meta = fields.siteMeta;
  const mappedSiteConfig: SiteConfigData = {
    name: meta?.name ?? fb.siteConfig.name,
    shortName: meta?.shortName ?? fb.siteConfig.shortName,
    version: meta?.version ?? fb.siteConfig.version,
    url: baseUrl,
    description: meta?.description ?? fb.siteConfig.description,
    locale: meta?.locale ?? fb.siteConfig.locale,
    mainKeyword: meta?.mainKeyword ?? fb.siteConfig.mainKeyword,
    downloadFile: resolveDownloadUrl(
      meta?.downloadFileUrl,
      fb.siteConfig.downloadFile
    ),
    downloadFileName: meta?.downloadFileName ?? fb.siteConfig.downloadFileName,
    downloadFileSizeLabel: fb.siteConfig.downloadFileSizeLabel,
  };

  const heroBg = mapMedia(fields.hero?.backgroundImage?.node);
  const heroCopy: HeroCopy = {
    kicker: fields.hero?.kicker ?? fb.heroCopy.kicker,
    headline: fields.hero?.headline ?? fb.heroCopy.headline,
    subhead: fields.hero?.subhead ?? fb.heroCopy.subhead,
    ctaPrimary: fields.hero?.ctaPrimary ?? fb.heroCopy.ctaPrimary,
    ctaSecondary: fields.hero?.ctaSecondary ?? fb.heroCopy.ctaSecondary,
    stats:
      fields.hero?.stats?.filter((s) => s.value && s.label).map((s) => ({
        value: s.value!,
        label: s.label!,
      })) ?? fb.heroCopy.stats,
    trust:
      fields.hero?.trust?.filter((t) => t.label).map((t) => ({
        label: t.label!,
      })) ?? fb.heroCopy.trust,
    backgroundImage: heroBg?.sourceUrl ?? fb.heroCopy.backgroundImage,
  };

  const downloadPromo = mapMedia(fields.downloadGuide?.promoImage?.node);
  const downloadGuideCopy: DownloadGuideCopy = {
    id: fields.downloadGuide?.sectionId ?? fb.downloadGuideCopy.id,
    kicker: fields.downloadGuide?.kicker ?? fb.downloadGuideCopy.kicker,
    title: fields.downloadGuide?.title ?? fb.downloadGuideCopy.title,
    description:
      fields.downloadGuide?.description ?? fb.downloadGuideCopy.description,
    steps:
      fields.downloadGuide?.steps?.map((s, i) => ({
        number: s.number ?? fb.downloadGuideCopy.steps[i]?.number ?? "01",
        icon: parseIcon(s.icon ?? fb.downloadGuideCopy.steps[i]?.icon),
        title: s.title ?? fb.downloadGuideCopy.steps[i]?.title ?? "",
        description:
          s.description ?? fb.downloadGuideCopy.steps[i]?.description ?? "",
      })) ?? fb.downloadGuideCopy.steps,
    promoImage: downloadPromo?.sourceUrl ?? fb.downloadGuideCopy.promoImage,
  };

  const aboutPromo = mapMedia(fields.about?.promoImage?.node);
  const aboutCopy: AboutCopy = {
    id: fields.about?.sectionId ?? fb.aboutCopy.id,
    kicker: fields.about?.kicker ?? fb.aboutCopy.kicker,
    title: fields.about?.title ?? fb.aboutCopy.title,
    subtitle: fields.about?.subtitle ?? fb.aboutCopy.subtitle,
    paragraphs:
      fields.about?.paragraphs
        ?.map((p) => p.text)
        .filter((t): t is string => Boolean(t)) ?? fb.aboutCopy.paragraphs,
    features:
      fields.about?.features
        ?.map((f) => f.text)
        .filter((t): t is string => Boolean(t)) ?? fb.aboutCopy.features,
    stats:
      fields.about?.stats?.filter((s) => s.value && s.label).map((s) => ({
        value: s.value!,
        label: s.label!,
      })) ?? fb.aboutCopy.stats,
    cta: fields.about?.cta ?? fb.aboutCopy.cta,
    promoImage: aboutPromo?.sourceUrl ?? fb.aboutCopy.promoImage,
  };

  const featureItems: FeatureItem[] =
    fields.features?.items?.map((item, i) => ({
      icon: parseIcon(item.icon ?? fb.featuresCopy.items[i]?.icon),
      title: item.title ?? fb.featuresCopy.items[i]?.title ?? "",
      description:
        item.description ?? fb.featuresCopy.items[i]?.description ?? "",
    })) ?? fb.featuresCopy.items;

  const featuresCopy: FeaturesCopy = {
    id: fields.features?.sectionId ?? fb.featuresCopy.id,
    kicker: fields.features?.kicker ?? fb.featuresCopy.kicker,
    title: fields.features?.title ?? fb.featuresCopy.title,
    description: fields.features?.description ?? fb.featuresCopy.description,
    items: featureItems,
  };

  const faqCopy: FaqCopy = {
    id: fields.faqSection?.sectionId ?? fb.faqCopy.id,
    kicker: fields.faqSection?.kicker ?? fb.faqCopy.kicker,
    title: fields.faqSection?.title ?? fb.faqCopy.title,
    description: fields.faqSection?.description ?? fb.faqCopy.description,
    items: fb.faqCopy.items,
  };

  const conclusionCopy: ConclusionCopy = {
    title: fields.conclusion?.title ?? fb.conclusionCopy.title,
    description: fields.conclusion?.description ?? fb.conclusionCopy.description,
    cta: fields.conclusion?.cta ?? fb.conclusionCopy.cta,
  };

  const footerCopy: FooterCopy = {
    tagline: fields.navigation?.footerTagline ?? fb.footerCopy.tagline,
    links: mapNavLinks(fields.navigation?.footerLinks, fb.footerCopy.links),
  };

  return {
    siteConfig: mappedSiteConfig,
    heroCopy,
    downloadGuideCopy,
    aboutCopy,
    featuresCopy,
    faqCopy,
    conclusionCopy,
    navLinks: mapNavLinks(fields.navigation?.navLinks, fb.navLinks),
    footerCopy,
  };
}

export function mapFaqItems(
  nodes: { title?: string; content?: string }[] | undefined
): FaqItem[] {
  if (!nodes?.length) return fallbackSiteSettings.faqCopy.items;
  return nodes
    .filter((n) => n.title && n.content)
    .map((n) => ({
      question: n.title!,
      answer: stripHtml(n.content!),
    }));
}

export function mapCategory(
  node: { name?: string; slug?: string; description?: string; count?: number } | null
): WpCategory | null {
  if (!node?.slug) return null;
  return {
    name: node.name ?? node.slug,
    slug: node.slug,
    description: node.description,
    count: node.count,
  };
}

export function mapTag(
  node: { name?: string; slug?: string; count?: number } | null
): WpTag | null {
  if (!node?.slug) return null;
  return {
    name: node.name ?? node.slug,
    slug: node.slug,
    count: node.count,
  };
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
}
