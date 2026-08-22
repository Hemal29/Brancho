import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  BadgeCheck,
  ClipboardList,
  Star,
  Headphones,
  TrendingUp,
  CalendarCheck,
  IndianRupee,
  Users,
  MapPin,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Brancho Professionals",
  description:
    "Meet the people behind every Brancho service — verified, trained professionals. Or grow your business by becoming a Brancho professional.",
  alternates: { canonical: "/professionals" },
};

const STANDARDS = [
  {
    icon: ShieldCheck,
    title: "Verification",
    description:
      "Every professional on the platform goes through identity and background verification before their first job.",
  },
  {
    icon: GraduationCap,
    title: "Training",
    description:
      "Professionals are onboarded with service training so every visit follows the same quality standard.",
  },
  {
    icon: BadgeCheck,
    title: "Professional Standards",
    description:
      "Uniformed visits, clear pricing before work begins and respectful conduct inside your home.",
  },
  {
    icon: ClipboardList,
    title: "Service Management",
    description:
      "Bookings are tracked end-to-end so arrival, service and completion stay transparent for you.",
  },
  {
    icon: Star,
    title: "Customer Ratings",
    description:
      "Every completed service can be rated. Ratings keep quality high and help professionals grow.",
  },
  {
    icon: Headphones,
    title: "Support",
    description:
      "If anything about a visit is not right, our support team is available to make it right.",
  },
];

const GROWTH = [
  { icon: Users, title: "Get More Jobs", description: "Reach new customers in your city who book home services every day." },
  { icon: CalendarCheck, title: "Manage Bookings", description: "Accept, schedule and track jobs from a simple dashboard." },
  { icon: IndianRupee, title: "Track Earnings", description: "See your completed jobs and earnings clearly, in one place." },
  { icon: MapPin, title: "Manage Availability", description: "Choose the areas and times that work for you." },
  { icon: TrendingUp, title: "Build Your Reputation", description: "Great service earns great ratings — and more bookings." },
];

export default function ProfessionalsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Brancho Professionals", href: "/professionals" }]}
        eyebrow="For Service Professionals"
        title="Meet the People Behind Every Service."
        description="Brancho is built on skilled local professionals. Learn what it takes to join the platform — and what Brancho does to help you grow."
      />

      <section className="container-wide py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((item) => (
            <div key={item.title} className="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                <item.icon size={22} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">For Professionals</p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Grow Your Business With Brancho.</h2>
            <p className="mt-4 text-white/70">
              Join the platform as a service professional and focus on what you do best — we bring the customers.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {GROWTH.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <item.icon size={24} className="text-gold" />
                <h3 className="mt-3 font-heading text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-semibold text-navy transition-transform hover:scale-[1.03]"
            >
              Become a Brancho Professional <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-xs text-white/50">Or reach us through the contact page — mention &ldquo;Professional Enquiry&rdquo;.</p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
