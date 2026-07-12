import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Zap } from "lucide-react";
import { DownloadButton } from "@/components/ui/download-button";
import { buttonVariants } from "@/components/ui/button";
import type { HeroCopy, SiteConfigData } from "@/lib/content-types";
import { fallbackSiteSettings } from "@/lib/wordpress/fallbacks";
import { cn } from "@/lib/utils";

const trustIcons = [BadgeCheck, Zap, ShieldCheck];

interface HeroProps {
  copy?: HeroCopy;
  siteConfig?: SiteConfigData;
}

export function Hero({
  copy = fallbackSiteSettings.heroCopy,
  siteConfig = fallbackSiteSettings.siteConfig,
}: HeroProps) {
  const backgroundImage = copy.backgroundImage ?? "/images/hero-sakura-wide.png";

  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="hero-vignette relative min-h-svh overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Latar belakang Sakura School Simulator dengan suasana sekolah, pencahayaan ungu neon, dan atmosfer game simulasi"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[75%_center] sm:object-[70%_center] lg:object-[65%_center] transition-opacity duration-500"
        />

        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />

        <div
          className="hero-grain absolute inset-0 mix-blend-overlay transition-opacity duration-500"
          style={{
            backgroundImage: "url(/images/grain.png)",
            backgroundRepeat: "repeat",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center px-6 py-28 sm:py-32 lg:grid-cols-[48fr_52fr] lg:gap-10 lg:py-36">
        <div className="relative z-10 max-w-xl lg:max-w-lg xl:max-w-xl">
          <p className="hero-animate hero-badge inline-flex items-center gap-2 rounded-full border border-primary/30 px-3.5 py-1.5 text-[0.8125rem] font-medium text-primary">
            {copy.kicker} · {siteConfig.version}
          </p>

          <h1
            id="hero-heading"
            className="hero-animate hero-animate-delay-1 hero-heading-shadow mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
          >
            {copy.headline}
          </h1>

          <p className="hero-animate hero-animate-delay-1 mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subhead}
          </p>

          <div className="hero-animate hero-animate-delay-2 mt-9 flex flex-wrap items-center gap-3">
            <DownloadButton size="lg" fileUrl={siteConfig.downloadFile}>
              {copy.ctaPrimary}
            </DownloadButton>
            <Link
              href="#fitur"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hero-outline-btn"
              )}
            >
              {copy.ctaSecondary}
            </Link>
          </div>
          <p className="hero-animate hero-animate-delay-2 mt-3 text-sm text-muted-foreground">
            Versi {siteConfig.version}
            {siteConfig.downloadFileSizeLabel
              ? ` · ${siteConfig.downloadFileSizeLabel}`
              : ""}
          </p>

          <ul className="hero-animate hero-animate-delay-2 mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            {copy.trust.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"
                >
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>

          <dl className="hero-animate hero-animate-delay-3 hero-divider mt-10 grid max-w-md grid-cols-3 gap-4 border-t pt-8 sm:gap-6">
            {copy.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[0.75rem] text-muted-foreground sm:text-[0.8125rem]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
