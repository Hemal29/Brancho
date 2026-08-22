import type { Metadata } from "next";
import LegalLayout from "@/components/pages/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Brancho collects, uses and protects your personal data. Our privacy commitments to customers, service professionals and website visitors.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This Privacy Policy explains how Brancho Technologies Pvt. Ltd. ('Brancho', 'we', 'us') collects, uses, shares and protects information about you when you use our websites, mobile applications, and services across India.",
      "We are committed to protecting your privacy and to handling your personal information with care, transparency and respect. By using our services, you agree to the practices described in this policy.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      "Account information: your name, phone number, email address, home address and city when you register or book a service.",
      "Service information: details of services you book, your order history, ratings and reviews, and records of communications with our support team.",
      "Verification information: for service professionals, this includes identity documents, address proof and police verification records used solely to protect the safety of our customers.",
      "Technical information: device type, app version, IP address, approximate location and usage analytics collected automatically to improve our services.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    body: [
      "To provide and personalise our services, including matching you with the right professional, processing payments and sending you booking updates.",
      "To ensure the safety and security of every home visit through verification, live tracking and quality monitoring.",
      "To improve our platform through analytics, research and feedback, and to contact you about service updates.",
      "To comply with legal obligations and to exercise or defend our legal rights.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    body: [
      "We share the minimum information necessary with our verified service professionals (for example, your name and address for the booked service) to deliver the service you requested.",
      "We work with trusted payment partners, cloud infrastructure providers and analytics services that are contractually bound to protect your data.",
      "We never sell your personal information to third parties, and we never share it for advertising without your consent.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    body: [
      "We use industry-standard safeguards including 256-bit encryption in transit, encrypted storage at rest, access controls and routine security reviews.",
      "Payment card data is processed by PCI-DSS-compliant payment partners. We do not store full card numbers on our systems.",
      "In the event of a security incident, we will notify affected users and relevant authorities as required by applicable law.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention & Your Rights",
    body: [
      "We retain personal information only as long as necessary to provide our services, comply with legal obligations, and resolve disputes.",
      "You may request access to, correction of, or deletion of your personal information at any time by contacting support@brancho.in.",
      "You can control marketing communications through your in-app preferences or by unsubscribing at any time.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "For any privacy-related questions, requests or concerns, contact our Data Protection team at support@brancho.in or write to our registered office in Junagadh, Gujarat, India.",
      "We aim to respond to all privacy requests within 15 working days.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="August 2026"
      intro="Your trust is the foundation of Brancho. This policy explains, in plain language, how we handle the personal information of our customers, service professionals and website visitors."
      sections={SECTIONS}
    />
  );
}
