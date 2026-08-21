import type { Metadata } from "next";
import HowItWorksPage from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = {
  title: "How It Works — Book, Track & Get Services",
  description:
    "Six simple steps to a perfect home service: choose a service, book a slot, get a verified professional assigned, track them live, complete the work and pay securely.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Brancho Works",
    description: "Book, track and pay for verified home services in six simple steps.",
    url: "https://brancho.in/how-it-works",
  },
};

export default function Page() {
  return <HowItWorksPage />;
}
