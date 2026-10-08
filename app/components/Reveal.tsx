"use client";

import { useRef, useState, useEffect, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
};

/**
 * Reliable scroll-reveal wrapper.
 * - Reveals when the element scrolls into view (IntersectionObserver).
 * - Reveals immediately if already in view on mount.
 * - Safety net: reveals after 1.2s no matter what, so content can NEVER
 *   get stuck invisible (unlike framer-motion useInView in this env).
 * - Respects prefers-reduced-motion (shows instantly, no transform).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className = "",
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    // Already in view on mount?
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true);
      if (once) return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Ultimate safety net — never leave content invisible.
    const fallback = window.setTimeout(() => setShown(true), 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate(${x}px, ${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
