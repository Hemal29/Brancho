"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import Newsletter from "@/components/corporate/Newsletter";
import { FOUNDER } from "@/lib/corporate";

export default function FounderPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Founder", href: "/founder" }]}
        eyebrow="The Founder"
        title={FOUNDER.name}
        description={FOUNDER.role}
      >
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{FOUNDER.intro}</p>
      </PageHero>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/team/rohan.svg"
                alt={`${FOUNDER.name}, ${FOUNDER.role}`}
                width={480}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-navy/90 px-6 py-4 text-center text-white">
              <p className="font-heading text-sm font-semibold">{FOUNDER.name}</p>
              <p className="text-xs text-white/60">{FOUNDER.role}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading
              eyebrow="The Story"
              title="Why Brancho exists"
              align="left"
              className="mb-8"
            />
            <div className="space-y-5 text-lg leading-relaxed text-ink/80">
              {FOUNDER.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative">
          <blockquote className="mx-auto max-w-3xl text-center">
            <Quote size={40} className="mx-auto text-gold" />
            <p className="mt-8 text-balance font-heading text-2xl font-semibold leading-snug sm:text-3xl">
              &ldquo;{FOUNDER.qa.answer}&rdquo;
            </p>
            <footer className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="text-sm font-medium uppercase tracking-widest text-gold">
                {FOUNDER.name}
              </span>
              <span className="h-px w-10 bg-gold/50" />
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Principles"
            title="How Rohan leads"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDER.principles.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="rounded-3xl border border-line bg-surface p-8"
              >
                <span className="font-heading text-3xl font-bold text-gold">0{i + 1}</span>
                <p className="mt-4 font-heading text-base font-semibold text-navy">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface-soft p-10 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-heading text-2xl font-semibold text-navy">Hear it from the team</h2>
              <p className="mt-2 text-sm text-muted">Read the stories of the people building Brancho.</p>
            </div>
            <Link
              href="/careers"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-soft"
            >
              Visit Careers
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <div className="mt-16">
            <Newsletter />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
