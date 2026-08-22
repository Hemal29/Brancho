"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/client";
import { PageHeader, Badge } from "@/components/app/StatCard";

type User = { id: number; name: string; email: string; phone: string; role: string; isActive: number; createdAt: string };

export default function AdminUsers() {
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await api<{ users: User[] }>("/api/admin/users");
    if (res.ok) setList(res.data!.users);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const toggle = async (id: number, isActive: number) => {
    await api(`/api/admin/users`, { method: "PATCH", body: JSON.stringify({ id, isActive: isActive === 1 ? 0 : 1 }) });
    load();
  };

  return (
    <div>
      <PageHeader title="Users" description="All registered users of the platform." />
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 size={26} className="animate-spin text-accent" />
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((u) => (
                <tr key={u.id} className="table-row">
                  <td className="px-4 py-3 font-semibold text-ink">{u.name}</td>
                  <td className="px-4 py-3 text-muted">
                    {u.email}
                    <br />
                    {u.phone}
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={u.role === "admin" ? "success" : u.role === "provider" ? "active" : "pending"} label={u.role} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={u.isActive === 1 ? "success" : "blocked"} />
                  </td>
                  <td className="px-4 py-3 text-muted">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => toggle(u.id, u.isActive)}
                        className={`!px-3 !py-1.5 !text-xs ${u.isActive === 1 ? "btn-outline" : "btn-gold"}`}
                      >
                        {u.isActive === 1 ? "Deactivate" : "Activate"}
                      </button>
                    )}
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
