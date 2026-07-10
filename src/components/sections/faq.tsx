"use client";



import { Reveal } from "@/components/motion/reveal";

import { SectionHeader } from "@/components/ui/section-header";

import {

  Accordion,

  AccordionContent,

  AccordionItem,

  AccordionTrigger,

} from "@/components/ui/accordion";

import { faqCopy } from "@/lib/site-config";



export function Faq() {

  return (

    <section

      id={faqCopy.id}

      aria-labelledby="faq-heading"

      className="section-ambient section-padding"

    >

      <div className="section-container relative z-10">

        <Reveal>

          <SectionHeader

            titleId="faq-heading"

            kicker={faqCopy.kicker}

            title={faqCopy.title}

            description={faqCopy.description}

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

            {faqCopy.items.map((item, index) => (

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

