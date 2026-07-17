"use client";

import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface DownloadButtonProps {
  fileUrl?: string;
  version?: string;
  fileSizeLabel?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  children?: React.ReactNode;
}

export function DownloadButton({
  fileUrl = siteConfig.downloadFile,
  version = siteConfig.version,
  fileSizeLabel = siteConfig.downloadFileSizeLabel,
  size = "default",
  className,
  children,
}: DownloadButtonProps) {
  const sizeHint = fileSizeLabel ? `, ${fileSizeLabel}` : "";

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Unduh ${siteConfig.downloadFileName} di APKPure, versi ${version}${sizeHint}`}
      className={cn(buttonVariants({ variant: "default", size }), className)}
    >
      <Download aria-hidden="true" />
      {children ?? "Unduh Sekarang"}
    </a>
  );
}
