"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import { MEDIA_GALLERY } from "@/lib/corporate";

export default function MediaGalleryPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Media", href: "/media/gallery" }, { label: "Gallery", href: "/media/gallery" }]}
        eyebrow="Media"
        title="A look inside Brancho."
        description="Real homes, real professionals, real work. A documentary-style look at the people and places behind every service."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title="Our work, our people, our moments"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MEDIA_GALLERY.map((photo, i) => (
              <motion.figure
                key={`${photo.title}-${i}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 w-full p-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                    {photo.category}
                  </span>
                  <p className="mt-2 font-heading text-sm font-semibold text-white">{photo.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
