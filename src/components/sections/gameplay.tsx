import { Gamepad2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { fallbackGameplayCopy } from "@/lib/wordpress/fallbacks";

interface GameplayProps {
  copy?: typeof fallbackGameplayCopy;
}

export function Gameplay({ copy = fallbackGameplayCopy }: GameplayProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="gameplay-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="gameplay-heading"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="relative mt-16">
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent sm:block lg:left-1/2 lg:-translate-x-px"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {copy.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <li
                  className={`relative flex flex-col gap-6 sm:flex-row sm:items-start lg:gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex shrink-0 items-center gap-4 sm:w-48 lg:w-auto lg:flex-1 lg:justify-end">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-lg font-semibold text-primary-hover ring-1 ring-primary/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="glass-card flex-1 rounded-2xl p-6 sm:p-7">
                    <div className="mb-3 flex items-center gap-2">
                      <Gamepad2 className="size-4 text-primary" aria-hidden="true" />
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
