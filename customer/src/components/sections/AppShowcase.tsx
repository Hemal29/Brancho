"use client";

import { motion } from "framer-motion";
import { Smartphone, UserRound, Wrench, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { CUSTOMER_APP_FEATURES, PROVIDER_APP_FEATURES } from "@/lib/data";

const APP_PANELS = [
  {
    title: "Customer App",
    subtitle: "For homeowners",
    theme: "customer" as const,
    icon: UserRound,
    features: CUSTOMER_APP_FEATURES,
  },
  {
    title: "Service Provider App",
    subtitle: "For professionals",
    theme: "provider" as const,
    icon: Wrench,
    features: PROVIDER_APP_FEATURES,
  },
];

export default function AppShowcase() {
  return (
    <section id="app" className="relative overflow-hidden bg-surface py-24 lg:py-32">
      {/* soft brand glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Brancho App"
          title="Your home, in the palm of your hand"
          description="Two beautifully designed apps — one for homeowners, one for service professionals — that make every service effortless, transparent and trackable."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {APP_PANELS.map((panel, idx) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
              className="flex flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-xl shadow-navy/5"
            >
              {/* panel header */}
              <div className="flex items-center justify-between border-b border-line px-7 py-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold">
                    <panel.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink">{panel.title}</h3>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">{panel.subtitle}</p>
                  </div>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full bg-surface-soft px-3 py-1.5 text-[11px] font-semibold text-muted sm:flex">
                  <Smartphone size={13} className="text-accent" /> iOS · Android
                </span>
              </div>

              {/* phone */}
              <div className="relative flex justify-center overflow-hidden bg-gradient-to-b from-surface-soft/60 via-surface to-surface py-10">
                <PhoneMockup
                  title={panel.title}
                  features={panel.features}
                  theme={panel.theme}
                  compact
                />
              </div>

              {/* features */}
              <ul className="grid flex-1 grid-cols-1 gap-x-6 gap-y-4 border-t border-line px-7 py-6 sm:grid-cols-2">
                {panel.features.map((feature) => (
                  <li key={feature.title} className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{feature.title}</p>
                      <p className="text-xs leading-relaxed text-muted">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
