"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Spinning rings */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
              <div className="absolute inset-2.5 rounded-full border border-[#F5E6A8]/20 border-b-[#F5E6A8] animate-[spin-slow_1.8s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-serif font-bold gold-text">LJ</span>
              </div>
            </div>
            <motion.p
              className="text-[#D4AF37]/60 text-[11px] tracking-[0.35em] uppercase font-sans"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              London Jewellers
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
