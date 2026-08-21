"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Droplets, Home, Zap, HeartHandshake, GraduationCap, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import Newsletter from "@/components/corporate/Newsletter";
import { BUSINESSES } from "@/lib/corporate";
import type { LucideIcon } from "lucide-react";

const BUSINESS_ICONS: Record<string, LucideIcon> = {
  water: Droplets,
  "home-care": Home,
  "urgent-care": Zap,
  myfamnest: HeartHandshake,
  students: GraduationCap,
};

const PROMISE = [
  { title: "One brand standard", description: "Every business runs on the same verification, transparency and quality guarantee that built Brancho." },
  { title: "A shared tech platform", description: "Booking, tracking, payments and quality monitoring are unified across all five businesses." },
  { title: "One care team", description: "Your support, billing and warranty are handled by a single accountable team." },
];

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Businesses", href: "/businesses" }]}
        eyebrow="Brancho Businesses"
        title="One family of companies, caring for every part of home."
        description="From the water you drink to the security of your family, Brancho is a portfolio of specialised businesses — each a category leader, each built on a shared promise of trust."
      >
        <div className="flex flex-wrap gap-3">
          {BUSINESSES.map((b) => (
            <Link
              key={b.slug}
              href={`/businesses/${b.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:border-accent hover:text-accent-deep"
            >
              {b.name}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="The Portfolio"
            title="Five businesses. One promise."
            description="Each business operates with its own specialists, standards and roadmap — unified by Brancho's platform of trust."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BUSINESSES.map((b, i) => {
              const Icon = BUSINESS_ICONS[b.slug] ?? Home;
              return (
                <motion.div
                  key={b.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                >
                  <Link
                    href={`/businesses/${b.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-navy/15"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon size={24} />
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>
                    <h2 className="mt-6 font-heading text-xl font-semibold text-navy">{b.name}</h2>
                    <p className="mt-1.5 text-sm font-medium text-accent-deep">{b.tagline}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{b.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {b.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="rounded-full bg-surface-soft px-3 py-1 text-xs font-medium text-muted">
                          {h}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <ShieldCheck size={13} />
              The Brancho Standard
            </span>
            <h2 className="mt-6 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              What binds five businesses into one Brancho
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PROMISE.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <span className="font-heading text-3xl font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>

      <CTABand />
    </>
  );
}
