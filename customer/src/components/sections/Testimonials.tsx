"use client";

import { motion } from "framer-motion";
import { Star, Quote, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-surface py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by homes. Trusted by professionals."
          description="Real stories from the million-plus families and professionals who make Brancho what it is."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
              className="group flex h-full flex-col rounded-3xl border border-line bg-surface-soft p-7 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:bg-surface hover:shadow-2xl hover:shadow-navy/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <Star key={r} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <Quote size={28} className="text-ink/10 transition-colors group-hover:text-accent/20" />
              </div>

              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white",
                    t.type === "professional" ? "bg-navy" : "bg-accent"
                  )}
                  aria-hidden="true"
                >
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="flex items-center gap-2 font-semibold text-ink">
                    {t.name}
                    {t.type === "professional" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink/60">
                        <Briefcase size={9} /> Partner
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted">
                    {t.location} · {t.service}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
