import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PRESS, cdn } from "@/lib/site";
import { COVERAGE, COVERAGE_COUNTRIES, COVERAGE_TOTAL } from "@/lib/press";
import PressGrid, { type PressItem } from "@/components/PressGrid";

const description = `${COVERAGE_TOTAL} articles about CleanYourTV from ${COVERAGE_COUNTRIES} countries, from TechCrunch and Mashable to GIGAZINE and Xataka.`;

export const metadata: Metadata = {
  title: "CleanYourTV in the press",
  description,
  alternates: { canonical: "https://cleanyour.tv/press" },
  openGraph: { title: "CleanYourTV in the press", description, url: "https://cleanyour.tv/press", siteName: "CleanYourTV", images: [{ url: "/docs/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", creator: "@gathint", title: "CleanYourTV in the press", description, images: ["/docs/og.png"] },
};

// body is overflow:hidden for the TV, so the page scrolls inside main, as the blog does.
const page: CSSProperties = {
  height: "100dvh",
  overflowY: "auto",
  background: "#050505",
  color: "#e9e9e9",
  fontFamily: "var(--font-outfit), Outfit, sans-serif",
  fontWeight: 300,
  WebkitFontSmoothing: "antialiased",
};
const wrap: CSSProperties = { maxWidth: 1160, margin: "0 auto", padding: "40px 20px 120px", fontSize: 17, lineHeight: 1.5 };
const kicker: CSSProperties = { margin: "0 0 20px", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#9a9a9a" };
const green = { color: "#cfffcf", borderBottomColor: "rgba(207,255,207,.35)" };

// Left out of the logo wall: icons that are a generated letter, a person's photo or YouTube's own logo, and What People Made (a gallery, not an outlet).
const NO_LOGO = new Set(["tectoc", "timenews", "twaslnews", "newsytoday", "substack", "artificiallyintimidating", "youtube", "whatpeoplemade"]);
// The big names (the home page's press strip) lead, then everything else in the list's order.
const RANK = new Map(PRESS.map(([slug], i) => [slug, i]));
const rank = (icon: string, i: number) => RANK.get(icon) ?? 1000 + i;
// Platform icons shared by several authors are named after the platform.
const LOGO_NAME: Record<string, string> = { devto: "DEV Community" };

export default function Press() {
  const fromCountries = COVERAGE.filter((g) => g.country).reduce((n, g) => n + g.items.length, 0);
  const items: PressItem[] = COVERAGE.flatMap((g) =>
    g.items.map(([outlet, headline, date, url, thumb, icon]) => ({ outlet, headline, date, url, thumb, icon, group: g.group })),
  )
    .map((it, i) => ({ it, r: rank(it.icon, i) }))
    .sort((a, b) => a.r - b.r)
    .map(({ it }) => it);
  // One logo per outlet, linking to its first article; names drop "(on Yahoo Tech)"-style notes.
  const seen = new Set<string>();
  const logos = items
    .filter((it) => !NO_LOGO.has(it.icon) && !seen.has(it.icon) && seen.add(it.icon))
    .map((it) => ({ icon: it.icon, url: it.url, outlet: LOGO_NAME[it.icon] ?? it.outlet.replace(/ \(.*\)$/, "") }));
  return (
    <main style={page}>
      <div style={wrap}>
        <p style={kicker}>
          <Link href="/" style={green}>cleanyour.tv</Link> &nbsp;·&nbsp; Press
        </p>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 400, margin: "0 0 14px", letterSpacing: -0.5 }}>In the press</h1>
        <p style={{ margin: "0 0 32px", fontSize: 20, color: "#bdbdbd", maxWidth: 680 }}>
          {COVERAGE_TOTAL} articles about CleanYourTV in its first days: {fromCountries} from outlets in {COVERAGE_COUNTRIES} countries, the rest from
          Spanish-language sites in Latin America, newsletters, blogs and AI news sites. Headlines are as published.
        </p>

        <ul className="press-logos" aria-label="Outlets">
          {logos.map((l) => (
            <li key={l.icon}>
              <a href={l.url} target="_blank" rel="noopener" title={l.outlet} className="no-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cdn(`/press/icons/${l.icon}.png`)} alt="" width={28} height={28} loading="lazy" decoding="async" />
                <span>{l.outlet}</span>
              </a>
            </li>
          ))}
        </ul>

        <PressGrid items={items} groups={COVERAGE.map((g) => ({ label: g.group, count: g.items.length }))} />

        <p style={{ margin: "56px 0 0", color: "#9a9a9a" }}>
          Wrote about CleanYourTV and not on this list? <a href="https://github.com/Gathin23/cleanyourtv/issues/new" style={green}>Open an issue</a> with the link.
          The same list is <a href="https://github.com/Gathin23/cleanyourtv/blob/main/docs/PRESS.md" style={green}>docs/PRESS.md</a> in the repo.
        </p>
      </div>
    </main>
  );
}
