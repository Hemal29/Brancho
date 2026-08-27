import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Brancho — Book a Service or Partner With Us",
  description:
    "Contact Brancho — India's trusted home services platform. Reach our Veraval office, customer support, or explore partnerships. We respond within hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Brancho",
    description: "Talk to the team behind 100,000 happy homes.",
    url: "https://brancho.in/contact",
  },
};

export default function Page() {
  return (
    <>
      <ContactPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd["@graph"][1]) }}
      />
    </>
  );
}
