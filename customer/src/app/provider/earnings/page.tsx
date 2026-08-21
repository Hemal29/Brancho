"use client";

import { useEffect, useState } from "react";
import { Loader2, IndianRupee, Briefcase, Star } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { PageHeader, StatCard, Badge } from "@/components/app/StatCard";

type Professional = { jobsCompleted: number; totalEarnings: string; rating: string };
type Tx = { date: string; bookingId: string; payableAmount: string; scheduledAt: string };
type Day = { day: string; total: string; count: string };

export default function ProviderEarnings() {
  const [prof, setProf] = useState<Professional | null>(null);
  const [byDay, setByDay] = useState<Day[]>([]);
  const [tx, setTx] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ professional: Professional; byDay: Day[]; transactions: Tx[] }>("/api/provider/earnings");
      if (res.ok) {
        setProf(res.data!.professional);
        setByDay(res.data!.byDay);
        setTx(res.data!.transactions);
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

  const maxDay = Math.max(...byDay.map((d) => parseFloat(d.total)), 1);

  return (
    <div className="space-y-6">
      <PageHeader title="Earnings" description="Your earnings from completed jobs." />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total earnings" value={formatINR(prof?.totalEarnings)} icon={IndianRupee} accent />
        <StatCard label="Jobs completed" value={prof?.jobsCompleted ?? 0} icon={Briefcase} />
        <StatCard label="Rating" value={prof ? `★ ${prof.rating}` : "—"} icon={Star} />
      </div>

      <div className="card p-5">
        <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Earnings — last 30 days</h3>
        <div className="flex h-40 items-end gap-1.5">
          {byDay.slice(0, 14).reverse().map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-gold to-accent/60"
                style={{ height: `${Math.max((parseFloat(d.total) / maxDay) * 130, 4)}px` }}
              />
              <span className="text-[9px] font-medium text-muted">{new Date(d.day).toLocaleDateString("en-IN", { day: "numeric" })}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <h3 className="border-b border-line p-5 font-heading text-lg font-semibold text-ink">Completed jobs</h3>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Scheduled</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tx.map((t) => (
              <tr key={t.bookingId} className="table-row">
                <td className="px-4 py-3 font-mono text-xs font-bold text-ink">{t.bookingId}</td>
                <td className="px-4 py-3 text-muted">{formatDateTime(t.scheduledAt)}</td>
                <td className="px-4 py-3">
                  <Badge status="completed" />
                </td>
                <td className="px-4 py-3 font-semibold text-ink">{formatINR(t.payableAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
