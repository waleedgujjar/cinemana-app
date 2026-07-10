import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSite } from "@/components/sections/about-site";
import { Conclusion } from "@/components/sections/conclusion";
import { DownloadGuides } from "@/components/sections/download-guides";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { siteConfig } from "@/lib/site-config";
import {
  faqPageSchema,
  JsonLd,
  organizationSchema,
  softwareApplicationSchema,
  webPageSchema,
  webSiteSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Unduh APK Gratis | 250.000+ Film & Serial`,
  description:
    "Unduh Cinemana Shabakaty APK gratis. Akses 250.000+ film, serial, anime, dan siaran olahraga langsung. Tanpa registrasi, aman, dan gratis selamanya.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          webSiteSchema(),
          webPageSchema(),
          softwareApplicationSchema(),
          faqPageSchema(),
        ]}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <DownloadGuides />
        <AboutSite />
        <Features />
        <Faq />
        <Conclusion />
      </main>
      <Footer />
    </>
  );
}
