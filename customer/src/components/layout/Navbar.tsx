"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight, ChevronDown, Search, Droplets, Home, Zap, HeartHandshake, GraduationCap, ArrowUpRight, User, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import type { LucideIcon } from "lucide-react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Brancho home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
        <Image
          src="/brancho-logo.png"
          alt="Brancho logo"
          width={34}
          height={34}
          className="object-contain"
          priority
        />
      </span>
      <span
        className={cn(
          "font-heading text-xl font-bold tracking-tight",
          dark ? "text-white" : "text-navy"
        )}
      >
        Brancho
      </span>
    </Link>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      return next;
    });
  };

  return { theme, toggle };
}

const BUSINESS_MENU: Array<{ label: string; href: string; description: string; icon: LucideIcon }> = [
  { label: "Brancho Water", href: "/businesses/water", description: "RO, tank cleaning & testing", icon: Droplets },
  { label: "Brancho Home Care", href: "/businesses/home-care", description: "Care plans & cleaning", icon: Home },
  { label: "Brancho Urgent Care", href: "/businesses/urgent-care", description: "24×7 emergency response", icon: Zap },
  { label: "MyFamNest", href: "/businesses/myfamnest", description: "Connected family home", icon: HeartHandshake },
  { label: "Brancho Students", href: "/businesses/students", description: "Student living services", icon: GraduationCap },
];

const COMPANY_MENU = [
  { label: "About Brancho", href: "/company", description: "Our story, mission and people" },
  { label: "Founder", href: "/founder", description: "Meet Rohan Trivedi" },
  { label: "Newsroom", href: "/newsroom", description: "Press and announcements" },
  { label: "Careers", href: "/careers", description: "Build the future with us" },
  { label: "Contact", href: "/contact", description: "Talk to our team" },
];

