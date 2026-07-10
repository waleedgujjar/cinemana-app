"use client";

import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface DownloadButtonProps {
  fileUrl?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  children?: React.ReactNode;
}

export function DownloadButton({
  fileUrl = siteConfig.downloadFile,
  size = "default",
  className,
  children,
}: DownloadButtonProps) {
  return (
    <a
      href={fileUrl}
      download
      aria-label={`Unduh ${siteConfig.downloadFileName}`}
      className={cn(buttonVariants({ variant: "default", size }), className)}
    >
      <Download aria-hidden="true" />
      {children ?? "Unduh Sekarang"}
    </a>
  );
}
