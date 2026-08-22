"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  Cpu,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import { LEADERSHIP, VALUES, COMPANY_TIMELINE } from "@/lib/data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    items: [
      "Police background verification on every professional",
      "OTP-verified entry at every home visit",
      "Live tracking with verified arrival confirmation",
      "Post-service photo evidence on every job",
    ],
  },
  {
    icon: Cpu,
    title: "Technology",
    items: [
      "AI-based professional allocation in seconds",
      "Real-time operations dashboard for every city",
      "Digital invoices and transparent pricing",
      "Quality monitoring on 100% of completed services",
    ],
  },
];

const FOUNDER_VALUES = ["Trust first", "Fair pay", "Craft over speed", "India at its best"];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }]}
        eyebrow="About Brancho"
        title="Built in Gujarat. Built for every Indian home."
        description="Brancho is an Indian technology platform transforming home services through trust, transparency and skilled professionals — from a single Junagadh garage to a growing movement."
      >
        <div className="flex flex-wrap gap-8">
          {[
            { value: 100, suffix: "K+", label: "Families served" },
            { value: 5000, suffix: "+", label: "Professionals" },
            { value: 25, suffix: "+", label: "Cities" },
            { value: 4.9, suffix: "★", label: "Avg. rating", decimal: true },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading text-3xl font-bold text-ink">
                {s.decimal ? (
                  "4.9★"
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Mission & Vision */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl bg-navy p-10 text-white"
            >
              <div className="dot-grid-light absolute inset-0 opacity-30" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <Target size={24} />
              </span>
              <h2 className="relative mt-6 font-heading text-2xl font-semibold">Our Mission</h2>
              <p className="relative mt-4 text-sm leading-relaxed text-white/70">
                To make world-class home services a daily reality for every Indian
                family — through verification, transparency and respect for the
                professionals who do the work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-line bg-surface-soft p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Eye size={24} />
              </span>
              <h2 className="mt-6 font-heading text-2xl font-semibold text-ink">Our Vision</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A future where no family ever worries about who enters their home —
                and where every skilled professional in India enjoys dignified,
                stable and fairly-paid work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              The Founder&apos;s Story
            </span>
            <h2 className="mt-6 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              &ldquo;One wrong plumber changed everything.&rdquo;
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/65">
              <p>
                In 2019, Brancho&apos;s founder Rohan Trivedi called an unverified
                local electrician for a routine fix. The professional never arrived
                on time, quoted three different prices, and left the job half-done.
                His 70-year-old grandmother waited alone all day.
              </p>
              <p>
                Rohan — then an infrastructure engineer — realised the problem was
                not a lack of skilled people, but a complete absence of trust,
                verification and accountability in Indian home services.
              </p>
              <p>
                So he started Brancho with one van, three professionals and a
                promise: <span className="font-semibold text-gold">every professional verified. every price upfront. every job guaranteed.</span>{" "}
                Seven years later, that promise serves a hundred thousand homes.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {FOUNDER_VALUES.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/team/rohan.svg"
                alt="Rohan Trivedi, Founder & CEO of Brancho"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl px-6 py-4 text-center">
              <p className="font-heading text-sm font-semibold text-white">Rohan Trivedi</p>
              <p className="text-xs text-white/60">Founder & CEO · Brancho</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Journey"
            title="From one garage to a national platform"
            align="left"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="relative rounded-3xl border border-line bg-surface-soft p-8"
              >
                <span className="font-heading text-4xl font-bold text-gold">{item.year}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Core Values"
            title="The principles we never trade away"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
              >
                <span className="font-heading text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Leadership"
            title="The team building India's most trusted home services"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
                className="group overflow-hidden rounded-3xl border border-line bg-surface-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-navy/15"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={person.image}
                    alt={`${person.name} — ${person.role}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink">{person.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-accent-deep">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology + Trust & Safety */}
      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                className={`rounded-3xl p-10 ${
                  idx === 0
                    ? "bg-navy text-white"
                    : "border border-line bg-surface"
                }`}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    idx === 0 ? "bg-gold/15 text-gold" : "bg-accent/10 text-accent"
                  }`}
                >
                  <pillar.icon size={24} />
                </span>
                <h2 className={`mt-6 font-heading text-2xl font-semibold ${idx === 0 ? "text-white" : "text-ink"}`}>
                  {pillar.title}
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {pillar.items.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${idx === 0 ? "text-white/70" : "text-muted"}`}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="bg-surface py-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-surface-soft p-10 text-center sm:flex-row sm:text-left"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                <HeartHandshake size={22} />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-semibold text-ink">Come build with us</h2>
                <p className="mt-2 text-sm text-muted">
                  We&apos;re hiring engineers, operators and changemakers across India.
                </p>
              </div>
            </div>
            <Link
              href="/careers"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-soft"
            >
              View Openings
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
