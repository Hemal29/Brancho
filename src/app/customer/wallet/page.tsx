"use client";

import { useEffect, useState } from "react";
import { Loader2, Wallet as WalletIcon } from "lucide-react";
import { api, formatINR, formatDateTime } from "@/lib/client";
import { PageHeader } from "@/components/app/StatCard";

type Txn = { id: number; type: string; amount: string; description: string; balanceAfter: string; createdAt: string };

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [txns, setTxns] = useState<Txn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ balance: number; transactions: Txn[] }>("/api/wallet");
      if (res.ok) {
        setBalance(res.data!.balance);
        setTxns(res.data!.transactions);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Wallet" description="Earn cashback on every paid booking and track your balance." />

      <div className="relative mb-6 overflow-hidden rounded-2xl bg-navy p-6 text-white">
        <div className="dot-grid-light absolute inset-0 opacity-20" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm text-white/60">
              <WalletIcon size={15} /> Available balance
            </p>
            <p className="mt-2 font-heading text-4xl font-bold">{loading ? "…" : formatINR(balance)}</p>
          </div>
          <img src="/brancho-logo-white.png" alt="" className="h-14 w-14 object-contain opacity-90" />
        </div>
        <p className="relative mt-3 text-xs text-white/50">Earn 5% cashback instantly on every online payment</p>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 size={24} className="animate-spin text-accent" />
        </div>
      ) : txns.length === 0 ? (
        <div className="card p-8 text-center text-sm text-muted">
          No transactions yet. Book a service and pay online to earn cashback.
        </div>
      ) : (
        <div className="card divide-y divide-line">
          {txns.map((t) => (
            <div key={t.id} className="table-row flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-ink">{t.description}</p>
                <p className="text-xs text-muted">{formatDateTime(t.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${t.type === "credit" ? "text-emerald-600" : "text-rose-600"}`}>
                  {t.type === "credit" ? "+" : "−"}
                  {formatINR(t.amount)}
                </p>
                <p className="text-[11px] text-muted">Balance {formatINR(t.balanceAfter)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
