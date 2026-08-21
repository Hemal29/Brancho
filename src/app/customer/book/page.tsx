"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Loader2,
  MapPin,
  Star,
  CheckCircle2,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { api, formatINR } from "@/lib/client";
import { cn } from "@/lib/utils";

type Service = { id: number; name: string; category: string; image: string; basePrice: string; unit: string; durationMins: number };
type Professional = { id: number; name: string; rating: string; numReviews: number; jobsCompleted: number; city: string; avatar: string | null; bio: string | null };
type Address = { id: number; label: string; addressLine: string; city: string; zipCode: string; isDefault: number };
type Booking = {
  id: number;
  bookingId: string;
  serviceName: string;
  payableAmount: string;
  scheduledAt: string;
};

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00"];

export default function BookPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const [service, setService] = useState<Service | null>(null);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number; payableAmount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    (async () => {
      const [s, a] = await Promise.all([api<{ services: Service[] }>("/api/services"), api<{ addresses: Address[] }>("/api/addresses")]);
      if (s.ok) setServices(s.data!.services);
      if (a.ok) setAddresses(a.data!.addresses);
      setLoading(false);
    })();
  }, []);

  const selectService = async (svc: Service) => {
    setService(svc);
    const res = await api<{ professionals: Professional[] }>(`/api/services/${svc.id}`);
    if (res.ok) setProfessionals(res.data!.professionals);
    setStep(2);
  };

  const applyCoupon = async () => {
    if (!service || !couponCode.trim()) return;
    setCouponMsg("");
    const res = await api<{ code: string; discount: number; payableAmount: number }>("/api/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code: couponCode, amount: service.basePrice }),
    });
    if (res.ok) {
      setCoupon({ code: res.data!.code, discount: res.data!.discount, payableAmount: res.data!.payableAmount });
      setCouponMsg("Coupon applied");
    } else {
      setCoupon(null);
      setCouponMsg(res.message || "Invalid coupon");
    }
  };

  const confirm = async () => {
    if (!service || !address || !date || !slot) return;
    setBusy(true);
    try {
      const b = await api<{ booking: Booking }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          serviceId: service.id,
          professionalId: professional?.id ?? null,
          addressId: address.id,
          scheduledAt: `${date}T${slot}:00`,
          paymentMethod,
          notes,
          couponCode: coupon?.code,
        }),
      });
      if (!b.ok || !b.data) {
        alert(b.message || "Could not create booking.");
        setBusy(false);
        return;
      }
      if (paymentMethod === "cod") {
        setBooking({ ...b.data.booking, scheduledAt: `${date}T${slot}:00` });
        setStep(4);
        setBusy(false);
        return;
      }
      const p = await api<{ transactionId: string }>("/api/payments", {
        method: "POST",
        body: JSON.stringify({ bookingId: b.data.booking.id, method: paymentMethod }),
      });
      if (!p.ok) {
        alert(p.message || "Payment failed, but your booking was saved. Try paying from My Bookings.");
      }
      setBooking({ ...b.data.booking, scheduledAt: `${date}T${slot}:00` });
      setStep(4);
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {["Service", "Professional", "Payment"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                step > i ? "bg-gold text-navy" : step === i + 1 ? "bg-navy text-white" : "bg-secondary text-muted"
              )}
            >
              {i + 1}
            </span>
            <span className={cn("text-xs font-semibold", step === i + 1 ? "text-ink" : "text-muted")}>{label}</span>
            {i < 2 && <span className="mx-1 h-px w-6 bg-line" />}
          </div>
        ))}
      </div>

      {/* STEP 1: Services */}
      {step === 1 && (
        <div>
          <h2 className="mb-1 font-heading text-2xl font-bold text-ink">Choose a service</h2>
          <p className="mb-6 text-sm text-muted">Select what you need, and we&apos;ll match you with the right professional.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => selectService(s)}
                className="card group flex items-center gap-4 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent"
              >
                <img src={s.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-muted">
                    {formatINR(s.basePrice)} {s.unit} · {s.durationMins} min
                  </p>
                </div>
                <ArrowRight size={18} className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Professional + schedule */}
      {step === 2 && service && (
        <div>
          <button onClick={() => setStep(1)} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
            <ChevronLeft size={16} /> Change service
          </button>
          <h2 className="mb-1 font-heading text-2xl font-bold text-ink">{service.name}</h2>
          <p className="mb-6 text-sm text-muted">
            {formatINR(service.basePrice)} {service.unit} · {service.durationMins} min · Free cancellation up to 2 hours before
          </p>

          <p className="mb-3 text-sm font-semibold text-ink">1. Choose a professional</p>
          <div className="mb-6 space-y-2.5">
            {professionals.length === 0 && (
              <p className="rounded-xl border border-line p-4 text-sm text-muted">We&apos;ll assign the best available professional.</p>
            )}
            {professionals.map((p) => (
              <button
                key={p.id}
                onClick={() => setProfessional(p)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-3.5 text-left transition-all",
                  professional?.id === p.id ? "border-accent bg-gold/10" : "border-line hover:border-accent/50"
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-sm font-bold text-navy">
                  {p.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-muted">{p.jobsCompleted} jobs completed · {p.city}</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-ink">
                  <Star size={13} className="fill-gold text-gold" /> {p.rating}
                </span>
              </button>
            ))}
            <button
              onClick={() => setProfessional(null)}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border p-3.5 text-left text-sm transition-all",
                professional === null ? "border-accent bg-gold/10" : "border-line hover:border-accent/50"
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-navy">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-semibold text-ink">Let Brancho assign the best</p>
                <p className="text-xs text-muted">Highest-rated available professional</p>
              </div>
            </button>
          </div>

          <p className="mb-3 text-sm font-semibold text-ink">2. Choose a location</p>
          <div className="mb-6 space-y-2.5">
            {addresses.length === 0 && (
              <div className="rounded-xl border border-line p-4 text-sm text-muted">
                No addresses saved yet.{" "}
                <Link href="/customer/addresses" className="font-semibold text-accent-deep">
                  Add an address
                </Link>
              </div>
            )}
            {addresses.map((a) => (
              <button
                key={a.id}
                onClick={() => setAddress(a)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-3.5 text-left transition-all",
                  address?.id === a.id ? "border-accent bg-gold/10" : "border-line hover:border-accent/50"
                )}
              >
                <MapPin size={18} className="shrink-0 text-accent-deep" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{a.label}</p>
                  <p className="truncate text-xs text-muted">
                    {a.addressLine}, {a.city} {a.zipCode}
                  </p>
                </div>
                {a.isDefault === 1 && <span className="text-[11px] font-semibold text-accent-deep">Default</span>}
              </button>
            ))}
          </div>

          <p className="mb-3 text-sm font-semibold text-ink">3. When?</p>
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">Date</label>
              <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">Time slot</label>
              <div className="flex flex-wrap gap-1.5">
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
                      slot === s ? "border-accent bg-navy text-white" : "border-line text-muted hover:border-accent/50"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input mb-6 min-h-20"
            placeholder="Notes for the professional (optional)"
          />

          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Service price</p>
              <p className="text-xs text-muted">No hidden charges</p>
            </div>
            <p className="font-heading text-xl font-bold text-ink">{formatINR(service.basePrice)}</p>
          </div>

          <button onClick={() => setStep(3)} disabled={!date || !slot} className="btn-primary mt-6 w-full py-3.5 disabled:opacity-50">
            Continue to Payment <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 3: Payment */}
      {step === 3 && service && (
        <div>
          <button onClick={() => setStep(2)} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
            <ChevronLeft size={16} /> Back
          </button>
          <h2 className="mb-6 font-heading text-2xl font-bold text-ink">Confirm &amp; pay</h2>

          <div className="card mb-6 divide-y divide-line">
            <SummaryRow label="Service" value={service.name} />
            <SummaryRow label="Professional" value={professional?.name ?? "Brancho will assign"} />
            <SummaryRow label="Date & time" value={`${new Date(`${date}T${slot}`).toLocaleString("en-IN", { day: "numeric", month: "short" })} · ${slot}`} />
            <SummaryRow label="Location" value={`${address?.label}: ${address?.addressLine}`} />
          </div>

          <div className="card mb-6 p-4">
            <label className="mb-1.5 block text-xs font-semibold text-muted">Have a coupon?</label>
            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="input flex-1 uppercase"
                placeholder="Enter coupon code"
              />
              <button onClick={applyCoupon} className="btn-outline">
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={cn("mt-2 flex items-center gap-1 text-xs font-semibold", coupon ? "text-emerald-600" : "text-rose-600")}>
                {coupon ? <CheckCircle2 size={13} /> : <Tag size={13} />}
                {couponMsg}
              </p>
            )}
          </div>

          <p className="mb-3 text-sm font-semibold text-ink">Payment method</p>
          <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {["upi", "card", "netbanking", "cod"].map((m) => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={cn(
                  "rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition-all",
                  paymentMethod === m ? "border-accent bg-gold/10 text-ink" : "border-line text-muted hover:border-accent/50"
                )}
              >
                {m === "upi" ? "UPI" : m === "cod" ? "Pay on service" : m === "card" ? "Card" : "Net banking"}
              </button>
            ))}
          </div>

          <div className="card mb-6 space-y-2 p-5">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">{formatINR(service.basePrice)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-sm text-muted">
                <span>Coupon ({coupon.code})</span>
                <span className="font-semibold text-emerald-600">− {formatINR(coupon.discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-line pt-3">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-heading text-xl font-bold text-ink">
                {formatINR(coupon ? coupon.payableAmount : service.basePrice)}
              </span>
            </div>
          </div>

          <button onClick={confirm} disabled={busy} className="btn-gold w-full py-3.5 disabled:opacity-60">
            {busy && <Loader2 size={16} className="animate-spin" />}
            {paymentMethod === "cod" ? "Confirm Booking" : "Pay " + formatINR(coupon ? coupon.payableAmount : service.basePrice)}
          </button>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 4 && booking && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={30} />
          </span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-ink">Booking confirmed!</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            Your {booking.serviceName} booking is confirmed. We&apos;ve sent you a notification with the details.
          </p>
          <div className="mx-auto mt-6 max-w-xs space-y-2 rounded-xl bg-secondary p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Booking ID</span>
              <span className="font-bold text-ink">{booking.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Amount</span>
              <span className="font-bold text-ink">{formatINR(booking.payableAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Status</span>
              <span className="font-bold capitalize text-emerald-600">{paymentMethod === "cod" ? "Confirmed" : "Paid"}</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/customer/bookings/${booking.id}`} className="btn-primary">
              Track booking
            </Link>
            <Link href="/customer/book" className="btn-outline">
              Book another
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-4 text-sm">
      <span className="text-muted">{label}</span>
      <span className="max-w-[60%] text-right font-semibold text-ink">{value}</span>
    </div>
  );
}
