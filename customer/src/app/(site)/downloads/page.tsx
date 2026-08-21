import type { Metadata } from "next";
import DownloadCenterPage from "@/components/pages/DownloadCenterPage";

export const metadata: Metadata = {
  title: "Download Center — Brand, Reports & Documents",
  description:
    "Official Brancho resources — brand book, media kit, company profile, annual report, corporate presentation and more.",
  alternates: { canonical: "/downloads" },
};

export default function Page() {
  return <DownloadCenterPage />;
}
