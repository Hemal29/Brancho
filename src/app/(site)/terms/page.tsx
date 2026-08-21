import type { Metadata } from "next";
import LegalLayout from "@/components/pages/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing the use of Brancho's home services platform, website and mobile applications.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    body: [
      "These Terms of Service ('Terms') govern your access to and use of the Brancho website, mobile applications and home services platform operated by Brancho Technologies Pvt. Ltd. ('Brancho', 'we', 'us').",
      "By creating an account, booking a service, or using any part of our platform, you agree to these Terms. If you do not agree, please do not use our services.",
    ],
  },
  {
    id: "services",
    title: "Our Services",
    body: [
      "Brancho is a technology platform that connects homeowners with independently verified and contracted service professionals for home services including cleaning, repairs, maintenance and installation.",
      "Brancho facilitates bookings, payments, verification, quality checks and dispute resolution. Individual services are performed by our service professionals, who are responsible for their own workmanship.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings & Pricing",
    body: [
      "All prices shown are indicative and are confirmed at the time of booking. Prices may vary based on your city, the size of the job and any customisation requested.",
      "Brancho is committed to upfront pricing. If additional work is required, our professional will obtain your approval and a revised quote before proceeding.",
      "You may reschedule or cancel a booking free of charge up to 2 hours before the scheduled slot. Cancellations after that window may incur a nominal fee.",
    ],
  },
  {
    id: "payments",
    title: "Payments & Refunds",
    body: [
      "Payments are processed securely through our payment partners using UPI, cards, wallets and net banking.",
      "If a service is not completed to the agreed scope, or if you are not satisfied with the quality, we offer our Service Guarantee: a free re-service or a refund, at your choice.",
      "Refunds, where applicable, are processed to the original payment method within 7-10 business days.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: [
      "You agree to use our platform only for lawful purposes and to treat our service professionals with dignity and respect at all times.",
      "You must provide accurate information when booking and ensure a safe environment for the professional to work in.",
      "Misuse of the platform, fraudulent activity, or harassment of professionals or other users may result in account suspension and legal action.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "Our Service Guarantee covers workmanship on completed services as described at the time of booking, subject to fair wear and tear and pre-existing conditions.",
      "To the maximum extent permitted by law, Brancho's total liability arising from a booking is limited to the amount paid for that booking.",
      "Nothing in these Terms limits rights you have under applicable consumer protection law in India.",
    ],
  },
  {
    id: "changes",
    title: "Changes to Terms",
    body: [
      "We may update these Terms from time to time to reflect changes in our services, technology and legal requirements.",
      "Material changes will be communicated through the app or by email. Continued use of our services after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact & Governing Law",
    body: [
      "These Terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Ahmedabad, Gujarat.",
      "For questions about these Terms, contact support@brancho.in or our registered office in Ahmedabad, Gujarat, India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="August 2026"
      intro="These terms govern your use of the Brancho platform — as a customer, a visitor, or a service professional. We've written them to be fair, clear and enforceable."
      sections={SECTIONS}
    />
  );
}
