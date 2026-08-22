"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, Check, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import { SERVICES_DETAILED, FAQS } from "@/lib/data";
import { useState } from "react";

function ServiceFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="container-wide max-w-3xl">
        <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Service FAQs
        </h2>
        <div className="space-y-4">
          {FAQS.slice(0, 5).map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-accent/40 bg-surface shadow-lg shadow-navy/5" : "border-line bg-surface-soft"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                >
                  <span className="font-heading text-base font-semibold text-ink">{faq.question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? "border-accent bg-accent text-white" : "border-line text-ink"
                    }`}
                  >
                    <Check size={14} className={isOpen ? "" : "rotate-45"} />
                  </span>
                </button>
                {isOpen && (
                  <p className="px-7 pb-7 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        dark
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        eyebrow="Our Services"
        title="Every home service. One trusted standard."
        description="13 handcrafted service categories, delivered by background-verified professionals with upfront pricing and a 90-day workmanship warranty on every job."
      >
        <div className="flex flex-wrap gap-6">
          {[
            { v: "13", l: "Service categories" },
            { v: "5,000+", l: "Verified professionals" },
            { v: "4.9★", l: "Average rating" },
            { v: "90-day", l: "Warranty included" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-heading text-3xl font-bold text-white">{s.v}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/50">{s.l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Service cards */}
      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DETAILED.map((service, i) => (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-navy/15"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} service by Brancho`}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 flex gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      <Tag size={12} className="text-gold" />
                      {service.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      <Clock size={12} className="text-gold" />
                      {service.duration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-heading text-xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.longDescription}</p>

                  <ul className="mt-5 space-y-2.5">
                    {service.includes.slice(0, 4).map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex items-center justify-between border-t border-line pt-6">
                    <div>
                      <p className="text-xs text-muted">Starting at</p>
                      <p className="font-heading text-lg font-bold text-ink">{service.price}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent"
                    >
                      Book Now
                      <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom request band */}
      <section className="bg-surface py-20 lg:py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-surface-soft p-10 text-center sm:flex-row sm:text-left"
          >
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink">
                Need something custom?
              </h2>
              <p className="mt-2 text-sm text-muted">
                From villa maintenance to corporate cleaning programs, we&apos;ll build a service plan around you.
              </p>
            </div>
            <MagneticButton href="/contact" variant="primary" className="shrink-0">
              Request a Quote
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <ServiceFAQ />
    </>
  );
}
