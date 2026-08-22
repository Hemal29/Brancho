"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, MapPin, Star, CheckCircle2 } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { Badge } from "@/components/app/StatCard";

type BookingDetail = {
  id: number;
  bookingId: string;
  serviceName: string;
  serviceImage: string;
  serviceDescription: string;
  professionalName: string | null;
  professionalPhone: string | null;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  scheduledAt: string;
  amount: string;
  discountAmount: string;
  payableAmount: string;
  bookingStatus: string;
  couponCode: string | null;
  notes: string | null;
  rating: number | null;
  feedback: string | null;
  createdAt: string;
};

const TIMELINE = ["pending", "confirmed", "assigned", "in_progress", "completed"];

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const load = async () => {
    const res = await api<{ booking: BookingDetail }>(`/api/bookings/${id}`);
    if (res.ok) {
      setBooking(res.data!.booking);
    } else {
      router.replace("/customer/bookings");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateStatus = async (status: string) => {
    setBusy(true);
    const res = await api(`/api/bookings/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    setBusy(false);
    if (res.ok) load();
    else alert(res.message);
  };

  const submitReview = async () => {
    setBusy(true);
    const res = await api("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ bookingId: id, rating, comment }),
    });
    setBusy(false);
    if (res.ok) {
      setReviewMode(false);
      load();
    } else alert(res.message);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-accent" />
      </div>
    );
  }
  if (!booking) return null;

  const timelineIdx = TIMELINE.indexOf(booking.bookingStatus);
  const canCancel = ["pending", "confirmed"].includes(booking.bookingStatus);
  const canReview = booking.bookingStatus === "completed" && booking.rating === null;

  return (
    <div>
      <Link href="/customer/bookings" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
        <ChevronLeft size={16} /> All bookings
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-ink">{booking.serviceName}</h2>
          <p className="text-sm text-muted">
            {booking.bookingId} · booked {formatDateTime(booking.createdAt)}
          </p>
        </div>
        <Badge status={booking.bookingStatus} />
      </div>

      {/* Timeline */}
      <div className="card mb-6 flex flex-wrap items-center gap-1 p-5">
        {TIMELINE.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                  i <= timelineIdx ? "bg-gold text-navy" : "bg-surface-soft text-muted"
                }`}
              >
                {i < timelineIdx ? <CheckCircle2 size={14} /> : i + 1}
              </span>
              <span className={`text-[10px] font-semibold capitalize ${i <= timelineIdx ? "text-ink" : "text-muted"}`}>
                {step.replace("_", " ")}
              </span>
            </div>
            {i < TIMELINE.length - 1 && <span className={`mx-2 mb-5 h-px w-8 sm:w-14 ${i < timelineIdx ? "bg-gold" : "bg-line"}`} />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Service details</h3>
            <div className="flex items-start gap-4">
              <img src={booking.serviceImage || "/services/ac-cleaning.svg"} alt="" className="h-20 w-20 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-ink">{booking.serviceName}</p>
                {booking.professionalName && (
                  <p className="text-sm text-muted">
                    Professional: <span className="font-semibold text-ink">{booking.professionalName}</span>
                  </p>
                )}
                <p className="mt-1 text-sm text-muted">
                  <MapPin size={13} className="mr-1 inline" />
                  {booking.addressLine}, {booking.city} {booking.zipCode}
                </p>
                {booking.notes && <p className="mt-2 text-sm text-muted">Note: {booking.notes}</p>}
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Price details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Service price</span>
                <span className="font-semibold text-ink">{formatINR(booking.amount)}</span>
              </div>
              {Number(booking.discountAmount) > 0 && (
                <div className="flex justify-between text-muted">
                  <span>Coupon {booking.couponCode}</span>
                  <span className="font-semibold text-emerald-600">− {formatINR(booking.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-2">
                <span className="font-semibold text-ink">Total payable</span>
                <span className="font-heading text-lg font-bold text-ink">{formatINR(booking.payableAmount)}</span>
              </div>
              <p className="text-xs text-muted">Pay the professional directly after the service is completed.</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {canCancel && (
                <button
                  onClick={() => {
                    if (confirm("Cancel this booking?")) updateStatus("cancelled");
                  }}
                  disabled={busy}
                  className="rounded-full border border-rose-200 px-5 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                >
                  Cancel booking
                </button>
              )}
              {canReview && (
                <button onClick={() => setReviewMode(true)} className="btn-primary">
                  <Star size={14} className="fill-gold text-gold" /> Rate this service
                </button>
              )}
            </div>
          </div>

          {reviewMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-5">
              <h3 className="mb-3 font-heading text-lg font-semibold text-ink">Leave a review</h3>
              <div className="mb-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setRating(r)} aria-label={`${r} stars`}>
                    <Star size={26} className={r <= rating ? "fill-gold text-gold" : "text-line"} />
                  </button>
                ))}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="input mb-3 min-h-20" placeholder="Share your experience (optional)" />
              <div className="flex gap-2">
                <button onClick={submitReview} disabled={busy} className="btn-primary">
                  {busy && <Loader2 size={14} className="animate-spin" />} Submit review
                </button>
                <button onClick={() => setReviewMode(false)} className="btn-outline">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          {booking.professionalName && (
            <div className="card p-5">
              <h3 className="mb-3 font-heading text-lg font-semibold text-ink">Your professional</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft text-base font-bold text-ink">
                  {booking.professionalName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-ink">{booking.professionalName}</p>
                  <p className="text-xs text-muted">{booking.professionalPhone || "Contact via support"}</p>
                </div>
              </div>
            </div>
          )}

          <div className="card p-5 text-sm">
            <h3 className="mb-2 font-heading text-lg font-semibold text-ink">Need help?</h3>
            <p className="text-muted">Questions about this booking?</p>
            <Link href="/customer/support" className="mt-3 inline-block font-semibold text-accent-deep hover:text-accent">
              Contact support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
