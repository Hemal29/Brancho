import type { Metadata } from "next";
import {
  ShieldCheck,
  BadgeCheck,
  Navigation,
  Headphones,
  Handshake,
  ClipboardCheck,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Trust & Safety",
  description:
    "Your home. Your trust. Our responsibility. How Brancho keeps every service safe, verified and supported.",
  alternates: { canonical: "/trust" },
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Professional Verification",
    description:
      "Professionals join Brancho only after identity and background verification by our team.",
  },
  {
    icon: BadgeCheck,
    title: "Identity Verification",
    description:
      "The professional assigned to your booking is the one you see in the app — no unannounced swaps.",
  },
  {
    icon: Navigation,
    title: "Service Tracking",
    description:
      "Every booking has a live status timeline, so you always know where your service stands.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Something not right? Raise a support ticket from the app and our team follows up with you.",
  },
  {
    icon: Handshake,
    title: "Transparent Pricing",
    description:
      "You see the price before you book. No hidden charges — pay after the service is completed.",
  },
  {
    icon: ClipboardCheck,
    title: "Service Standards",
    description:
      "Trained professionals follow a standard checklist for every visit, and every job can be rated.",
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Trust & Safety", href: "/trust" }]}
        eyebrow="Trust & Safety"
        title="Your Home. Your Trust. Our Responsibility."
        description="Inviting someone into your home takes trust. Here is how Brancho earns it — on every single visit."
      />

      <section className="container-wide py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((item) => (
            <div key={item.title} className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                <item.icon size={22} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-navy p-8 text-white sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Our Promise</p>
          <h2 className="mt-3 max-w-2xl font-heading text-2xl font-bold sm:text-3xl">
            Every professional. Every visit. The same standard.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            If a service does not meet your expectation, tell us. We take feedback seriously and use it to keep quality
            high across the platform.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
