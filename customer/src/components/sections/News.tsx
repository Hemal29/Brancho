"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { NEWS } from "@/lib/data";

const CATEGORIES = ["Company News", "Safety", "Technology", "Cleaning Tips", "Home Care"];

export default function News() {
  const [featured, ...rest] = NEWS;

  return (
    <section id="news" className="relative bg-surface-soft py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="News & Insights"
          title="Thoughts from the team"
          description="Company updates, safety protocols, technology deep-dives and practical advice for every Indian home."
        />

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap justify-center gap-2.5"
        >
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href="#news"
              className="rounded-full border border-line bg-surface px-5 py-2 text-sm font-medium text-muted transition-all hover:border-accent hover:text-accent-deep"
            >
              {cat}
            </a>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured */}
          <motion.a
            href="#news"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-navy p-9 text-white transition-all duration-500 hover:shadow-2xl hover:shadow-navy/30"
          >
            <div className="dot-grid-light absolute inset-0 opacity-30" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl transition-all duration-500 group-hover:bg-accent/30" />
            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-navy">
                {featured.category}
              </span>
              <h3 className="mt-6 max-w-md text-balance font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                {featured.excerpt}
              </p>
            </div>
            <div className="relative mt-10 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-white/50">
                <Clock size={13} /> {featured.date} · {featured.readTime}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all group-hover:bg-white group-hover:text-navy">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </motion.a>

          {/* Remaining posts */}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((post, i) => (
              <motion.a
                key={post.title}
                href="#news"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-navy/10"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent-deep">
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-muted">
                    <Clock size={12} /> {post.date} · {post.readTime}
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#news"
            className="inline-flex items-center gap-2 font-semibold text-accent-deep transition-colors hover:text-accent"
          >
            View all insights <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
