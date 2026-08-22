"use client";

import { useEffect, useState } from "react";
import { Loader2, MapPin, Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/client";
import { CITIES } from "@/lib/data";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Address = { id: number; label: string; addressLine: string; city: string; state: string; zipCode: string; isDefault: number };

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: "Home", addressLine: "", city: "Veraval", state: "Gujarat", zipCode: "", isDefault: false });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const res = await api<{ addresses: Address[] }>("/api/addresses");
    if (res.ok) setAddresses(res.data!.addresses);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await api("/api/addresses", { method: "POST", body: JSON.stringify(form) });
    setBusy(false);
    if (res.ok) {
      setAdding(false);
      setForm({ label: "Home", addressLine: "", city: "Veraval", state: "Gujarat", zipCode: "", isDefault: false });
      load();
    } else alert(res.message);
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this address?")) return;
    await api(`/api/addresses/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <PageHeader
        title="Saved addresses"
        description="Manage the addresses you use for bookings."
        action={
          <button onClick={() => setAdding(!adding)} className="btn-primary">
            <Plus size={16} /> Add address
          </button>
        }
      />

      {adding && (
        <form onSubmit={save} className="card mb-6 grid gap-4 p-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Label</span>
            <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input">
              <option>Home</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Address line</span>
            <input required value={form.addressLine} onChange={(e) => setForm({ ...form, addressLine: e.target.value })} className="input" placeholder="Flat / house, street, locality" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">City</span>
            <select required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input">
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">PIN code</span>
            <input required value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} className="input" placeholder="380054" />
          </label>
          <label className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} className="h-4 w-4 accent-[#C6A55A]" />
            <span className="text-sm text-ink">Set as default address</span>
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" disabled={busy} className="btn-gold">
              {busy && <Loader2 size={14} className="animate-spin" />} Save address
            </button>
            <button type="button" onClick={() => setAdding(false)} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center text-sm text-muted">
          <MapPin size={34} />
          <p className="mt-3 font-semibold text-ink">No addresses saved</p>
          <p>Add an address to start booking services.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((a) => (
            <div key={a.id} className="card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <MapPin size={15} className="text-accent-deep" /> {a.label}
                  {a.isDefault === 1 && <Badge status="paid" />}
                </span>
                <button onClick={() => remove(a.id)} className="text-muted transition-colors hover:text-rose-500" aria-label="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
              <p className="text-sm text-muted">
                {a.addressLine}, {a.city}, {a.state} {a.zipCode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
