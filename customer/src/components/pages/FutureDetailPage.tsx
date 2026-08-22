"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import Newsletter from "@/components/corporate/Newsletter";
import { FUTURE } from "@/lib/corporate";
import type { FutureDetail } from "@/lib/corporate";

const statusStyles: Record<FutureDetail["status"], string> = {
  Live: "bg-green-400/15 text-green-400",
  "In Progress": "bg-gold/15 text-gold",
  Planned: "bg-blue-400/15 text-blue-400",
};

export default function FutureDetailPage({ detail }: { detail: FutureDetail }) {
  const idx = FUTURE.findIndex((f) => f.slug === detail.slug);
  const next = FUTURE[(idx + 1) % FUTURE.length];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "The Future", href: "/future" },
          { label: detail.name, href: `/future/${detail.slug}` },
        ]}
        eyebrow={detail.tagline}
        title={detail.name}
        description={detail.description}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${statusStyles[detail.status]}`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            {detail.status}
          </span>
          <Link
            href="/future"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-deep"
          >
            All pillars
            <ArrowRight size={15} />
          </Link>
        </div>
      </PageHero>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">Overview</span>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink/80">
              {detail.overview.map((p, i) => (
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
            <div className="relative grid grid-cols-3 gap-6">
              {detail.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-heading text-2xl font-bold text-gold sm:text-3xl">{s.value}</p>
                  <p className="mt-2 text-xs leading-snug text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="relative mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
              Measurable goals, tracked honestly — because what gets counted gets improved.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="What We're Doing" title="Our focus areas" className="mb-14" />
          <div className="grid gap-6 sm:grid-cols-2">
            {detail.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
                className="flex items-start gap-5 rounded-3xl border border-line bg-surface p-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                  <Check size={20} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="Milestones"
            title="The road ahead"
            dark
            className="mb-14"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {detail.milestones.map((m, i) => (
              <motion.div
                key={m.phase}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <span className="font-heading text-2xl font-bold text-gold">{m.phase}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {next && (
        <section className="bg-surface py-20">
          <div className="container-wide">
            <Link href={`/future/${next.slug}`} className="group block">
              <div className="flex flex-col justify-between gap-6 rounded-3xl border border-line bg-surface-soft p-10 sm:flex-row sm:items-center">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-deep">
                    <Sparkles size={14} />
                    Next pillar
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-ink transition-colors group-hover:text-accent-deep">
                    {next.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted">{next.description}</p>
                </div>
                <ArrowUpRight size={28} className="shrink-0 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-surface-soft py-24">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>

      <CTABand />
    </>
  );
}
