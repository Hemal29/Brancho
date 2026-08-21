"use client";

import { motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { CITIES } from "@/lib/data";

export default function Cities() {
  return (
    <section id="cities" className="relative overflow-hidden bg-navy py-28 text-white lg:py-36">
      <div className="dot-grid-light absolute inset-0 opacity-25" />
      <div className="absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-wide relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="Where We Are"
              title="Serving homes across India"
              description="Headquartered in Ahmedabad, Brancho now serves 25+ cities — with every new city opened to the same standards of verification, quality and trust."
              className="mb-10"
            />

            <ul className="space-y-3">
              {CITIES.map((city, i) => (
                <motion.li
                  key={city.name}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <MapPin size={17} className="text-accent" />
                    {city.name}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/45">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    Live
                  </span>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between rounded-xl border border-dashed border-gold/30 bg-gold/[0.04] px-5 py-4"
              >
                <span className="flex items-center gap-3 font-semibold text-gold">
                  <Plus size={17} />
                  More cities coming soon
                </span>
                <span className="text-xs uppercase tracking-widest text-gold/60">2026 · 2027</span>
              </motion.li>
            </ul>
          </div>

          {/* Map panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
              <div className="dot-grid-light absolute inset-0 opacity-60" />

              {/* Grid */}
              <div className="absolute inset-0 opacity-40" aria-hidden="true">
                <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
                  <line x1="100" y1="0" x2="100" y2="500" stroke="white" strokeOpacity="0.06" />
                  <line x1="200" y1="0" x2="200" y2="500" stroke="white" strokeOpacity="0.06" />
                  <line x1="300" y1="0" x2="300" y2="500" stroke="white" strokeOpacity="0.06" />
                  <line x1="400" y1="0" x2="400" y2="500" stroke="white" strokeOpacity="0.06" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="white" strokeOpacity="0.06" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="white" strokeOpacity="0.06" />
                  <line x1="0" y1="300" x2="500" y2="300" stroke="white" strokeOpacity="0.06" />
                  <line x1="0" y1="400" x2="500" y2="400" stroke="white" strokeOpacity="0.06" />
                </svg>
              </div>

              {/* Concentric rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                {[220, 170, 120, 70].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
                    style={{ width: r * 2, height: r * 2 }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {/* City markers */}
              {CITIES.map((city, i) => (
                <motion.div
                  key={city.name}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="group relative">
                    <span className="animate-ping-slow absolute -inset-3 rounded-full bg-accent/30" />
                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-accent/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-navy-deep/90 px-3 py-1 text-[11px] font-semibold opacity-0 shadow-xl backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      {city.name}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Coordinates label */}
              <div className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                23.02° N · 72.57° E
              </div>
              <div className="absolute right-5 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                Gujarat HQ
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
