"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import DownloadCard from "@/components/corporate/DownloadCard";
import CTABand from "@/components/sections/CTABand";
import { DOWNLOADS } from "@/lib/corporate";

export default function DownloadCenterPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Downloads", href: "/downloads" }]}
        eyebrow="Download Center"
        title="Brand, reports and company documents."
        description="Official Brancho resources — brand guidelines, company profile, annual report and more — all in one place."
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <FileText size={16} className="text-gold" />
          {DOWNLOADS.length} documents · updated {DOWNLOADS[0]?.updated}
        </div>
      </PageHero>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Library"
            title="Everything you need to know Brancho"
            description="Free downloads for partners, journalists, investors and anyone who wants to understand what we do."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DOWNLOADS.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
              >
                <DownloadCard item={item} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
