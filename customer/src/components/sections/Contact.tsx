"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT } from "@/lib/data";

export default function Contact() {
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
    },
    {
      icon: Phone,
      title: "Phone",
      lines: [CONTACT.phone, "Mon–Sun · 8 AM to 9 PM"],
      href: "tel:+9118001234567",
    },
    {
      icon: Mail,
      title: "Email",
      lines: [CONTACT.email, "Support & partnerships"],
      href: `mailto:${CONTACT.email}`,
    },
  ];

  return (
    <section id="contact" className="relative bg-surface py-28 lg:py-36">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Contact"
          title="Let's make your home better"
          description="Book a service, ask a question or partner with us — our team responds within hours."
        />

        <div className="grid gap-10 lg:grid-cols-2">
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
                className="flex h-full min-h-[380px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-ink">
                  Thank you for reaching out
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Our team will get back to you within a few hours. For urgent
                  bookings, call us on {CONTACT.phone}.
                </p>
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
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-ink">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>AC Cleaning</option>
                    <option>Deep Home Cleaning</option>
                    <option>Electrician</option>
                    <option>Plumbing</option>
                    <option>Carpenter</option>
                    <option>Painting</option>
                    <option>Appliance Repair</option>
                    <option>Pest Control</option>
                    <option>Other / Partnership</option>
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
                    placeholder="Tell us about your requirement..."
                    className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-navy py-4 text-sm font-semibold text-white transition-all hover:bg-navy-soft hover:shadow-xl hover:shadow-navy/20"
                >
                  Book a Service
                </button>
                <p className="text-center text-xs text-muted">
                  By submitting, you agree to our privacy policy. We&apos;ll never share your data.
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
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {infoCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.title === "Corporate Office" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-line bg-surface-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-xl hover:shadow-navy/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-accent group-hover:text-white">
                    <card.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">{card.title}</h3>
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
                className="h-72 w-full grayscale-[35%] transition-all duration-500 hover:grayscale-0 lg:h-full lg:min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-navy/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <Clock size={13} className="text-gold" />
                Mon–Sun · 8 AM – 9 PM
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
