"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { testimonials } from "../siteData";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const len = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % len), 5500);
    return () => clearInterval(t);
  }, [len]);

  return (
    <section className="py-20 sm:py-28 bg-[#0B0B0B]">
      <div className="max-w-[820px] mx-auto px-6 sm:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            Testimonials
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-white leading-tight">
            What Our <span className="gold-text">Clients</span> Say
          </h2>
          <div className="gold-line w-14 mx-auto mt-5" />
        </Reveal>

        <Reveal y={28}>
          <div className="relative">
            <Quote className="mx-auto mb-6 text-[#D4AF37]/25" size={40} fill="currentColor" />

            <div className="relative min-h-[180px] sm:min-h-[150px] flex items-center">
              <button
                onClick={() => setIdx((p) => (p - 1 + len) % len)}
                className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setIdx((p) => (p + 1) % len)}
                className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>

              <div className="w-full px-8 sm:px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    className="text-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-1 mb-5">
                      {Array.from({ length: testimonials[idx].rating }).map((_, i) => (
                        <Star key={i} size={15} className="fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <blockquote className="text-lg sm:text-xl font-serif text-white/80 leading-relaxed mb-5 italic">
                      {testimonials[idx].text}
                    </blockquote>
                    <p className="text-[#D4AF37] font-medium text-[13px] tracking-[0.1em] uppercase">
                      {testimonials[idx].name}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? "bg-[#D4AF37] w-6" : "bg-white/15 w-1.5 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
