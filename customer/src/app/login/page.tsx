"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

function LoginPageInner() {
  const { login, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const go = (r: string) => {
    if (r === "admin") {
      window.location.href = `${ADMIN_URL}/admin`;
      return;
    }
    if (redirect && redirect === r) {
      router.replace(`/${r}`);
    } else {
      router.replace(r === "provider" ? "/provider" : "/customer");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        const res = await login(form.email, form.password);
        if (!res.ok) {
          setError(res.message || "Login failed.");
        } else {
          go(res.role || "customer");
        }
      } else {
        const res = await register({ ...form, role });
        if (!res.ok) {
          setError(res.message || "Registration failed.");
        } else {
          go(role);
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-navy px-4 py-12 text-white">
      <div className="dot-grid-light absolute inset-0 opacity-25" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
          <ArrowLeft size={15} />
          Back to website
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-line bg-surface p-7 text-ink shadow-2xl sm:p-9"
        >
          <div className="mb-6 flex items-center gap-3">
            <img src="/brancho-logo.png" alt="" className="h-11 w-11 rounded-xl object-contain" />
            <div>
              <h1 className="font-heading text-xl font-bold tracking-tight">Welcome to Brancho</h1>
              <p className="text-sm text-muted">
                {mode === "login" ? "Login to your account" : "Create your account"}
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-surface-soft p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={cn(
                  "rounded-full py-2 text-sm font-semibold capitalize transition-all",
                  mode === m ? "bg-navy text-white shadow" : "text-muted hover:text-ink"
                )}
              >
                {m}
              </button>
            ))}
          </div>

          {mode === "register" && (
            <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-surface-soft p-1">
              {(["customer", "provider"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "rounded-full py-2 text-sm font-semibold capitalize transition-all",
                    role === r ? "bg-gold text-navy shadow" : "text-muted hover:text-ink"
                  )}
                >
                  {r === "customer" ? "Book services" : "Join as professional"}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <>
                <Field label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input"
                    placeholder="10-digit mobile number"
                  />
                </Field>
              </>
            )}
            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Password">
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input"
                placeholder="At least 6 characters"
              />
            </Field>

            {error && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-soft dark:bg-gold dark:text-navy dark:hover:brightness-110 disabled:opacity-60"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted">
            Admin? Use{" "}
            <a href={`${ADMIN_URL}/admin/login`} className="font-semibold text-accent-deep hover:text-accent">
              admin login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}
