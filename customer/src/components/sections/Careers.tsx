"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench, Users, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const CAREER_PATHS = [
  {
    icon: Wrench,
    title: "Become a Service Partner",
    tagline: "For skilled professionals",
    description:
      "Join India's most respected home services network. Steady work, fair earnings, weekly payouts and a uniform you'll be proud to wear.",
    points: ["Police-verified onboarding", "Free professional training", "Weekly transparent payouts"],
    cta: "Apply as Partner",
    href: "https://joinbrancho.com/",
    external: true,
  },
  {
    icon: Users,
    title: "Join Our Team",
    tagline: "For changemakers",
    description:
      "Engineers, designers, operations and growth talent building the future of Indian home services from Junagadh.",
    points: ["Fast-growing, high-impact roles", "Remote-friendly culture", "Learning and growth budgets"],
    cta: "Explore Openings",
    href: "/careers",
    external: false,
  },
  {
    icon: Building2,
    title: "Corporate Careers",
    tagline: "For experienced leaders",
    description:
      "Lead category, city or technology verticals at scale. Senior roles for leaders who want to build responsibly.",
    points: ["Leadership opportunities", "Equity and long-term incentives", "Purpose-driven work"],
    cta: "View Corporate Roles",
    href: "/careers",
    external: false,
  },
];

export default function Careers() {
  return (
    <section id="careers" className="relative bg-surface py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Careers"
          title="Build something that serves millions of homes"
          description="Whether you're a skilled professional, a builder or a leader — at Brancho, your work makes home life easier for all of India."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {CAREER_PATHS.map((path, i) => (
            <motion.article
              key={path.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/10 ${
                i === 0 ? "bg-navy text-white hover:shadow-navy/30" : "bg-surface-soft"
              }`}
            >
              {i === 0 && <div className="dot-grid-light absolute inset-0 opacity-30" />}
              <div className="relative">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                    i === 0 ? "bg-gold text-navy" : "bg-navy text-gold"
                  }`}
                >
                  {path.tagline}
                </span>
                <span
                  className={`mt-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                    i === 0 ? "bg-white/10 text-gold" : "bg-navy text-gold"
                  }`}
                >
                  <path.icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className={`mt-5 font-heading text-xl font-semibold ${i === 0 ? "text-white" : "text-ink"}`}>
                  {path.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-white/60" : "text-muted"}`}>
                  {path.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {path.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-center gap-2.5 text-sm font-medium ${
                        i === 0 ? "text-white/75" : "text-ink/75"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={path.href}
                  target={path.external ? "_blank" : undefined}
                  rel={path.external ? "noopener noreferrer" : undefined}
                  className={`group/link mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    i === 0
                      ? "bg-white text-navy hover:gap-3"
                      : "bg-navy text-white hover:bg-navy-soft dark:bg-gold dark:text-navy dark:hover:brightness-110"
                  }`}
                >
                  {path.cta}
                  <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
