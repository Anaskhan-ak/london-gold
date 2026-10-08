export const siteConfig = {
  name: "London Jewellers",
  tagline: "Wholesaler, Specialist In Turkish & Singapuri Designs",
  description:
    "London Jewellers — Karachi's premier gold jewelry wholesaler specializing in exquisite Turkish & Singapuri designs. Hallmarked, certified, timeless.",
  phone: ["0321-8912723", "0321-2271861"],
  whatsapp: "923218912723",
  address:
    "Shop C 13, 14 Ground Floor, Main Meena Bazar Market, Karimabad, Karachi",
  // Keyless Google Maps embed built from the showroom address. Works without
  // an API key. To pin the exact storefront, open Google Maps → the shop →
  // Share → "Embed a map", and paste that iframe `src` here instead.
  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Meena Bazar Market, Karimabad, Karachi, Pakistan") +
    "&t=&z=15&ie=UTF8&iwloc=&output=embed",
  hours: {
    weekdays: "10:00 AM – 10:00 PM",
    friday: "2:30 PM – 10:00 PM",
    sunday: "Closed",
  },
  social: {
    whatsapp: "https://wa.me/923218912723",
    instagram: "#",
    facebook: "#",
  },
};

// Live gold-rate settings.
// Rates are fetched automatically from the international spot price (gold-api.com)
// and the USD→PKR exchange rate (open.er-api.com), then converted to PKR per tola
// and per gram for 24K & 22K. No API key required.
export const goldRateConfig = {
  // Local market premium over the pure international value. Pakistani Sarafa
  // rates usually sit slightly above spot. Set to 1.0 for the raw international
  // value, or bump it (e.g. 1.02 = +2%) to match your local posted rate.
  localPremium: 1.0,
  // Shown only if the live APIs are unavailable. Update occasionally so the
  // fallback stays sensible. (Approx. values as of Oct 2026.)
  fallback: {
    tola24: 426900,
    gram24: 36600,
    updated: "Oct 2026 (offline)",
  },
};

export interface CategoryItem {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  images: string[];
  videos: string[];
}

function generatePaths(
  folder: string,
  prefix: string,
  imgCount: number,
  vidCount: number,
  vidPrefix?: string
): { images: string[]; videos: string[] } {
  const images = Array.from(
    { length: imgCount },
    (_, i) => `/${folder}/${prefix}-${String(i + 1).padStart(2, "0")}.jpeg`
  );
  const vp = vidPrefix ?? `${prefix}-vid`;
  const videos = Array.from(
    { length: vidCount },
    (_, i) => `/${folder}/${vp}-${String(i + 1).padStart(2, "0")}.mp4`
  );
  return { images, videos };
}

const ringsMedia = generatePaths("rings", "ring", 80, 7);
const braceletMedia = generatePaths("bracelet", "bracelet", 11, 23);
const setsMedia = generatePaths("sets", "set", 0, 15, "set-vid");
const chainsMedia = generatePaths("chains", "chain", 0, 4, "chain-vid");

export const categories: CategoryItem[] = [
  {
    name: "Rings",
    slug: "rings",
    description:
      "Statement and everyday rings, hand-finished in signature Turkish & Singapuri gold.",
    coverImage: "/rings/ring-10.jpeg",
    ...ringsMedia,
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    description:
      "Supple bangles, kara and cuffs — crafted to catch the light from every angle.",
    coverImage: "/bracelet/bracelet-01.jpeg",
    ...braceletMedia,
  },
  {
    name: "Bridal Sets",
    slug: "bridal-sets",
    description:
      "Complete bridal ensembles, designed to make your special day unforgettable.",
    coverImage: setsMedia.videos[0],
    images: [],
    videos: setsMedia.videos,
  },
  {
    name: "Chains",
    slug: "chains",
    description:
      "From classic ropes to modern links, in richly hallmarked 22K gold.",
    coverImage: chainsMedia.videos[0],
    images: [],
    videos: chainsMedia.videos,
  },
];

export const testimonials = [
  {
    name: "Fatima A.",
    text: "The most stunning Turkish designs I've ever seen. London Jewellers truly lives up to its name — pure elegance and unmatched quality.",
    rating: 5,
  },
  {
    name: "Ahmed K.",
    text: "I bought my wife's bridal set from here. The craftsmanship is extraordinary and the prices are very competitive for wholesalers.",
    rating: 5,
  },
  {
    name: "Sara M.",
    text: "Their Singapuri designs are absolutely breathtaking. Every piece feels like a work of art. Highly recommended!",
    rating: 5,
  },
  {
    name: "Usman R.",
    text: "Best gold jewelry shop in Karimabad. Hallmarked, certified, and the staff is incredibly helpful. A truly premium experience.",
    rating: 5,
  },
  {
    name: "Nadia H.",
    text: "I keep coming back for their unique designs. The quality and finish of every piece is consistently excellent.",
    rating: 5,
  },
];

export const stats = [
  { label: "Years of Excellence", value: 25 },
  { label: "Happy Customers", value: 10000 },
  { label: "Unique Designs", value: 5000 },
  { label: "Purity Guaranteed", value: 100, suffix: "%" },
];

export const whyChooseUs = [
  {
    title: "Purity Certified",
    description: "Every piece is hallmarked and certified for guaranteed gold purity.",
    icon: "shield-check" as const,
  },
  {
    title: "Turkish & Singapuri",
    description: "Exclusive specialist in the finest Turkish and Singapuri jewellery designs.",
    icon: "gem" as const,
  },
  {
    title: "Easy Exchange",
    description: "Hassle-free exchange policy because your satisfaction is our priority.",
    icon: "repeat" as const,
  },
  {
    title: "Custom Designs",
    description: "Bespoke jewellery crafted to your exact specifications and desires.",
    icon: "pen-tool" as const,
  },
];
