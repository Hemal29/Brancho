"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileDown, Newspaper, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import DownloadCard from "@/components/corporate/DownloadCard";
import CTABand from "@/components/sections/CTABand";
import { PRESS, DOWNLOADS, CONTACT } from "@/lib/corporate";

export default function MediaPressPage() {
  const mediaKit = DOWNLOADS.find((d) => d.slug === "media-kit");
  const brandBook = DOWNLOADS.find((d) => d.slug === "brand-book");
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Media", href: "/media/gallery" }, { label: "Press", href: "/media/press" }]}
        eyebrow="Media"
        title="Press resources for journalists."
        description="Latest coverage, brand assets and direct contact for media enquiries."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="In the Press"
            title="What the media is saying"
            className="mb-14"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRESS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
                className="flex flex-col rounded-3xl border border-line bg-surface-soft p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                    <Newspaper size={12} />
                    {p.type}
                  </span>
                  <span className="text-xs text-muted">{p.date}</span>
                </div>
                <h3 className="mt-5 flex-1 font-heading text-lg font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-4 border-t border-line pt-4 text-sm font-semibold text-accent-deep">{p.outlet}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="Assets" title="Download for journalists" className="mb-14" />
          <div className="grid gap-6 md:grid-cols-2">
            {mediaKit && <DownloadCard item={mediaKit} />}
            {brandBook && <DownloadCard item={brandBook} index={1} />}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-10 text-center sm:flex-row sm:text-left"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                <Mail size={20} />
              </span>
              <div>
                <h2 className="font-heading text-xl font-semibold text-ink">Media enquiries</h2>
                <p className="mt-1 text-sm text-muted">
                  For interviews, quotes and press assets, reach our media desk.
                </p>
              </div>
            </div>
            <Link
              href={`mailto:${CONTACT.media.email}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-soft"
            >
              <FileDown size={15} />
              {CONTACT.media.email}
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
