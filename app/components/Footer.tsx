"use client";

import Link from "next/link";
import { siteConfig, categories } from "../siteData";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Collections", href: "#categories" },
  { label: "New Arrivals", href: "#featured" },
  { label: "Gold Rate", href: "#gold-rate" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#D4AF37]/8">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center">
                <span className="text-[#0B0B0B] font-serif font-bold text-lg leading-none">LJ</span>
              </div>
              <p className="text-white font-serif text-lg font-semibold leading-none">
                London Jewellers
              </p>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-sans mb-3 max-w-[260px]">
              {siteConfig.tagline}
            </p>
            <p className="text-white/25 text-xs font-sans leading-relaxed">
              {siteConfig.address}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4AF37]/70 font-sans text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm font-sans">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[#D4AF37]/70 font-sans text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm font-sans">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div>
            <h4 className="text-[#D4AF37]/70 font-sans text-[11px] uppercase tracking-[0.2em] font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 mb-6">
              {siteConfig.phone.map((p) => (
                <li key={p}>
                  <a href={`tel:${p}`} className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm font-sans">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm font-sans"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <h4 className="text-[#D4AF37]/70 font-sans text-[11px] uppercase tracking-[0.2em] font-semibold mb-3">
              Hours
            </h4>
            <div className="text-white/30 text-xs font-sans space-y-1">
              <p>Mon–Thu, Sat: {siteConfig.hours.weekdays}</p>
              <p>Fri: {siteConfig.hours.friday}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs font-sans">
            &copy; 2026 London Jewellers. All rights reserved.
          </p>
          <p className="text-white/15 text-xs font-sans">
            Meena Bazar, Karimabad, Karachi
          </p>
        </div>
      </div>
    </footer>
  );
}
