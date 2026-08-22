import type { Metadata } from "next";
import NewsroomPage from "@/components/pages/NewsroomPage";

export const metadata: Metadata = {
  title: "Newsroom — Company News & Announcements",
  description:
    "Latest announcements, technology deep-dives, safety protocols and stories from Brancho — India's trusted home services platform.",
  alternates: { canonical: "/newsroom" },
  openGraph: {
    title: "Brancho Newsroom",
    description: "Announcements, technology and the people behind Brancho.",
    url: "https://brancho.in/newsroom",
  },
};

export default function Page() {
  return <NewsroomPage />;
}
