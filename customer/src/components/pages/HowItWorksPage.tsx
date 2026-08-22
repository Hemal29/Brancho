"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Clock, IndianRupee } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";
import { STEPS } from "@/lib/data";

const ASSURANCES = [
  "OTP-verified entry for every home visit",
  "Live tracking from booking to completion",
  "Digital invoice within 5 minutes of finishing",
  "Rate and review every single professional",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        dark
        breadcrumb={[{ label: "Home", href: "/" }, { label: "How It Works", href: "/how-it-works" }]}
        eyebrow="How It Works"
        title="From booking to done, in six simple steps."
        description="A process designed to remove every ounce of uncertainty — transparent, trackable and completely stress-free from start to finish."
      />

      {/* Timeline */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-20" />
        <div className="container-wide relative max-w-4xl">
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-gold to-transparent sm:block"
            />
            {STEPS.map((step, i) => (
              <div key={step.step}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="relative flex flex-col gap-6 pb-14 sm:flex-row sm:gap-10"
                >
                  <div className="relative z-10 flex shrink-0 items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 font-heading text-lg font-bold text-gold backdrop-blur">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-500 hover:border-white/20 hover:bg-white/10">
                    <span className="mb-3 inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                      Step {step.step}
                    </span>
                    <h2 className="font-heading text-2xl font-semibold">{step.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assurances */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <h2 className="mx-auto mb-14 max-w-2xl text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Every visit, guaranteed.
          </h2>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {ASSURANCES.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-2xl border border-line bg-surface-soft p-6"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check size={16} className="text-accent" />
                </span>
                <p className="text-sm font-medium text-ink/85">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strip */}
      <section className="border-t border-line bg-surface-soft py-14">
        <div className="container-wide flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="flex items-center gap-2.5 text-sm text-muted">
              <ShieldCheck size={17} className="text-accent" /> Police-verified professionals
            </span>
            <span className="flex items-center gap-2.5 text-sm text-muted">
              <Clock size={17} className="text-accent" /> On-time arrival, guaranteed
            </span>
            <span className="flex items-center gap-2.5 text-sm text-muted">
              <IndianRupee size={17} className="text-accent" /> Transparent prices, pay after service
            </span>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
