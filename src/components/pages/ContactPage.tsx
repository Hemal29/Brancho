"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { CONTACT, FAQS } from "@/lib/data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const infoCards = [
    {
      icon: MapPin,
      title: "Corporate Office",
      lines: [CONTACT.address],
      href: "https://maps.google.com/?q=Bodakdev,Ahmedabad",
      external: true,
    },
    {
      icon: Phone,
      title: "Phone",
      lines: [CONTACT.phone, "Mon–Sun · 8 AM to 9 PM"],
      href: "tel:+9118001234567",
      external: false,
    },
    {
      icon: Mail,
      title: "Email",
      lines: [CONTACT.email, "Support & partnerships"],
      href: `mailto:${CONTACT.email}`,
      external: false,
    },
    {
      icon: Clock,
      title: "Support Hours",
      lines: ["Every day, 8 AM – 9 PM", "Response within a few hours"],
      href: undefined,
      external: false,
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Talk to the team behind 100,000 happy homes."
        description="Book a service, ask a question or explore a partnership. Our team responds within hours, in English, Hindi or Gujarati."
      />

      {/* Form + info */}
      <section className="bg-surface pb-24 lg:pb-32">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-line bg-surface-soft p-8 sm:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CheckCircle2 size={32} />
                </span>
                <h2 className="mt-6 font-heading text-2xl font-semibold text-ink">
                  Thank you for reaching out
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Our team will get back to you within a few hours. For urgent
                  bookings, call us on {CONTACT.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-ink">
                    Reason for Contact
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option>Book a service</option>
                    <option>Customer support</option>
                    <option>Become a service partner</option>
                    <option>Corporate partnership</option>
                    <option>Press & media</option>
                    <option>Careers / general enquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-navy py-4 text-sm font-semibold text-white transition-all hover:bg-navy-soft hover:shadow-xl hover:shadow-navy/20"
                >
                  Send Message
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-xs text-muted">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </motion.div>

          {/* Info + map */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {infoCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group rounded-2xl border border-line bg-surface-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-xl hover:shadow-navy/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-accent group-hover:text-white">
                    <card.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-navy">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="mt-1.5 text-sm leading-relaxed text-muted">
                      {line}
                    </p>
                  ))}
                </a>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-3xl border border-line">
              <iframe
                title="Brancho Corporate Office — Bodakdev, Ahmedabad"
                src="https://maps.google.com/maps?q=Bodakdev%2C%20Ahmedabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-80 w-full grayscale-[35%] transition-all duration-500 hover:grayscale-0 lg:h-full lg:min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-navy/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <MapPin size={13} className="text-gold" />
                Ahmedabad · Gujarat
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section id="faq" className="border-t border-line bg-surface-soft py-24">
        <div className="container-wide max-w-3xl">
          <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Quick answers
          </h2>
          <div className="space-y-4">
            {FAQS.slice(0, 4).map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-line bg-surface p-7">
                <h3 className="font-heading text-base font-semibold text-navy">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted">
            More questions?{" "}
            <Link href="/services" className="font-semibold text-accent-deep hover:text-accent">
              Visit the Services page
            </Link>{" "}
            or call us at {CONTACT.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
