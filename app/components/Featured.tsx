import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

// Curated New Arrivals — only the clean, white-studio product shots so the
// strip reads as one consistent, premium theme. Descriptions are written to
// match each individual piece.
const items = [
  {
    src: "/rings/ring-10.jpeg",
    title: "Ring No. 10",
    code: "LJ-R10",
    descriptor: "Floral cluster crown on a slim pavé band",
  },
  {
    src: "/rings/ring-11.jpeg",
    title: "Ring No. 11",
    code: "LJ-R11",
    descriptor: "Twisted infinity band in two-tone gold",
  },
  {
    src: "/rings/ring-12.jpeg",
    title: "Ring No. 12",
    code: "LJ-R12",
    descriptor: "Parallel split band with a pavé centre bar",
  },
  {
    src: "/rings/ring-02.jpeg",
    title: "Ring No. 02",
    code: "LJ-R02",
    descriptor: "Interlocking double-loop design with pavé sparkle",
  },
];

export default function Featured() {
  return (
    <section id="featured" className="py-20 sm:py-28 bg-[#FAF6EC] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal className="text-center mb-12 sm:mb-16">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            Just Arrived
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-[#0B0B0B] leading-tight">
            New <span className="gold-text">Arrivals</span>
          </h2>
          <p className="mt-4 mx-auto max-w-md text-sm text-[#0B0B0B]/50 leading-relaxed">
            The latest additions to our wholesale collection — freshly
            handcrafted Turkish &amp; Singapuri designs in pure 22K gold.
          </p>
          <div className="gold-line w-14 mx-auto mt-5" />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <Reveal key={item.src} delay={i * 0.08} y={30}>
              <Link
                href="/category/rings"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-inset ring-[#0B0B0B]/[0.07] transition-all duration-500 hover:ring-[#D4AF37]/50 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(212,175,55,0.5)]"
              >
                {/* Media */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0B0B0B]/5">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 text-[9px] tracking-[0.15em] uppercase gold-bg text-[#0B0B0B] rounded-full font-bold">
                      New
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-base font-medium leading-snug text-[#0B0B0B]">
                      {item.title}
                    </h3>
                    <span className="shrink-0 pt-0.5 text-[10px] font-medium tracking-[0.1em] text-[#D4AF37]">
                      {item.code}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#0B0B0B]/50">
                    {item.descriptor}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#0B0B0B]/[0.08] pt-2.5">
                    <span className="text-[11px] text-[#0B0B0B]/40">Price on request</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D4AF37]">
                      View
                      <ChevronRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
