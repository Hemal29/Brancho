"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: { label: string; href: string }[];
  children?: React.ReactNode;
  dark?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  dark = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-32",
        dark
          ? "bg-navy text-white"
          : "bg-surface text-ink"
      )}
    >
      {dark ? (
        <div className="dot-grid-light absolute inset-0 opacity-40" />
      ) : (
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      )}
      <div
        className={cn(
          "absolute inset-0",
          dark ? "hero-mesh" : "bg-gradient-to-b from-secondary/60 to-transparent"
        )}
      />
      {dark && (
        <motion.div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="container-wide relative z-10">
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-sm"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  size={14}
                  className={dark ? "text-white/30" : "text-muted"}
                  aria-hidden="true"
                />
              )}
              {i === breadcrumb.length - 1 ? (
                <span
                  className={cn(
                    "font-medium",
                    dark ? "text-gold" : "text-accent-deep"
                  )}
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    "transition-colors",
                    dark
                      ? "text-white/60 hover:text-white"
                      : "text-muted hover:text-navy"
                  )}
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </motion.nav>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={cn(
              "mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
              dark
                ? "border-white/15 bg-white/5 text-gold"
                : "border-navy/10 bg-secondary text-accent-deep"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={cn(
            "max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
            dark ? "text-white" : "text-navy"
          )}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className={cn(
              "mt-7 max-w-2xl text-lg leading-relaxed",
              dark ? "text-white/70" : "text-muted"
            )}
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
