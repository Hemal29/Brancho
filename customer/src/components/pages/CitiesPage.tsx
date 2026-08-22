"use client";

import { motion } from "framer-motion";
import { MapPin, Plus, ArrowRight, Navigation } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";
import { CITIES, UPCOMING_CITIES } from "@/lib/data";

export default function CitiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }]}
        eyebrow="Cities"
        title="Serving Veraval, Rajkot and Junagadh. Building toward all of India."
        description="Brancho began in Junagadh and now operates across the Saurashtra region with a clear national roadmap. Every city opens to the same promise — verified professionals and guaranteed service."
      >
        <div className="flex flex-wrap gap-6">
          {[
            { v: "3", l: "Cities live today" },
            { v: "Junagadh", l: "Headquarters" },
            { v: "2021", l: "Latest city — Veraval" },
            { v: "4.9★", l: "City-wide rating" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-heading text-3xl font-bold text-ink">{s.v}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Map + live cities */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide grid items-start gap-14 lg:grid-cols-2">
          {/* Map panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-xl lg:sticky lg:top-28"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface-soft">
              <div className="dot-grid absolute inset-0 opacity-60" />

              <div className="absolute inset-0 opacity-40" aria-hidden="true">
                <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
                  <line x1="100" y1="0" x2="100" y2="500" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="200" y1="0" x2="200" y2="500" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="300" y1="0" x2="300" y2="500" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="400" y1="0" x2="400" y2="500" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="0" y1="300" x2="500" y2="300" stroke="#181A1F" strokeOpacity="0.06" />
                  <line x1="0" y1="400" x2="500" y2="400" stroke="#181A1F" strokeOpacity="0.06" />
                </svg>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                {[220, 170, 120, 70].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
                    style={{ width: r * 2, height: r * 2 }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {CITIES.map((city, i) => (
                <motion.div
                  key={city.name}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="group relative flex flex-col items-center">
                    <span className="animate-ping-slow absolute -inset-3 rounded-full bg-accent/30" />
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-accent ring-4 ring-accent/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="mt-2 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-navy shadow-lg">
                      {city.name}
                    </span>
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/60">
                23.02° N · 72.57° E
              </div>
            </div>
          </motion.div>

          {/* Live city list */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-ink">Live now</h2>
            <p className="mt-2 text-sm text-muted">
              Six anchor cities running at full capacity — with the same quality standards everywhere.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {CITIES.map((city, i) => (
                <motion.li
                  key={city.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface-soft px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-surface hover:shadow-xl hover:shadow-navy/10"
                >
                  <span className="flex items-center gap-3 font-heading font-semibold text-ink">
                    <MapPin size={17} className="text-accent" />
                    {city.name}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    Live
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Upcoming cities */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <Plus size={13} />
                Coming soon
              </span>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                The map is growing.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/55">
              Tell us which city should be next — we open where families ask first.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {UPCOMING_CITIES.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between rounded-2xl border border-dashed border-white/15 bg-white/[0.04] px-6 py-5 backdrop-blur transition-colors hover:border-gold/40 hover:bg-white/[0.07]"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Navigation size={16} className="text-gold" />
                  {city.name}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-white/45">
                  {city.eta}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-navy transition-all hover:bg-secondary"
            >
              Request your city
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
