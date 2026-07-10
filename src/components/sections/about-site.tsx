import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DownloadButton } from "@/components/ui/download-button";
import { PremiumMediaFrame } from "@/components/ui/premium-media-frame";
import { SectionHeader } from "@/components/ui/section-header";
import type { AboutCopy, SiteConfigData } from "@/lib/content-types";
import { fallbackSiteSettings } from "@/lib/wordpress/fallbacks";
import { cn } from "@/lib/utils";

interface AboutSiteProps {
  copy?: AboutCopy;
  siteConfig?: SiteConfigData;
}

export function AboutSite({
  copy = fallbackSiteSettings.aboutCopy,
  siteConfig = fallbackSiteSettings.siteConfig,
}: AboutSiteProps) {
  const promoImage = copy.promoImage ?? "/images/about-promo.png";

  return (
    <section
      id={copy.id}
      aria-labelledby="about-heading"
      className="section-ambient about-gradient section-padding"
    >
      <div className="section-container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative lg:pr-4">
              <div
                className="absolute -left-12 top-1/4 size-48 rounded-full bg-primary/10 blur-[100px]"
                aria-hidden="true"
              />
              <div
                className="absolute -right-4 bottom-0 size-36 rounded-full bg-accent/10 blur-[80px]"
                aria-hidden="true"
              />

              <PremiumMediaFrame
                src={promoImage}
                alt="Grafik promosi Sakura School Simulator APK dengan karakter sekolah dan pencahayaan ungu"
                sizes="(max-width: 1024px) 100vw, 50vw"
                aspectClass="aspect-square"
                objectFit="cover"
                objectPosition="object-center"
                float
                glowPosition="left"
              />

              <div className="absolute -bottom-5 -right-2 stat-pill rounded-2xl px-5 py-4 sm:right-4 lg:-right-6">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {copy.stats[0]?.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {copy.stats[0]?.label}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <SectionHeader
                titleId="about-heading"
                kicker={copy.kicker}
                title={copy.title}
                description={copy.subtitle}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 space-y-4">
                {copy.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {copy.features.map((feature) => (
                  <div
                    key={feature}
                    className={cn(
                      "glass-card flex items-start gap-3 rounded-xl p-4 transition-colors duration-300",
                      "hover:border-primary/25"
                    )}
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check
                        className="size-3 text-primary-hover"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-foreground sm:text-[0.875rem]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <dl className="mt-10 grid grid-cols-3 gap-4">
                {copy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="stat-pill rounded-xl px-4 py-4 text-center"
                  >
                    <dd className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-[0.7rem] text-muted-foreground sm:text-xs">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <DownloadButton size="lg" fileUrl={siteConfig.downloadFile}>
                  {copy.cta}
                </DownloadButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
