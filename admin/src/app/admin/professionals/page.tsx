"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api, formatINR } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type Professional = {
  id: number;
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  rating: string;
  jobCount: string;
  totalEarnings: string;
  city: string;
  approvalStatus: string;
  isActive: number;
};

export default function AdminProfessionals() {
  const [list, setList] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api<{ professionals: Professional[] }>("/api/admin/professionals");
    if (res.ok) setList(res.data!.professionals);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const approve = async (id: number, status: "approved" | "rejected") => {
    await api(`/api/admin/professionals`, { method: "PATCH", body: JSON.stringify({ id, status }) });
    load();
  };

  const toggleActive = async (id: number, isActive: number) => {
    await api(`/api/admin/professionals`, { method: "PATCH", body: JSON.stringify({ id, isActive: isActive === 1 ? 0 : 1 }) });
    load();
  };

  return (
    <div>
      <PageHeader title="Professionals" description="Approve and manage service professionals." />
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Professional</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Jobs</th>
                <th className="px-4 py-3">Earnings</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((p) => (
                <tr key={p.id} className="table-row">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{p.name}</p>
                    <p className="text-xs text-muted">{p.email} · {p.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-ink">{p.serviceName}</td>
                  <td className="px-4 py-3 text-muted">{p.city}</td>
                  <td className="px-4 py-3 text-muted">★ {p.rating}</td>
                  <td className="px-4 py-3 text-muted">{p.jobCount}</td>
                  <td className="px-4 py-3 font-semibold text-ink">{formatINR(p.totalEarnings)}</td>
                  <td className="px-4 py-3">
                    <Badge status={p.approvalStatus === "approved" ? "active" : p.approvalStatus === "pending" ? "pending" : "blocked"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.approvalStatus === "pending" && (
                        <>
                          <button onClick={() => approve(p.id, "approved")} className="btn-gold !px-3 !py-1.5 !text-xs">
                            Approve
                          </button>
                          <button onClick={() => approve(p.id, "rejected")} className="btn-outline !px-3 !py-1.5 !text-xs">
                            Reject
                          </button>
                        </>
                      )}
                      {p.approvalStatus === "approved" && (
                        <button
                          onClick={() => toggleActive(p.id, p.isActive)}
                          className={`!px-3 !py-1.5 !text-xs ${p.isActive === 1 ? "btn-outline" : "btn-gold"}`}
                        >
                          {p.isActive === 1 ? "Suspend" : "Activate"}
                        </button>
                      )}
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
