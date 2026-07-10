import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { footerCopy, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="section-container py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div className="text-center sm:text-left">
            <Link
              href="#beranda"
              className="inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold tracking-tight text-foreground"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15">
                <Clapperboard className="size-4 text-primary-hover" aria-hidden="true" />
              </span>
              {siteConfig.shortName}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {footerCopy.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigasi">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end">
              {footerCopy.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {year} {siteConfig.name}. Semua hak dilindungi.
          </p>
          <p className="mt-1">{siteConfig.version}</p>
        </div>
      </div>
    </footer>
  );
}
