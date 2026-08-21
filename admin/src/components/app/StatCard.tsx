import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = false,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            accent ? "bg-gold text-navy" : "bg-secondary text-accent-deep"
          }`}
        >
          <Icon size={18} />
        </span>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      <p className="mt-4 font-heading text-2xl font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-muted">{label}</p>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-2xl font-bold text-ink">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ status, label }: { status: string; label?: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-sky-100 text-sky-800",
    assigned: "bg-violet-100 text-violet-800",
    in_progress: "bg-indigo-100 text-indigo-800",
    completed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-rose-100 text-rose-800",
    paid: "bg-emerald-100 text-emerald-800",
    success: "bg-emerald-100 text-emerald-800",
    failed: "bg-rose-100 text-rose-800",
    refunded: "bg-amber-100 text-amber-800",
    open: "bg-amber-100 text-amber-800",
    resolved: "bg-emerald-100 text-emerald-800",
    closed: "bg-gray-200 text-gray-600",
    credit: "bg-emerald-100 text-emerald-800",
    debit: "bg-rose-100 text-rose-800",
    active: "bg-sky-100 text-sky-800",
    blocked: "bg-rose-100 text-rose-800",
    hidden: "bg-gray-200 text-gray-600",
    urgent: "bg-rose-100 text-rose-800",
    approved: "bg-emerald-100 text-emerald-800",
    rejected: "bg-rose-100 text-rose-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {label ?? status.replace("_", " ")}
    </span>
  );
}
