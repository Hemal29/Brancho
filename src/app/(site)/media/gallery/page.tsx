import type { Metadata } from "next";
import MediaGalleryPage from "@/components/pages/MediaGalleryPage";

export const metadata: Metadata = {
  title: "Media Gallery — Photos",
  description:
    "A documentary-style gallery of Brancho's work — real homes, real professionals and real moments behind every service.",
  alternates: { canonical: "/media/gallery" },
};

export default function Page() {
  return <MediaGalleryPage />;
}
