"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Parallax from "@/components/ui/Parallax";

export default function AboutImage() {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/10">
      <Parallax speed={0.08} className="scale-[1.15]">
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/about.svg"
            alt="Brancho home services — verified professionals arriving at your home"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </Parallax>
    </div>
  );
}
