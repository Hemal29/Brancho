"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("brancho-loaded")) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("brancho-loaded", "1");

    let raf: number;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 300);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <div className="dot-grid-light absolute inset-0 opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mb-8">
              <motion.circle
                cx="36"
                cy="36"
                r="34"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <motion.circle
                cx="36"
                cy="36"
                r="34"
                stroke="#C6A55A"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ ease: "easeOut" }}
                transform="rotate(-90 36 36)"
              />
            </svg>
            <span className="relative flex h-16 w-16 items-center justify-center">
              <img
                src="/brancho-logo-white.png"
                alt=""
                className="h-16 w-16 object-contain"
              />
            </span>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-white/50">
              Home Services
            </span>
            <span className="mt-10 font-mono text-xs tabular-nums text-gold">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
