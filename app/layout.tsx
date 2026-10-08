import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "London Jewellers — Premium Gold Jewelry | Karachi",
    template: "%s | London Jewellers",
  },
  description:
    "London Jewellers — Karachi's premier gold jewelry wholesaler specializing in exquisite Turkish & Singapuri designs. Hallmarked, certified, timeless. Located in Meena Bazar, Karimabad.",
  keywords: [
    "gold jewelry",
    "Karachi",
    "Turkish designs",
    "Singapuri designs",
    "gold rings",
    "gold bracelets",
    "bridal sets",
    "gold chains",
    "London Jewellers",
    "Meena Bazar",
    "Karimabad",
    "wholesale gold",
    "hallmarked jewelry",
  ],
  openGraph: {
    title: "London Jewellers — Premium Gold Jewelry | Karachi",
    description:
      "Karachi's premier gold jewelry wholesaler specializing in Turkish & Singapuri designs.",
    type: "website",
    locale: "en_PK",
    siteName: "London Jewellers",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable}`}
      style={{
        fontFamily:
          "var(--font-body), 'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              name: "London Jewellers",
              description:
                "Karachi's premier gold jewelry wholesaler specializing in Turkish & Singapuri designs.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Shop C 13, 14 Ground Floor, Main Meena Bazar Market",
                addressLocality: "Karimabad, Karachi",
                addressCountry: "PK",
              },
              telephone: ["+92-321-8912723", "+92-321-2271861"],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Saturday",
                  ],
                  opens: "10:00",
                  closes: "22:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "14:30",
                  closes: "22:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
