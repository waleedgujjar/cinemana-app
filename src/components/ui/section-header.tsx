import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  className,
  titleId,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {kicker && (
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-primary-hover backdrop-blur-sm">
          {kicker}
        </p>
      )}
      <h2
        id={titleId}
        className={cn(
          "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
          kicker && "mt-5"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
