import type { Metadata } from "next";
import LegalLayout from "@/components/pages/LegalLayout";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Brancho's cancellation policy — free cancellation windows, rescheduling and fees for late cancellation or no-show.",
  alternates: { canonical: "/legal/cancellation-policy" },
};

const SECTIONS = [
  {
    id: "free-window",
    title: "Free Cancellation Window",
    body: [
      "You can cancel or reschedule any scheduled booking free of charge up to 2 hours before the start of your slot — directly in the app, with instant confirmation.",
      "No questions asked, no fees. Your advance payment is refunded to your original payment method or wallet.",
    ],
  },
  {
    id: "late-cancellation",
    title: "Late Cancellation",
    body: [
      "Cancellations made less than 2 hours before the slot, or after our professional has been dispatched, may incur a nominal fee to cover dispatch and scheduling costs.",
      "This fee is shown clearly at cancellation so there are never surprises.",
    ],
  },
  {
    id: "no-show",
    title: "No-Show Policy",
    body: [
      "If our professional arrives at your location and you are not present or the professional is denied entry, the booking may be treated as a no-show.",
      "After a single no-show, we contact you to reschedule. Repeated no-shows may require advance payment for future bookings.",
    ],
  },
  {
    id: "professional-side",
    title: "If the Professional Cancels",
    body: [
      "If a professional cancels or fails to arrive, we reschedule you at no cost, upgrade your priority, and — if you prefer — cancel the booking with a full refund.",
      "In addition, you may receive a promo credit on your account as an apology for the inconvenience.",
    ],
  },
  {
    id: "plans",
    title: "Plans & Subscriptions",
    body: [
      "Home Care Plans and annual AMCs can be cancelled anytime. We refund pro-rata for unused months and deduct the value of services already delivered.",
      "Activated AMC renewals can be cancelled up to 30 days before renewal with no fee.",
    ],
  },
  {
    id: "contact",
    title: "Questions?",
    body: [
      "For help with a cancellation, contact support@brancho.in or call 1800 123 4567 — our team will sort it out quickly.",
    ],
  },
];

export default function Page() {
  return (
    <LegalLayout
      title="Cancellation Policy"
      updated="August 2026"
      intro="Life happens. This policy keeps cancellations fair, simple and predictable — for you and for the professionals who show up for your home."
      sections={SECTIONS}
    />
  );
}
