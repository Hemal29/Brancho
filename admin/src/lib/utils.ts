import {
  Snowflake,
  Home,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Wrench,
  WashingMachine,
  Refrigerator,
  Droplet,
  UtensilsCrossed,
  ShowerHead,
  Bug,
  Building2,
  Briefcase,
  Store,
  Hotel,
  type LucideIcon,
} from "lucide-react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const iconMap: Record<string, LucideIcon> = {
  Snowflake,
  Home,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Wrench,
  WashingMachine,
  Refrigerator,
  Droplet,
  UtensilsCrossed,
  ShowerHead,
  Bug,
  Building2,
  Briefcase,
  Store,
  Hotel,
};

export function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}
