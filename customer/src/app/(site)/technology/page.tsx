import type { Metadata } from "next";
import {
  CalendarCheck,
  MapPin,
  Users,
  ClipboardList,
  Bell,
  Navigation,
  BrainCircuit,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Powered by technology, built for people. See how the Brancho platform handles smart booking, professional matching and service tracking.",
  alternates: { canonical: "/technology" },
};

const AVAILABLE = [
  { icon: CalendarCheck, title: "Smart Booking", description: "Book a verified professional in a few taps — pick a service, time slot and address." },
  { icon: MapPin, title: "Location Intelligence", description: "City-aware availability so you only see services where Brancho operates." },
  { icon: Users, title: "Professional Matching", description: "Requests are routed to available professionals near you with the right skills." },
  { icon: ClipboardList, title: "Booking Management", description: "Every booking has a live status timeline from request to completion." },
  { icon: Bell, title: "Notifications", description: "Timely updates about your booking — confirmation, assignment and completion." },
  { icon: Navigation, title: "Service Tracking", description: "Follow each stage of your service inside the Brancho app." },
];

const FUTURE = [
  { icon: BrainCircuit, title: "AI-Assisted Allocation", description: "Smarter matching of professionals to jobs based on demand patterns and travel time." },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }]}
        eyebrow="The Platform"
        title="Powered by Technology. Built for People."
        description="Brancho connects households and local professionals through one reliable platform — practical technology that keeps every service on track."
      />

      <section className="container-wide py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700">Available Today</span>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE.map((item) => (
            <div key={item.title} className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                <item.icon size={22} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-3">
          <span className="rounded-full border border-dashed border-gold/60 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-deep">Future Technology</span>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE.map((item) => (
            <div key={item.title} className="rounded-2xl border border-dashed border-line bg-surface/50 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
                <item.icon size={22} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                {item.title} <span className="ml-1 align-middle text-xs font-bold uppercase tracking-widest text-muted">Coming Soon</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
