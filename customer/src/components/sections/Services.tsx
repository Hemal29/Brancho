"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES_DETAILED } from "@/lib/data";
import { iconMap } from "@/lib/utils";

export default function Services() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="services" className="relative bg-surface-soft py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Our Services"
          title="Every home service, delivered with precision"
          description="From a quick AC deep clean to a full-home makeover, our verified professionals cover every corner of your home with upfront pricing and guaranteed quality."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {SERVICES_DETAILED.map((service) => {
            const Icon = iconMap[service.icon] ?? iconMap.Home;
            return (
              <motion.article
                key={service.title}
                variants={item}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-navy/10"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-gold transition-transform duration-500 group-hover:scale-x-100" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-accent/10" />

                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:bg-accent group-hover:text-white">
                  <Icon size={24} strokeWidth={1.75} />
                </div>

                <h3 className="relative font-heading text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep transition-colors group-hover:text-accent"
                  aria-label={`Book ${service.title}`}
                >
                  Read More
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </motion.article>
            );
          })}

          {/* CTA card */}
          <motion.article
            variants={item}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-navy p-7 text-white shadow-xl shadow-navy/20"
          >
            <div className="dot-grid-light absolute inset-0 opacity-40" />
            <div className="relative">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gold">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Available in your city
              </span>
              <h3 className="font-heading text-2xl font-semibold leading-tight">
                Don&apos;t see your service?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                We&apos;re adding services across India every week. Tell us what
                you need and we&apos;ll arrange a trusted professional.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-all group-hover:gap-3"
            >
              Request a Service
              <ArrowUpRight size={16} />
            </Link>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
