"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Rocket } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import Newsletter from "@/components/corporate/Newsletter";
import { FUTURE } from "@/lib/corporate";

export default function FuturePage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "The Future", href: "/future" }]}
        eyebrow="The Future"
        title="Where Brancho is going next."
        description="From our foundation and innovation lab to global expansion — this is the roadmap for the next decade of home care."
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy">
          <Rocket size={15} className="text-accent-deep" />
          Live now · innovation in progress · ambitious by design
        </div>
      </PageHero>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="The Roadmap"
            title="Seven pillars of tomorrow"
            description="Each pillar has a dedicated page with our current work, measurable goals and milestones."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE.map((f, i) => (
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/future/${f.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-navy/15"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-bold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight size={20} className="text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                  <h2 className="mt-6 font-heading text-xl font-semibold text-navy">{f.name}</h2>
                  <p className="mt-1.5 text-sm font-medium text-accent-deep">{f.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{f.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>

      <CTABand />
    </>
  );
}
