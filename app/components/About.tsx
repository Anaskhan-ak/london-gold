import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF6EC]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image */}
        <Reveal x={-30} y={0} className="relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="/bracelet/bracelet-05.jpeg"
              alt="London Jewellers craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-5 right-5 sm:right-8 w-28 h-28 rounded-2xl gold-bg flex flex-col items-center justify-center shadow-xl shadow-black/20">
            <span className="text-[#0B0B0B] text-3xl font-serif font-bold leading-none">25+</span>
            <span className="text-[#0B0B0B]/60 text-[10px] uppercase tracking-[0.15em] mt-1">Years</span>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal x={30} y={0} delay={0.1}>
          <p className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-3 font-medium">
            Our Heritage
          </p>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-serif font-semibold text-[#0B0B0B] leading-tight mb-5">
            A Legacy of <span className="gold-text">Excellence</span>
          </h2>
          <div className="gold-line w-14 mb-7" />

          <div className="space-y-4 text-[#3a3a3a] text-[15px] leading-[1.75]">
            <p>
              For over two decades, London Jewellers has been Karachi&apos;s most
              trusted name in gold jewellery — a family-run wholesaler renowned for
              exquisite Turkish and Singapuri designs.
            </p>
            <p>
              From our showroom in the heart of Meena Bazar, Karimabad, we present
              thousands of unique pieces, each one hallmarked, certified for purity,
              and finished to perfection.
            </p>
            <p>
              To us, gold jewellery is more than adornment — it is an investment, a
              legacy, and a celebration of life&apos;s most precious moments.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-8 px-7 py-3 text-[#0B0B0B] gold-bg rounded-full font-semibold text-[12px] tracking-[0.12em] uppercase shine"
          >
            Visit Our Showroom
          </a>
        </Reveal>
      </div>
    </section>
  );
}
