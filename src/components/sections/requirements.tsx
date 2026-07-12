import {
  Cpu,
  Download,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { RequirementItem } from "@/lib/content-types";
import { fallbackRequirementsCopy } from "@/lib/wordpress/fallbacks";

const iconMap = {
  Smartphone,
  Cpu,
  Download,
  Zap,
  Star,
} as const;

interface RequirementsProps {
  copy?: typeof fallbackRequirementsCopy;
}

function RequirementList({
  title,
  items,
}: {
  title: string;
  items: RequirementItem[];
}) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Cpu;
          return (
            <li key={item.label} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground">{item.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Requirements({
  copy = fallbackRequirementsCopy,
}: RequirementsProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="requirements-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="requirements-heading"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <RequirementList title="Persyaratan Minimum" items={copy.minimum} />
          </Reveal>
          <Reveal delay={0.15}>
            <RequirementList title="Direkomendasikan" items={copy.recommended} />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            {copy.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
