import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FutureDetailPage from "@/components/pages/FutureDetailPage";
import { FUTURE_DETAILS } from "@/lib/corporate";

export const dynamicParams = false;

export function generateStaticParams() {
  return FUTURE_DETAILS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = FUTURE_DETAILS.find((f) => f.slug === slug);
  if (!detail) return {};
  return {
    title: `${detail.name} — ${detail.tagline}`,
    description: detail.description,
    alternates: { canonical: `/future/${detail.slug}` },
    openGraph: {
      title: `${detail.name} — ${detail.tagline}`,
      description: detail.description,
      url: `https://brancho.in/future/${detail.slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = FUTURE_DETAILS.find((f) => f.slug === slug);
  if (!detail) notFound();
  return <FutureDetailPage detail={detail} />;
}
