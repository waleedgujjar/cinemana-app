import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: StepCardProps) {
  return (
    <Card
      className={cn(
        "glass-card group relative rounded-2xl py-0 shadow-none transition-all duration-300",
        "hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] hover:translate-y-[-2px]"
      )}
    >
      <CardHeader className="flex-row items-start gap-4 px-6 pt-6 pb-0">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/20">
          <Icon className="size-5 text-primary-hover" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary">
            Langkah {number}
          </span>
          <CardTitle className="mt-1 text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-3 pb-6">
        <CardDescription className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
