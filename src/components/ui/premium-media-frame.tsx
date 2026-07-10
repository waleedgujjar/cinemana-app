import Image from "next/image";
import { FloatMedia } from "@/components/motion/float-media";
import { cn } from "@/lib/utils";

interface PremiumMediaFrameProps {
  src: string;
  alt: string;
  sizes: string;
  aspectClass?: string;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
  priority?: boolean;
  float?: boolean;
  glowPosition?: "left" | "right" | "center";
  className?: string;
  imageClassName?: string;
}

export function PremiumMediaFrame({
  src,
  alt,
  sizes,
  aspectClass = "aspect-[4/3]",
  objectFit = "contain",
  objectPosition = "object-center",
  priority = false,
  float = false,
  glowPosition = "center",
  className,
  imageClassName,
}: PremiumMediaFrameProps) {
  const glowPos = {
    left: "left-[10%] top-1/2 -translate-y-1/2",
    right: "right-[10%] top-1/2 -translate-y-1/2",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  }[glowPosition];

  const frame = (
    <div className={cn("premium-media relative", className)}>
      {/* Ambient glow */}
      <div
        className={cn(
          "absolute size-64 rounded-full bg-primary/20 blur-[80px]",
          glowPos
        )}
        aria-hidden="true"
      />

      {/* Decorative ring */}
      <div
        className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-primary/40 via-primary/10 to-transparent opacity-60"
        aria-hidden="true"
      />

      {/* Glass frame */}
      <div className="premium-media-inner relative overflow-hidden rounded-[1.25rem]">
        <div className={cn("relative w-full", aspectClass)}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={85}
            className={cn(
              objectFit === "contain" ? "object-contain" : "object-cover",
              objectPosition,
              imageClassName
            )}
          />
          {/* Cinematic vignette blend */}
          <div
            className="premium-media-vignette absolute inset-0"
            aria-hidden="true"
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 left-3 size-8 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm" aria-hidden="true" />
        <div className="absolute right-3 bottom-3 size-6 rounded-full border border-primary/15 bg-primary/5 backdrop-blur-sm" aria-hidden="true" />
      </div>
    </div>
  );

  if (float) {
    return <FloatMedia>{frame}</FloatMedia>;
  }

  return frame;
}
