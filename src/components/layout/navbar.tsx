"use client";

import * as React from "react";
import Link from "next/link";
import { Gamepad2, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/ui/download-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { NavLink, SiteConfigData } from "@/lib/content-types";
import { fallbackSiteSettings } from "@/lib/wordpress/fallbacks";
import { cn } from "@/lib/utils";

interface NavbarProps {
  siteConfig?: SiteConfigData;
  navLinks?: NavLink[];
  ctaLabel?: string;
}

export function Navbar({
  siteConfig = fallbackSiteSettings.siteConfig,
  navLinks = fallbackSiteSettings.navLinks,
  ctaLabel = fallbackSiteSettings.heroCopy.ctaPrimary,
}: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 theme-transition",
        scrolled
          ? "navbar-glass scrolled border-b border-border"
          : "theme-transition border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6"
      >
        <Link
          href="/#beranda"
          className="flex items-center gap-2.5 text-[0.9375rem] font-semibold tracking-tight text-foreground"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15">
            <Gamepad2 className="size-4 text-primary-hover" aria-hidden="true" />
          </span>
          {siteConfig.shortName}
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <DownloadButton
            size="sm"
            className="hidden sm:inline-flex"
            fileUrl={siteConfig.downloadFile}
          >
            {ctaLabel}
          </DownloadButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Buka menu navigasi"
                aria-expanded={open}
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-border bg-background">
              <SheetHeader className="border-b border-border px-6 py-5">
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15">
                    <Gamepad2
                      className="size-4 text-primary-hover"
                      aria-hidden="true"
                    />
                  </span>
                  {siteConfig.shortName}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Menu navigasi situs
                </SheetDescription>
              </SheetHeader>
              <ul className="flex flex-col gap-0.5 px-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3.5 py-3 text-[0.9375rem] text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <SheetFooter className="flex-col gap-3 border-t border-border px-6 py-5">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div>
                <DownloadButton className="w-full" fileUrl={siteConfig.downloadFile}>
                  {ctaLabel}
                </DownloadButton>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
