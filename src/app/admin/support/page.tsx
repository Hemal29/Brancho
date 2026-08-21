"use client";

import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { api, formatDateTime } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Ticket = { id: number; ticketId: string; customerName: string; subject: string; message: string; status: string; priority: string; createdAt: string; reply: string | null };

export default function AdminSupport() {
  const [list, setList] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Ticket | null>(null);
  const [reply, setReply] = useState("");

  const load = async () => {
    const res = await api<{ tickets: Ticket[] }>("/api/admin/tickets");
    if (res.ok) setList(res.data!.tickets);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const submitReply = async () => {
    if (!open || !reply.trim()) return;
    const res = await api(`/api/admin/tickets`, { method: "PATCH", body: JSON.stringify({ id: open.id, reply, status: "resolved" }) });
    if (res.ok) {
      setOpen(null);
      setReply("");
      load();
    } else alert(res.message);
  };

  return (
    <div>
      <PageHeader title="Support tickets" description="Resolve customer queries." />
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-3">
          {list.length === 0 && <div className="card p-8 text-center text-sm text-muted">No support tickets.</div>}
          {list.map((t) => (
            <div key={t.id} className="card flex flex-wrap items-start justify-between gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-muted">{t.ticketId}</span>
                  <Badge status={t.status === "resolved" ? "success" : t.status === "open" ? "pending" : "closed"} />
                  <Badge status={t.priority === "high" ? "urgent" : t.priority === "medium" ? "pending" : "active"} />
                </div>
                <p className="mt-1.5 text-sm font-semibold text-ink">{t.subject}</p>
                <p className="text-xs text-muted">{t.customerName} · {formatDateTime(t.createdAt)}</p>
                <p className="mt-2 text-sm text-ink">{t.message}</p>
                {t.reply && <p className="mt-2 rounded-lg bg-secondary p-2 text-sm text-muted">Reply: {t.reply}</p>}
              </div>
              {t.status !== "resolved" && (
                <button onClick={() => setOpen(t)} className="btn-primary !px-3 !py-2 !text-xs">
                  Reply
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-lg p-6">
            <h3 className="font-heading text-lg font-semibold text-ink">{open.subject}</h3>
            <p className="mt-1 text-sm text-muted">{open.customerName} · {open.ticketId}</p>
            <p className="mt-3 rounded-lg bg-secondary p-3 text-sm text-ink">{open.message}</p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              className="input mt-3"
              placeholder="Write your reply…"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => setOpen(null)} className="btn-outline">
                Cancel
              </button>
              <button onClick={submitReply} className="btn-gold">
                <Send size={14} /> Send & resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
