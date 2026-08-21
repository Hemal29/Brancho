"use client";

import { SERVICES } from "@/lib/data";

export default function ServicesMarquee() {
  const items = [...SERVICES, ...SERVICES];

  return (
    <section
      className="relative overflow-hidden border-b border-line bg-navy py-5"
      aria-label="List of Brancho services"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((service, i) => (
          <span
            key={`${service.title}-${i}`}
            className="flex items-center gap-10 font-heading text-lg font-medium tracking-wide text-white/60"
          >
            {service.title}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
