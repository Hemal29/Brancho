"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { api } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Review = { id: number; customerName: string; serviceName: string; rating: number; comment: string; createdAt: string; status: string };

export default function AdminReviews() {
  const [list, setList] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api<{ reviews: Review[] }>("/api/admin/reviews");
    if (res.ok) setList(res.data!.reviews);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const update = async (id: number, body: Record<string, unknown>) => {
    await api(`/api/admin/reviews`, { method: "PATCH", body: JSON.stringify({ id, ...body }) });
    load();
  };

  return (
    <div>
      <PageHeader title="Reviews" description="Approve and moderate customer reviews." />
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-3">
          {list.length === 0 && <div className="card p-8 text-center text-sm text-muted">No reviews yet.</div>}
          {list.map((r) => (
            <div key={r.id} className="card flex flex-wrap items-start justify-between gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg tracking-tight text-gold">{"★".repeat(r.rating)}</span>
                  <span className="text-lg tracking-tight text-line">{"★".repeat(5 - r.rating)}</span>
                  <span className="text-sm font-semibold text-ink">{r.customerName}</span>
                  <Badge status={r.status === "approved" ? "success" : "pending"} />
                </div>
                <p className="mt-1 text-sm text-muted">for {r.serviceName}</p>
                {r.comment && <p className="mt-2 text-sm text-ink">{r.comment}</p>}
                <p className="mt-1 text-[11px] text-muted">{new Date(r.createdAt).toLocaleDateString("en-IN")}</p>
              </div>
              <div className="flex items-center gap-2">
                {r.status !== "approved" && (
                  <button onClick={() => update(r.id, { status: "approved" })} className="btn-gold !px-3 !py-1.5 !text-xs">
                    Approve
                  </button>
                )}
                <button onClick={() => update(r.id, { status: "hidden" })} className="btn-outline !px-3 !py-1.5 !text-xs">
                  Hide
                </button>
                <button onClick={() => update(r.id, { status: "removed" })} className="rounded-lg border border-line p-2 text-muted hover:text-rose-500" aria-label="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
