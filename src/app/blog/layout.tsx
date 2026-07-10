import { AppChrome } from "@/components/layout/app-chrome";

export const revalidate = 3600;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppChrome>{children}</AppChrome>;
}
