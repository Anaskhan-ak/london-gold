"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import Reveal from "./Reveal";
import { siteConfig } from "../siteData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi London Jewellers!\n\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, "_blank");
  };

  const info = [
    { icon: MapPin, title: "Visit Us", body: <p className="text-white/50 text-[14px] leading-relaxed">{siteConfig.address}</p> },
    {
      icon: Phone,
      title: "Call Us",
      body: (
        <div className="space-y-0.5">
          {siteConfig.phone.map((p) => (
            <a key={p} href={`tel:${p}`} className="block text-white/50 hover:text-[#D4AF37] transition-colors text-[14px]">{p}</a>
          ))}
        </div>
      ),
    },
    {
      icon: Clock,
      title: "Opening Hours",
      body: (
        <div className="text-white/50 text-[14px] space-y-0.5">
          <p>Mon–Thu, Sat: {siteConfig.hours.weekdays}</p>
          <p>Friday: {siteConfig.hours.friday}</p>
          <p>Sunday: {siteConfig.hours.sunday}</p>
        </div>
      ),
    },
  ];

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-[#0B0B0B] border border-white/10 text-white text-[14px] placeholder:text-white/25 focus:border-[#D4AF37]/50 focus:outline-none transition-colors";

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0B0B0B]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal className="text-center mb-12 sm:mb-16">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            Get In Touch
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-white leading-tight">
            Visit <span className="gold-text">Our Showroom</span>
          </h2>
          <div className="gold-line w-14 mx-auto mt-5" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Info + map */}
          <Reveal x={-24} y={0}>
            <div className="space-y-6 mb-8">
              {info.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full gold-bg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#0B0B0B]" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-base font-medium mb-1">{title}</h3>
                    {body}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden h-[240px] border border-white/10">
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="London Jewellers Location"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal x={24} y={0} delay={0.1}>
            <form onSubmit={submit} className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#141414]">
              <h3 className="text-white font-serif text-xl font-medium mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white/45 text-[11px] uppercase tracking-[0.15em] mb-2">Your Name</label>
                  <input id="name" type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white/45 text-[11px] uppercase tracking-[0.15em] mb-2">Phone Number</label>
                  <input id="phone" type="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="Your phone number" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/45 text-[11px] uppercase tracking-[0.15em] mb-2">Message</label>
                  <textarea id="message" rows={4} required value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inputCls} resize-none`} placeholder="Tell us what you're looking for..." />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-[#0B0B0B] gold-bg rounded-xl font-semibold text-[12px] tracking-[0.12em] uppercase shine">
                  <Send size={15} />
                  Send via WhatsApp
                </button>
                <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors font-semibold text-[12px] tracking-[0.12em] uppercase">
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
