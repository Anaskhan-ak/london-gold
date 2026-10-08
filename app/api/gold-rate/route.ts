import { NextResponse } from "next/server";
import { goldRateConfig } from "../../siteData";

// Upstream gold + FX responses are cached for an hour via the per-fetch
// `next: { revalidate }` options below, so external APIs aren't hit on every
// request even though this handler itself runs dynamically.
const TROY_OUNCE_GRAMS = 31.1034768;
const TOLA_GRAMS = 11.6638038; // standard Pakistani tola for gold

type GoldRate = {
  tola24: number;
  gram24: number;
  tola22: number;
  gram22: number;
  pricePerOzUsd: number;
  usdToPkr: number;
  updated: string;
  live: boolean;
};

function round(n: number) {
  return Math.round(n);
}

export async function GET() {
  try {
    const [goldRes, fxRes] = await Promise.all([
      fetch("https://api.gold-api.com/price/XAU", {
        next: { revalidate: 3600 },
      }),
      fetch("https://open.er-api.com/v6/latest/USD", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!goldRes.ok || !fxRes.ok) throw new Error("upstream not ok");

    const gold = await goldRes.json();
    const fx = await fxRes.json();

    const pricePerOzUsd: number = gold?.price;
    const usdToPkr: number = fx?.rates?.PKR;

    if (!pricePerOzUsd || !usdToPkr) throw new Error("missing fields");

    // Pure international gold value converted to PKR, plus a local market
    // premium (Pakistan Sarafa rates usually sit slightly above spot).
    const premium = goldRateConfig.localPremium;
    const pkrPerGram24 = (pricePerOzUsd / TROY_OUNCE_GRAMS) * usdToPkr * premium;
    const pkrPerTola24 = pkrPerGram24 * TOLA_GRAMS;

    const data: GoldRate = {
      tola24: round(pkrPerTola24),
      gram24: round(pkrPerGram24),
      tola22: round(pkrPerTola24 * (22 / 24)),
      gram22: round(pkrPerGram24 * (22 / 24)),
      pricePerOzUsd: round(pricePerOzUsd),
      usdToPkr: Math.round(usdToPkr * 100) / 100,
      updated: new Date(gold?.updatedAt ?? Date.now()).toLocaleString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Karachi",
      }),
      live: true,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    // APIs unavailable — serve the configured fallback so the UI never breaks.
    const fb = goldRateConfig.fallback;
    const data: GoldRate = {
      tola24: fb.tola24,
      gram24: fb.gram24,
      tola22: round(fb.tola24 * (22 / 24)),
      gram22: round(fb.gram24 * (22 / 24)),
      pricePerOzUsd: 0,
      usdToPkr: 0,
      updated: fb.updated,
      live: false,
    };
    return NextResponse.json(data, { status: 200 });
  }
}
