import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PRESS, cdn } from "@/lib/site";
import { COVERAGE, COVERAGE_COUNTRIES, COVERAGE_TOTAL } from "@/lib/press";

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
const wrap: CSSProperties = { maxWidth: 880, margin: "0 auto", padding: "40px 20px 120px", fontSize: 17, lineHeight: 1.5 };
const kicker: CSSProperties = { margin: "0 0 20px", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#9a9a9a" };
const green = { color: "#cfffcf", borderBottomColor: "rgba(207,255,207,.35)" };
const anchor = (g: string) => g.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Press() {
  const fromCountries = COVERAGE.filter((g) => g.country).reduce((n, g) => n + g.items.length, 0);
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 26px", alignItems: "center", margin: "0 0 36px" }}>
          {PRESS.map(([slug, name, url]) => (
            <a key={slug} href={url} target="_blank" rel="noopener" title={name} className="no-border" style={{ lineHeight: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cdn(`/press/${slug}.png`)} alt={name} height={30} style={{ height: 30, width: "auto", display: "block" }} />
            </a>
          ))}
        </div>

        <nav aria-label="Countries" style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 12px" }}>
          {COVERAGE.map((g) => (
            <a key={g.group} href={`#${anchor(g.group)}`} className="press-chip">
              {g.group} <span style={{ color: "#8b8b8b" }}>{g.items.length}</span>
            </a>
          ))}
        </nav>

        {COVERAGE.map((g) => (
          <section key={g.group} id={anchor(g.group)} style={{ scrollMarginTop: 24 }}>
            <h2 style={{ fontSize: 26, fontWeight: 400, margin: "48px 0 6px", letterSpacing: -0.2 }}>
              {g.group} <span style={{ color: "#7a7a7a", fontSize: 18 }}>{g.items.length}</span>
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {g.items.map(([outlet, headline, date, url]) => (
                <li key={url} className="press-row">
                  <span style={{ fontWeight: 400, color: "#fff" }}>{outlet}</span>
                  <span className="press-head">
                    <a href={url} target="_blank" rel="noopener" style={green}>{headline}</a>
                  </span>
                  <span style={{ color: "#8b8b8b", whiteSpace: "nowrap" }}>{date}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p style={{ margin: "56px 0 0", color: "#9a9a9a" }}>
          Wrote about CleanYourTV and not on this list? <a href="https://github.com/Gathin23/cleanyourtv/issues/new" style={green}>Open an issue</a> with the link.
          The same list is <a href="https://github.com/Gathin23/cleanyourtv/blob/main/docs/PRESS.md" style={green}>docs/PRESS.md</a> in the repo.
        </p>
      </div>
    </main>
  );
}
