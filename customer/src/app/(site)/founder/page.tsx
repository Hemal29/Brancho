import type { Metadata } from "next";
import FounderPage from "@/components/pages/FounderPage";
import { FOUNDER } from "@/lib/corporate";

export const metadata: Metadata = {
  title: "Bhavy Rajpopat — Founder & Developer",
  description:
    "Meet Bhavy Rajpopat, founder and developer of Brancho. The story behind the on-demand home services platform built in Veraval, Gujarat.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Bhavy Rajpopat — Founder & Developer of Brancho",
    description: "The story behind India's trusted home services platform.",
    url: "https://brancho.in/founder",
  },
};

export default function Page() {
  return (
    <>
      <FounderPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: FOUNDER.name,
            jobTitle: FOUNDER.role,
            worksFor: { "@id": "https://brancho.in/#organization" },
            description: FOUNDER.intro,
            url: "https://brancho.in/founder",
          }),
        }}
      />
    </>
  );
}
