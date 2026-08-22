"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/corporate/FaqList";
import CTABand from "@/components/sections/CTABand";
import { FAQS_EXTRA, CONTACT, LEGAL_FAQ_LINKS } from "@/lib/corporate";

const HELP_CHANNELS = [
  {
    icon: Phone,
    title: "Call us",
    description: `Speak to a human — ${CONTACT.support.phone}`,
    href: "tel:+9118001234567",
    action: "Call now",
  },
  {
    icon: Mail,
    title: "Email us",
    description: CONTACT.support.email,
    href: `mailto:${CONTACT.support.email}`,
    action: "Write to us",
  },
  {
    icon: MessageSquare,
    title: "Live chat",
    description: "Instant answers, 9 AM – 8 PM IST",
    href: "/contact",
    action: "Start a chat",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQs", href: "/faqs" }]}
        eyebrow="Help Centre"
        title="Frequently asked questions."
        description="Straight answers about verification, pricing, refunds, cities and everything else you might want to know about Brancho."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Quick Help"
                title="Still have questions?"
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {HELP_CHANNELS.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    className="rounded-3xl border border-line bg-surface-soft p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                        <c.icon size={19} />
                      </span>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-ink">{c.title}</h3>
                        <p className="mt-1 text-sm text-muted">{c.description}</p>
                        <Link
                          href={c.href}
                          className="mt-3 inline-block text-sm font-semibold text-accent-deep transition-colors hover:text-accent"
                        >
                          {c.action} →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-line bg-surface-soft p-6">
                <h3 className="font-heading text-sm font-semibold text-ink">Legal & policies</h3>
                <ul className="mt-4 space-y-2.5">
                  {LEGAL_FAQ_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent-deep">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <FaqList items={FAQS_EXTRA} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
