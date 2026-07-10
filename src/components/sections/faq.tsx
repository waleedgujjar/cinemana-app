"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqCopy, FaqItem } from "@/lib/content-types";
import { fallbackFaqItems, fallbackSiteSettings } from "@/lib/wordpress/fallbacks";

interface FaqProps {
  copy?: FaqCopy;
  items?: FaqItem[];
}

export function Faq({
  copy = fallbackSiteSettings.faqCopy,
  items = fallbackFaqItems,
}: FaqProps) {
  return (
    <section
      id={copy.id}
      aria-labelledby="faq-heading"
      className="section-ambient section-padding"
    >
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeader
            titleId="faq-heading"
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
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="section-divider py-1"
              >
                <AccordionTrigger className="py-5 text-[0.9375rem] font-medium text-foreground hover:text-primary-hover hover:no-underline sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
