"use client";

import { motion } from "framer-motion";
import {
  Star,
  Bell,
  Wrench,
  Droplets,
  Bug,
  ClipboardList,
  Navigation,
  History,
  CalendarCheck,
  MapPin,
  Clock,
  CircleDollarSign,
  type LucideIcon,
} from "lucide-react";

type PhoneMockupProps = {
  title: string;
  features: { title: string; description: string }[];
  icons?: LucideIcon[];
  theme: "customer" | "provider";
  compact?: boolean;
};

const CUSTOMER_ICONS: LucideIcon[] = [CalendarCheck, Clock, ClipboardList, Bell, Star];
const PROVIDER_ICONS: LucideIcon[] = [Bell, Navigation, CircleDollarSign, Clock, History];

export default function PhoneMockup({ title, features, icons, theme, compact = false }: PhoneMockupProps) {
  const isCustomer = theme === "customer";
  const usedIcons = icons && icons.length ? icons : isCustomer ? CUSTOMER_ICONS : PROVIDER_ICONS;

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-10">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-[520px] w-[250px] overflow-hidden rounded-[2.5rem] border-[8px] border-navy bg-navy shadow-2xl shadow-navy/40"
        >
          <div className="absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-navy" />
          <div className="flex items-center justify-between px-6 pb-2 pt-3 text-[10px] font-semibold text-white">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-3 rounded-[2px] border border-white/60" />
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            </span>
          </div>

          <div className={`px-4 pb-4 ${isCustomer ? "bg-accent" : "bg-navy-soft"}`}>
            <div className="flex items-center justify-between pt-3">
              <p className="text-[11px] font-semibold text-white">Brancho</p>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <Bell size={11} className="text-white" />
              </span>
            </div>
            <p className="mt-3 text-[13px] font-semibold text-white/90">
              {isCustomer ? "Good evening, Priya" : "Good evening, Suresh"}
            </p>
            <p className="text-[10px] text-white/60">
              {isCustomer ? "Your next booking is today" : "You have 3 jobs today"}
            </p>
          </div>

          <div className="space-y-2.5 bg-[#F4F7FA] px-3.5 py-4">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                {isCustomer ? "Active Booking" : "Today's Schedule"}
              </p>
              <div className="mt-2 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                  <Wrench size={15} className="text-accent" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-navy">AC Deep Cleaning</p>
                  <p className="text-[9px] text-muted">
                    {isCustomer ? "Today · 5:00 PM" : "10:00 AM · Veraval"}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className={`h-full rounded-full ${isCustomer ? "bg-accent" : "bg-gold"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isCustomer ? "68%" : "42%" }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                />
              </div>
              <p className="mt-1.5 text-[9px] font-medium text-muted">
                {isCustomer ? "Professional assigned · on time" : "Next job after this"}
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                {isCustomer ? "Recent Services" : "This Week"}
              </p>
              {[
                isCustomer
                  ? { icon: ClipboardList, label: "Deep Home Cleaning", price: "₹1,499", done: true }
                  : { icon: Bell, label: "3 Jobs Completed", price: "₹2,850", done: true },
                isCustomer
                  ? { icon: Droplets, label: "Plumbing Repair", price: "₹450", done: true }
                  : { icon: Navigation, label: "2 Jobs in Progress", price: "₹1,200", done: false },
                isCustomer
                  ? { icon: Bug, label: "Pest Control", price: "₹899", done: false }
                  : { icon: History, label: "Yesterday · 2 Jobs", price: "₹1,650", done: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className="mt-2 flex items-center justify-between border-t border-line pt-2 first:mt-2 first:border-0 first:pt-0"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md ${
                        item.done ? "bg-accent/10" : "bg-gold/10"
                      }`}
                    >
                      <item.icon size={13} className={item.done ? "text-accent" : "text-gold"} />
                    </span>
                    <span className="text-[10px] font-medium text-navy">{item.label}</span>
                  </span>
                  <span className="text-[9px] font-bold text-navy">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 rounded-xl bg-white p-3 shadow-sm">
              {[1, 2, 3, 4, 5].map((r) => (
                <Star key={r} size={11} className="fill-gold text-gold" />
              ))}
              <span className="ml-1 text-[9px] font-medium text-muted">
                {isCustomer ? "Rate your last service" : "4.9 · Average rating"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {compact ? null : (
        <>
          <h3 className="font-heading text-2xl font-semibold text-ink">{title}</h3>
          <ul className="mt-6 space-y-3.5">
            {features.map((feature, i) => {
              const Icon = usedIcons[i] ?? usedIcons[0];
              return (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
                    <Icon size={15} />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{feature.title}</p>
                    <p className="text-sm text-muted">{feature.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
