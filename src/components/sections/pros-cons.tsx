import { CheckCircle, XCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { fallbackProsConsCopy } from "@/lib/wordpress/fallbacks";

interface ProsConsProps {
  copy?: typeof fallbackProsConsCopy;
}

export function ProsCons({ copy = fallbackProsConsCopy }: ProsConsProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="pros-cons-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="pros-cons-heading"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="glass-card h-full rounded-2xl border-primary/20 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <CheckCircle className="size-5 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">Kelebihan</h3>
              </div>
              <ul className="space-y-3">
                {copy.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-card h-full rounded-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <XCircle className="size-5 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">Perlu Diketahui</h3>
              </div>
              <ul className="space-y-3">
                {copy.cons.map((con) => (
                  <li key={con} className="flex items-start gap-3">
                    <XCircle
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {con}
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
