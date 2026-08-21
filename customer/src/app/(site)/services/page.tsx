import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { jsonLd } from "@/lib/schema";
import { SERVICES_DETAILED } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — AC Cleaning, Plumbing, Electrician & More",
  description:
    "Explore 13 home service categories from Brancho — AC cleaning, deep home cleaning, electrician, plumbing, carpenter, painting, appliance repair and pest control with upfront pricing.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Home Services in India",
    description:
      "AC cleaning, deep cleaning, electrician, plumbing and more — verified professionals with upfront pricing.",
    url: "https://brancho.in/services",
  },
};

export default function Page() {
  return (
    <>
      <ServicesPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              jsonLd["@graph"][0],
              {
                "@type": "ItemList",
                name: "Brancho Services",
                itemListElement: SERVICES_DETAILED.map((s, i) => ({
                  "@type": "Service",
                  position: i + 1,
                  name: s.title,
                  description: s.description,
                  provider: { "@id": "https://brancho.in/#organization" },
                  areaServed: "IN",
                  offers: {
                    "@type": "Offer",
                    price: s.price.replace("From ₹", "").replace("/sq ft", ""),
                    priceCurrency: "INR",
                  },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
