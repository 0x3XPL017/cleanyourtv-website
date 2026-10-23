import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import { SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// The Android app's privacy policy, word for word from PRIVACY.md in its repo, and the URL its Google Play listing shows.
// When PRIVACY.md changes, this page changes in a pull request; its two relative links point at the repo here.
const REPO = "https://github.com/udhaykumarbala/cleanyourtv-app";
const EFFECTIVE = "2026-10-23";

const title = "Privacy policy · Clean Your TV app for Android phones";
const description =
  "The privacy policy of the community-built Clean Your TV app for Android phones (tv.cleanyour.app). The app does not collect your data: no accounts, no analytics, no advertising, no crash reporting.";

export const metadata = pageMeta("/app/android/privacy", title, description);

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
const wrap: CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "40px 20px 120px", fontSize: 18, lineHeight: 1.6 };
const kicker: CSSProperties = { margin: "0 0 20px", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#9a9a9a" };
const h2: CSSProperties = { fontSize: 26, fontWeight: 400, margin: "44px 0 12px", letterSpacing: -0.2, lineHeight: 1.25 };
const p: CSSProperties = { margin: "0 0 16px" };
const ul: CSSProperties = { paddingLeft: 22, margin: "0 0 16px" };
const li: CSSProperties = { margin: "0 0 8px" };
const green = { color: "#cfffcf", borderBottomColor: "rgba(207,255,207,.35)" };
const code: CSSProperties = { fontSize: "0.85em", padding: "1px 6px", borderRadius: 6, background: "#15181e" };
const B = ({ children }: { children: ReactNode }) => <strong style={{ fontWeight: 500, color: "#fff" }}>{children}</strong>;
const A = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} style={green}>{children}</a>;

