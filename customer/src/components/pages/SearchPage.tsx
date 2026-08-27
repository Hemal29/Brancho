"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, FileSearch } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { SEARCHABLE_PAGES, NEWSROOM } from "@/lib/corporate";

type Result = {
  title: string;
  path: string;
  description: string;
  group: string;
};

const INDEX: Result[] = [
  ...SEARCHABLE_PAGES.map((p) => ({ ...p, group: "Pages" })),
  ...NEWSROOM.map((n) => ({
    title: n.title,
    path: `/newsroom/${n.slug}`,
    description: n.excerpt,
    group: "Newsroom",
  })),
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q) ||
        r.path.toLowerCase().includes(q)
    ).slice(0, 24);
  }, [query]);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Search", href: "/search" }]}
        eyebrow="Search"
        title="What can we help you find?"
        description="Search across our pages, businesses, services and newsroom."
      />

      <section className="bg-surface py-20 lg:py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-2xl"
          >
            <div className={`flex items-center gap-3 rounded-2xl border bg-surface-soft px-5 py-4 transition-all ${focused ? "border-accent shadow-lg shadow-accent/10" : "border-line"}`}>
              <Search size={20} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                type="search"
                placeholder="Try “deep cleaning”, “refund”, “AC service”…"
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl">
            {!query.trim() && (
              <div className="py-16 text-center text-muted">
                <FileSearch size={40} className="mx-auto mb-4 text-gold" />
                <p className="font-heading text-lg font-semibold text-ink">Start typing to search</p>
                <p className="mt-2 text-sm">{INDEX.length} indexed pages, articles and services.</p>
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-heading text-xl font-semibold text-ink">No results for “{query}”</p>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                  Try a different keyword, or browse from our
                  {" "}
                  <Link href="/sitemap" className="font-semibold text-accent-deep hover:underline">
                    full sitemap
                  </Link>.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {results.map((r, i) => (
                <motion.div
                  key={`${r.group}-${r.title}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.03, 0.4) }}
                >
                  <Link
                    href={r.path}
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface-soft px-6 py-5 transition-all hover:border-accent/40 hover:bg-surface"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                          {r.group}
                        </span>
                        <h3 className="font-heading text-base font-semibold text-ink group-hover:text-accent-deep">
                          {r.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-sm text-muted">{r.description}</p>
                    </div>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
