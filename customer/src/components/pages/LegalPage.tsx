"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, Building2, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import { REGISTRATIONS, LEGAL_FAQ_LINKS, CORPORATE, CONTACT } from "@/lib/corporate";

const COMPANY_DETAILS = [
  { label: "Legal Name", value: CORPORATE.legalName },
  { label: "Founded", value: String(CORPORATE.founded) },
  { label: "Registered Office", value: CORPORATE.headquarters },
  { label: "Customer Support", value: CONTACT.support.email },
];

export default function LegalPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Legal", href: "/legal" }]}
        eyebrow="Legal"
        title="Compliance, registrations & policies."
        description="Brancho operates with full transparency. Here you'll find our corporate registrations, statutory details and all official policies."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Corporate"
            title="Registrations & certifications"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REGISTRATIONS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
                className="rounded-3xl border border-line bg-surface-soft p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold">
                  <BadgeCheck size={20} />
                </span>
                <h2 className="mt-5 font-heading text-lg font-semibold text-ink">{r.label}</h2>
                <p className="mt-1 font-mono text-sm font-semibold text-accent-deep">{r.value}</p>
                <p className="mt-2 text-sm text-muted">{r.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 text-white lg:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="Company Details" title="At a glance" dark className="mb-14" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_DETAILS.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <Building2 size={20} className="text-gold" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/50">{d.label}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed">{d.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="Policies" title="Official documents" className="mb-14" />
          <div className="mx-auto grid max-w-3xl gap-4">
            {LEGAL_FAQ_LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-7 py-5 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-navy/5"
                >
                  <span className="font-heading text-base font-semibold text-ink group-hover:text-accent-deep">
                    {l.label}
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
