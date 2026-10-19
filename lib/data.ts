// Everything the site reads from the tv-vibehack repo and GitHub, fetched on the server with
// Incremental Static Regeneration (revalidate hourly) and a static fallback for every value, so the
// page never depends on the public GitHub rate limit at request time.
import fs from "node:fs/promises";
import path from "node:path";
import { GH, REPO, parseShowcase, parseTVs, parseThemes, starSeriesFallback } from "./parse";
import type { Pr, ResultItem, ShowcaseItem, SiteData, ThemeItem } from "./parse";

const RAW = `https://raw.githubusercontent.com/${REPO}/main/`;
const REVALIDATE = 3600;

function ghHeaders(): HeadersInit {
  const h: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "cleanyour.tv" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function text(url: string): Promise<string | null> {
  try {
    const r = await fetch(url, { next: { revalidate: REVALIDATE } });
    return r.ok ? r.text() : null;
  } catch {
    return null;
  }
}

async function json<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { headers: ghHeaders(), next: { revalidate: REVALIDATE } });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}

// ---- star history: hourly buckets over the first 48 hours, normalised 0..1 (falls back to a curve)

async function starSeries(total: number): Promise<number[]> {
  // Each page is 100 stargazers with timestamps; cap the walk so a huge repo cannot exhaust the limit.
  if (!process.env.GITHUB_TOKEN) return starSeriesFallback();
  const pages = Math.min(40, Math.ceil(total / 100));
  const times: number[] = [];
  for (let p = 1; p <= pages; p++) {
    try {
      const r = await fetch(`https://api.github.com/repos/${REPO}/stargazers?per_page=100&page=${p}`, {
        headers: { ...ghHeaders(), Accept: "application/vnd.github.star+json" },
        next: { revalidate: REVALIDATE * 6 },
      });
      if (!r.ok) break;
      const list = (await r.json()) as { starred_at: string }[];
      list.forEach((s) => times.push(Date.parse(s.starred_at)));
      if (list.length < 100) break;
    } catch {
      break;
    }
  }
  if (times.length < 50) return starSeriesFallback();
  times.sort((a, b) => a - b);
  const t0 = times[0], buckets = new Array(49).fill(0);
  for (const t of times) {
    const h = Math.floor((t - t0) / 3600000);
    if (h <= 48) buckets[h] += 1;
  }
  let acc = 0;
  const cum = buckets.map((n) => (acc += n));
  const max = cum[48] || 1;
  return cum.map((v) => v / max);
}

// ---- the one call page.tsx makes

export async function loadSiteData(): Promise<SiteData> {
  const [repo, examplesMd, showcaseMd, themesMd, prompt] = await Promise.all([
    json<{ stargazers_count: number; forks_count: number }>(`https://api.github.com/repos/${REPO}`),
    text(RAW + "examples/README.md"),
    text(RAW + "SHOWCASE.md"),
    text(RAW + "themes/README.md"),
    text(RAW + "PROMPT.md"),
  ]);

  const prs: Pr[] = [];
  for (let p = 1; p <= 3; p++) {
    const list = await json<{ merged_at: string | null; user: { login: string; avatar_url: string } | null; title: string }[]>(
      `https://api.github.com/repos/${REPO}/pulls?state=closed&per_page=100&page=${p}`,
    );
    if (!list) break;
    list.forEach((x) => {
      if (x.merged_at && x.user) prs.push({ login: x.user.login, avatar: x.user.avatar_url, title: x.title || "" });
    });
    if (list.length < 100) break;
  }

  const results = JSON.parse(await fs.readFile(path.join(process.cwd(), "content", "results.json"), "utf8")) as ResultItem[];
  const stars = repo?.stargazers_count ?? FALLBACK.stars;

  return {
    stars,
    forks: repo?.forks_count ?? FALLBACK.forks,
    prs,
    prCount: prs.length || FALLBACK.prCount,
    contributors: prs.length ? new Set(prs.map((p) => p.login)).size : FALLBACK.contributors,
    tvs: examplesMd ? parseTVs(examplesMd) : parseTVs(FALLBACK.examples),
    results,
    showcase: showcaseMd ? parseShowcase(showcaseMd) : FALLBACK.showcase,
    themes: themesMd ? parseThemes(themesMd) : FALLBACK.themes,
    prompt: prompt || `Read and follow the prompt at ${GH}/blob/main/PROMPT.md\nMy TV model is: <MODEL NAME HERE>.`,
    starSeries: await starSeries(stars),
    fetchedAt: new Date().toISOString(),
  };
}

// ---- static fallbacks (snapshot of the repo on 2026-10-19)

