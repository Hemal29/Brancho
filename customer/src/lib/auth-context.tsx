"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type AppUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "customer" | "provider" | "admin";
  avatar: string | null;
};

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  requestOtp: (email: string) => Promise<{ ok: boolean; message?: string }>;
  verifyOtp: (email: string, otp: string, newPassword?: string) => Promise<{ ok: boolean; message?: string; role?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string; role?: string }>;
  register: (data: { name: string; email: string; phone: string; password: string; role?: string }) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setUser(json.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const requestOtp = useCallback(async (email: string) => {
    const res = await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    return res.ok ? { ok: true, message: json.message } : { ok: false, message: json.message };
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string, newPassword?: string) => {
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const json = await res.json();
    if (res.ok) {
      // Intermediate verification (no password yet) returns no user.
      if (json.data.user) setUser(json.data.user);
      return { ok: true, role: json.data.user?.role };
    }
    return { ok: false, message: json.message };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (res.ok) {
      setUser(json.data.user);
      return { ok: true, role: json.data.user.role };
    }
    return { ok: false, message: json.message };
  }, []);

  const register = useCallback(async (data: { name: string; email: string; phone: string; password: string; role?: string }) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setUser(json.data.user);
      return { ok: true };
    }
    return { ok: false, message: json.message };
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, requestOtp, verifyOtp, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
