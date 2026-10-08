"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const particles = useMemo(
    () =>
      mounted
        ? Array.from({ length: 12 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            dur: 3 + Math.random() * 2,
            del: Math.random() * 4,
          }))
        : [],
    [mounted]
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-svh min-h-[600px] max-h-[1100px] flex items-center justify-center overflow-hidden bg-[#0B0B0B]"
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/rings/ring-05.jpeg"
          alt="London Jewellers — Gold Jewelry Collection"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Heavy dark overlay so text is always legible */}
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>

      {/* Subtle gold particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#D4AF37]/50"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -15, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.del,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <motion.div
        className="relative z-10 text-center px-6 sm:px-10 w-full max-w-[680px] mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          className="gold-line w-12 mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.p
          className="text-[#D4AF37] text-[11px] sm:text-xs tracking-[0.35em] uppercase mb-4 font-sans font-medium"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Karachi&apos;s Premier Gold Jeweller
        </motion.p>

        <motion.h1
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-serif font-bold text-white leading-[1.05] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <span className="shimmer">London</span>
          <br />
          <span className="text-white">Jewellers</span>
        </motion.h1>

        <motion.p
          className="text-white/50 text-sm sm:text-base md:text-lg font-serif italic mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Specialist In Turkish &amp; Singapuri Designs
        </motion.p>

        <motion.a
          href="#categories"
          className="inline-flex items-center gap-2.5 px-7 py-3 text-[#0B0B0B] gold-bg rounded-full font-semibold text-[12px] tracking-[0.15em] uppercase shine hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-shadow duration-500"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore Collection
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[18px] h-[30px] border border-white/20 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-[3px] h-[3px] bg-[#D4AF37] rounded-full"
            animate={{ y: [0, 10, 0], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
