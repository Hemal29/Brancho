"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";
import { iconMap } from "@/lib/utils";

export default function Industries() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="industries" className="relative bg-surface-soft py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Trusted across every space India lives and works in"
          description="From family homes to five-star hotels, our standards are identical — verified professionals, transparent pricing and guaranteed quality."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((industry) => {
            const Icon = iconMap[industry.icon] ?? iconMap.Home;
            return (
              <motion.article
                key={industry.title}
                variants={item}
                className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-navy/10"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{industry.title}</h3>
                  <p className="mt-1 text-sm text-muted">{industry.description}</p>
                </div>
              </motion.article>
            );
          })}

          {/* CTA tile */}
          <motion.article
            variants={item}
            className="group relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-accent-deep p-7 text-white"
          >
            <div className="dot-grid-light absolute inset-0 opacity-30" />
            <div className="relative text-center">
              <p className="font-heading text-lg font-semibold">Your industry here</p>
              <p className="mt-2 text-sm text-white/75">Bespoke service programs for enterprises.</p>
              <a
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-navy transition-transform group-hover:scale-105"
              >
                Talk to us
              </a>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
