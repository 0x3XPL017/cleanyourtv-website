import Link from "next/link";
import TvSite from "@/components/TvSite";
import JsonLd from "@/components/JsonLd";
import { loadFacts, loadSiteData } from "@/lib/data";
import { GH } from "@/lib/parse";
import { COVERAGE_TOTAL } from "@/lib/press";
import { homeGraph, pageMeta } from "@/lib/seo";

// Content comes from the cleanyourtv repo and GitHub, re-fetched at most once an hour.
export const revalidate = 3600;

const description =
  "Your TV, minus the ads. Debloat any Android TV or Google TV over Wi-Fi and swap the ad-filled home screen for a clean Apple TV-style launcher. No root, fully reversible.";

export const metadata = pageMeta("/", "CleanYourTV: remove ads and bloat from Android TV and Google TV", description);

export default async function Page() {
  const [data, facts] = await Promise.all([loadSiteData(), loadFacts()]);
  const named = facts.brands.filter(([, n]) => n > 1).map(([b]) => b);
  return (
    <>
      <JsonLd data={homeGraph(facts, description)} />
      <TvSite data={data} pressTotal={COVERAGE_TOTAL} />
      {/* The TV above is mostly drawn and animated on the client. This is the same story in plain text for screen
          readers and crawlers: the pitch, the three setup screens of channel 03 and the counts behind its ticker. */}
      <section className="sr-only" aria-labelledby="about-cleanyourtv">
        <h2 id="about-cleanyourtv">About CleanYourTV</h2>
        <p>
          Your TV, minus the ads. For Android TV and Google TV: an AI coding assistant removes the ads over Wi-Fi. No root, nothing uninstalled, free and
          open source.
        </p>
        <h3>How it works</h3>
        <ol>
          <li>On the TV: Settings, Device Preferences, About. Press OK on Build seven times, go back to Developer options and turn on USB debugging, and Network or ADB debugging if your TV shows it.</li>
          <li>On your computer: paste the prompt from <a href={GH + "/blob/main/PROMPT.md"}>PROMPT.md</a> into Claude Code, or another coding assistant with shell access, and put in your TV model.</li>
          <li>Follow along: accept &quot;Allow USB debugging?&quot; on the TV, then answer its checklist: which apps you use, which four go in the dock, and whether to keep the voice assistant, Chromecast and updates.</li>
        </ol>
        <p>Nothing uninstalled. One line restores it.</p>
        <h3>Supported TVs</h3>
        <p>
          Android TV and Google TV, with tested lists for {facts.tvs} TV models from {facts.brands.length} brands, including {named.join(", ")}. Fire TV takes
          the debloat only. Samsung (Tizen) and LG (webOS) are different systems and are not supported.
        </p>
        <h3>More</h3>
        <ul>
          <li><a href={GH}>CleanYourTV on GitHub</a></li>
          <li><Link href="/press">{COVERAGE_TOTAL} articles about CleanYourTV in the press</Link></li>
          <li><Link href="/addons">Add-ons, themes and switches for the launcher</Link></li>
          <li><Link href="/blog/reintroducing-cleanyourtv">(Re)introducing CleanYourTV</Link></li>
        </ul>
      </section>
    </>
  );
}
