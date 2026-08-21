"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, IndianRupee, CalendarCheck, Users, HardHat, ArrowRight } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { StatCard, Badge } from "@/components/app/StatCard";

type Stats = {
  totalBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProviders: number;
  pendingProviders: number;
  openTickets: number;
};
type RecentBooking = { id: number; bookingId: string; customerName: string; serviceName: string; payableAmount: string; bookingStatus: string; createdAt: string };
type RevenueDay = { day: string; total: string };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentBooking[]>([]);
  const [revenue, setRevenue] = useState<RevenueDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ stats: Stats; recentBookings: RecentBooking[]; revenueByDay: RevenueDay[] }>("/api/admin/stats");
      if (res.ok) {
        setStats(res.data!.stats);
        setRecent(res.data!.recentBookings);
        setRevenue(res.data!.revenueByDay);
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

  const maxRev = Math.max(...revenue.map((r) => parseFloat(r.total)), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total revenue" value={formatINR(stats?.totalRevenue)} icon={IndianRupee} accent />
        <StatCard label="Total bookings" value={stats?.totalBookings ?? 0} icon={CalendarCheck} />
        <StatCard label="Customers" value={stats?.totalCustomers ?? 0} icon={Users} />
        <StatCard label="Professionals" value={`${stats?.totalProviders ?? 0} (${stats?.pendingProviders ?? 0} pending)`} icon={HardHat} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card p-5">
          <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Revenue — last 7 days</h3>
          <div className="flex h-44 items-end gap-2">
            {revenue.map((r) => (
              <div key={r.day} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-navy to-navy-soft"
                  style={{ height: `${Math.max((parseFloat(r.total) / maxRev) * 150, 4)}px` }}
                />
                <span className="text-[10px] font-medium text-muted">{new Date(r.day).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
              </div>
            ))}
          </div>
          {stats && stats.openTickets > 0 && (
            <Link href="/admin/support" className="mt-4 flex items-center justify-between rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              <span>
                <strong>{stats.openTickets}</strong> open support ticket{stats.openTickets > 1 ? "s" : ""} need attention
              </span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Recent bookings</h3>
          <div className="space-y-2.5">
            {recent.slice(0, 5).map((b) => (
              <Link key={b.id} href="/admin/bookings" className="table-row flex items-center justify-between gap-3 rounded-xl border border-line p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{b.serviceName}</p>
                  <p className="truncate text-xs text-muted">
                    {b.customerName} · {formatDateTime(b.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">{formatINR(b.payableAmount)}</p>
                  <Badge status={b.bookingStatus} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
