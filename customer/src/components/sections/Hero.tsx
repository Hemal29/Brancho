"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Download, ArrowRight, UserPlus, Star, ShieldCheck } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/data";

const heroVideoSources = [
  { src: "https://cdn.coverr.co/videos/coverr-hands-holding-a-house-model-4587/1080p.mp4", type: "video/mp4" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const contentY = useTransform(scrollY, [0, 400], [0, 80]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-navy text-white"
    >
      {/* Cinematic background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.svg"
          preload="metadata"
          aria-hidden="true"
        >
          {heroVideoSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      </motion.div>

      {/* Gradient overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/60 to-navy" />
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-navy to-transparent" />

      {/* Animated light glow */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Trust badge */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="container-wide relative z-10 pt-36"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-white/90">
            <ShieldCheck size={14} className="text-gold" />
            GST-Registered · ISO 9001 Certified Operations
          </span>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-white/90">
            <Star size={14} className="fill-gold text-gold" />
            4.9/5 rated by 12,000+ customers
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ opacity: contentOpacity, y: contentY }}
        className="container-wide relative z-10 mt-8 pb-16"
      >
        <motion.h1
          variants={item}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Trusted Services.{" "}
          <span className="text-gradient">Right at Your Doorstep.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
        >
          Book trusted professionals for everyday home services with Brancho.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-medium text-white/60">Select your city:</span>
          {["Veraval", "Rajkot", "Junagadh"].map((city) => (
            <Link
              key={city}
              href="/cities"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-gold hover:bg-gold/15 hover:text-gold"
            >
              {city}
            </Link>
          ))}
          <span className="rounded-full border border-dashed border-white/25 px-4 py-1.5 text-sm text-white/50">
            More cities coming soon
          </span>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="/app" variant="light" size="lg">
            <Download size={18} />
            Download App
          </MagneticButton>
          <MagneticButton href="/services" variant="primary" size="lg">
            Book a Service
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href="/careers" variant="ghost" size="lg" className="border-white/25 text-white hover:border-white/60 hover:bg-white/10">
            <UserPlus size={18} />
            Become a Partner
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating statistics band */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col items-center gap-1 bg-navy/70 px-6 py-7 text-center transition-colors duration-300 hover:bg-navy-soft/70"
              >
                <span className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} className="tabular-nums" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-12" />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="pointer-events-none absolute bottom-28 right-8 z-10 hidden lg:flex"
      >
        <motion.span
          aria-hidden="true"
          className="block h-14 w-7 rounded-full border border-white/30 p-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="block h-2.5 w-2.5 rounded-full bg-gold" />
        </motion.span>
      </motion.div>
    </section>
  );
}
