import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BusinessDetailPage from "@/components/pages/BusinessDetailPage";
import { BUSINESSES } from "@/lib/corporate";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = BUSINESSES.find((b) => b.slug === slug);
  if (!business) return {};
  return {
    title: `${business.name} — ${business.tagline}`,
    description: business.description,
    alternates: { canonical: `/businesses/${business.slug}` },
    openGraph: {
      title: `${business.name} — ${business.tagline}`,
      description: business.description,
      url: `https://brancho.in/businesses/${business.slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = BUSINESSES.find((b) => b.slug === slug);
  if (!business) notFound();
  return (
    <>
      <BusinessDetailPage business={business} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: business.name,
            parentOrganization: { name: "Brancho Technologies Pvt. Ltd." },
            description: business.description,
            url: `https://brancho.in/businesses/${business.slug}`,
            contactPoint: { "@type": "ContactPoint", telephone: "+91 1800 123 4567", contactType: "customer service" },
          }),
        }}
      />
    </>
  );
}
