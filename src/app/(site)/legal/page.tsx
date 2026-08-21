import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Legal & Registrations — Compliance",
  description:
    "Brancho's corporate registrations, certifications and official policies — GST, CIN, MSME, FSSAI, ISO and more, all in one place.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "Brancho Legal & Registrations",
    description: "Compliance, registrations and official policies — fully transparent.",
    url: "https://brancho.in/legal",
  },
};

export default function Page() {
  return <LegalPage />;
}
