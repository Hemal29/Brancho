"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [role='button'], input, textarea, [data-hover]"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            scale: pressed ? 0.7 : hovering ? 2.2 : 1,
            opacity: hovering ? 0.35 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{ scale: pressed ? 0.9 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40"
        />
      </motion.div>
    </div>
  );
}
