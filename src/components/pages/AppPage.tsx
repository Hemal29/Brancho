"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { CUSTOMER_APP_FEATURES, PROVIDER_APP_FEATURES, APP_SCREENS } from "@/lib/data";

function AppStoreButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#download"
      className={`flex items-center gap-3 rounded-2xl px-6 py-3.5 transition-all hover:scale-[1.03] ${
        light
          ? "bg-navy text-white hover:bg-navy-soft"
          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.05 12.54c-.02-2.51 2.05-3.71 2.14-3.77-1.16-1.7-2.98-1.94-3.62-1.97-1.55-.16-3.01.91-3.8.91-.78 0-2-0.88-3.28-.86-1.69.02-3.24.98-4.11 2.49-1.75 3.04-.45 7.53 1.26 10 .84 1.21 1.84 2.57 3.15 2.52 1.26-.05 1.74-.81 3.27-.81s1.95.81 3.28.79c1.36-.02 2.22-1.24 3.05-2.46.96-1.41 1.36-2.77 1.38-2.84-.03-.01-2.64-1.02-2.67-4zM14.4 4.04c.7-.85 1.17-2.03 1.04-3.21-1.01.04-2.23.67-2.95 1.52-.65.75-1.21 1.95-1.06 3.1 1.12.09 2.27-.57 2.97-1.41z" />
      </svg>
      <span className="text-left">
        <span className="block text-[10px] uppercase tracking-wider opacity-60">Download on the</span>
        <span className="block text-base font-semibold leading-tight">App Store</span>
      </span>
    </a>
  );
}

function GooglePlayButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#download"
      className={`flex items-center gap-3 rounded-2xl px-6 py-3.5 transition-all hover:scale-[1.03] ${
        light
          ? "bg-navy text-white hover:bg-navy-soft"
          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.61 1.81L13.79 12 3.61 22.19c-.37-.19-.61-.57-.61-1V2.81c0-.43.24-.81.61-1zM14.5 13.29l2.5 2.5-9.87 5.72 7.37-8.22zM14.5 10.71L5.13 2.49l9.87 5.72-2.5 2.5zM16.83 8.06l3.32 1.92c.83.48.83 1.56 0 2.04l-3.32 1.92-2.63-2.94 2.63-2.94z" />
      </svg>
      <span className="text-left">
        <span className="block text-[10px] uppercase tracking-wider opacity-60">Get it on</span>
        <span className="block text-base font-semibold leading-tight">Google Play</span>
      </span>
    </a>
  );
}

export default function AppPage() {
  return (
    <>
      <PageHero
        dark
        breadcrumb={[{ label: "Home", href: "/" }, { label: "App", href: "/app" }]}
        eyebrow="The Brancho App"
        title="One app for your home. One app for your work."
        description="Book, track and pay in minutes — or run your professional service business with steady, verified work and weekly payouts."
      >
        <div className="flex flex-wrap gap-4">
          <AppStoreButton />
          <GooglePlayButton />
        </div>
      </PageHero>

      {/* Apps side by side */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
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
              className="mt-12 lg:mt-24"
            >
              <PhoneMockup title="Service Provider App" features={PROVIDER_APP_FEATURES} icons={[]} theme="provider" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="relative overflow-hidden bg-navy py-24 text-white lg:py-32">
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="container-wide relative">
          <SectionHeading
            dark
            eyebrow="App Screens"
            title="Designed to feel effortless"
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APP_SCREENS.map((screen, i) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
                className="group flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.08]"
              >
                <div className="mb-6 overflow-hidden rounded-[2rem] transition-transform duration-500 group-hover:-translate-y-2">
                  <Image
                    src={screen.image}
                    alt={`Brancho app screen — ${screen.title}`}
                    width={400}
                    height={820}
                    className="h-72 w-auto object-cover"
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold">{screen.title}</h3>
                <p className="mt-2 text-sm text-white/55">{screen.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download section */}
      <section id="download" className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Get the Brancho app today
            </h2>
            <p className="mt-4 text-muted">
              Available for free on iOS and Android. Trusted by 100,000+ families and
              5,000+ service professionals across India.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <AppStoreButton light />
              <GooglePlayButton light />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
