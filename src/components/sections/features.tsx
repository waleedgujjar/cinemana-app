import {
  Film,
  Heart,
  MonitorSmartphone,
  Radio,
  Shield,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FeaturesCopy } from "@/lib/content-types";
import { fallbackSiteSettings } from "@/lib/wordpress/fallbacks";
import { cn } from "@/lib/utils";

const iconMap = {
  Film,
  Radio,
  MonitorSmartphone,
  Zap,
  Shield,
  Heart,
} as const;

interface FeaturesProps {
  copy?: FeaturesCopy;
}

export function Features({ copy = fallbackSiteSettings.featuresCopy }: FeaturesProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="features-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="features-heading"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {copy.items.map((feature, index) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap] ?? Zap;
            return (
              <Reveal key={feature.title} delay={index * 0.08}>
                <div
                  className={cn(
                    "glass-card group h-full rounded-2xl p-6 transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] hover:translate-y-[-2px]"
                  )}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <Icon className="size-5 text-primary-hover" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
