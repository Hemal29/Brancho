"use client";

import { useEffect, useState } from "react";
import { Loader2, Bell } from "lucide-react";
import { api, formatDateTime } from "@/lib/client";
import { PageHeader } from "@/components/app/StatCard";

type Notification = { id: number; type: string; title: string; message: string; isRead: number; createdAt: string };

const ICONS: Record<string, string> = { booking: "🔧", payment: "💳", system: "🔔", promo: "🎉" };

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ notifications: Notification[] }>("/api/notifications");
      if (res.ok) setItems(res.data!.notifications);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Notifications" description="Stay updated on your bookings and service visits." />
      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : items.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center text-sm text-muted">
          <Bell size={34} />
          <p className="mt-3 font-semibold text-ink">No notifications</p>
          <p>You&apos;re all caught up.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((n) => (
            <div key={n.id} className={`card flex items-start gap-3 p-4 ${n.isRead === 0 ? "border-accent/40 bg-gold/5" : ""}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-soft text-lg">
                {ICONS[n.type] || "🔔"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{n.title}</p>
                <p className="mt-0.5 text-sm text-muted">{n.message}</p>
                <p className="mt-1 text-[11px] text-muted">{formatDateTime(n.createdAt)}</p>
              </div>
              {n.isRead === 0 && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
