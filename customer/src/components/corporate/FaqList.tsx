"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

export default function FaqList({
  items,
  dark = false,
  cols = 1,
}: {
  items: FaqItem[];
  dark?: boolean;
  cols?: 1 | 2;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("grid gap-4", cols === 2 && "md:grid-cols-2")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              dark
                ? "border-white/10 bg-white/5"
                : "border-line bg-surface",
              isOpen && (dark ? "border-gold/40" : "border-accent/40")
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className={cn("font-heading text-base font-semibold", dark ? "text-white" : "text-navy")}>
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300",
                  dark ? "border-gold/40 text-gold" : "border-accent/40 text-accent-deep",
                  isOpen && "rotate-45"
                )}
              >
                <Plus size={15} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={cn("px-6 pb-6 text-sm leading-relaxed", dark ? "text-white/60" : "text-muted")}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
