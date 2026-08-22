"use client";

import { motion } from "framer-motion";
import { Leaf, Droplets, Recycle, Handshake, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SUSTAINABILITY } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [Leaf, Droplets, Recycle, Users, Handshake];

export default function Sustainability() {
  return (
    <section id="sustainability" className="relative overflow-hidden bg-surface py-28 lg:py-36">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Sustainability"
          title="A greener way to serve homes"
          description="We believe the most trusted company should also be the most responsible. Our ESG commitments shape every product we use and every partnership we make."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUSTAINABILITY.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface-soft p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-accent/10"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-accent/10" />
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <h3 className="relative font-heading text-lg font-semibold text-ink">{item.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.div>
            );
          })}

          {/* Impact banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-accent-deep p-8 text-white"
          >
            <div className="dot-grid-light absolute inset-0 opacity-30" />
            <div className="relative">
              <h3 className="font-heading text-xl font-semibold">Our 2027 pledge</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                60% water saved, 100% eco-certified products, and 10,000 skilled
                livelihoods created across India.
              </p>
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "60%", l: "Water saved" },
                { v: "100%", l: "Eco products" },
                { v: "10K", l: "Livelihoods" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/10 p-3 text-center backdrop-blur">
                  <p className="font-heading text-xl font-bold">{s.v}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/70">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
