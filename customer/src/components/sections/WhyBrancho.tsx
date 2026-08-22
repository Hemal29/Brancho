"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_BRANCHO_BENEFITS } from "@/lib/data";

export default function WhyBrancho() {
  return (
    <section id="why-brancho" className="relative bg-surface py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Why Brancho"
          title="The Brancho difference"
          description="Same task, completely different experience. See why a million homes choose verified, transparent and accountable service."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-line bg-surface-soft p-8 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-heading text-2xl font-semibold text-muted">
                Traditional Local Workers
              </h3>
              <span className="rounded-full border border-muted/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
                The old way
              </span>
            </div>

            <ul className="mt-10 space-y-4">
              {WHY_BRANCHO_BENEFITS.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-muted/25 bg-white/60">
                    <X size={14} className="text-muted" />
                  </span>
                  <div>
                    <p className="font-medium text-muted/80 line-through decoration-muted/30 decoration-2">
                      {benefit.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brancho */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-2xl shadow-navy/30 sm:p-10"
          >
            <div className="dot-grid-light absolute inset-0 opacity-40" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative flex items-center justify-between gap-4">
              <h3 className="font-heading text-2xl font-semibold">
                Brancho
              </h3>
              <span className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
                The trusted way
              </span>
            </div>

            <ul className="relative mt-10 space-y-4">
              {WHY_BRANCHO_BENEFITS.map((benefit, i) => (
                <motion.li
                  key={benefit.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-4 rounded-2xl border border-transparent p-2 transition-all hover:border-white/10 hover:bg-white/5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-semibold">{benefit.title}</p>
                    <p className="mt-0.5 text-sm text-white/55">{benefit.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-line bg-surface-soft px-8 py-6 text-center sm:flex-row sm:text-left"
        >
          <p className="text-sm text-muted">
            Brancho is accountable for every visit. Every professional carries a
            rating, and every job is protected by our service guarantee.
          </p>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-accent-deep transition-colors hover:text-accent"
          >
            Book a service <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
