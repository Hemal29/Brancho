"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, IndianRupee, Clock, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { StatCard, Badge } from "@/components/app/StatCard";

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

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<{ bookings: number; upcoming: number; spent: number } | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const bookings = await api<{ bookings: Booking[] }>("/api/bookings");
      if (bookings.ok) {
        const list = bookings.data!.bookings;
        setStats({
          bookings: list.length,
          upcoming: list.filter((b) => ["pending", "confirmed", "assigned", "in_progress"].includes(b.bookingStatus)).length,
          spent: list.filter((b) => b.bookingStatus === "completed").reduce((s, b) => s + parseFloat(b.payableAmount), 0),
        });
        setRecent(list.slice(0, 5));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-navy p-6 text-white sm:p-8"
      >
        <div className="dot-grid-light absolute inset-0 opacity-25" />
        <div className="relative">
          <p className="text-sm text-white/60">Welcome back,</p>
          <h2 className="mt-1 font-heading text-2xl font-bold">{user?.name}</h2>
          <p className="mt-3 max-w-lg text-sm text-white/70">
            Your home services, all in one place. Book a professional and track every visit — right here.
          </p>
          <Link
            href="/customer/book"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.03]"
          >
            <Sparkles size={16} />
            Book a Service
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total bookings" value={stats?.bookings ?? 0} icon={CalendarCheck} />
        <StatCard label="Upcoming visits" value={stats?.upcoming ?? 0} icon={Clock} accent />
        <StatCard label="Total spent" value={formatINR(stats?.spent)} icon={IndianRupee} />
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-ink">Recent bookings</h3>
          <Link href="/customer/bookings" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-deep hover:text-accent">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-muted">No bookings yet.</p>
            <Link href="/customer/book" className="mt-3 inline-block text-sm font-semibold text-accent-deep hover:text-accent">
              Book your first service →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((b) => (
              <Link
                key={b.id}
                href={`/customer/bookings/${b.id}`}
                className="table-row flex flex-wrap items-center gap-4 rounded-xl border border-line p-3"
              >
                <img src={b.serviceImage || "/services/ac-cleaning.svg"} alt="" className="h-11 w-11 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{b.serviceName}</p>
                  <p className="truncate text-xs text-muted">
                    {formatDateTime(b.scheduledAt)} · {b.addressLine || "Address on file"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">{formatINR(b.payableAmount)}</p>
                  <Badge status={b.bookingStatus} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
