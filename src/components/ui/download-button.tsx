"use client";

import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface DownloadButtonProps {
  fileUrl?: string;
  downloadName?: string;
  version?: string;
  fileSizeLabel?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  children?: React.ReactNode;
}

export function DownloadButton({
  fileUrl = siteConfig.downloadFile,
  downloadName = siteConfig.downloadSaveName,
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
      download={downloadName}
      aria-label={`Unduh ${siteConfig.downloadFileName}, versi ${version}${sizeHint}`}
      type="application/vnd.android.package-archive"
      className={cn(buttonVariants({ variant: "default", size }), className)}
    >
      <Download aria-hidden="true" />
      {children ?? "Unduh Sekarang"}
    </a>
  );
}
