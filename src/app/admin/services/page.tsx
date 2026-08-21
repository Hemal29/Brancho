"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { api, formatINR } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Service = { id: number; name: string; category: string; basePrice: string; unit: string; durationMins: number; isActive: number; rating: string };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: "", category: "", basePrice: "", unit: "per visit", durationMins: "60", description: "", image: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const res = await api<{ services: Service[] }>("/api/admin/services?all=1");
    if (res.ok) setServices(res.data!.services);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const openForm = (s?: Service) => {
    setEditing(s ?? null);
    setForm(
      s
        ? { name: s.name, category: s.category, basePrice: s.basePrice, unit: s.unit, durationMins: String(s.durationMins), description: "", image: "" }
        : { name: "", category: "", basePrice: "", unit: "per visit", durationMins: "60", description: "", image: "" }
    );
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const body = { ...form, basePrice: parseFloat(form.basePrice), durationMins: parseInt(form.durationMins) };
    const res = editing
      ? await api(`/api/admin/services/${editing.id}`, { method: "PATCH", body: JSON.stringify(body) })
      : await api("/api/admin/services", { method: "POST", body: JSON.stringify(body) });
    setBusy(false);
    if (res.ok) {
      setShowForm(false);
      load();
    } else alert(res.message);
  };

  const toggle = async (s: Service) => {
    await api(`/api/admin/services/${s.id}`, { method: "PATCH", body: JSON.stringify({ isActive: s.isActive === 1 ? 0 : 1 }) });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this service? Bookings referencing it will be removed.")) return;
    await api(`/api/admin/services/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <PageHeader
        title="Services"
        description={`${services.length} services in the catalogue`}
        action={
          <button onClick={() => openForm()} className="btn-primary">
            <Plus size={16} /> Add service
          </button>
        }
      />

      {showForm && (
        <form onSubmit={save} className="card mb-6 grid gap-4 p-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Service name</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Category</span>
            <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Base price (₹)</span>
            <input required type="number" step="0.01" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Unit</span>
            <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Duration (mins)</span>
            <input type="number" value={form.durationMins} onChange={(e) => setForm({ ...form, durationMins: e.target.value })} className="input" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Image URL</span>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input" placeholder="/services/ac-cleaning.svg" />
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" disabled={busy} className="btn-gold">
              {busy && <Loader2 size={14} className="animate-spin" />} {editing ? "Save changes" : "Create service"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {services.map((s) => (
                <tr key={s.id} className="table-row">
                  <td className="px-4 py-3 font-semibold text-ink">{s.name}</td>
                  <td className="px-4 py-3 text-muted">{s.category}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{formatINR(s.basePrice)}</td>
                  <td className="px-4 py-3 text-muted">{s.durationMins} min</td>
                  <td className="px-4 py-3 text-muted">★ {s.rating}</td>
                  <td className="px-4 py-3">
                    <Badge status={s.isActive === 1 ? "success" : "closed"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => openForm(s)} className="rounded-lg border border-line p-2 text-muted hover:text-accent" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => toggle(s)} className="rounded-lg border border-line p-2 text-muted hover:text-accent" aria-label="Toggle active">
                        {s.isActive === 1 ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => remove(s.id)} className="rounded-lg border border-line p-2 text-muted hover:text-rose-500" aria-label="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
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
