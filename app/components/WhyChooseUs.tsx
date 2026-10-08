"use client";

import { useRef, useEffect, useState } from "react";
import Reveal from "./Reveal";
import { ShieldCheck, Gem, Repeat, PenTool } from "lucide-react";
import { whyChooseUs, stats } from "../siteData";

const iconMap = {
  "shield-check": ShieldCheck,
  gem: Gem,
  repeat: Repeat,
  "pen-tool": PenTool,
} as const;

function Stat({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      let s: number | null = null;
      const step = (ts: number) => {
        if (!s) s = ts;
        const t = Math.min((ts - s) / 1800, 1);
        setVal(Math.floor((1 - Math.pow(1 - t, 3)) * end));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (e) => e.forEach((en) => en.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    const fb = setTimeout(run, 1200);
    return () => {
      io.disconnect();
      clearTimeout(fb);
    };
  }, [end]);

  return (
    <p ref={ref} className="text-[clamp(1.75rem,4vw,2.75rem)] font-serif font-semibold gold-text leading-none mb-2">
      {val.toLocaleString()}
      {suffix}
    </p>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-[#0B0B0B]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal className="text-center mb-12 sm:mb-16">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            The London Difference
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-white leading-tight">
            Why Choose <span className="gold-text">Us</span>
          </h2>
          <div className="gold-line w-14 mx-auto mt-5" />
        </Reveal>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16 sm:mb-20">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.08} y={28}>
                <div className="h-full text-center p-6 sm:p-7 rounded-2xl border border-white/8 bg-[#141414] hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full gold-bg flex items-center justify-center mx-auto mb-5">
                    <Icon size={22} className="text-[#0B0B0B]" />
                  </div>
                  <h3 className="text-white font-serif text-base sm:text-lg font-medium mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/8 pt-12 sm:pt-14">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <Stat end={stat.value} suffix={stat.suffix ?? "+"} />
              <p className="text-white/40 text-[11px] uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
