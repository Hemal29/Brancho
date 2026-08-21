"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Target } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/corporate/FaqList";
import CTABand from "@/components/sections/CTABand";
import type { Business } from "@/lib/corporate";

export default function BusinessDetailPage({ business }: { business: Business }) {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Businesses", href: "/businesses" },
          { label: business.name, href: `/businesses/${business.slug}` },
        ]}
        eyebrow={business.tagline}
        title={business.hero}
        description={business.description}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href={business.ctaHref}
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-soft"
          >
            {business.cta}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-all hover:border-accent"
          >
            Talk to our team
          </Link>
        </div>
      </PageHero>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                About {business.name}
              </span>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink/80">
                {business.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl bg-navy p-10 text-white"
            >
              <div className="dot-grid-light absolute inset-0 opacity-30" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <Target size={24} />
              </span>
              <h2 className="relative mt-6 font-heading text-2xl font-semibold">Our Mission</h2>
              <p className="relative mt-4 text-lg leading-relaxed text-white/80">{business.mission}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What We Do"
            title={`Services from ${business.name}`}
            align="left"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {business.services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-navy/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent-deep">
                  <Check size={18} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The standards behind every visit"
            dark
            className="mb-14"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {business.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur"
              >
                <ShieldCheck size={18} className="shrink-0 text-gold" />
                <span className="text-sm font-medium">{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Gallery"
            title={`Inside ${business.name}`}
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {business.gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="relative aspect-square overflow-hidden rounded-3xl"
              >
                <Image
                  src={src}
                  alt={`${business.name} — ${business.services[i % business.services.length].title}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="FAQs"
            title={`Questions about ${business.name}`}
            className="mb-14"
          />
          <div className="mx-auto max-w-3xl">
            <FaqList items={business.faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
