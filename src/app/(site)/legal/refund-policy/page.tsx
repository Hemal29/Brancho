import type { Metadata } from "next";
import LegalLayout from "@/components/pages/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Brancho's refund policy — when refunds apply, how they're processed and what to do if you're not satisfied with a service.",
  alternates: { canonical: "/legal/refund-policy" },
};

const SECTIONS = [
  {
    id: "service-guarantee",
    title: "Our Service Guarantee",
    body: [
      "If you are not satisfied with a completed service, we make it right. Under our Service Guarantee, you can request a free re-service or a full refund — whichever you prefer — for any quality issue raised within 24 hours of service completion.",
      "The guarantee covers workmanship on the services described at the time of booking, subject to fair wear and tear and pre-existing conditions.",
    ],
  },
  {
    id: "eligible-refunds",
    title: "When Refunds Apply",
    body: [
      "You may be eligible for a refund when: the service was not completed to the agreed scope; the professional could not perform the service despite making a good-faith attempt; you cancelled within the free-cancellation window; or a quality issue was confirmed by our team.",
      "Advance payments for monthly/annual plans that are cancelled mid-cycle are refunded pro-rata for unused months, minus any services already delivered.",
    ],
  },
  {
    id: "amount",
    title: "Refund Amounts",
    body: [
      "Refunds are calculated on the amount you actually paid. Discounts and coupons are not refundable in cash unless required by law.",
      "If only part of a booking was completed, we refund the value of the uncompleted portion based on the itemised quote.",
    ],
  },
  {
    id: "processing",
    title: "Processing Time",
    body: [
      "Approved refunds are processed within 5–7 working days to the original payment method, or to your Brancho wallet if you prefer.",
      "Card and net-banking refunds may take an additional 2–4 working days depending on your bank. Wallet refunds are instant.",
    ],
  },
  {
    id: "how-to-request",
    title: "How to Request a Refund",
    body: [
      "Raise a refund request through the app under 'My Bookings', or contact support@brancho.in with your booking ID.",
      "Our team reviews each request within 24 hours. For quality disputes, we may schedule a free re-service first; you are always free to decline it and take the refund instead.",
    ],
  },
  {
    id: "exceptions",
    title: "Exceptions",
    body: [
      "Refunds do not apply to: services deliberately damaged after completion; third-party costs (e.g., replacement parts already purchased); or bookings where the professional was denied entry without notice.",
      "Emergency (Urgent Care) callouts that are cancelled after dispatch are subject to the cancellation policy.",
    ],
  },
  {
    id: "contact",
    title: "Questions?",
    body: [
      "For any refund-related question, email support@brancho.in or call 1800 123 4567. Our team responds within one business day.",
    ],
  },
];

export default function Page() {
  return (
    <LegalLayout
      title="Refund Policy"
      updated="August 2026"
      intro="We want you to be confident every time you book with Brancho. This policy explains when refunds apply, how they're calculated and how to request one."
      sections={SECTIONS}
    />
  );
}
