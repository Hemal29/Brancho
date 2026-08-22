"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/client";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/app/StatCard";

export default function ProviderProfile() {
  const { user, refresh } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const body: Record<string, string> = { name, phone };
    if (password) body.password = password;
    const res = await api("/api/auth/profile", { method: "PATCH", body: JSON.stringify(body) });
    setBusy(false);
    if (res.ok) {
      setPassword("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      refresh();
    } else alert(res.message);
  };

  if (!user) return null;

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account details." />
      <form onSubmit={save} className="card max-w-xl space-y-4 p-6">
        <div className="mb-2 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-2xl font-bold text-gold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-ink">{user.name}</p>
            <p className="text-sm text-muted capitalize">Professional · {user.email}</p>
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Phone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">New password (leave blank to keep current)</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={busy} className="btn-gold">
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save changes
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
              <CheckCircle2 size={15} /> Saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
