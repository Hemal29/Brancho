"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await login(email, password);
    setBusy(false);
    if (!res.ok) {
      setError(res.message || "Login failed.");
    } else if (res.role !== "admin") {
      setError("This account does not have admin access.");
    } else {
      router.replace("/admin");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-navy px-4 py-12 text-white">
      <div className="dot-grid-light absolute inset-0 opacity-25" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <a href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"} className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
          <ArrowLeft size={15} />
          Back to website
        </a>

        <div className="rounded-3xl border border-white/10 bg-white p-7 text-ink shadow-2xl sm:p-9">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold">
              <ShieldCheck size={22} />
            </span>
            <div>
              <h1 className="font-heading text-xl font-bold tracking-tight">Brancho Admin</h1>
              <p className="text-sm text-muted">Restricted access — admins only</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="admin@brancho.in"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">Password</span>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </label>

            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-soft disabled:opacity-60"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              Login to Dashboard
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted">
            Default credentials: <span className="font-semibold text-ink">admin@brancho.in</span> /{" "}
            <span className="font-semibold text-ink">Admin@123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
