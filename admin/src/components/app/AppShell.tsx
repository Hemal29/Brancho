"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight,
  LayoutDashboard,
  Sparkles,
  CalendarCheck,
  Wallet,
  MapPin,
  Headphones,
  Bell,
  User,
  Briefcase,
  IndianRupee,
  HardHat,
  TicketPercent,
  Star,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const NAV_BY_ROLE: Record<
  "customer" | "admin" | "provider",
  { label: string; href: string; icon: LucideIcon }[]
> = {
  customer: [
    { label: "Dashboard", href: "/customer", icon: LayoutDashboard },
    { label: "Book a Service", href: "/customer/book", icon: Sparkles },
    { label: "My Bookings", href: "/customer/bookings", icon: CalendarCheck },
    { label: "Wallet", href: "/customer/wallet", icon: Wallet },
    { label: "Addresses", href: "/customer/addresses", icon: MapPin },
    { label: "Support", href: "/customer/support", icon: Headphones },
    { label: "Notifications", href: "/customer/notifications", icon: Bell },
    { label: "Profile", href: "/customer/profile", icon: User },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { label: "Services", href: "/admin/services", icon: Sparkles },
    { label: "Professionals", href: "/admin/professionals", icon: HardHat },
    { label: "Users", href: "/admin/users", icon: User },
    { label: "Coupons", href: "/admin/coupons", icon: TicketPercent },
    { label: "Reviews", href: "/admin/reviews", icon: Star },
    { label: "Support", href: "/admin/support", icon: Headphones },
  ],
  provider: [
    { label: "Dashboard", href: "/provider", icon: LayoutDashboard },
    { label: "My Jobs", href: "/provider/jobs", icon: Briefcase },
    { label: "Earnings", href: "/provider/earnings", icon: IndianRupee },
    { label: "Profile", href: "/provider/profile", icon: User },
  ],
};

export function AppShell({
  title,
  role,
  children,
}: {
  title: string;
  role: "customer" | "admin" | "provider";
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const nav = NAV_BY_ROLE[role];

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(stored ? stored === "dark" : prefers);
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login?redirect=" + role);
      } else if (user.role !== role) {
        router.replace(user.role === "admin" ? "/admin" : user.role === "provider" ? "/provider" : "/customer");
      }
    }
  }, [loading, user, role, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading || !user || user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const roleLabel = role === "admin" ? "Admin" : role === "provider" ? "Provider" : "Customer";

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="dot-grid-light absolute inset-0 opacity-20" />
        <div className="relative flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href={role === "admin" ? "/admin" : role === "provider" ? "/provider" : "/customer"} className="flex items-center gap-2.5">
            <img src="/brancho-logo-white.png" alt="" className="h-8 w-8 object-contain" />
            <span className="font-heading text-lg font-bold tracking-tight">Brancho</span>
          </Link>
          <button className="text-white/60 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="relative flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-gold text-navy" : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon size={17} />
                {item.label}
                {active && <ChevronRight size={15} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="relative border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-white/50">{roleLabel} account</p>
            </div>
            <button
              onClick={async () => {
                await logout();
                router.replace("/login?redirect=" + role);
              }}
              className="text-white/50 transition-colors hover:text-white"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-surface/80 px-4 backdrop-blur-lg sm:px-6">
          <div className="flex items-center gap-3">
            <button className="text-ink lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="font-heading text-lg font-semibold text-ink">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SITE_URL}
              className="hidden rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent sm:block"
            >
              View Website
            </a>
            <button
              onClick={toggleDark}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
