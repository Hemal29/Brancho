"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  GraduationCap,
  Percent,
  Laptop,
  HandHeart,
  Rocket,
  Building2,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";
import { BENEFITS, HIRING_STEPS } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const BENEFIT_ICONS: LucideIcon[] = [HandHeart, HeartPulse, Laptop, GraduationCap, Percent, Rocket];

export default function CareersPage() {
  return (
    <>
      <PageHero
        dark
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }]}
        eyebrow="Careers"
        title="Build the future of Indian home services."
        description="Join a team of builders, operators and changemakers who serve over a hundred thousand families — and are only getting started."
      >
        <div className="flex flex-wrap gap-4">
          <a
            href="https://joinbrancho.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/60 hover:bg-white/10"
          >
            Become a Service Partner
          </a>
        </div>
      </PageHero>

      {/* Culture */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative grid gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Our Culture
            </span>
            <h2 className="mt-6 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              Small team. Big mission. Zero ego.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60">
              We work in autonomous squads, ship weekly and argue about details because
              details matter. We celebrate the professional who finishes a perfect
              deep clean as loudly as the engineer who ships a faster allocation model.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Autonomous teams with real ownership",
                "Radical transparency — metrics are public inside",
                "Feedback is kind, direct and always about the work",
                "We take pride in doing the unglamorous parts perfectly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:border-accent/40 hover:bg-white/[0.07]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold">{benefit.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="mb-14 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold">
              <Building2 size={22} />
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              How hiring works
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {HIRING_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="relative rounded-2xl border border-line bg-surface-soft p-6"
              >
                <span className="font-heading text-3xl font-bold text-gold">{step.step}</span>
                <h3 className="mt-3 font-heading text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
