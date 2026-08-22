import type { Metadata } from "next";
import CompanyPage from "../company/page";

export const metadata: Metadata = {
  title: "About Brancho",
  description:
    "Learn who Brancho is, why we exist and how we are building India's most trusted home services platform.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <CompanyPage />;
}
