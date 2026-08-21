import type { Metadata } from "next";
import CareersPage from "@/components/pages/CareersPage";
import { JOBS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers at Brancho — Join India's Home Services Leader",
  description:
    "Explore open roles at Brancho — engineering, design, operations, data and more. Build the future of Indian home services with a remote-friendly, high-impact team.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Brancho",
    description: "Build the future of Indian home services. See open roles.",
    url: "https://brancho.in/careers",
  },
};

export default function Page() {
  return (
    <>
      <CareersPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            name: JOBS[0].title,
            description: JOBS[0].description,
            datePosted: new Date().toISOString().split("T")[0],
            employmentType: JOBS[0].type,
            hiringOrganization: {
              "@type": "Organization",
              name: "Brancho",
              sameAs: "https://brancho.in",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: JOBS[0].location,
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
            },
          }),
        }}
      />
    </>
  );
}
