"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle2, Send } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterForm = z.infer<typeof schema>;

export default function Newsletter({ dark = false }: { dark?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Newsletter signup:", data.email);
    setSubmitted(true);
    reset();
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-10 sm:p-12 ${
        dark ? "bg-navy text-white" : "border border-line bg-surface-soft"
      }`}
    >
      <div className={`dot-grid absolute inset-0 opacity-30 ${dark ? "dot-grid-light" : ""}`} />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
              dark ? "border-white/15 bg-white/5 text-gold" : "border-navy/10 bg-surface text-accent-deep"
            }`}
          >
            <Mail size={13} />
            The Brancho Bulletin
          </span>
          <h2 className={`text-balance text-3xl font-semibold leading-tight sm:text-4xl ${dark ? "text-white" : "text-navy"}`}>
            Care tips, offers and company news — once a month, never spam.
          </h2>
          <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
            Join 50,000+ families who get our monthly home-care newsletter. Unsubscribe anytime.
          </p>
        </div>

        <div>
          {submitted ? (
            <div className={`flex items-start gap-4 rounded-2xl border p-6 ${dark ? "border-gold/30 bg-gold/10" : "border-accent/30 bg-accent/10"}`}>
              <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <p className="font-semibold text-gold">You&apos;re on the list!</p>
                <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-muted"}`}>
                  Welcome to the Brancho Bulletin. Watch your inbox for our next edition.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={`w-full rounded-full border px-5 py-3.5 text-sm outline-none transition-colors ${
                      dark
                        ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-gold"
                        : "border-line bg-surface text-ink placeholder:text-muted focus:border-accent"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 px-2 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all disabled:opacity-60 ${
                    dark ? "bg-gold text-navy hover:brightness-110" : "bg-navy text-white hover:bg-navy-soft"
                  }`}
                >
                  {isSubmitting ? "Signing up…" : (
                    <>
                      Subscribe
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
