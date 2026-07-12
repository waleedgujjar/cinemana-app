import {
  Download,
  Heart,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { fallbackWhyDownloadCopy } from "@/lib/wordpress/fallbacks";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  Download,
  Star,
  Users,
  Heart,
  Zap,
} as const;

interface WhyDownloadProps {
  copy?: typeof fallbackWhyDownloadCopy;
}

export function WhyDownload({ copy = fallbackWhyDownloadCopy }: WhyDownloadProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="why-download-heading"
      className="section-ambient about-gradient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="why-download-heading"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon as keyof typeof iconMap] ?? Shield;
            return (
              <Reveal key={reason.title} delay={index * 0.07}>
                <div
                  className={cn(
                    "glass-card h-full rounded-2xl p-6 transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
                  )}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/20">
                    <Icon className="size-5 text-primary-hover" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {reason.description}
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
