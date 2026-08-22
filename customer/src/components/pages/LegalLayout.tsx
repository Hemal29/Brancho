"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

type LegalLayoutProps = {
  title: string;
  updated: string;
  sections: LegalSection[];
  intro: string;
};

export default function LegalLayout({ title, updated, sections, intro }: LegalLayoutProps) {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: title, href: "#" }]}
        eyebrow="Legal"
        title={title}
        description={intro}
      />

      <section className="bg-surface pb-24 lg:pb-32">
        <div className="container-wide grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            aria-label="Table of contents"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Contents
            </p>
            <ul className="space-y-1 border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-muted">
              Last updated: <span className="font-semibold text-ink">{updated}</span>
              <br />
              Questions?{" "}
              <Link href="/contact" className="font-semibold text-accent-deep hover:text-accent">
                Contact us
              </Link>
            </p>
          </motion.nav>

          {/* Content */}
          <div className="max-w-3xl">
            <p className="mb-10 rounded-2xl border border-line bg-surface-soft p-6 text-sm leading-relaxed text-muted">
              {intro}
            </p>
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.05 }}
                className="mb-12 scroll-mt-28"
              >
                <h2 className="mb-4 font-heading text-2xl font-semibold text-ink">
                  {String(i + 1).padStart(2, "0")} — {section.title}
                </h2>
                {section.body.map((paragraph, j) => (
                  <p key={j} className="mb-4 text-sm leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}

            <div className="rounded-2xl bg-navy p-8 text-white">
              <h2 className="font-heading text-lg font-semibold">Questions about this policy?</h2>
              <p className="mt-2 text-sm text-white/60">
                Our team is happy to explain anything in plain language.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-surface-soft"
              >
                Contact Brancho
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
