"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, ArrowRight, CalendarClock } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Booking = {
  id: number;
  bookingId: string;
  serviceName: string;
  serviceImage: string;
  professionalName: string | null;
  scheduledAt: string;
  payableAmount: string;
  bookingStatus: string;
  addressLine: string;
  city: string;
};

const FILTERS = ["all", "upcoming", "completed", "cancelled"] as const;

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ bookings: Booking[] }>("/api/bookings");
      if (res.ok) setBookings(res.data!.bookings);
      setLoading(false);
    })();
  }, []);

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return ["pending", "confirmed", "assigned", "in_progress"].includes(b.bookingStatus);
    return b.bookingStatus === filter;
  });

  return (
    <div>
      <PageHeader
        title="My bookings"
        description="Track, manage and review all your home services."
        action={
          <Link href="/customer/book" className="btn-primary">
            Book a Service
          </Link>
        }
      />

      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition-all ${
              filter === f ? "bg-navy text-white" : "border border-line text-muted hover:border-accent/50 hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center">
          <CalendarClock size={36} className="text-muted" />
          <p className="mt-3 text-sm font-semibold text-ink">No bookings found</p>
          <p className="text-sm text-muted">When you book a service, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <Link key={b.id} href={`/customer/bookings/${b.id}`} className="card table-row flex flex-wrap items-center gap-4 p-4">
              <img src={b.serviceImage || "/services/ac-cleaning.svg"} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">{b.serviceName}</p>
                  <Badge status={b.bookingStatus} />
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  {formatDateTime(b.scheduledAt)} · {b.professionalName || "Professional TBA"} · {b.addressLine}
                </p>
              </div>
              <div className="text-right">
                <p className="font-heading text-lg font-bold text-ink">{formatINR(b.payableAmount)}</p>
                <p className="text-[11px] text-muted">{b.bookingId}</p>
              </div>
              <ArrowRight size={16} className="text-muted" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
