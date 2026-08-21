"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";
import { BUSINESSES, NEWSROOM, FUTURE, SEARCHABLE_PAGES } from "@/lib/corporate";

const GROUPS: Array<{ title: string; links: { label: string; href: string }[] }> = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Mobile App", href: "/app" },
      { label: "Cities", href: "/cities" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Brancho", href: "/company" },
      { label: "Founder", href: "/founder" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Brand Guidelines", href: "/brand-guidelines" },
      { label: "Download Center", href: "/downloads" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Businesses",
    links: BUSINESSES.map((b) => ({ label: b.name, href: `/businesses/${b.slug}` })),
  },
  {
    title: "Media",
    links: [
      { label: "Media Gallery", href: "/media/gallery" },
      { label: "Media Videos", href: "/media/videos" },
      { label: "Press Resources", href: "/media/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/legal/refund-policy" },
      { label: "Cancellation Policy", href: "/legal/cancellation-policy" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Legal & Registrations", href: "/legal" },
    ],
  },
  {
    title: "The Future",
    links: FUTURE.map((f) => ({ label: f.name, href: `/future/${f.slug}` })),
  },
];

const newsroomLinks = NEWSROOM.map((n) => ({ label: n.title, href: `/newsroom/${n.slug}` }));
const allLinks = SEARCHABLE_PAGES.map((p) => p.path);

export default function SitemapPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Sitemap", href: "/sitemap" }]}
        eyebrow="Sitemap"
        title="Everything on one page."
        description="A complete index of every page on brancho.in — company, businesses, media, legal and more."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (gi % 3) * 0.08 }}
                className="rounded-3xl border border-line bg-surface-soft p-8"
              >
                <h2 className="mb-6 font-heading text-sm font-bold uppercase tracking-[0.2em] text-accent-deep">
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-3 text-sm font-medium text-ink/80 transition-colors hover:text-accent-deep"
                      >
                        <span>{link.label}</span>
                        <span className="h-1 w-1 rounded-full bg-gold opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 rounded-3xl border border-line bg-surface-soft p-8"
          >
            <h2 className="mb-6 font-heading text-sm font-bold uppercase tracking-[0.2em] text-accent-deep">
              Newsroom Articles ({newsroomLinks.length})
            </h2>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {newsroomLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-3 text-sm font-medium text-ink/80 transition-colors hover:text-accent-deep"
                  >
                    <span className="line-clamp-1">{link.label}</span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-gold opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <p className="mt-10 text-center text-xs text-muted">
            {allLinks.length} total routes · updated {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
