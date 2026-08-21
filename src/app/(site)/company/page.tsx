import type { Metadata } from "next";
import CompanyPage from "@/components/pages/CompanyPage";
import { jsonLd } from "@/lib/schema";
import { LEADERSHIP } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Brancho — Company, Mission, Leadership",
  description:
    "Learn about Brancho — India's trusted home services platform. Our mission, vision, founder story, leadership team, core values, technology and trust & safety commitments.",
  alternates: { canonical: "/company" },
  openGraph: {
    title: "About Brancho — India's Trusted Home Services Platform",
    description:
      "From an Ahmedabad garage to 100,000+ homes served. Meet the team behind Brancho.",
    url: "https://brancho.in/company",
  },
};

export default function Page() {
  return (
    <>
      <CompanyPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              jsonLd["@graph"][0],
              {
                "@type": "AboutPage",
                name: "About Brancho",
                url: "https://brancho.in/company",
                mainEntity: LEADERSHIP.map((p) => ({
                  "@type": "Person",
                  name: p.name,
                  jobTitle: p.role,
                  worksFor: { "@id": "https://brancho.in/#organization" },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
