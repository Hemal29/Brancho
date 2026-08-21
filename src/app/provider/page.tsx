"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, IndianRupee, Briefcase, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { StatCard, Badge } from "@/components/app/StatCard";

type Stats = { total: number; completed: number; pending: number; earnings: string };
type Job = {
  id: number;
  bookingId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  bookingStatus: string;
  payableAmount: string;
  scheduledAt: string;
  city: string;
  addressLine: string;
};

export default function ProviderDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [upcoming, setUpcoming] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ jobs: Job[]; stats: Stats }>("/api/provider/jobs");
      if (res.ok) {
        setStats(res.data!.stats);
        setUpcoming(res.data!.jobs.filter((j) => ["pending", "confirmed", "assigned", "in_progress"].includes(j.bookingStatus)));
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
      <div className="card flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-navy to-navy-deep p-6 text-white">
        <div>
          <h2 className="font-heading text-2xl font-bold">Welcome back 👋</h2>
          <p className="mt-1 text-sm text-white/70">
            You have <strong className="text-gold">{upcoming.length}</strong> upcoming job{upcoming.length !== 1 ? "s" : ""} today.
          </p>
        </div>
        <Link href="/provider/jobs" className="btn-gold">
          View jobs <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total jobs" value={stats?.total ?? 0} icon={Briefcase} />
        <StatCard label="Completed" value={stats?.completed ?? 0} icon={CheckCircle2} accent />
        <StatCard label="Pending" value={stats?.pending ?? 0} icon={Clock} />
        <StatCard label="Total earnings" value={formatINR(stats?.earnings)} icon={IndianRupee} />
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-ink">Upcoming jobs</h3>
          <Link href="/provider/jobs" className="text-xs font-bold text-accent hover:underline">
            View all
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No upcoming jobs. Check back soon!</p>
        ) : (
          <div className="space-y-2.5">
            {upcoming.slice(0, 5).map((j) => (
              <div key={j.id} className="table-row flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{j.serviceName}</p>
                  <p className="text-xs text-muted">
                    {j.customerName} · {j.addressLine}, {j.city} · {formatDateTime(j.scheduledAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-ink">{formatINR(j.payableAmount)}</span>
                  <Badge status={j.bookingStatus} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
