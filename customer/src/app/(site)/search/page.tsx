import type { Metadata } from "next";
import SearchPage from "@/components/pages/SearchPage";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across Brancho's pages, businesses, services and newsroom.",
  alternates: { canonical: "/search" },
};

export default function Page() {
  return <SearchPage />;
}
