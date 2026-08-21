"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Type, Image as ImageIcon, PenTool, Check, X } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import DownloadCard from "@/components/corporate/DownloadCard";
import CTABand from "@/components/sections/CTABand";
import { BRAND, DOWNLOADS } from "@/lib/corporate";

const SECTION_LABELS: Record<string, string> = {
  colors: "Colour",
  typography: "Typography",
  logoRules: "Logo Rules",
  voice: "Voice & Tone",
  iconStyle: "Iconography",
  illustrationStyle: "Illustration",
  photography: "Photography",
};

export default function BrandGuidelinesPage() {
  const brandBook = DOWNLOADS.find((d) => d.slug === "brand-book");
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Brand Guidelines", href: "/brand-guidelines" }]}
        eyebrow="Brand Guidelines"
        title="The Brancho brand, defined."
        description="A premium, trustworthy identity built on charcoal and gold — here's how we use it, and how you can too."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Identity"
            title="Trust, clarity, warmth"
            description={BRAND.voice[1]}
            className="mb-14"
          />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl bg-navy p-10 text-white"
            >
              <div className="dot-grid-light absolute inset-0 opacity-25" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Image src="/brancho-logo-white.png" alt="Brancho logo" width={44} height={44} className="object-contain" />
                </span>
                <div>
                  <p className="font-heading text-xl font-bold">Brancho</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{BRAND.tagline}</p>
                </div>
              </div>
              <p className="relative mt-10 max-w-md text-sm leading-relaxed text-white/70">
                The logomark is a clean geometric icon — warm, premium and unmistakable.
                It always sits on the official transparent artwork, never stretched or recoloured.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {BRAND.colors.slice(0, 4).map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  className="overflow-hidden rounded-3xl border border-line"
                >
                  <div className="flex h-28 items-end justify-between p-4" style={{ backgroundColor: c.hex }}>
                    <span className="text-xs font-bold" style={{ color: c.hex === "#181A1F" || c.hex === "#1A1A1C" ? "#fff" : "#181A1F" }}>
                      {c.name}
                    </span>
                    <span className="text-[10px] font-semibold uppercase" style={{ color: c.hex === "#181A1F" || c.hex === "#1A1A1C" ? "#fff" : "#181A1F" }}>
                      {c.hex}
                    </span>
                  </div>
                  <p className="px-4 py-3 text-xs leading-relaxed text-muted">{c.usage}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BRAND.colors.slice(4).map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface-soft p-4"
              >
                <span className="h-12 w-12 shrink-0 rounded-xl border border-line" style={{ backgroundColor: c.hex }} />
                <div>
                  <p className="font-heading text-sm font-semibold text-navy">{c.name}</p>
                  <p className="text-xs text-muted">{c.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow={SECTION_LABELS.typography}
            title="Two families, one voice"
            description="Manrope carries the headlines with confidence; Inter handles every word of UI with clarity."
            className="mb-14"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {BRAND.typography.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="rounded-3xl border border-line bg-surface p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold">
                    <Type size={22} />
                  </span>
                  <span className="rounded-full bg-surface-soft px-4 py-1.5 text-xs font-semibold text-muted">
                    {t.weights}
                  </span>
                </div>
                <p className="mt-8 text-5xl font-bold text-navy" style={{ fontFamily: t.name.toLowerCase() === "manrope" ? "var(--font-heading)" : "var(--font-body)" }}>
                  {t.name} Aa
                </p>
                <p className="mt-6 text-lg text-ink">{t.role}</p>
                <p className="mt-2 text-sm text-muted">{t.usage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading
              eyebrow="Expression"
              title="Iconography, illustration & photography"
              align="left"
              className="mb-0"
            />
            <div className="space-y-6">
              {[
                { icon: PenTool, title: SECTION_LABELS.iconStyle, text: BRAND.iconStyle },
                { icon: ImageIcon, title: SECTION_LABELS.illustrationStyle, text: BRAND.illustrationStyle },
                { icon: ImageIcon, title: SECTION_LABELS.photography, text: BRAND.photography },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  className="flex items-start gap-5 rounded-3xl border border-line bg-surface-soft p-8"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                    <s.icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 text-white lg:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="Usage" title="Do & don't" dark className="mb-14" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-400/15 text-green-400">
                  <Check size={20} />
                </span>
                <h3 className="font-heading text-lg font-semibold">Do</h3>
              </div>
              <ul className="space-y-3.5">
                {BRAND.do.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-400/15 text-red-400">
                  <X size={20} />
                </span>
                <h3 className="font-heading text-lg font-semibold">Don&apos;t</h3>
              </div>
              <ul className="space-y-3.5">
                {BRAND.dont.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Resources"
            title="Download the brand assets"
            className="mb-14"
          />
          {brandBook && (
            <div className="mx-auto max-w-md">
              <DownloadCard item={brandBook} />
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </>
  );
}
