import type { Metadata } from "next";
import MediaVideosPage from "@/components/pages/MediaVideosPage";

export const metadata: Metadata = {
  title: "Media Videos — Brand Films & Explainers",
  description:
    "Watch the Brancho story — brand films, explainers and the people behind every home service.",
  alternates: { canonical: "/media/videos" },
};

export default function Page() {
  return <MediaVideosPage />;
}
