import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { GH } from "@/lib/parse";
import { loadAddonsData } from "@/lib/data";
import AddonsTabs from "@/components/AddonsTabs";
import JsonLd from "@/components/JsonLd";
import { SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// Themes, keys and add-ons are read from the cleanyourtv repo, re-fetched at most once an hour,
// so a merged theme or add-on shows up here with no site change.
export const revalidate = 3600;

const title = "Add-ons, themes and switches · CleanYourTV";
const description = "Everything optional around the small CleanYourTV launcher: themes you push without a rebuild, the switches a theme can flip, and add-on apps that plug in as a card.";

export const metadata = pageMeta("/addons", title, description);

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

// The three steps under the title: small line icons in the site's grey, numbers in the green accent.
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const STEPS: [ReactNode, string][] = [
  [<><rect {...line} x="3" y="5" width="18" height="14" rx="3" /><path {...line} d="M7 15h6" /></>, "Pick a card"],
  [<><rect {...line} x="8" y="8" width="12" height="12" rx="2.5" /><path {...line} d="M16 4H6.5A2.5 2.5 0 0 0 4 6.5V16" /></>, "Copy its line"],
  [<><rect {...line} x="3" y="4" width="18" height="16" rx="3" /><path {...line} d="M7 10l3 2.5L7 15M12.5 15H17" /></>, "Your agent applies it"],
];

export default async function Addons() {
  const data = await loadAddonsData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${SITE}/addons`, url: `${SITE}/addons`, name: title, description, isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/#app` } },
      breadcrumbs(["Add-ons", "/addons"]),
    ],
  };
  return (
    <main style={page}>
      <JsonLd data={jsonLd} />
      <div style={wrap}>
        <p style={kicker}>
          <Link href="/" style={green}>cleanyour.tv</Link> &nbsp;·&nbsp; Add-ons
        </p>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 400, margin: "0 0 14px", letterSpacing: -0.5 }}>Add-ons, themes and switches</h1>
        <p style={{ margin: "0 0 24px", fontSize: 20, color: "#bdbdbd" }}>Optional extras for the launcher. Nothing changes unless you ask.</p>

        <ol className="ao-steps" aria-label="How it works">
          {STEPS.map(([icon, label], i) => (
            <li key={label}>
              <span className="ao-step-n">{i + 1}</span>
              <svg className="ao-step-icon" viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
              <span className="ao-step-label">{label}</span>
            </li>
          ))}
        </ol>

        <AddonsTabs data={data} />

        <p style={{ margin: "56px 0 0", color: "#9a9a9a" }}>
          Looking for whole launchers and forks? See <Link href="/#ch-04" style={green}>What people built</Link> and{" "}
          <a href={GH + "/blob/main/SHOWCASE.md"} style={green}>SHOWCASE.md</a>. Questions? See <Link href="/faq" style={green}>the FAQ</Link>. Sending one? <Link href="/bot" style={green}>The review bot</Link> reads it first.
        </p>
      </div>
    </main>
  );
}
