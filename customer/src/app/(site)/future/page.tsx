import type { Metadata } from "next";
import FuturePage from "@/components/pages/FuturePage";

export const metadata: Metadata = {
  title: "The Future — Foundation, AI, Global Expansion & More",
  description:
    "Brancho's roadmap for the next decade — the Brancho Foundation, CSR, Innovation Lab, AI platform, global expansion, investor relations and sustainability.",
  alternates: { canonical: "/future" },
  openGraph: {
    title: "The Future of Brancho",
    description: "From our foundation and innovation lab to global expansion.",
    url: "https://brancho.in/future",
  },
};

export default function Page() {
  return <FuturePage />;
}
