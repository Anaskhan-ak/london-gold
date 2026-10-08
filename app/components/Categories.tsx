import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { categories } from "../siteData";

export default function Categories() {
  return (
    <section id="categories" className="py-20 sm:py-28 bg-[#0B0B0B]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Heading */}
        <Reveal className="text-center mb-12 sm:mb-16">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            Our Collections
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-white leading-tight">
            Explore By <span className="gold-text">Category</span>
          </h2>
          <div className="gold-line w-14 mx-auto mt-5" />
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, i) => {
            const count = cat.images.length + cat.videos.length;
            return (
              <Reveal key={cat.slug} delay={i * 0.08} y={30}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#131313] ring-1 ring-inset ring-white/[0.06] transition-all duration-500 hover:ring-[#D4AF37]/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(212,175,55,0.45)]"
                >
                  {/* Media */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {cat.coverImage.endsWith(".mp4") ? (
                      <video
                        src={cat.coverImage}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={cat.coverImage}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    )}

                    {/* Soft scrim so the pill stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

                    {/* Designs count */}
                    {count > 0 && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                        <span className="h-1 w-1 rounded-full gold-bg" />
                        {count} Designs
                      </span>
                    )}
                  </div>

                  {/* Caption panel */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-serif text-lg font-medium text-white sm:text-xl">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">
                      {cat.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-[#D4AF37]">
                      View Collection
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
