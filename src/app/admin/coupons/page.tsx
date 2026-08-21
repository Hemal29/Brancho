"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { api, formatINR } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Coupon = { id: number; code: string; description: string; discountType: string; discountValue: string; minOrder: string; validTill: string; isActive: number; usageCount: string };

export default function AdminCoupons() {
  const [list, setList] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "percent",
    discountValue: "",
    minOrder: "",
    maxDiscount: "",
    validDays: "30",
  });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const res = await api<{ coupons: Coupon[] }>("/api/admin/coupons");
    if (res.ok) setList(res.data!.coupons);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await api("/api/admin/coupons", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        discountValue: parseFloat(form.discountValue),
        minOrder: parseFloat(form.minOrder || "0"),
        maxDiscount: form.maxDiscount ? parseFloat(form.maxDiscount) : null,
      }),
    });
    setBusy(false);
    if (res.ok) {
      setShowForm(false);
      load();
    } else alert(res.message);
  };

  const toggle = async (c: Coupon) => {
    await api(`/api/admin/coupons/${c.id}`, { method: "PATCH", body: JSON.stringify({ isActive: c.isActive === 1 ? 0 : 1 }) });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this coupon?")) return;
    await api(`/api/admin/coupons/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <PageHeader
        title="Coupons"
        description="Discount codes customers can apply at checkout."
        action={
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={16} /> New coupon
          </button>
        }
      />

      {showForm && (
        <form onSubmit={save} className="card mb-6 grid gap-4 p-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Code</span>
            <input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="input" placeholder="SAVE20" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Description</span>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Type</span>
            <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="input">
              <option value="percent">Percentage</option>
              <option value="fixed">Fixed amount</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">
              {form.discountType === "percent" ? "Discount (%)" : "Discount (₹)"}
            </span>
            <input required type="number" step="0.01" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Min order (₹)</span>
            <input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} className="input" placeholder="0" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Max discount (₹)</span>
            <input type="number" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} className="input" placeholder="Leave blank for none" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Valid for (days)</span>
            <input type="number" value={form.validDays} onChange={(e) => setForm({ ...form, validDays: e.target.value })} className="input" />
          </label>
          <div className="flex items-end gap-2">
            <button type="submit" disabled={busy} className="btn-gold">
              {busy && <Loader2 size={14} className="animate-spin" />} Create
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
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Min order</th>
                <th className="px-4 py-3">Valid till</th>
                <th className="px-4 py-3">Used</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((c) => (
                <tr key={c.id} className="table-row">
                  <td className="px-4 py-3 font-mono font-bold text-ink">{c.code}</td>
                  <td className="px-4 py-3 text-muted">{c.description}</td>
                  <td className="px-4 py-3 font-semibold text-ink">
                    {c.discountType === "percent" ? `${c.discountValue}%` : formatINR(c.discountValue)}
                  </td>
                  <td className="px-4 py-3 text-muted">{formatINR(c.minOrder)}</td>
                  <td className="px-4 py-3 text-muted">{new Date(c.validTill).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-muted">{c.usageCount}</td>
                  <td className="px-4 py-3">
                    <Badge status={c.isActive === 1 && new Date(c.validTill) > new Date() ? "success" : "closed"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => toggle(c)} className="rounded-lg border border-line p-2 text-muted hover:text-accent" aria-label="Toggle">
                        {c.isActive === 1 ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => remove(c.id)} className="rounded-lg border border-line p-2 text-muted hover:text-rose-500" aria-label="Delete">
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
