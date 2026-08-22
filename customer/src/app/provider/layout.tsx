import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: "Provider Dashboard | Brancho",
  robots: { index: false, follow: false },
};

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Provider" role="provider">
      {children}
    </AppShell>
  );
}