export const FALLBACK = {
  stars: 2780,
  forks: 331,
  prCount: 52,
  contributors: 29,
  examples: [
    "| `benq-e55-735/` | BenQ E55-735 (Changhong AI PONT, DVB96BQ) | Google TV 14 | Homwee store/help, Anoki ACR, Google TV recommendations; wireless-debugging pairing, setupwraith, deep-standby notes |",
    "| `chiq-ai-pont/` | CHiQ AI PONT (DVB93CQ) | Android TV 11 | Anoki ACR, FAST channels, AI PONT, Homwee services |",
    "| `google-chromecast-gtv-4k/` | Chromecast with Google TV 4K (sabrina) | Google TV 14 | Google telemetry and ad services, ambient mode, launcherx + setupwraith; wireless-debugging pairing, YouTube button remap |",
    "| `hisense-smarttv-4k-ffm/` | Hisense SmartTV 4K FFM (huangshan, MediaTek) | Android TV 10 | ACR (evservice), VIDAA preload, store/hotel mode, OTA; smartsense must stay enabled |",
    "| `insignia-ns55f301na25/` | Insignia 55\" F30 4K Fire TV (NS-55F301NA25, AFTDCT31, duckie) | Fire OS 7 / Android 9 | Amazon ACR telemetry, Fire TV ads/shopping, Alexa, OTA updates; AirPlay and TIF HDMI inputs kept |",
    "| `nvidia-shield-tv-pro-2019/` | NVIDIA SHIELD TV Pro 2019 (P2897, mdarcy) | Android TV 11 | NVIDIA telemetry, GameStream leftovers, sponsored rows, partner auto-installs |",
    "| `oneplus-tv-dubai/` | OnePlus TV (D00, Dubai) | Google TV 14 | HeyTap/OnePlus extras, OnePlus Connect, Smart Home |",
    "| `philips-smart-4k-google-tv/` | Philips Smart 4K TV (Skyworth, eleonas, MediaTek), India | Google TV 14 | Skyworth recommendations, after-sale/activation trackers, iCast; Chromecast, Assistant off by choice; wireless-debugging pairing, setupwraith |",
    "| `rca-ai-pont/` | RCA AI PONT SA (Changhong, redwood, ISDB92RC; also sold as realme 40-inch) | Android 14 | Homwee store and installers, Anoki ACR, FAST channels; 1 GB |",
    "| `sanyo-atv-r2/` | SANYO ATV R2 (SCBC, Realtek RTD285O) | Android TV 9 | S-Channels, E-SHOW demo, Vewd, TV Booster, SANYO OTA |",
    "| `sony-bravia-4k-ur2/` | Sony BRAVIA 4K UR2 (BRAVIA_UR2_4K, MediaTek) | Android TV 10 | Samba TV, Sony promos/Select, demo mode; Assistant, Chromecast, unused streaming apps off by choice |",
    "| `sony-xbr-x900e/` | Sony BRAVIA XBR-65X900E (2017, BRAVIA_ATV2) | Android TV 9 | Samba TV ACR, Sony Select, My BRAVIA promos, Discover, device agents; Chromecast, DLNA, mirroring off by choice |",
    "| `tcl-g10-google-tv/` | TCL 55\" 4K Google TV, 2023 (G10, G10_4K_US_NF) | Google TV 12 | TCL TV+, TCL Live, store demo, smartlink installer |",
    "| `tcl-65c725/` | TCL 65C725 (Smart TV Pro, BeyondTV4) | Android TV 11 | TCL analytics/promos, Google recommendation rows; voice off, OTA off by choice |",
    "| `tcl-ak30a5/` | TCL ak30a5 (China, Amlogic) | Android TV 9 | No Google services, TCL boot ad + analytics, no TvInputManager, installs via USB only; debloat only, third-party launchers cannot be installed on this firmware |",
    "| `tcl-beyondtv/` | TCL BeyondTV (India) | Android TV 9 | TCL analytics, content feed, TCL app store, Google recommendation rows; Jio/Airtel/Hotstar apps untouched |",
    "| `tcl-qm6k-google-tv/` | TCL QM6K Pro, 2025 (G08, MediaTek tcl9618) | Google TV 14 | Samba TV ACR (ttvs), TCL TV+, TCL Live, store/hotel demo; setupwraith must go for a custom launcher (also AU14, #23) |",
    "| `tcl-g05-google-tv/` | TCL Smart TV Pro (G05, G05_4K_US, MediaTek MT5889) | Google TV 11 | TCL Channel, waterfall, ttvs BI, TGuard; Quick Panel off by choice; setupwraith returned after a reboot, launcher half unverified |",
    "| `toshiba-fire-tv-aftha004/` | Toshiba Fire TV (AFTHA004, hazel) | Fire OS 7 / Android 9 | Amazon ACR, metrics, shopping, tutorials, Miracast sink; streaming preloads off by choice; debloat only |",
    "| `xiaomi-mi-box-s/` | Xiaomi Mi Box S (MIBOX4, oneday), streaming box | Android TV 9 | PatchWall, Mi analytics, Alphonso ad tracking, MiLink; voice, casting, phone remote off by choice |",
    "| `xiaomi-mitv-mooq0/` | Xiaomi Mi TV (MiTV-MOOQ0, croods) | Android TV 10 | PatchWall, Mi analytics, MiChannel, TV Manager, Alexa bridge; factory test app also claims HOME; notes from #81 |",
    "| `xiaomi-mi-tv-4a/` | Xiaomi Mi TV 4A (MiTV-MOOQ1) | Android TV 10 | PatchWall, Mi analytics, SmartShare, MiLink |",
    "| `xiaomi-mitv-aesp0/` | Xiaomi MiTV-AESP0 stick (aquaman, 1 GB) | Android TV 9 | No inputs; Home key sends ALL_APPS, needs `HOME_KEY_SERVICE=1`; Chromecast kept |",
    "| `xiaomi-mitv-axso0/` | Xiaomi MiTV-AXSO0 (dangal; Mi TV 4C Pro 2019 / 4A Pro) | Android TV 9 | PatchWall, Glance ads, Mi TV+, Sensara, Mi analytics, MiLink; voice, Chromecast, unused streaming apps off by choice |",
    "| `xiaomi-mitv-moor2/` | Xiaomi MiTV-MOOR2 (venom, MediaTek) | Google TV 11 | Mi ad row and PatchWall, Mi analytics, MiLink, store demo; setup wizard off so a third-party launcher can own Home |",
    "| `xiaomi-tv-a-pro-2026/` | Xiaomi TV A Pro 75\" 2026 (MiTV-MZTU0, river, MediaTek) | Google TV 14 | PatchWall/Mi Home tab, Mi analytics, TV Manager, updaters; setup wizard off, launcherx crash-loop notes |",
  ].join("\n"),
  showcase: [
    { name: "Stremio shelf, peek dock and calendar", what: "A fork of the launcher with a Stremio poster shelf, a dock that peeks over playing content, a frosted settings panel and a calendar overlay", builtOn: "Android TV", by: "benfirad", url: "https://github.com/benfirad/tv-vibehack/tree/feature/stremio-peek-settings-upstream" },
    { name: "Hisense restyle", what: "A six-column restyle with an app menu, a Wi-Fi picker in the header, daily greetings and four glass finishes", builtOn: "Hisense SmartTV 4K FFM, Android 12", by: "YouLop009", url: "https://github.com/YouLop009/tv-vibehack/tree/style-modifications" },
    { name: "webOS launcher", what: "The same Apple TV-style home rebuilt as a webOS web app for LG TVs, installed through LG's Developer Mode, with a Home-button watcher that runs on another device", builtOn: "LG OLED C6, webOS 26", by: "OmkarK97", url: "https://github.com/OmkarK97/tv-vibehack/tree/webos-launcher" },
    { name: "fire-tv-cleanup", what: "A fork aimed at Fire TV: debloat plus a launcher with a macOS-style dock", builtOn: "Fire TV", by: "itsmeterrylin", url: "https://github.com/itsmeterrylin/fire-tv-cleanup" },
    { name: "Fire OS 6 Home watcher", what: "Brings the launcher up over Amazon's home on a Fire TV Stick 4K, since Fire OS won't let it be replaced", builtOn: "Fire TV Stick 4K, Fire OS 6", by: "ljis120301", url: "https://github.com/ljis120301/tv-vibehack/tree/fire-tv-support" },
    { name: "Aurora screensaver and wallpaper", what: "A wallpaper behind the launcher and an \"Aurora Clock\" screensaver with drifting scenes and on-TV screensaver options", builtOn: "Xiaomi MiTV-AXSO0, Android TV 9", by: "rakshajag13", url: "https://github.com/rakshajag13/tv-vibehack/tree/xiaomi-mitv-axso0-debloat-wallpaper" },
    { name: "Control Center", what: "A sleep timer, turn-off button, memory cleaner and sound-output switch behind the Settings pill, on top of a dock editor", builtOn: "Xiaomi MSSP3, Android TV 11", by: "samdegan2311", url: "https://github.com/samdegan2311/tv-vibehack/tree/pr/control-center" },
    { name: "Navigation sounds", what: "The launcher with its own soft click and select sounds, synthesised from a script", builtOn: "BenQ E55-735, Google TV 14", by: "rocavence", url: "https://github.com/rocavence/tv-vibehack/tree/nav-sounds" },
    { name: "AirPlay receiver installer", what: "A script that builds and installs an open-source AirPlay receiver next to the launcher, for iPhone mirroring", builtOn: "Xiaomi MiTV-AESP0, Android TV 9", by: "nguyenduchoai", url: "https://github.com/nguyenduchoai/tv-vibehack/tree/feat/airplay-receiver" },
  ] as ShowcaseItem[],
  themes: [
    { name: "default", what: "The built-in look written out as JSON, as a starting point for your own" },
    { name: "aurora", what: "A dark aurora wallpaper (teal and violet on navy, darker at the bottom) with a matching background colour" },
    { name: "six-columns", what: "Six smaller tiles per row and one grid row visible under the dock" },
  ] as ThemeItem[],
};
