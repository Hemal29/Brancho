import type { Metadata } from "next";
import MediaPressPage from "@/components/pages/MediaPressPage";

export const metadata: Metadata = {
  title: "Press Resources — Media & Journalists",
  description:
    "Latest press coverage, brand assets and media enquiries for journalists covering Brancho — India's trusted home services platform.",
  alternates: { canonical: "/media/press" },
};

export default function Page() {
  return <MediaPressPage />;
}
