import { Reveal } from "@/components/motion/reveal";

import { DownloadButton } from "@/components/ui/download-button";

import { conclusionCopy } from "@/lib/site-config";



export function Conclusion() {

  return (

    <section

      aria-labelledby="conclusion-heading"

      className="section-padding pb-28 lg:pb-32"

    >

      <div className="section-container">

        <Reveal>

          <div className="premium-panel relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-12 sm:py-20">

            <div

              className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(109,40,255,0.22),transparent_70%)]"

              aria-hidden="true"

            />

            <div

              className="absolute -top-20 right-1/4 size-40 rounded-full bg-primary/10 blur-[80px]"

              aria-hidden="true"

            />

            <div className="relative">

              <h2

                id="conclusion-heading"

                className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"

              >

                {conclusionCopy.title}

              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">

                {conclusionCopy.description}

              </p>

              <div className="mt-9 flex justify-center">

                <DownloadButton

                  size="lg"

                  className="shadow-[var(--shadow-button)]"

                >

                  {conclusionCopy.cta}

                </DownloadButton>

              </div>

            </div>

          </div>

        </Reveal>

      </div>

    </section>

  );

}

