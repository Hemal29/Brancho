"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Booking = {
  id: number;
  bookingId: string;
  customerName: string;
  serviceName: string;
  professionalName: string | null;
  payableAmount: string;
  bookingStatus: string;
  paymentStatus: string;
  scheduledAt: string;
  city: string;
};

const STATUSES = ["pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"];

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const url = filter === "all" ? "/api/admin/bookings" : `/api/admin/bookings?status=${filter}`;
    const res = await api<{ bookings: Booking[] }>(url);
    if (res.ok) setBookings(res.data!.bookings);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    const res = await api(`/api/bookings/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    if (res.ok) load();
    else alert(res.message);
  };

  return (
    <div>
      <PageHeader title="Bookings" description="Manage all bookings across cities." />
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2 text-xs font-semibold ${filter === "all" ? "bg-navy text-white" : "border border-line text-muted"}`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-2 text-xs font-semibold capitalize ${filter === s ? "bg-navy text-white" : "border border-line text-muted"}`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Booking</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Professional</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {bookings.map((b) => (
                <tr key={b.id} className="table-row">
                  <td className="px-4 py-3 font-semibold text-ink">{b.bookingId}</td>
                  <td className="px-4 py-3 text-ink">{b.customerName}</td>
                  <td className="px-4 py-3 text-ink">{b.serviceName}</td>
                  <td className="px-4 py-3 text-muted">{b.professionalName || "—"}</td>
                  <td className="px-4 py-3 text-muted">{formatDateTime(b.scheduledAt)}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{formatINR(b.payableAmount)}</td>
                  <td className="px-4 py-3">
                    <Badge status={b.bookingStatus} />
                    <div className="mt-1 text-[10px] text-muted">
                      Pay: <Badge status={b.paymentStatus} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.bookingStatus}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className="rounded-lg border border-line bg-surface px-2 py-1.5 text-xs font-semibold text-ink"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
