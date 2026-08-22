import type { Metadata } from "next";
import LegalLayout from "@/components/pages/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Brancho uses cookies and similar technologies to keep our platform secure, fast and personal — and how you can control them.",
  alternates: { canonical: "/legal/cookie-policy" },
};

const SECTIONS = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies",
    body: [
      "Cookies are small text files stored on your device when you visit a website. They help websites remember you, understand how they're used and keep things secure.",
      "We also use similar technologies — local storage, pixels and device fingerprints — for the same purposes.",
    ],
  },
  {
    id: "we-use",
    title: "Cookies We Use",
    body: [
      "Essential cookies — required for the platform to work: keeping you logged in, protecting against fraud and remembering your cart and slot selections.",
      "Preference cookies — remembering your language, city and display preferences so you don't set them again.",
      "Analytics cookies — helping us understand how visitors use the site so we can improve it. We use privacy-respecting, aggregated analytics.",
      "Marketing cookies — only with your consent, used to measure the effectiveness of our campaigns. We never sell your data.",
    ],
  },
  {
    id: "consent",
    title: "Your Choices",
    body: [
      "On your first visit, we show a cookie consent banner. You can accept all, reject non-essential cookies, or manage preferences.",
      "You can change your choices anytime from the cookie settings link in the footer. You can also block or delete cookies in your browser settings.",
      "Blocking essential cookies may stop the platform from working correctly — for example, you may not be able to complete a booking.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Cookies",
    body: [
      "Some pages embed content or tools from third parties (e.g., payment gateways, maps, analytics providers). These providers may set their own cookies under their own policies.",
      "Where you consent to marketing cookies, advertising partners may use them to show you relevant Brancho messages.",
    ],
  },
  {
    id: "updates",
    title: "Updates to This Policy",
    body: [
      "We review this policy as our technology and the law evolve. Any changes are posted on this page with an updated date.",
      "Significant changes will be highlighted in the app or by email.",
    ],
  },
  {
    id: "contact",
    title: "Questions?",
    body: [
      "For any question about cookies or your privacy, email support@brancho.in or read our full Privacy Policy.",
    ],
  },
];

export default function Page() {
  return (
    <LegalLayout
      title="Cookie Policy"
      updated="August 2026"
      intro="This policy explains how Brancho uses cookies and similar technologies, what each type does, and how you stay in control."
      sections={SECTIONS}
    />
  );
}
