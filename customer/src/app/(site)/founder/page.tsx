import type { Metadata } from "next";
import FounderPage from "@/components/pages/FounderPage";
import { FOUNDER } from "@/lib/corporate";

export const metadata: Metadata = {
  title: "Rohan Trivedi — Founder & CEO",
  description:
    "Meet Rohan Trivedi, founder of Brancho. Read the story behind India's trusted home services platform — from one van in Ahmedabad to 100,000 homes served.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Rohan Trivedi — Founder & CEO of Brancho",
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
