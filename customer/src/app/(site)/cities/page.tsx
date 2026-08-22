import type { Metadata } from "next";
import CitiesPage from "@/components/pages/CitiesPage";

export const metadata: Metadata = {
  title: "Cities — Brancho Home Services Across India",
  description:
    "Brancho serves Veraval, Rajkot and Junagadh across Gujarat — with more cities launching soon.",
  alternates: { canonical: "/cities" },
  openGraph: {
    title: "Brancho Cities",
    description: "Live in 6 anchor cities, expanding across India.",
    url: "https://brancho.in/cities",
  },
};

export default function Page() {
  return <CitiesPage />;
}
