import type { Metadata } from "next";
import AppPage from "@/components/pages/AppPage";
import { jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Brancho App — Book, Track & Pay Home Services",
  description:
    "Download the Brancho app for iOS and Android. Book home services, track your professional live, pay securely and rate every visit. Also available as a partner app for professionals.",
  alternates: { canonical: "/app" },
  openGraph: {
    title: "Brancho App",
    description: "Book, track and pay for verified home services — and run your business on the partner app.",
    url: "https://brancho.in/app",
  },
};

export default function Page() {
  return (
    <>
      <AppPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              jsonLd["@graph"][0],
              {
                "@type": "SoftwareApplication",
                name: "Brancho — Home Services",
                operatingSystem: "iOS, Android",
                applicationCategory: "LifestyleApplication",
                offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  ratingCount: "25000",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
