export type IconName =
  | "Smartphone"
  | "Download"
  | "Sparkles"
  | "Film"
  | "Radio"
  | "MonitorSmartphone"
  | "Zap"
  | "Shield"
  | "Heart"
  | "Gamepad2"
  | "Cpu"
  | "Star"
  | "Users"
  | "Map"
  | "Wrench"
  | "CheckCircle"
  | "XCircle"
  | "AlertTriangle";

export interface SiteConfigData {
  name: string;
  shortName: string;
  version: string;
  url: string;
  description: string;
  locale: string;
  mainKeyword: string;
  downloadFile: string;
  downloadFileName: string;
}

export interface HeroCopy {
  kicker: string;
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
  trust: { label: string }[];
  backgroundImage?: string;
}

export interface DownloadStep {
  number: string;
  icon: IconName;
  title: string;
  description: string;
}

export interface DownloadGuideCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  steps: DownloadStep[];
  promoImage?: string;
}

export interface AboutCopy {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  features: string[];
  stats: { value: string; label: string }[];
  cta: string;
  promoImage?: string;
}

export interface FeatureItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface FeaturesCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  items: FeatureItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export interface ConclusionCopy {
  title: string;
  description: string;
  cta: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterCopy {
  tagline: string;
  links: NavLink[];
}

export interface ContentBlock {
  title: string;
  description: string;
}

export interface RequirementItem {
  label: string;
  value: string;
  icon: IconName;
}

export interface RequirementsCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  minimum: RequirementItem[];
  recommended: RequirementItem[];
  note: string;
}

export interface GameplayCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  steps: { title: string; description: string }[];
}

export interface WhatsNewCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  highlights: string[];
  versionNote: string;
}

export interface ProsConsCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}

export interface WhyDownloadCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  reasons: { icon: IconName; title: string; description: string }[];
}

export interface TroubleshootingItem {
  problem: string;
  solution: string;
}

export interface TroubleshootingCopy {
  id: string;
  kicker: string;
  title: string;
  description: string;
  items: TroubleshootingItem[];
}

export interface SiteSettings {
  siteConfig: SiteConfigData;
  heroCopy: HeroCopy;
  downloadGuideCopy: DownloadGuideCopy;
  aboutCopy: AboutCopy;
  featuresCopy: FeaturesCopy;
  faqCopy: FaqCopy;
  conclusionCopy: ConclusionCopy;
  navLinks: NavLink[];
  footerCopy: FooterCopy;
}

export interface WpImage {
  sourceUrl: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface WpAuthor {
  name: string;
  slug: string;
}

export interface WpTerm {
  name: string;
  slug: string;
}

export interface WpSeo {
  title?: string;
  metaDesc?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: WpImage | null;
}

export interface WpPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage: WpImage | null;
  author: WpAuthor;
  categories: WpTerm[];
  tags: WpTerm[];
  seo: WpSeo | null;
}

export interface WpPostsResult {
  posts: WpPost[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  total: number;
}

export interface WpCategory extends WpTerm {
  description?: string;
  count?: number;
}

export interface WpTag extends WpTerm {
  count?: number;
}

export interface AdjacentPosts {
  previous: WpPost | null;
  next: WpPost | null;
}
