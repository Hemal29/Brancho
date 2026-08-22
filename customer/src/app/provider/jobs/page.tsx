"use client";

import { useEffect, useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

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
  notes: string | null;
};

export default function ProviderJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api<{ jobs: Job[] }>("/api/provider/jobs");
    if (res.ok) setJobs(res.data!.jobs);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const res = await api(`/api/bookings/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    if (res.ok) load();
    else alert(res.message);
  };

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.bookingStatus === filter);

  return (
    <div>
      <PageHeader title="My jobs" description="Track and update the status of your assigned jobs." />
      <div className="mb-5 flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"].map((s) => (
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
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center text-sm text-muted">No jobs here.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((j) => (
            <div key={j.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-muted">{j.bookingId}</span>
                    <Badge status={j.bookingStatus} />
                  </div>
                  <p className="mt-1 text-base font-semibold text-ink">{j.serviceName}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {formatDateTime(j.scheduledAt)} · {j.addressLine}, {j.city}
                  </p>
                  {j.notes && <p className="mt-2 rounded-lg bg-surface-soft p-2 text-xs text-muted">Note: {j.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-ink">{formatINR(j.payableAmount)}</p>
                  <div className="mt-2 flex gap-2">
                    <a href={`tel:${j.customerPhone}`} className="btn-outline !px-3 !py-1.5 !text-xs">
                      <Phone size={12} /> Call {j.customerName.split(" ")[0]}
                    </a>
                    {j.bookingStatus === "confirmed" && (
                      <button onClick={() => updateStatus(j.id, "in_progress")} className="btn-gold !px-3 !py-1.5 !text-xs">
                        Start job
                      </button>
                    )}
                    {j.bookingStatus === "in_progress" && (
                      <button onClick={() => updateStatus(j.id, "completed")} className="btn-gold !px-3 !py-1.5 !text-xs">
                        Complete job
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
