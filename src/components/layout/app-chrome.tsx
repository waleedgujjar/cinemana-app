import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/wordpress";

interface AppChromeProps {
  children: React.ReactNode;
}

export async function AppChrome({ children }: AppChromeProps) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar
        siteConfig={settings.siteConfig}
        navLinks={settings.navLinks}
        ctaLabel={settings.heroCopy.ctaPrimary}
      />
      {children}
      <Footer
        siteConfig={settings.siteConfig}
        footerCopy={settings.footerCopy}
      />
    </>
  );
}
