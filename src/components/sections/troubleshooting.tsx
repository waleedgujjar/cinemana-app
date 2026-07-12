import { Wrench } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fallbackTroubleshootingCopy } from "@/lib/wordpress/fallbacks";

interface TroubleshootingProps {
  copy?: typeof fallbackTroubleshootingCopy;
}

export function Troubleshooting({
  copy = fallbackTroubleshootingCopy,
}: TroubleshootingProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="troubleshooting-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="troubleshooting-heading"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="premium-panel mx-auto mt-12 max-w-3xl divide-y section-divider rounded-3xl px-6 sm:px-8"
          >
            {copy.items.map((item, index) => (
              <AccordionItem
                key={item.problem}
                value={`trouble-${index}`}
                className="section-divider py-1"
              >
                <AccordionTrigger className="gap-3 py-5 text-[0.9375rem] font-medium text-foreground hover:text-primary-hover hover:no-underline sm:text-base">
                  <Wrench className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item.problem}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-7 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {item.solution}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
