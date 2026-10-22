import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { GH } from "@/lib/parse";
import { loadAddonsData } from "@/lib/data";
import AddonsTabs from "@/components/AddonsTabs";

// Themes, keys and add-ons are read from the cleanyourtv repo, re-fetched at most once an hour,
// so a merged theme or add-on shows up here with no site change.
export const revalidate = 3600;

const title = "Add-ons, themes and switches · CleanYourTV";
const description = "Everything optional around the small CleanYourTV launcher: themes you push without a rebuild, the switches a theme can flip, and add-on apps that plug in as a card.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://cleanyour.tv/addons" },
  openGraph: { title, description, url: "https://cleanyour.tv/addons", siteName: "CleanYourTV", images: [{ url: "/docs/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", creator: "@gathint", title, description, images: ["/docs/og.png"] },
};

// body is overflow:hidden for the TV, so the page scrolls inside main, as /press and the blog do.
const page: CSSProperties = {
  height: "100dvh",
  overflowY: "auto",
  background: "#050505",
  color: "#e9e9e9",
  fontFamily: "var(--font-outfit), Outfit, sans-serif",
  fontWeight: 300,
  WebkitFontSmoothing: "antialiased",
};
const wrap: CSSProperties = { maxWidth: 1160, margin: "0 auto", padding: "40px 16px 120px", fontSize: 17, lineHeight: 1.5 };
const kicker: CSSProperties = { margin: "0 0 20px", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#9a9a9a" };
const green = { color: "#cfffcf", borderBottomColor: "rgba(207,255,207,.35)" };

export default async function Addons() {
  const data = await loadAddonsData();
  return (
    <main style={page}>
      <div style={wrap}>
        <p style={kicker}>
          <Link href="/" style={green}>cleanyour.tv</Link> &nbsp;·&nbsp; Add-ons
        </p>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 400, margin: "0 0 14px", letterSpacing: -0.5 }}>Add-ons, themes and switches</h1>
        <p style={{ margin: "0 0 32px", fontSize: 20, color: "#bdbdbd", maxWidth: 720 }}>
          The launcher stays small and plain on purpose. Everything here is optional: themes you push without a rebuild, switches a theme can
          flip, and add-on apps that plug in as a card. Copy the line on a card and give it to your coding agent.
        </p>

        <AddonsTabs data={data} />

        <p style={{ margin: "56px 0 0", color: "#9a9a9a" }}>
          Looking for whole launchers and forks? See <Link href="/#ch-04" style={green}>What people built</Link> and{" "}
          <a href={GH + "/blob/main/SHOWCASE.md"} style={green}>SHOWCASE.md</a>.
        </p>
      </div>
    </main>
  );
}
