import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import Newsletter from "@/components/corporate/Newsletter";
import { CONTACT, LEGAL_FAQ_LINKS } from "@/lib/corporate";

const SocialLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.15h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V24h-4.52v-8.02c0-1.91-.03-4.37-2.66-4.37-2.67 0-3.08 2.08-3.08 4.23V24H8.34V8.25z" />
  </svg>
);

const SocialTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.24 2.25h3.31l-7.23 8.26L22.5 21.75h-6.66l-5.22-6.82-5.97 6.82H1.34l7.73-8.84L1.5 2.25h6.83l4.72 6.24 5.19-6.24zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
  </svg>
);

const SocialInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const SocialYoutube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.6 15.6V8.4l6.23 3.6L9.6 15.6z" />
  </svg>
);

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Brancho", href: "/about" },
      { label: "Founder", href: "/founder" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Brand Guidelines", href: "/brand-guidelines" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Brancho Professionals", href: "/professionals" },
      { label: "Technology", href: "/technology" },
      { label: "Trust & Safety", href: "/trust" },
      { label: "Cities", href: "/cities" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Mobile App", href: "/app" },
      { label: "Download Center", href: "/downloads" },
      { label: "Media Gallery", href: "/media/gallery" },
      { label: "Press Resources", href: "/media/press" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Legal",
    links: LEGAL_FAQ_LINKS.map((l) => ({ label: l.label, href: l.href })),
  },
];

const socials = [
  { label: "LinkedIn", icon: SocialLinkedIn, href: "https://www.linkedin.com/company/brancho" },
  { label: "Twitter", icon: SocialTwitter, href: "https://twitter.com/brancho" },
  { label: "Instagram", icon: SocialInstagram, href: "https://www.instagram.com/brancho" },
  { label: "YouTube", icon: SocialYoutube, href: "https://youtube.com/@brancho" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="container-wide pt-20">
        <Newsletter dark />
      </div>

      <div className="container-wide relative pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Brancho home">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg">
                <Image
                  src="/brancho-logo.png"
                  alt="Brancho logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </span>
              <span className="font-heading text-2xl font-bold tracking-tight">Brancho</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              India&apos;s trusted home services platform — built on verification,
              transparency and respect for the professionals who do the work.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                {CONTACT.corporate.value}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href={`tel:${CONTACT.support.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {CONTACT.support.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href={`mailto:${CONTACT.support.email}`} className="transition-colors hover:text-white">
                  {CONTACT.support.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Brancho Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/50">Made with care in Veraval, Gujarat, India.</p>
        </div>
      </div>
    </footer>
  );
}
