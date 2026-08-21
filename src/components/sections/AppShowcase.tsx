"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { CUSTOMER_APP_FEATURES, PROVIDER_APP_FEATURES } from "@/lib/data";

export default function AppShowcase() {
  return (
    <section id="app" className="relative bg-surface py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Brancho App"
          title="Your home, in the palm of your hand"
          description="Two beautifully designed apps — one for homeowners, one for service professionals — that make every service effortless, transparent and trackable."
        />

        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhoneMockup title="Customer App" features={CUSTOMER_APP_FEATURES} icons={[]} theme="customer" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="mt-12 lg:mt-20"
          >
            <PhoneMockup title="Service Provider App" features={PROVIDER_APP_FEATURES} icons={[]} theme="provider" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 text-sm text-muted">
            <Smartphone size={16} className="text-accent" />
            Available on iOS and Android
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/app" variant="primary">
              Download Customer App
            </MagneticButton>
            <MagneticButton href="/careers" variant="secondary">
              Download Partner App
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
