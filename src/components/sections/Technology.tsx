"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Radar, ShieldCheck, FileText, LineChart, Lock, BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TECH_FEATURES } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const TECH_ICONS: LucideIcon[] = [BrainCircuit, Radar, ShieldCheck, FileText, LineChart, Lock, BadgeCheck];

export default function Technology() {
  return (
    <section id="technology" className="relative overflow-hidden bg-navy-deep py-28 text-white lg:py-36">
      <div className="dot-grid-light absolute inset-0 opacity-25" />
      <div className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-gold/10 blur-[120px]" />

      <div className="container-wide relative">
        <SectionHeading
          dark
          eyebrow="Technology & Trust"
          title="Intelligence that protects every home visit"
          description="A technology engine built on trust — from AI-powered matching to bank-grade security, every layer is engineered to keep families safe and services flawless."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TECH_FEATURES.map((feature, i) => {
            const Icon = TECH_ICONS[i];
            const wide = i === 0 || i === 5;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.07] ${
                  wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/20" />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-7 backdrop-blur sm:flex-row"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <Lock size={22} />
            </span>
            <div>
              <p className="font-heading font-semibold">Your data is protected</p>
              <p className="text-sm text-white/55">
                256-bit encryption, PCI-DSS compliant payments, and strict privacy controls.
              </p>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <ShieldCheck size={15} /> ISO 27001 Ready
          </span>
        </motion.div>
      </div>
    </section>
  );
}
