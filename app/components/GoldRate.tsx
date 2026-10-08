"use client";

import { useRef, useEffect, useState } from "react";
import Reveal from "./Reveal";
import { TrendingUp, RefreshCw } from "lucide-react";

type Rate = {
  tola24: number;
  gram24: number;
  tola22: number;
  gram22: number;
  updated: string;
  live: boolean;
};

function CountUp({ target, prefix = "Rs " }: { target: number; prefix?: string }) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    if (target <= 0) {
      setVal(0);
      return;
    }
    let s: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!s) s = ts;
      const t = Math.min((ts - s) / 1600, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <>
      {prefix}
      {val.toLocaleString("en-PK")}
    </>
  );
}

export default function GoldRate() {
  const [rate, setRate] = useState<Rate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/gold-rate")
      .then((r) => r.json())
      .then((d) => {
        if (active) setRate(d);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    { karat: "24K", label: "Pure Gold", tola: rate?.tola24 ?? 0, gram: rate?.gram24 ?? 0, featured: true },
    { karat: "22K", label: "Jewellery Gold", tola: rate?.tola22 ?? 0, gram: rate?.gram22 ?? 0, featured: false },
  ];

  return (
    <section id="gold-rate" className="py-20 sm:py-28 bg-[#0B0B0B] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative">
        <Reveal className="text-center mb-12">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            Live Rates · Pakistan
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-white leading-tight">
            Today&apos;s <span className="gold-text">Gold Rate</span>
          </h2>
          <div className="gold-line w-14 mx-auto mt-5" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[720px] mx-auto">
          {cards.map((card, i) => (
            <Reveal key={card.karat} delay={i * 0.1} y={28}>
              <div
                className={`relative h-full p-7 sm:p-8 rounded-2xl border bg-gradient-to-b from-[#161616] to-[#111] ${
                  card.featured ? "border-[#D4AF37]/35" : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-semibold gold-text leading-none">
                      {card.karat}
                    </span>
                    <span className="text-white/40 text-[11px] uppercase tracking-[0.12em]">
                      {card.label}
                    </span>
                  </div>
                  <TrendingUp size={16} className="text-[#D4AF37]/50" />
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-white/35 text-[10px] uppercase tracking-[0.15em] mb-1">
                      Per Tola
                    </p>
                    <p className="text-[clamp(1.5rem,4vw,2.1rem)] font-serif font-semibold text-white leading-none">
                      {loading ? (
                        <span className="text-white/30">Rs ——</span>
                      ) : (
                        <CountUp target={card.tola} />
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/35 text-[10px] uppercase tracking-[0.15em] mb-1">
                      Per Gram
                    </p>
                    <p className="text-base sm:text-lg font-serif font-medium text-[#D4AF37] leading-none">
                      {loading ? "——" : <CountUp target={card.gram} />}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="flex items-center justify-center gap-2 mt-7 text-white/35 text-[12px]">
            {rate?.live ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
                </span>
                <span>Live · updated {rate.updated}</span>
              </>
            ) : loading ? (
              <>
                <RefreshCw size={12} className="animate-spin" />
                <span>Fetching live rate…</span>
              </>
            ) : (
              <span>Indicative rate{rate ? ` · ${rate.updated}` : ""}</span>
            )}
          </div>
          <p className="text-center text-white/25 text-[11px] mt-2">
            Based on international spot gold &amp; USD/PKR. Visit our showroom for final pricing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
