import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const heading = Geist({
  variable: "--font-heading-var",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Unduh APK Gratis | Platform Hiburan Premium`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Cinemana Shabakaty",
    "Cinemana APK",
    "unduh Cinemana",
    "streaming gratis",
    "film gratis",
    "anime streaming",
    "siaran olahraga live",
    "aplikasi hiburan Android",
    "Smart TV streaming",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "entertainment",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Unduh APK Gratis | Platform Hiburan Premium`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Platform Hiburan Premium`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Unduh APK Gratis`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Lewati ke konten utama
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
