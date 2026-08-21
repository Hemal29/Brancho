import type { Metadata } from "next";
import FaqsPage from "@/components/pages/FaqsPage";
import { FAQS_EXTRA } from "@/lib/corporate";

export const metadata: Metadata = {
  title: "FAQs — Help Centre & Answers",
  description:
    "Answers to the most common questions about Brancho — verification, pricing, refunds, cities, emergency services, becoming a partner and more.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Brancho FAQs — Help Centre",
    description: "Straight answers about verification, pricing, refunds and more.",
    url: "https://brancho.in/faqs",
  },
};

export default function Page() {
  return (
    <>
      <FaqsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS_EXTRA.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
