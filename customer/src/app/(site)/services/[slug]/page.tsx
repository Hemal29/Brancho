import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, ChevronLeft } from "lucide-react";
import { SERVICES_DETAILED, type Service } from "@/lib/data";
import { iconMap } from "@/lib/utils";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/sections/CTABand";

const SLUG_ALIASES: Record<string, string> = {
  "electric-care": "electrician",
  plumbing: "plumbing",
  "washing-care": "washing-machine-repair",
  "ac-care": "ac-cleaning",
  "refrigerator-care": "refrigerator-repair",
  "ro-care": "ro-service",
};

export function generateStaticParams() {
  return SERVICES_DETAILED.map((s) => ({ slug: s.slug }));
}

function resolveService(slug: string): Service | undefined {
  const target = SLUG_ALIASES[slug] ?? slug;
  return SERVICES_DETAILED.find((s) => s.slug === target);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = resolveService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = resolveService(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon];
  const others = SERVICES_DETAILED.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${slug}` },
        ]}
        eyebrow="Brancho Care Services"
        title={service.title}
        description={service.description}
      />

      <section className="container-wide py-16 sm:py-20">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <ChevronLeft size={16} /> All services
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <h2 className="mt-10 font-heading text-2xl font-bold text-ink">About this service</h2>
            <p className="mt-4 leading-relaxed text-muted">{service.longDescription}</p>

            <h3 className="mt-10 font-heading text-xl font-bold text-ink">What&apos;s included</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-line bg-surface p-4 text-sm font-medium text-ink">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="card sticky top-24 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  {Icon ? <Icon size={22} /> : null}
                </span>
                <div>
                  <p className="font-heading text-lg font-bold text-ink">{service.price}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock size={12} /> {service.duration}
                  </p>
                </div>
              </div>
              <Link href="/customer/book" className="btn-gold mt-6 flex w-full items-center justify-center gap-2 py-3.5">
                Book Now <ArrowRight size={16} />
              </Link>
              <Link href="/customer/bookings" className="btn-outline mt-3 flex w-full items-center justify-center gap-2 py-3.5">
                Explore Service
              </Link>
              <p className="mt-4 text-center text-xs text-muted">
                Pay the professional directly after the service is completed.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="mb-4 font-heading text-base font-semibold text-ink">Related services</h3>
              <div className="space-y-2">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
                  >
                    {s.title}
                    <ArrowRight size={14} className="text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
