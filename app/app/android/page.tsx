import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import { SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// The community-built phone app for Clean Your TV, by udhaykumarbala, given a home under /app with Gathin's agreement.
// Every line here is from the app's own repo (README, store text and site); change it there first.
const REPO = "https://github.com/udhaykumarbala/cleanyourtv-app";
const DOWNLOAD = `${REPO}/releases/latest`;

const title = "Clean Your TV app for Android phones";
const description =
  "A community-built phone app for Clean Your TV: clean up your Android TV or Google TV from your Android phone over Wi-Fi. No laptop, no coding agent, no cables. Free and open source.";

export const metadata = pageMeta("/app/android", title, description);

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
const wrap: CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "40px 20px 120px", fontSize: 19, lineHeight: 1.6 };
const kicker: CSSProperties = { margin: "0 0 20px", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#9a9a9a" };
const h2: CSSProperties = { fontSize: 28, fontWeight: 400, margin: "48px 0 12px", letterSpacing: -0.2, lineHeight: 1.25 };
const p: CSSProperties = { margin: "0 0 16px" };
const ul: CSSProperties = { paddingLeft: 22, margin: "0 0 16px" };
const li: CSSProperties = { margin: "0 0 8px" };
const img: CSSProperties = { width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0 8px" };
const note: CSSProperties = { margin: "10px 0 0", fontSize: 15, color: "#8b8b8b" };
const green = { color: "#cfffcf", borderBottomColor: "rgba(207,255,207,.35)" };
const B = ({ children }: { children: ReactNode }) => <strong style={{ fontWeight: 500, color: "#fff" }}>{children}</strong>;

const STEPS: [string, string][] = [
  ["Connect", "The app finds your TV on the Wi-Fi and shows you how to let the phone in with the remote. About a minute."],
  ["Analyse", "It reads what is on the TV and shows the plan: what goes off and what stays. Nothing changes yet."],
  ["Clean", "Tap “Make it clean”. A restore point first, then the clutter goes and the new home screen comes on."],
];

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
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        isAccessibleForFree: true,
        license: "https://opensource.org/licenses/MIT",
        downloadUrl: DOWNLOAD,
        codeRepository: REPO,
        isBasedOn: { "@id": `${SITE}/#app` },
        author: { "@type": "Person", name: "udhaykumarbala", url: "https://github.com/udhaykumarbala" },
      },
      breadcrumbs(["Android app", "/app/android"]),
    ],
  };
  return (
    <main className="page-main" style={page}>
      <JsonLd data={jsonLd} />
      <article style={wrap}>
        <p style={kicker}>
          <Link href="/" className="home-link" style={green}>cleanyour.tv</Link> &nbsp;·&nbsp; Android app
        </p>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 400, margin: "0 0 14px", letterSpacing: -0.5 }}>{title}</h1>
        <p style={{ ...p, fontSize: 20, color: "#bdbdbd" }}>
          Clean up your Android TV or Google TV from your phone, over your Wi-Fi. No laptop, no coding agent, no cables.
        </p>
        <p style={{ ...p, color: "#bdbdbd" }}>
          A community-built app by <a href="https://github.com/udhaykumarbala" style={green}>udhaykumarbala</a>, built on{" "}
          <Link href="/" style={green}>Clean Your TV</Link> with Gathin&rsquo;s permission. It carries the same launcher and the same
          community TV lists. Free and open source (MIT).
        </p>

        <div className="bot-cta" style={{ marginTop: 28 }}>
          <a href={DOWNLOAD} className="bot-btn bot-btn-main">Download the APK</a>
          <a href={REPO} className="bot-btn">Source code on GitHub</a>
        </div>
        <p style={note}>Needs Android 9 or newer. Google Play and F-Droid versions are on the way.</p>

        {/* A plain img, as the blog does: one static picture, no optimizer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app/android/banner-3-steps.png"
          alt="Clean your TV from your phone: the app on a phone next to a TV with its new, calm home screen. Three steps: connect, analyse, clean."
          width={1600}
          height={760}
          style={img}
        />

        <h2 style={h2}>Three steps, about five minutes</h2>
        <ol style={ul}>
          {STEPS.map(([step, text]) => (
            <li key={step} style={li}>
              <B>{step}.</B> {text}
            </li>
          ))}
        </ol>
        <p style={p}>Come back any time to put an app back, check for leftovers after a TV update, change the dock or the look, or undo everything.</p>

        <h2 style={h2}>What it keeps</h2>
        <ul style={ul}>
          <li style={li}><B>Your apps:</B> Netflix, YouTube, Prime Video, live TV and the HDMI inputs.</li>
          <li style={li}><B>The basics:</B> Wi-Fi, the remote, the keyboard and the parts Android needs to run. The app never touches them.</li>
          <li style={li}><B>Casting, the voice assistant and software updates</B> stay on too, unless you choose to switch them off.</li>
        </ul>

        <h2 style={h2}>Safe by design</h2>
        <ul style={ul}>
          <li style={li}><B>Plan first.</B> Nothing runs until you have seen it and tapped.</li>
          <li style={li}><B>Restore point.</B> Saved on your phone before the first change.</li>
          <li style={li}><B>Nothing is uninstalled.</B> Apps are only switched off, so every one can come back.</li>
          <li style={li}><B>Undo anything.</B> One app or everything, any time.</li>
          <li style={li}><B>A watchdog on the TV</B> puts its own home screen back if the phone does not confirm within 150 seconds.</li>
        </ul>

        <h2 style={h2}>What you need</h2>
        <ul style={ul}>
          <li style={li}>An Android phone with Android 9 or newer and a screen lock.</li>
          <li style={li}>An Android TV or Google TV on the same Wi-Fi as the phone.</li>
          <li style={li}>
            Network debugging switched on in the TV&rsquo;s settings. The app shows you where, step by step, and switches it off again at the
            end unless you keep it on.
          </li>
        </ul>
        <p style={p}>Not for Samsung, LG or Roku. Those TVs do not run Android, so the app cannot work on them.</p>

        <p style={{ margin: "56px 0 0", color: "#9a9a9a", fontSize: 17 }}>
          No accounts, no analytics, no ads: read the <Link href="/app/android/privacy" style={green}>privacy policy</Link>. Something wrong
          in the app? <a href={`${REPO}/issues`} style={green}>Open an issue</a> in its repo. About Clean Your TV itself, see{" "}
          <Link href="/faq" style={green}>the FAQ</Link>.
        </p>
      </article>
    </main>
  );
}
