import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DownloadButton } from "@/components/ui/download-button";
import { SectionHeader } from "@/components/ui/section-header";
import type { SiteConfigData } from "@/lib/content-types";
import {
  fallbackSiteSettings,
  fallbackWhatsNewCopy,
} from "@/lib/wordpress/fallbacks";

interface WhatsNewProps {
  copy?: typeof fallbackWhatsNewCopy;
  siteConfig?: SiteConfigData;
}

export function WhatsNew({
  copy = fallbackWhatsNewCopy,
  siteConfig = fallbackSiteSettings.siteConfig,
}: WhatsNewProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="whats-new-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader
              titleId="whats-new-heading"
              kicker={copy.kicker}
              title={copy.title}
              description={copy.description}
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {copy.versionNote}
            </p>
            <div className="mt-8">
              <DownloadButton size="lg" fileUrl={siteConfig.downloadFile}>
                Unduh Versi {siteConfig.version}
              </DownloadButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="premium-panel rounded-3xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <Sparkles className="size-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary-hover">
                  {siteConfig.version}
                </span>
              </div>
              <ul className="space-y-4">
                {copy.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check className="size-3 text-primary-hover" aria-hidden="true" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
