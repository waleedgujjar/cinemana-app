import { Download, Smartphone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DownloadButton } from "@/components/ui/download-button";
import { PremiumMediaFrame } from "@/components/ui/premium-media-frame";
import { SectionHeader } from "@/components/ui/section-header";
import { StepCard } from "@/components/sections/step-card";
import { downloadGuideCopy, heroCopy } from "@/lib/site-config";

const iconMap = {
  Smartphone,
  Download,
  Sparkles,
} as const;

export function DownloadGuides() {
  return (
    <section
      id={downloadGuideCopy.id}
      aria-labelledby="download-guide-heading"
      className="section-ambient download-gradient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="download-guide-heading"
            kicker={downloadGuideCopy.kicker}
            title={downloadGuideCopy.title}
            description={downloadGuideCopy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        {/* Unified premium panel */}
        <Reveal delay={0.1}>
          <div className="premium-panel mt-16 overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              {/* Steps timeline */}
              <div className="relative order-2 lg:order-1">
                <div
                  className="absolute top-6 bottom-6 left-[1.65rem] hidden w-px bg-gradient-to-b from-primary/50 via-primary/15 to-transparent sm:block"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-5">
                  {downloadGuideCopy.steps.map((step, index) => {
                    const Icon = iconMap[step.icon];
                    return (
                      <div
                        key={step.number}
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <StepCard
                          number={step.number}
                          icon={Icon}
                          title={step.title}
                          description={step.description}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Integrated media showcase */}
              <div className="relative order-1 lg:order-2">
                <div
                  className="absolute -right-8 -top-8 size-40 rounded-full bg-accent/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 -left-6 size-32 rounded-full bg-primary/15 blur-3xl"
                  aria-hidden="true"
                />

                <PremiumMediaFrame
                  src="/images/download-promo.png"
                  alt="Grafik promosi aplikasi dengan karakter dan pencahayaan ungu neon sinematik"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  aspectClass="aspect-[4/3]"
                  objectFit="contain"
                  glowPosition="right"
                  className="lg:-mr-2"
                />

                {/* Floating accent chips */}
                <div className="absolute -bottom-3 left-4 stat-pill rounded-full px-4 py-2 text-xs font-medium text-primary-hover sm:left-8">
                  3 Langkah Mudah
                </div>
                <div className="absolute -top-2 right-4 stat-pill rounded-full px-4 py-2 text-xs font-medium text-muted-foreground sm:right-8">
                  Instalasi Aman
                </div>
              </div>
            </div>

            {/* Integrated CTA footer */}
            <div className="mt-10 flex flex-col items-center gap-4 border-t section-divider pt-10 sm:flex-row sm:justify-between">
              <p className="text-center text-sm text-muted-foreground sm:text-left">
                File APK resmi · {heroCopy.ctaPrimary} · Tanpa registrasi
              </p>
              <DownloadButton
                size="lg"
                className="shadow-[var(--shadow-button)]"
              >
                {heroCopy.ctaPrimary}
              </DownloadButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
