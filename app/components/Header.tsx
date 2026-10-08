"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "../siteData";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Collections", href: "#categories" },
  { label: "New Arrivals", href: "#featured" },
  { label: "Gold Rate", href: "#gold-rate" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "glass py-3" : "bg-transparent py-5 lg:py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full gold-bg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-[#0B0B0B] font-serif font-bold text-xl leading-none">
                LJ
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-serif text-lg font-semibold tracking-wide leading-none">
                London Jewellers
              </p>
              <p className="text-[#D4AF37]/70 text-[10px] tracking-[0.25em] uppercase mt-1">
                Est. Karachi
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-[#D4AF37] text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[#D4AF37] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${siteConfig.phone[0]}`}
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
            >
              <Phone size={15} />
              <span className="text-[13px]">{siteConfig.phone[0]}</span>
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#0B0B0B] rounded-full no-underline decoration-transparent"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5E6A8 50%, #D4AF37 100%)",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.486a.5.5 0 00.627.616l4.584-1.393A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.02-1.955l-.422-.318-2.777.844.787-2.878-.336-.438A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              WhatsApp
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white p-2 -mr-2"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#0B0B0B] flex flex-col"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between px-5 sm:px-8 py-5">
              <span className="text-white font-serif text-xl font-semibold">
                London Jewellers
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white p-2 -mr-2"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-7">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-2xl sm:text-3xl font-serif hover:text-[#D4AF37] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-6 pb-12 text-sm">
              <a href={`tel:${siteConfig.phone[0]}`} className="text-[#D4AF37]">
                {siteConfig.phone[0]}
              </a>
              <span className="text-white/20">|</span>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37]"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
