import type { MetadataRoute } from "next";
import { NEWSROOM, FUTURE } from "@/lib/corporate";
import { SERVICES_DETAILED } from "@/lib/data";

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" };

const STATIC_PAGES: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/company", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/app", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cities", priority: 0.7, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.6, changeFrequency: "monthly" },
  { path: "/newsroom", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/professionals", priority: 0.8, changeFrequency: "weekly" },
  { path: "/technology", priority: 0.7, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.7, changeFrequency: "monthly" },
  { path: "/search", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
  { path: "/brand-guidelines", priority: 0.5, changeFrequency: "monthly" },
  { path: "/downloads", priority: 0.5, changeFrequency: "monthly" },
  { path: "/media/gallery", priority: 0.5, changeFrequency: "weekly" },
  { path: "/media/videos", priority: 0.5, changeFrequency: "weekly" },
  { path: "/media/press", priority: 0.5, changeFrequency: "weekly" },
  { path: "/future", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  { path: "/legal/refund-policy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/legal/cancellation-policy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/legal/cookie-policy", priority: 0.3, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of STATIC_PAGES) {
    entries.push({
      url: `https://brancho.in${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    });
  }

  for (const s of SERVICES_DETAILED) {
    entries.push({
      url: `https://brancho.in/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const n of NEWSROOM) {
    entries.push({
      url: `https://brancho.in/newsroom/${n.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const f of FUTURE) {
    entries.push({
      url: `https://brancho.in/future/${f.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
