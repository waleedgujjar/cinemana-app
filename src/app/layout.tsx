import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getSiteSettings } from "@/lib/wordpress";
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const config = settings.siteConfig;

  return {
    metadataBase: new URL(config.url),
    title: {
      default: `${config.mainKeyword} — Unduh Gratis untuk Android`,
      template: `%s | ${config.shortName}`,
    },
    description: config.description,
    keywords: [
      config.mainKeyword,
      "sakura school simulator",
      "unduh sakura school simulator",
      "sakura school simulator android",
      "download sakura school simulator APK",
      "game simulasi sekolah",
      "sakura school simulator gratis",
      "APK sakura school simulator terbaru",
      "sakura school simulator indonesia",
    ],
    authors: [{ name: config.name, url: config.url }],
    creator: config.name,
    publisher: config.name,
    category: "games",
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": `${config.url}/feed.xml`,
      },
    },
    openGraph: {
      type: "website",
      locale: config.locale,
      url: config.url,
      siteName: config.name,
      title: `${config.mainKeyword} — Unduh Gratis untuk Android`,
      description: config.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${config.mainKeyword} — Unduh Gratis`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.mainKeyword} — Unduh Gratis`,
      description: config.description,
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
}

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
