import type { Metadata } from "next";
import BrandGuidelinesPage from "@/components/pages/BrandGuidelinesPage";

export const metadata: Metadata = {
  title: "Brand Guidelines — Identity & Design System",
  description:
    "The Brancho brand defined — charcoal and gold, Manrope and Inter, logo rules, voice, iconography and photography. Download the official brand assets.",
  alternates: { canonical: "/brand-guidelines" },
  openGraph: {
    title: "Brancho Brand Guidelines",
    description: "Trust, clarity and warmth — the Brancho identity, defined.",
    url: "https://brancho.in/brand-guidelines",
  },
};

export default function Page() {
  return <BrandGuidelinesPage />;
}