const FUTURE_MENU = [
  { label: "Brancho Foundation", href: "/future/foundation", description: "Service beyond services" },
  { label: "Innovation Lab", href: "/future/innovation-lab", description: "Prototyping tomorrow's home care" },
  { label: "Brancho AI", href: "/future/ai-platform", description: "The intelligence behind every visit" },
  { label: "Global Expansion", href: "/future/global", description: "A standard of care for the world" },
  { label: "Investor Relations", href: "/future/investors", description: "Transparent, long-term value" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { theme, toggle } = useTheme();
  const { scrollY } = useScroll();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 40));
  }, [scrollY]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    router.replace("/");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleDropdown = (name: string) =>
    setActiveDropdown((v) => (v === name ? null : name));

  const linkClass = cn(
    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
    scrolled ? "text-ink/80 hover:text-navy dark:hover:text-white" : "text-white/85 hover:text-white"
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
        scrolled
          ? "border-b border-line bg-surface/85 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-wide flex h-20 items-center justify-between" aria-label="Main navigation">
        <Logo dark={!scrolled} />

        <ul className="hidden items-center gap-1 lg:flex" ref={dropdownRef}>
          <li>
            <Link href="/services" className={linkClass}>
              Services
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("businesses")}
              aria-expanded={activeDropdown === "businesses"}
              aria-haspopup="menu"
              className={linkClass}
            >
              Businesses
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-300", activeDropdown === "businesses" && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === "businesses" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  className="absolute left-1/2 top-full mt-3 w-[26rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-navy/15"
                >
                  <div className="grid grid-cols-2">
                    {BUSINESS_MENU.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                        className="group flex flex-col gap-1.5 rounded-xl p-4 transition-colors hover:bg-surface-soft"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-gold">
                          <item.icon size={16} />
                        </span>
                        <span className="mt-1 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                          {item.label}
                        </span>
                        <span className="text-xs text-muted">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/businesses"
                    role="menuitem"
                    onClick={() => setActiveDropdown(null)}
                    className="mt-1 flex items-center justify-center gap-2 rounded-xl border-t border-line px-4 py-3 text-sm font-semibold text-accent-deep transition-colors hover:bg-surface-soft"
                  >
                    View all businesses
                    <ArrowUpRight size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("company")}
              aria-expanded={activeDropdown === "company"}
              aria-haspopup="menu"
              className={linkClass}
            >
              Company
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-300", activeDropdown === "company" && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === "company" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-navy/15"
                >
                  {COMPANY_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-surface-soft"
                    >
                      <span className="text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted">{item.description}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("future")}
              aria-expanded={activeDropdown === "future"}
              aria-haspopup="menu"
              className={linkClass}
            >
              The Future
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-300", activeDropdown === "future" && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === "future" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-navy/15"
                >
                  {FUTURE_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-surface-soft"
                    >
                      <span className="text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted">{item.description}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link href="/careers" className={linkClass}>
              Careers
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            aria-label="Search"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              scrolled
                ? "border-line bg-surface-soft text-navy dark:text-white"
                : "border-white/20 bg-white/10 text-white"
            )}
          >
            <Search size={16} />
          </Link>

          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={cn(
              "hidden h-10 w-10 items-center justify-center rounded-full border transition-colors sm:flex",
              scrolled
                ? "border-line bg-surface-soft text-navy dark:text-white"
                : "border-white/20 bg-white/10 text-white"
            )}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {!loading && user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className={cn(
                  "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 transition-colors",
                  scrolled
                    ? "border-line bg-surface-soft hover:border-accent"
                    : "border-white/20 bg-white/10 hover:bg-white/20"
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span
                  className={cn(
                    "hidden max-w-[7rem] truncate text-sm font-semibold md:block",
                    scrolled ? "text-navy dark:text-white" : "text-white"
                  )}
                >
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-300",
                    profileOpen && "rotate-180",
                    scrolled ? "text-navy dark:text-white" : "text-white"
                  )}
                />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    role="menu"
                    className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-navy/15"
                  >
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    {user.role === "admin" ? (
                      <a
                        href={`${ADMIN_URL}/admin`}
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="mt-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
                      >
                        <LayoutDashboard size={16} className="text-accent-deep" />
                        Admin Dashboard
                      </a>
                    ) : (
                      <>
                        <Link
                          href={user.role === "provider" ? "/provider" : "/customer"}
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="mt-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
                        >
                          <LayoutDashboard size={16} className="text-accent-deep" />
                          Dashboard
                        </Link>
                        <Link
                          href={user.role === "provider" ? "/provider/profile" : "/customer/profile"}
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
                        >
                          <User size={16} className="text-accent-deep" />
                          My Profile
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      role="menuitem"
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            !loading && (
              <Link
                href="/login"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  scrolled
                    ? "border-line bg-surface-soft text-navy hover:border-accent hover:text-accent-deep dark:text-white"
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <User size={15} />
                Sign in
              </Link>
            )
          )}

          <Link
            href="/contact"
            className={cn(
              "group hidden items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all lg:inline-flex",
              scrolled
                ? "bg-navy text-white hover:bg-navy-soft dark:bg-gold dark:text-navy dark:hover:brightness-110"
                : "bg-white text-navy hover:bg-secondary"
            )}
          >
            Book a Service
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
              scrolled
                ? "border-line bg-surface-soft text-navy dark:text-white"
                : "border-white/20 bg-white/10 text-white"
            )}
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[85] flex flex-col bg-navy lg:hidden"
          >
            <div className="dot-grid-light absolute inset-0 opacity-30" />
            <div className="container-wide relative flex h-20 items-center justify-between">
              <Logo dark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative flex flex-1 flex-col justify-center gap-1 px-8">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Businesses", href: "/businesses" },
                { label: "Company", href: "/company" },
                { label: "The Future", href: "/future" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 py-5"
                  >
                    <span className="font-heading text-3xl font-semibold text-white transition-colors group-hover:text-gold">
                      {link.label}
                    </span>
                    <ChevronDown className="rotate-[-90deg] text-gold" size={20} />
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative px-8 pb-10"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 font-semibold text-white"
              >
                Book a Service <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
