"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ArrowRight, Star } from "lucide-react";

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
      <div className="dot-grid-light absolute inset-0 opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-wide relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <Star size={13} className="fill-gold text-gold" />
            Trusted by 100,000+ Indian families
          </span>

          <h2 className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Your home deserves the{" "}
            <span className="text-gradient">Brancho standard.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Book a verified professional in under two minutes — or join the
            network that&apos;s redefining Indian home services.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-navy shadow-xl shadow-navy/30 transition-all hover:bg-secondary"
            >
              <Download size={17} />
              Download App
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/60 hover:bg-white/10"
            >
              Book a Service
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Free on iOS & Android · No hidden charges · 90-day service warranty
          </p>
        </motion.div>
      </div>
    </section>
  );
}
