import type { Metadata } from "next";
import BusinessesPage from "@/components/pages/BusinessesPage";

export const metadata: Metadata = {
  title: "Brancho Businesses — Water, Home Care, Urgent Care, MyFamNest, Students",
  description:
    "Explore the Brancho family of businesses: Brancho Water, Brancho Home Care, Brancho Urgent Care, MyFamNest and Brancho Students — each built on one promise of trust.",
  alternates: { canonical: "/businesses" },
  openGraph: {
    title: "Brancho Businesses — One family of companies",
    description:
      "From the water you drink to the security of your family, Brancho is a portfolio of specialised businesses.",
    url: "https://brancho.in/businesses",
  },
};

export default function Page() {
  return <BusinessesPage />;
}
