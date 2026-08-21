"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { BadgeCheck, Building2, Cpu, Rocket } from "lucide-react";

const AboutImage = dynamic(() => import("./AboutImage"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[420px] w-full animate-pulse rounded-3xl bg-surface-soft" />
  ),
});

const TIMELINE = [
  {
    icon: BadgeCheck,
    year: "2019",
    title: "Founded",
    description:
      "Brancho was born in Ahmedabad with a simple belief — every Indian home deserves trusted, professional service.",
  },
  {
    icon: Building2,
    year: "2021",
    title: "Expansion",
    description:
      "Rapid growth across Gujarat. 5,000+ verified professionals and 25+ cities joined the Brancho network.",
  },
  {
    icon: Cpu,
    year: "2023",
    title: "Technology",
    description:
      "AI-powered allocation, live tracking and digital-first operations made every service seamless and transparent.",
  },
  {
    icon: Rocket,
    year: "2026",
    title: "Future Vision",
    description:
      "Scaling a national home services platform — smarter homes, greener operations and millions more families served.",
  },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="relative bg-surface py-28 lg:py-36">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-wide relative">
        <SectionHeading
          eyebrow="About Brancho"
          title="A technology platform transforming Indian homes"
          description="Brancho is an Indian technology company transforming home services through trust, transparency and skilled professionals. Every visit is verified, every price is upfront, and every job is backed by a promise of quality."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image with reveal */}
          <div className="relative order-2 lg:order-1">
            <Reveal className="relative">
              <AboutImage />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="glass-dark absolute -bottom-6 -right-4 rounded-2xl px-6 py-5 sm:right-8"
              >
                <p className="font-heading text-3xl font-bold text-white">₹0</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/60">
                  Hidden charges, ever
                </p>
              </motion.div>
            </Reveal>
          </div>

          {/* Narrative + timeline */}
          <div className="order-1 lg:order-2" ref={timelineRef}>
            <div className="relative space-y-10">
              <motion.div
                aria-hidden="true"
                className="absolute left-[13px] top-3 h-[calc(100%-2rem)] w-px bg-navy/10"
              />
              <motion.div
                aria-hidden="true"
                style={{ height: lineHeight }}
                className="absolute left-[13px] top-3 w-px bg-gradient-to-b from-accent to-gold"
              />
              {TIMELINE.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className="group relative flex gap-8">
                    <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-accent/20 transition-transform duration-300 group-hover:scale-150" />
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent bg-surface">
                        <item.icon size={13} className="text-accent" />
                      </span>
                    </div>
                    <div className="pb-2">
                      <div className="flex items-baseline gap-4">
                        <span className="font-heading text-sm font-bold tracking-widest text-gold">
                          {item.year}
                        </span>
                        <h3 className="font-heading text-xl font-semibold text-ink">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
