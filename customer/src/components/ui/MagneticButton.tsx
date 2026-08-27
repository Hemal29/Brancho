"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-navy text-white hover:bg-navy-soft shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/25",
  secondary:
    "bg-surface text-ink border border-line hover:border-accent shadow-sm",
  ghost:
    "bg-transparent text-ink border border-line hover:border-accent",
  light:
    "bg-white text-navy shadow-xl shadow-navy/30 hover:bg-secondary",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  onClick,
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="relative z-10 inline-flex items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-300 will-change-transform",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref as never}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.97 }}
        aria-label={ariaLabel}
        className={baseClasses}
      >
        <span className="absolute inset-0 -z-0 translate-y-full bg-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as never}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      <span className="absolute inset-0 -z-0 translate-y-full bg-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
      {content}
    </motion.button>
  );
}
