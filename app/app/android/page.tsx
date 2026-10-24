import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import LoopVideo from "@/components/LoopVideo";
import { SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// The community-built phone app for Clean Your TV, by udhaykumarbala, given a home under /app with Gathin's agreement.
// Every line here is from the app's own repo (README, store text and site); change it there first.
// The pictures and the demo loop are his too (docs/images/), re-encoded for the web; the app's amber is his accent.
const REPO = "https://github.com/udhaykumarbala/cleanyourtv-app";
const DOWNLOAD = `${REPO}/releases/latest`;
const AUTHOR = "https://github.com/udhaykumarbala";
const VERSION = "0.3.0";
const IMG = "/app/android";

const title = "Clean Your TV app for Android phones";
const description =
  "A community-built phone app for Clean Your TV: clean up your Android TV or Google TV from your Android phone over Wi-Fi. No laptop, no coding agent, no cables. Free and open source.";
const BANNER_ALT =
  "Community-maintained app for Clean Your TV. Clean your TV from your phone. No laptop. No coding agent. Open the app on your Android phone, tap Start, and the ads and bloat are gone in about five minutes. Three steps: connect, analyse, clean.";

export const metadata = pageMeta("/app/android", title, description, {
  image: { url: `${IMG}/og.png`, width: 1200, height: 630, alt: BANNER_ALT },
});

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
const kicker: CSSProperties = { margin: "0 0 28px", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#9a9a9a" };
const green = { color: "#cfffcf", borderBottomColor: "rgba(207,255,207,.35)" };

// Line icons in the /addons style: 24 px box, 1.6 stroke, currentColor.
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const Icon = ({ children }: { children: ReactNode }) => (
  <svg className="and-icon" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);
const I = {
  download: <><path {...line} d="M12 4v11M7 10.5l5 5 5-5" /><path {...line} d="M5 19.5h14" /></>,
  tv: <><rect {...line} x="3" y="5" width="18" height="12" rx="2.5" /><path {...line} d="M9 20.5h6" /></>,
  wifi: <><path {...line} d="M3.5 9.5a12 12 0 0 1 17 0M6.5 12.7a7.6 7.6 0 0 1 11 0M9.5 15.8a3.4 3.4 0 0 1 5 0" /><circle cx="12" cy="18.8" r="1.1" fill="currentColor" /></>,
  cast: <><path {...line} d="M3 8V6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5H14" /><path {...line} d="M3 12a8 8 0 0 1 8 8M3 16a4 4 0 0 1 4 4" /><circle cx="3.6" cy="19.4" r=".9" fill="currentColor" /></>,
  eye: <><path {...line} d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle {...line} cx="12" cy="12" r="3" /></>,
  save: <><path {...line} d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" /><path {...line} d="M4 4v4.5h4.5M12 8v4l2.8 1.8" /></>,
  power: <><path {...line} d="M12 3.5V11" /><path {...line} d="M7 6.3a7.5 7.5 0 1 0 10 0" /></>,
  undo: <><path {...line} d="M9 14 4 9l5-5" /><path {...line} d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></>,
  shield: <><path {...line} d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z" /><path {...line} d="m8.8 12 2.2 2.2 4.4-4.4" /></>,
  phone: <><rect {...line} x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path {...line} d="M10.5 18.5h3" /></>,
  toggle: <><rect {...line} x="2.5" y="7" width="19" height="10" rx="5" /><circle {...line} cx="16.5" cy="12" r="2.6" /></>,
  github: <path fill="currentColor" d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1 2.9.8.1-.6.3-1 .6-1.3-2.1-.2-4.3-1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" />,
};

// The three steps, with his phone screenshots and their alt text from his README.
const STEPS: { step: string; when: string; img: string; alt: string; text: string }[] = [
  {
    step: "Connect", when: "About a minute", img: "step-connect.webp",
    alt: "Look at the TV: the TV asks whether to trust this phone; tick Always allow, then choose OK",
    text: "The app finds your TV on the Wi-Fi and shows you how to let the phone in with the remote.",
  },
  {
    step: "Analyse", when: "Nothing changes yet", img: "step-analyse.webp",
    alt: "We found 22 things to switch off, grouped into adverts, tracking, apps nobody asked for and brand extras, with everything it keeps listed below",
    text: "It reads what is on the TV and shows the plan: what goes off and what stays.",
  },
  {
    step: "Clean", when: "A restore point first", img: "step-clean.webp",
    alt: "Your TV is ready: 23 things switched off, new home screen on, everything can be put back",
    text: "Tap “Make it clean”. The clutter goes and the new home screen comes on.",
  },
];

const KEEPS: [ReactNode, ReactNode][] = [
  [I.tv, <><b>Your apps:</b> Netflix, YouTube, Prime Video, live TV and the HDMI inputs.</>],
  [I.wifi, <><b>The basics:</b> Wi-Fi, the remote, the keyboard and the parts Android needs to run. The app never touches them.</>],
  [I.cast, <><b>Casting, the voice assistant and software updates</b> stay on too, unless you choose to switch them off.</>],
];
const SAFE: [ReactNode, ReactNode][] = [
  [I.eye, <><b>Plan first.</b> Nothing runs until you have seen it and tapped.</>],
  [I.save, <><b>Restore point.</b> Saved on your phone before the first change.</>],
  [I.power, <><b>Nothing is uninstalled.</b> Apps are only switched off, so every one can come back.</>],
  [I.undo, <><b>Undo anything.</b> One app or everything, any time.</>],
  [I.shield, <><b>A watchdog on the TV</b> puts its own home screen back if the phone does not confirm within 150 seconds.</>],
];
const NEEDS: [ReactNode, ReactNode][] = [
  [I.phone, <>An <b>Android phone</b> with Android 9 or newer and a screen lock.</>],
  [I.tv, <>An <b>Android TV or Google TV</b> on the same Wi-Fi as the phone.</>],
  [I.toggle, <><b>Network debugging</b> switched on in the TV&rsquo;s settings. The app shows you where, step by step, and switches it off again at the end unless you keep it on.</>],
];

const List = ({ items }: { items: [ReactNode, ReactNode][] }) => (
  <ul className="and-list">
    {items.map(([icon, text], i) => (
      <li key={i}><Icon>{icon}</Icon><span>{text}</span></li>
    ))}
  </ul>
);

const Buttons = () => (
  <div className="and-cta">
    <a href={DOWNLOAD} className="and-btn and-btn-main"><Icon>{I.download}</Icon>Download the APK <span>(v{VERSION})</span></a>
    <a href={REPO} className="and-btn"><Icon>{I.github}</Icon>Source on GitHub</a>
  </div>
);

const Avatar = ({ size }: { size: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`${IMG}/udhaykumarbala.webp`} alt="" width={size} height={size} className="and-avatar" decoding="async" />
);

export default function AndroidApp() {
  const url = `${SITE}/app/android`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url, url, name: title, description, isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${url}#app` } },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        name: "Clean Your TV app for Android phones",
        description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android 9 or newer",
        softwareVersion: VERSION,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        isAccessibleForFree: true,
        license: "https://opensource.org/licenses/MIT",
        downloadUrl: DOWNLOAD,
        codeRepository: REPO,
        image: `${SITE}${IMG}/og.png`,
        screenshot: STEPS.map((s) => `${SITE}${IMG}/${s.img}`),
        isBasedOn: { "@id": `${SITE}/#app` },
        author: { "@type": "Person", name: "udhaykumarbala", url: AUTHOR },
      },
      breadcrumbs(["Android app", "/app/android"]),
    ],
  };
  return (
    <main className="page-main and-page" style={page}>
      <JsonLd data={jsonLd} />
      <div className="and-wrap">
        <p style={kicker}>
          <Link href="/" className="home-link" style={green}>cleanyour.tv</Link> &nbsp;·&nbsp; Android app
        </p>

        {/* Hero: the pitch on the left, his banner's phone and TV on the right (below on phones). */}
        <header className="and-hero">
          <div className="and-hero-text">
            <p className="and-tag"><span aria-hidden="true" />Community-maintained app for Clean Your TV</p>
            <h1 className="and-title">Clean your TV <em>from your phone</em></h1>
            <p className="and-lede">
              <b>No laptop. No coding agent.</b> Open the app on your Android phone, tap Start, and the ads and bloat are gone in about five minutes.
            </p>
            <Buttons />
            <ul className="and-chips" aria-label="At a glance">
              <li>Android 9+</li>
              <li>MIT</li>
              <li>Open source</li>
              <li>131 TV models · 46 brands</li>
            </ul>
          </div>
          <div className="and-hero-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/hero.webp`}
              alt="The app on a phone next to a TV with its new, calm home screen, over your Wi-Fi."
              width={760}
              height={760}
              fetchPriority="high"
            />
          </div>
        </header>

        {/* 01: the demo loop, in a TV. */}
        <section aria-labelledby="demo">
          <h2 id="demo" className="bot-h2"><span>01</span>Watch it clean a TV</h2>
          <figure className="and-tv">
            <div className="and-tv-screen">
              <LoopVideo
                className="and-video"
                mp4={`${IMG}/demo.mp4`}
                webm={`${IMG}/demo.webm`}
                poster={`${IMG}/demo-poster.webp`}
                width={1200}
                height={744}
                label="Three steps, phone and TV side by side. 1 Connect: the app finds the TV and the TV asks to allow the phone. 2 Analyse: the phone reads the TV and shows 22 things to switch off while the TV is untouched. 3 Clean: the phone shows Making it clean while the TV shows a lantern scanning the old cards and drawing them into a soft black hole, and the TV ends on its new home screen."
              />
            </div>
            <span className="and-tv-stand" aria-hidden="true" />
          </figure>
        </section>

        {/* 02: the three steps, each with his screenshot in a phone. */}
        <section aria-labelledby="steps">
          <h2 id="steps" className="bot-h2"><span>02</span>Three steps, about five minutes</h2>
          <ol className="and-steps">
            {STEPS.map((s, i) => (
              <li key={s.step} className="bot-card and-step">
                <div className="and-phone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/${s.img}`} alt={s.alt} width={360} height={780} loading="lazy" decoding="async" />
                </div>
                <div className="and-step-text">
                  <span className="and-step-top"><span className="and-step-n">{i + 1}</span>{s.step}</span>
                  <span className="and-step-when">{s.when}</span>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="and-after">
            Come back any time to put an app back, check for leftovers after a TV update, change the dock or the look, or undo everything.
          </p>
        </section>

        {/* 03: safety, what stays, what you need. */}
        <section aria-labelledby="safe">
          <h2 id="safe" className="bot-h2"><span>03</span>How it works</h2>
          <div className="and-facts">
            <div className="bot-card and-fact">
              <h3>Safe by design</h3>
              <List items={SAFE} />
            </div>
            <div className="bot-card and-fact">
              <h3>What it keeps</h3>
              <List items={KEEPS} />
            </div>
            <div className="bot-card and-fact">
              <h3>What you need</h3>
              <List items={NEEDS} />
              <p className="and-not">Not for Samsung, LG or Roku. Those TVs do not run Android, so the app cannot work on them.</p>
            </div>
          </div>
        </section>

        {/* Closing band. */}
        <section className="and-band" aria-labelledby="get">
          <h2 id="get">Your TV, tidied up.</h2>
          <p className="and-band-lede">Free and open source (MIT). It carries the same launcher and the same community TV lists as Clean Your TV.</p>
          <Buttons />
          <p className="and-band-note">Google Play and F-Droid versions are on the way.</p>
          <a href={AUTHOR} className="and-credit">
            <Avatar size={44} />
            <span>
              <b>A community-built app by udhaykumarbala</b>
              <span>Built on Clean Your TV</span>
            </span>
          </a>
        </section>

        <p className="and-foot">
          No accounts, no analytics, no ads: read the <Link href="/app/android/privacy" style={green}>privacy policy</Link>. Something wrong in the app?{" "}
          <a href={`${REPO}/issues`} style={green}>Open an issue</a> in its repo. About Clean Your TV itself, see <Link href="/faq" style={green}>the FAQ</Link>.
        </p>
      </div>
    </main>
  );
}
