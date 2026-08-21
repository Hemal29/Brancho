"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import Newsletter from "@/components/corporate/Newsletter";
import { NEWSROOM } from "@/lib/corporate";

export default function NewsroomPage() {
  const [featured, ...rest] = NEWSROOM;
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Newsroom", href: "/newsroom" }]}
        eyebrow="Newsroom"
        title="Stories from Brancho."
        description="Announcements, technology deep-dives, safety protocols and the people behind India's most trusted home services platform."
      />

      <section className="bg-surface py-24 lg:py-32">
        <div className="container-wide">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/newsroom/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl bg-navy p-10 text-white sm:p-14"
            >
              <div className="dot-grid-light absolute inset-0 opacity-25" />
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-[100px]" />
              <div className="relative max-w-2xl">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-widest">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-gold">
                    <Newspaper size={13} />
                    Featured
                  </span>
                  <span className="text-white/60">{featured.category}</span>
                  <span className="text-white/60">·</span>
                  <span className="text-white/60">{featured.date}</span>
                  <span className="text-white/60">·</span>
                  <span className="text-white/60">{featured.readTime} read</span>
                </div>
                <h2 className="mt-6 text-balance font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-lg text-white/65">{featured.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors group-hover:bg-gold">
                  Read the story
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>

      <section className="bg-surface-soft py-24 lg:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="Latest" title="All news & announcements" align="left" className="mb-14" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/newsroom/${post.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-navy/10"
                >
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="font-semibold uppercase tracking-widest text-accent-deep">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="mt-5 flex-1 font-heading text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-accent-deep">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    Read more
                    <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>

      <CTABand />
    </>
  );
}
