"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { STEPS } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-navy py-28 text-white lg:py-36">
      <div className="dot-grid-light absolute inset-0 opacity-30" />
      <div className="hero-mesh absolute inset-0 opacity-60" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="container-wide relative">
        <SectionHeading
          dark
          eyebrow="How It Works"
          title="Five steps to a perfect home service"
          description="From booking to payment, everything is designed to be simple, transparent and completely stress-free."
        />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            aria-hidden="true"
            className="absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-accent/40 via-gold/40 to-transparent sm:block"
          />

          {STEPS.map((step, i) => (
            <div key={step.step}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="relative flex flex-col gap-6 pb-12 sm:flex-row sm:gap-10"
              >
                <div className="relative z-10 flex shrink-0 items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 font-heading text-lg font-bold text-gold backdrop-blur">
                    {step.step}
                  </div>
                </div>

                <div className="group flex-1 rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-500 hover:border-white/20 hover:bg-white/10">
                  <span className="mb-3 inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                    Step {step.step}
                  </span>
                  <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 -mt-4 mb-2 flex items-center gap-3 pl-7 sm:pl-14"
                  aria-hidden="true"
                >
                  <span className="hidden h-px w-10 bg-white/20 sm:block" />
                  <ChevronDown size={18} className="text-gold sm:rotate-0 sm:hidden" />
                  <ArrowDown size={18} className="hidden text-gold sm:block" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
