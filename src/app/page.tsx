import type { Metadata } from "next";
import { AppChrome } from "@/components/layout/app-chrome";
import { AboutSite } from "@/components/sections/about-site";
import { Conclusion } from "@/components/sections/conclusion";
import { DownloadGuides } from "@/components/sections/download-guides";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import {
  faqPageSchema,
  JsonLd,
  organizationSchema,
  softwareApplicationSchema,
  webPageSchema,
  webSiteSchema,
} from "@/lib/schema";
import { getFaqs, getSiteSettings } from "@/lib/wordpress";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const { siteConfig } = settings;

  return {
    title: `${siteConfig.mainKeyword} — Unduh Gratis | Android`,
    description: siteConfig.description,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${siteConfig.mainKeyword} — Unduh Gratis untuk Android`,
      description: siteConfig.description,
      url: siteConfig.url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function Home() {
  const settings = await getSiteSettings();
  const faqItems = await getFaqs();

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(settings.siteConfig),
          webSiteSchema(settings.siteConfig),
          webPageSchema(settings.siteConfig),
          softwareApplicationSchema(settings.siteConfig),
          faqPageSchema(faqItems),
        ]}
      />
      <AppChrome>
        <main id="main-content">
          <Hero copy={settings.heroCopy} siteConfig={settings.siteConfig} />
          <DownloadGuides
            copy={settings.downloadGuideCopy}
            heroCta={settings.heroCopy}
            siteConfig={settings.siteConfig}
          />
          <AboutSite
            copy={settings.aboutCopy}
            siteConfig={settings.siteConfig}
          />
          <Features copy={settings.featuresCopy} />
          <Faq copy={settings.faqCopy} items={faqItems} />
          <Conclusion
            copy={settings.conclusionCopy}
            siteConfig={settings.siteConfig}
          />
        </main>
      </AppChrome>
    </>
  );
}
