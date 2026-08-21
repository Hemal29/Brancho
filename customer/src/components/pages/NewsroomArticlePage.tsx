"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";
import Newsletter from "@/components/corporate/Newsletter";
import { NEWSROOM } from "@/lib/corporate";

type Post = (typeof NEWSROOM)[number];

export default function NewsroomArticlePage({ post }: { post: Post }) {
  const idx = NEWSROOM.findIndex((p) => p.slug === post.slug);
  const next = NEWSROOM[(idx + 1) % NEWSROOM.length];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Newsroom", href: "/newsroom" },
          { label: post.category, href: "/newsroom" },
        ]}
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <Calendar size={15} className="text-gold" />
            {post.date}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted/50" />
          <span>{post.readTime} read</span>
          <span className="h-1 w-1 rounded-full bg-muted/50" />
          <span>Brancho Newsroom</span>
        </div>
      </PageHero>

      <article className="bg-surface py-20 lg:py-28">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl"
          >
            <div className="space-y-6 text-lg leading-relaxed text-ink/80">
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-12 border-l-2 border-accent pl-6">
              <p className="text-sm text-muted">
                <span className="font-semibold text-navy">About Brancho</span> — Brancho is an
                Indian technology platform transforming home services through trust, transparency
                and skilled professionals. Follow our newsroom for company announcements, product
                launches and the stories behind our services.
              </p>
            </div>

            <div className="mt-12 flex flex-col justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
              <Link
                href="/newsroom"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-accent-deep"
              >
                <ArrowLeft size={16} />
                All news
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-accent-deep"
              >
                Press enquiries
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      {next && (
        <section className="bg-navy py-20 text-white">
          <div className="container-wide">
            <Link href={`/newsroom/${next.slug}`} className="group block">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Next story</p>
              <div className="mt-3 flex items-center justify-between gap-6">
                <h2 className="text-balance font-heading text-2xl font-semibold leading-tight transition-colors group-hover:text-gold sm:text-3xl">
                  {next.title}
                </h2>
                <ArrowRight size={28} className="shrink-0 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-surface-soft py-24">
        <div className="container-wide">
          <Newsletter />
        </div>
      </section>

      <CTABand />
    </>
  );
}