export default function AndroidPrivacy() {
  const url = `${SITE}/app/android/privacy`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url, url, name: title, description, datePublished: EFFECTIVE, isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/app/android#app` } },
      breadcrumbs(["Android app", "/app/android"], ["Privacy policy", "/app/android/privacy"]),
    ],
  };
  return (
    <main className="page-main" style={page}>
      <JsonLd data={jsonLd} />
      <article style={wrap}>
        <p style={kicker}>
          <Link href="/app/android" className="home-link" style={green}>Android app</Link> &nbsp;·&nbsp; Privacy
        </p>
        <p style={{ ...p, color: "#bdbdbd" }}>
          Privacy policy for the Clean Your TV app for Android phones (package <code style={code}>tv.cleanyour.app</code>)
        </p>

        <h1 style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 400, margin: "0 0 20px", letterSpacing: -0.5 }}>Privacy policy</h1>

        <p style={p}>
          Clean Your TV (the Android app, package <code style={code}>tv.cleanyour.app</code>) is a community-built phone app for{" "}
          <A href="https://github.com/Gathin23/cleanyourtv">Clean Your TV</A>. It is published as open source by udhaykumarbala at{" "}
          <A href={REPO}>github.com/udhaykumarbala/cleanyourtv-app</A>.
        </p>
        <p style={p}>Effective date: {EFFECTIVE}.</p>

        <h2 style={h2}>The short version</h2>
        <ul style={ul}>
          <li style={li}>The app does not collect your data. It has no accounts, no analytics, no advertising and no crash reporting service.</li>
          <li style={li}>
            Nothing about you, your phone or your TV is sent to us or to anyone else. We run no server for this app, so we could not receive it if it
            were.
          </li>
          <li style={li}>Everything the app learns about your TV stays on your phone.</li>
        </ul>

        <h2 style={h2}>What the app talks to</h2>
        <p style={p}>
          <B>Your TV, on your home network.</B> To clean your TV the app connects to the TV you pick, over your Wi-Fi, using Android&rsquo;s
          debugging connection (ADB, port 5555), and it listens for TVs announcing themselves on the network (mDNS) so it can find yours. This
          traffic stays inside your home network. The app reads the list of apps and the model of your TV, and it changes settings and apps on the TV
          when you tell it to.
        </p>
        <p style={p}>
          <B>GitHub, only in the GitHub and F-Droid versions, and only when you ask.</B> The version you download from GitHub or F-Droid has three
          features that contact GitHub, and only when you use them: &ldquo;Check for updates&rdquo; makes one request for the latest release, opening
          Cards and modules fetches the signed list of add-ons, and an optional add-on downloads from its GitHub release when you add it. GitHub sees
          the usual details of any web request (your IP address, for example) under{" "}
          <A href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub&rsquo;s privacy statement</A>.
          The app sends no identifier of its own. The home screen launcher and the TV progress screen are inside the app, so a normal clean-up makes
          no internet request at all.
        </p>
        <p style={p}>
          <B>The Google Play version makes no internet requests to GitHub.</B> It has no update check and no add-on downloads, because Google Play
          updates the app. A normal clean-up needs the internet for nothing.
        </p>
        <p style={p}>The app has no other internet connections: no advertising networks, analytics or tracking services.</p>

        <h2 style={h2}>What stays on your phone</h2>
        <ul style={ul}>
          <li style={li}>
            <B>The key your TV trusts.</B> The first time you connect, the app makes a key that the TV remembers as &ldquo;this phone&rdquo;. It lives
            in the Android Keystore on your phone and never leaves it.
          </li>
          <li style={li}>
            <B>Restore points.</B> Before the first change the app saves a note of what your TV looked like, so everything can be put back. It stays
            on your phone. It leaves your phone only if you choose &ldquo;Save a copy&rdquo; and send the file somewhere yourself.
          </li>
          <li style={li}>
            <B>Your choices</B>, such as the dock and the look you picked, and the TVs you have set up.
          </li>
        </ul>
        <p style={p}>
          You can delete all of this at any time from the app&rsquo;s Settings, or by clearing the app&rsquo;s storage or uninstalling it in
          Android&rsquo;s settings.
        </p>

        <h2 style={h2}>Diagnostics</h2>
        <p style={p}>
          &ldquo;Share diagnostics&rdquo; is off until you use it. It shows you a preview of the report first, removes network addresses, serial
          numbers, keys and pairing codes, and sends nothing by itself: it opens Android&rsquo;s share sheet and you pick where it goes (a message,
          an email, a note), or you cancel.
        </p>

        <h2 style={h2}>Permissions</h2>
        <p style={p}>
          The app asks Android for: internet and network state (to reach the TV and, in the GitHub and F-Droid versions, GitHub), Wi-Fi multicast
          (to find the TV), a foreground service while it works on the TV, notifications (to tell you when it is done), and your screen lock
          (confirmed once before the first change, so a stranger holding your unlocked phone cannot change your TV). It does not ask for location,
          contacts, camera, microphone, photos or storage.
        </p>

        <h2 style={h2}>Children</h2>
        <p style={p}>
          The app is made for adults who set up their own or their family&rsquo;s TV. It does not knowingly collect anything from anyone, children
          included.
        </p>

        <h2 style={h2}>Changes to this policy</h2>
        <p style={p}>
          If the app ever starts to collect or send data, this page changes first and the change is noted in the{" "}
          <A href={`${REPO}/blob/main/CHANGELOG.md`}>changelog</A>. The history of this file is public in the repository.
        </p>

        <h2 style={h2}>Contact</h2>
        <p style={p}>
          Questions or concerns: <A href={`${REPO}/issues`}>open an issue</A> on GitHub. For a security problem, please follow{" "}
          <A href={`${REPO}/blob/main/SECURITY.md`}>SECURITY.md</A> instead.
        </p>

        <p style={{ margin: "56px 0 0", color: "#9a9a9a", fontSize: 16 }}>
          This page mirrors <A href={`${REPO}/blob/main/PRIVACY.md`}>PRIVACY.md</A> in the app&rsquo;s repository, where its history is public.
          Back to <Link href="/app/android" style={green}>the Android app</Link>.
        </p>
      </article>
    </main>
  );
}
