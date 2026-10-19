// Static site content and small helpers used by the client component.
import type React from "react";

export const ORDER = ["black", "aurora", "paper"] as const;
export type ThemeName = (typeof ORDER)[number];

export const THEMES: Record<ThemeName, Record<string, string>> = {
  black: {
    label: "PITCH BLACK",
    "--bg": "#000000",
    "--wall": "none",
    "--ink": "rgba(255,255,255,.95)",
    "--ink-dim": "rgba(255,255,255,.6)",
    "--line": "rgba(255,255,255,.12)",
    "--card": "rgba(255,255,255,.05)",
    "--band": "#141416",
    "--band-rim": "rgba(255,255,255,.12)",
    "--pill-bg": "linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.08))",
    "--pill-rim": "rgba(255,255,255,.22)",
    "--glass-fill": "linear-gradient(180deg,rgba(255,255,255,.26),rgba(255,255,255,.08))",
    "--glass-rim": "rgba(255,255,255,.8)",
  },
  aurora: {
    label: "AURORA",
    "--bg": "#070A14",
    "--wall": "url('/themes/aurora/wallpaper.jpg')",
    "--ink": "rgba(255,255,255,.95)",
    "--ink-dim": "rgba(255,255,255,.62)",
    "--line": "rgba(255,255,255,.14)",
    "--card": "rgba(255,255,255,.06)",
    "--band": "rgba(16,18,30,.82)",
    "--band-rim": "rgba(255,255,255,.14)",
    "--pill-bg": "linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.08))",
    "--pill-rim": "rgba(255,255,255,.22)",
    "--glass-fill": "linear-gradient(180deg,rgba(255,255,255,.26),rgba(255,255,255,.08))",
    "--glass-rim": "rgba(255,255,255,.8)",
  },
  paper: {
    label: "CREAM PAPER",
    "--bg": "#FDF3DD",
    "--wall": "none",
    "--ink": "#090E12",
    "--ink-dim": "rgba(9,14,18,.66)",
    "--line": "rgba(9,14,18,.14)",
    "--card": "rgba(9,14,18,.04)",
    "--band": "#F1E4C6",
    "--band-rim": "rgba(9,14,18,.12)",
    "--pill-bg": "rgba(9,14,18,.06)",
    "--pill-rim": "rgba(9,14,18,.18)",
    "--glass-fill": "linear-gradient(180deg,rgba(9,14,18,.10),rgba(9,14,18,.04))",
    "--glass-rim": "rgba(9,14,18,.7)",
  },
};

export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
export const NAMES = ["BOOT", "THE STORY", "ON AIR", "THE COMMUNITY", "SUPPORTED TVS", "HOW TO", "MADE WITH"];
export const TILE_COLORS = ["#D13B3B", "#2256D9", "#1E9E5A", "#6B3FD1", "#C98A1B", "#2A8C9E"];

export type TermLine = [kind: "cmd" | "out" | "note", text: string] | [kind: "img", name: string, src: string, alt: string];

export const TERM: Record<"mac" | "win", TermLine[]> = {
  mac: [
    ["cmd", "adb connect 192.168.1.50:5555"],
    ["out", "connected to 192.168.1.50:5555"],
    ["note", 'Accept "Allow USB debugging?" on the TV.'],
    ["cmd", "adb shell pm list packages > backup/packages.txt"],
    ["out", "backup/  412 packages, settings, getprop, restore.sh"],
    ["img", "before.png", "/docs/stock-home.jpg", "The stock home screen before"],
    ["cmd", "adb shell pm disable-user --user 0 com.vendor.recommendations"],
    ["out", "Package com.vendor.recommendations new state: disabled-user"],
    ["note", "37 more, five at a time, a screenshot after each batch."],
    ["cmd", "./gradlew assembleRelease"],
    ["out", "BUILD SUCCESSFUL in 41s"],
    ["cmd", "adb install -r app/build/outputs/apk/release/app-release.apk"],
    ["out", "Success"],
    ["cmd", "adb exec-out screencap -p > home.png"],
    ["img", "home.png", "/docs/new-home.jpg", "The new launcher after"],
    ["note", "To undo everything: tools/restore.sh backup/debloat.txt"],
  ],
  win: [
    ["cmd", "adb connect 192.168.1.50:5555"],
    ["out", "connected to 192.168.1.50:5555"],
    ["note", 'Accept "Allow USB debugging?" on the TV.'],
    ["cmd", "adb shell pm list packages > backup\\packages.txt"],
    ["out", "backup\\  412 packages, settings, getprop, restore.ps1"],
    ["img", "before.png", "/docs/stock-home.jpg", "The stock home screen before"],
    ["cmd", "adb shell pm disable-user --user 0 com.vendor.recommendations"],
    ["out", "Package com.vendor.recommendations new state: disabled-user"],
    ["note", "37 more, five at a time, a screenshot after each batch."],
    ["cmd", ".\\gradlew.bat assembleRelease"],
    ["out", "BUILD SUCCESSFUL in 41s"],
    ["cmd", "adb install -r app\\build\\outputs\\apk\\release\\app-release.apk"],
    ["out", "Success"],
    ["cmd", "adb shell screencap -p /sdcard/home.png; adb pull /sdcard/home.png"],
    ["img", "home.png", "/docs/new-home.jpg", "The new launcher after"],
    ["note", "To undo everything: powershell -File tools\\restore.ps1 backup\\debloat.txt"],
  ],
};

export const termCost = (l: TermLine) => (l[0] === "cmd" ? l[1].length + 6 : l[0] === "img" ? 16 : 10);
export const TERM_TOTAL = { mac: TERM.mac.reduce((a, l) => a + termCost(l), 0), win: TERM.win.reduce((a, l) => a + termCost(l), 0) };

export function classify(title: string): string {
  const t = title.toLowerCase();
  if (/setupwraith|launcherx|google tv.*(fix|bug|home|crash)|(fix|bug).*google tv/.test(t)) return "gtv";
  if (/example|debloat|tv list|\b(tcl|xiaomi|mi box|sony|bravia|hisense|philips|oneplus|benq|chiq|rca|sanyo|nvidia|shield|toshiba|insignia|chromecast)\b/.test(t)) return "tv";
  if (/launcher|dock|glass|focus|tile|grid|clock|wallpaper|theme|ui\b/.test(t)) return "launcher";
  return "other";
}
export const GROUPS: [string, string][] = [
  ["started", "started it"],
  ["tv", "sent a TV list"],
  ["launcher", "fixed the launcher"],
  ["gtv", "found the Google TV bug"],
  ["other", "made it better"],
  ["built", "built something on it"],
];

/** Turns a CSS declaration string (as written in the design) into a React style object. */
const cache = new Map<string, React.CSSProperties>();
export function S(decl: string): React.CSSProperties {
  const hit = cache.get(decl);
  if (hit) return hit;
  const out: Record<string, string> = {};
  for (const part of decl.split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    let v = part.slice(i + 1).trim();
    if (!k) continue;
    if (k === "font-family") v = v.replace("'VT323',monospace", "var(--font-vt323),'VT323',monospace").replace(/^Outfit,sans-serif/, "var(--font-outfit),Outfit,sans-serif");
    if (k.startsWith("--")) out[k] = v;
    else out[k.replace(/^-webkit-/, "Webkit").replace(/^-moz-/, "Moz").replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  const obj = out as React.CSSProperties;
  cache.set(decl, obj);
  return obj;
}

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
