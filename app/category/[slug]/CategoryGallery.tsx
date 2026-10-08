"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { CategoryItem } from "../../siteData";

type MediaItem = { type: "image" | "video"; src: string };

// Short, always-true style notes per collection. Rotated by index so the grid
// reads like a real catalogue without mislabelling any individual piece.
const DESCRIPTORS: Record<string, string[]> = {
  rings: [
    "Signature Turkish motif",
    "Delicate Singapuri work",
    "Bold statement band",
    "Everyday 22K elegance",
  ],
  bracelets: [
    "Supple handcrafted links",
    "Classic kara styling",
    "Modern cuff silhouette",
    "Light, all-day wear",
  ],
  "bridal-sets": [
    "Complete bridal ensemble",
    "Heirloom-worthy detailing",
    "Grand-occasion statement",
    "Timeless wedding set",
  ],
  chains: [
    "Classic rope weave",
    "Modern link pattern",
    "Everyday 22K chain",
    "Richly hallmarked gold",
  ],
};

// Build a professional label + SKU-style code from a media file path.
// e.g. "/rings/ring-10.jpeg" → { title: "Ring No. 10", code: "LJ-R10" }
function describe(category: CategoryItem, src: string, index: number) {
  const singular = category.name.replace(/s$/, ""); // Rings → Ring, Bridal Sets → Bridal Set
  const num = src.match(/(\d+)(?=\.\w+$)/)?.[1] ?? String(index + 1).padStart(2, "0");
  const prefix = category.slug.charAt(0).toUpperCase();
  const pool = DESCRIPTORS[category.slug] ?? ["Handcrafted 22K gold"];
  return {
    title: `${singular} No. ${num}`,
    code: `LJ-${prefix}${num}`,
    descriptor: pool[index % pool.length],
  };
}

function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onNav(index - 1);
      if (e.key === "ArrowRight" && index < items.length - 1) onNav(index + 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNav]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white z-10 p-2" aria-label="Close">
        <X size={24} />
      </button>

      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(index - 1); }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {index < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(index + 1); }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 z-10"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={item.src}
          className="relative max-w-[90vw] max-h-[85vh]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt=""
              width={1200}
              height={1200}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
              quality={90}
              priority
            />
          ) : (
            <video src={item.src} controls autoPlay className="max-h-[85vh] w-auto rounded-lg" />
          )}
        </motion.div>
      </AnimatePresence>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-sans">
        {index + 1} / {items.length}
      </p>
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  count,
  label,
}: {
  eyebrow: string;
  title: string;
  count: number;
  label: string;
}) {
  return (
    <motion.div
      className="mb-6 flex items-end justify-between gap-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-2xl font-semibold text-white sm:text-[1.75rem]">
          {title}
        </h2>
      </div>
      <span className="shrink-0 pb-1 text-xs font-sans text-white/35">
        {count} {label}
      </span>
    </motion.div>
  );
}

export default function CategoryGallery({ category }: { category: CategoryItem }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const allMedia: MediaItem[] = [
    ...category.images.map((src) => ({ type: "image" as const, src })),
    ...category.videos.map((src) => ({ type: "video" as const, src })),
  ];

  const open = useCallback((i: number) => setLightboxIdx(i), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const nav = useCallback((i: number) => setLightboxIdx(i), []);

  const imageCount = category.images.length;
  const photos = allMedia.filter((m) => m.type === "image");
  const videos = allMedia.filter((m) => m.type === "video");

  // One catalogue card. `globalIndex` maps into `allMedia` for the lightbox;
  // `localIndex` drives the descriptor rotation + stagger within its section.
  const renderCard = (item: MediaItem, globalIndex: number, localIndex: number) => {
    const meta = describe(category, item.src, localIndex);
    return (
      <motion.button
        key={item.src}
        type="button"
        className="group flex h-full flex-col overflow-hidden rounded-xl bg-[#131313] text-left ring-1 ring-inset ring-white/[0.06] transition-all duration-500 hover:ring-[#D4AF37]/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(212,175,55,0.45)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(localIndex * 0.025, 0.5) }}
        onClick={() => open(globalIndex)}
        aria-label={`View ${meta.title}`}
      >
        {/* Media */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#141414]">
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt={meta.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
          ) : (
            <>
              <video
                src={item.src}
                muted
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 transition-colors duration-300 group-hover:bg-[#D4AF37]/90">
                  <Play size={16} className="ml-0.5 text-white" />
                </div>
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        </div>

        {/* Caption */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-[15px] font-medium leading-snug text-white sm:text-base">
              {meta.title}
            </h3>
            <span className="shrink-0 pt-0.5 text-[10px] font-medium tracking-[0.1em] text-[#D4AF37]/70">
              {meta.code}
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-white/45">
            {meta.descriptor}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
            <span className="text-[11px] text-white/35">Price on request</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D4AF37]">
              View
              <ChevronRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#0B0B0B]">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-8 pb-24">
          {/* Back link */}
          <Link
            href="/#categories"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F5E6A8] transition-colors text-sm font-sans mb-10"
          >
            <ArrowLeft size={16} />
            Back to Collections
          </Link>

          {/* Title */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-serif font-bold text-white leading-tight mb-2">
              <span className="gold-text">{category.name}</span> Collection
            </h1>
            <p className="text-white/40 text-sm font-sans">{category.description}</p>
            <p className="text-white/25 text-xs mt-1.5 font-sans">{allMedia.length} pieces</p>
            <div className="gold-line w-14 mt-6" />
          </motion.div>

          {/* Photos */}
          {photos.length > 0 && (
            <section className="mb-16">
              <SectionHeading
                eyebrow="Gallery"
                title="Photos"
                count={photos.length}
                label="designs"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {photos.map((item, i) => renderCard(item, i, i))}
              </div>
            </section>
          )}

          {/* Videos */}
          {videos.length > 0 && (
            <section>
              <SectionHeading
                eyebrow="In Motion"
                title="Videos"
                count={videos.length}
                label="clips"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {videos.map((item, i) => renderCard(item, imageCount + i, i))}
              </div>
            </section>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox items={allMedia} index={lightboxIdx} onClose={close} onNav={nav} />
        )}
      </AnimatePresence>
    </>
  );
}
