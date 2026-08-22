"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { api, formatDateTime } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Ticket = { id: number; subject: string; message: string; status: string; priority: string; resolution: string | null; createdAt: string };

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const res = await api<{ tickets: Ticket[] }>("/api/tickets");
    if (res.ok) setTickets(res.data!.tickets);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await api("/api/tickets", { method: "POST", body: JSON.stringify({ subject, message }) });
    setBusy(false);
    if (res.ok) {
      setSubject("");
      setMessage("");
      load();
    } else alert(res.message);
  };

  return (
    <div>
      <PageHeader title="Support" description="We usually respond within 2 hours." />

      <form onSubmit={submit} className="card mb-6 space-y-4 p-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-muted">Subject</label>
          <input required value={subject} onChange={(e) => setSubject(e.target.value)} className="input" placeholder="e.g. Issue with my booking" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-muted">Describe your issue</label>
          <textarea required value={message} onChange={(e) => setMessage(e.target.value)} className="input min-h-24" placeholder="Tell us what happened…" />
        </div>
        <button type="submit" disabled={busy} className="btn-gold">
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Submit ticket
        </button>
      </form>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="card flex flex-col items-center py-14 text-center text-sm text-muted">
          <MessageSquare size={34} />
          <p className="mt-3 font-semibold text-ink">No support tickets</p>
          <p>Need help? Create a ticket above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="card p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="font-semibold text-ink">{t.subject}</p>
                <Badge status={t.status} />
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold capitalize text-gray-600 dark:bg-white/10 dark:text-muted">{t.priority}</span>
              </div>
              <p className="text-sm text-muted">{t.message}</p>
              <p className="mt-2 text-xs text-muted">Ticket #{t.id} · {formatDateTime(t.createdAt)}</p>
              {t.resolution && <p className="mt-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">Resolved: {t.resolution}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
