import type { Metadata } from "next";
import SitemapPage from "@/components/pages/SitemapPage";

export const metadata: Metadata = {
  title: "Sitemap — Full Page Index",
  description: "A complete index of every page on brancho.in — company, businesses, media, legal and more.",
  alternates: { canonical: "/sitemap" },
};

export default function Page() {
  return <SitemapPage />;
}
