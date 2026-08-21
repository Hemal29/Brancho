import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: "My Account | Brancho",
  robots: { index: false, follow: false },
};

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Customer" role="customer">
      {children}
    </AppShell>
  );
}
