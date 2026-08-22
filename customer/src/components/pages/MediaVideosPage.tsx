"use client";

import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import { MEDIA_VIDEOS } from "@/lib/corporate";

export default function MediaVideosPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Media", href: "/media/gallery" }, { label: "Videos", href: "/media/videos" }]}
        eyebrow="Media"
        title="Brancho on film."
        description="Brand films, explainers and the stories of the people behind every service."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Videos"
            title="Watch the Brancho story"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MEDIA_VIDEOS.map((v, i) => (
              <motion.button
                key={v.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="group relative aspect-video overflow-hidden rounded-3xl bg-navy text-left"
              >
                <div className="dot-grid-light absolute inset-0 opacity-25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-gold">
                    <Play size={22} className="ml-0.5" />
                  </span>
                </div>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Clock size={12} />
                  {v.duration}
                </span>
                <span className="absolute left-0 top-0 rounded-br-2xl rounded-tl-3xl bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink">
                  {v.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/60 to-transparent p-6 pt-16">
                  <p className="font-heading text-sm font-semibold leading-snug text-white">{v.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
