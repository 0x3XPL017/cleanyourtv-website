// Parsers shared by the server loader and the client component. No Node imports here.
export const REPO = "Gathin23/cleanyourtv";
export const GH = `https://github.com/${REPO}`;

export type Tv = { folder: string; tv: string; brand: string; model: string; os: string; notes: string };
export type Pr = { login: string; avatar: string; title: string };
export type ResultItem = { handle: string; quote: string; image: string; link: string; tv: string };
export type ShowcaseItem = { name: string; what: string; builtOn: string; by: string; url: string; category?: string };
export type ThemeItem = { name: string; what: string };
export type Tweet = { text: string; likes: number; replies: number; date: string };
export type SiteData = {
  stars: number;
  forks: number;
  prs: Pr[];
  prCount: number;
  contributors: number;
  tvs: Tv[];
  results: ResultItem[];
  showcase: ShowcaseItem[];
  themes: ThemeItem[];
  prompt: string;
  tweet: Tweet;
  starSeries: number[];
  fetchedAt: string;
};

export function parseTVs(md: string): Tv[] {
  return md
    .split("\n")
    .filter((l) => /^\|\s*`[^`]+\/`\s*\|/.test(l))
    .map((l) => {
      const c = l.split("|").slice(1, -1).map((s) => s.trim());
      const folder = c[0].replace(/`/g, "").replace(/\/$/, "");
      const tv = c[1];
      const first = tv.split(/[\s(]/)[0];
      const brand = first === "Chromecast" ? "Google" : first;
      const paren = (tv.match(/\(([^,;)]+)/) || [])[1];
      let model = tv.replace(/\s*\([^)]*\)/g, "").replace(/,\s*$/, "").trim();
      if (brand !== "Google" && model.startsWith(first + " ")) model = model.slice(first.length + 1);
      if (model.length < 9 && paren) model += " · " + paren;
      return { folder, tv, brand, model, os: c[2].split("/")[0].trim(), notes: c[3].replace(/`/g, "") };
    });
}

export function parseShowcase(md: string): ShowcaseItem[] {
  // SHOWCASE.md is split into "## Section" tables (home screens, forks, add-ons, tools, other platforms);
  // each row keeps the section it sits under, so the site can group and jump by it.
  let category = "";
  const out: ShowcaseItem[] = [];
  for (const l of md.split("\n")) {
    const h = l.match(/^##\s+(.+?)\s*$/);
    if (h) { category = h[1]; continue; }
    if (!/^\|\s*\[/.test(l)) continue;
    const c = l.split("|").slice(1, -1).map((s) => s.trim());
    const m = c[0].match(/\[([^\]]+)\]\(([^)]+)\)/);
    const by = (c[3] || "").match(/\[([^\]]+)\]/);
    const item = { name: m ? m[1] : c[0], url: m ? m[2] : GH, what: c[1] || "", builtOn: c[2] || "", by: by ? by[1] : "", category };
    if (item.name && item.url) out.push(item);
  }
  return out;
}

export function parseThemes(md: string): ThemeItem[] {
  return md
    .split("\n")
    .filter((l) => /^\|\s*`[^`]+\/`\s*\|/.test(l))
    .map((l) => {
      const c = l.split("|").slice(1, -1).map((s) => s.trim());
      return { name: c[0].replace(/`/g, "").replace(/\/$/, ""), what: c[1] || "" };
    });
}

export function starSeriesFallback(): number[] {
  const L = (t: number) => 1 / (1 + Math.exp(-(t - 15) / 4.5));
  const a = L(0), b = L(48), out: number[] = [];
  for (let h = 0; h <= 48; h++) {
    let v = (L(h) - a) / (b - a);
    v += Math.sin(h * 1.7) * 0.008 * (1 - v);
    out.push(Math.max(0, Math.min(1, v)));
  }
  return out;
}

/** The token X's syndication endpoint wants: ((id / 1e15) * PI) in base 36 without zeros or the point. */
export function tweetToken(id: string): string {
  let x = (Number(id) / 1e15) * Math.PI;
  const d = "0123456789abcdefghijklmnopqrstuvwxyz";
  let ip = Math.floor(x), fp = x - ip, out = "";
  while (ip > 0) { out = d[ip % 36] + out; ip = Math.floor(ip / 36); }
  let frac = "";
  for (let i = 0; i < 12; i++) { fp *= 36; const k = Math.floor(fp); frac += d[k]; fp -= k; }
  return ((out || "0") + "." + frac).replace(/(0+|\.)/g, "");
}

// ---- /addons: themes, the theme keys ("switches") and the add-ons table, all from the repo

/** One folder in themes/. `season` is "until 21 Oct" or "ended 21 Oct" for a theme with `festival_until`. */
export type ThemeCard = { name: string; what: string; by: string; byUrl: string; screenshot: string; keys: string[]; season: string; ended: boolean };
/** One row of the Keys table in themes/README.md; a row can name more than one key. */
export type ThemeKey = { keys: string[]; type: string; text: string };
export type AddonRow = { name: string; url: string; what: string; by: string; byUrl: string; tested: string; permissions: string };
export type AddonsData = { themes: ThemeCard[]; push: string; keys: ThemeKey[]; addons: AddonRow[]; community: ShowcaseItem[] };

const cells = (l: string) => l.split("|").slice(1, -1).map((s) => s.trim());

/** The Keys table under "## Keys". A key listed twice (merge leftovers) keeps its first place and its last text. */
export function parseThemeKeys(md: string): ThemeKey[] {
  const out = new Map<string, ThemeKey>();
  let on = false;
  for (const l of md.split("\n")) {
    if (/^##\s/.test(l)) on = /^##\s+Keys\s*$/.test(l);
    if (!on || !/^\|\s*`[a-z_]+`/.test(l)) continue;
    const c = cells(l);
    const keys = Array.from(c[0].matchAll(/`([a-z_]+)`/g), (m) => m[1]);
    if (!keys.length) continue;
    const row = { keys, type: (c[1] || "").replace(/`/g, ""), text: c[2] || "" };
    const id = keys.join(",");
    if (out.has(id)) out.get(id)!.text = row.text;
    else out.set(id, row);
  }
  return [...out.values()];
}

/** The README's push example (`tools/theme.sh themes/aurora`) as a template; "{theme}" stands for the folder. */
export function parsePushCommand(md: string): string {
  const l = md.split("\n").find((x) => /tools\/theme\.sh\s+themes\/[\w-]+/.test(x));
  return l ? l.replace(/\s+#.*$/, "").trim().replace(/themes\/[\w-]+/, "themes/{theme}") : "";
}

/** Rows of the table under "## Add-ons" in addons/README.md: Add-on | What it does | Author | Tested on | Permissions. */
export function parseAddons(md: string): AddonRow[] {
  const out: AddonRow[] = [];
  let on = false;
  for (const l of md.split("\n")) {
    if (/^##\s/.test(l)) on = /^##\s+Add-ons\s*$/.test(l);
    if (!on || !/^\|/.test(l) || /^\|\s*-/.test(l) || /^\|\s*Add-on\s*\|/.test(l)) continue;
    const c = cells(l);
    if (!c[0]) continue;
    const link = c[0].match(/\[([^\]]+)\]\(([^)]+)\)/);
    const name = (link ? link[1] : c[0]).replace(/`/g, "");
    const href = link ? link[2] : name.replace(/\/$/, "") + "/";
    const by = (c[2] || "").match(/\[@?([^\]]+)\]\(([^)]+)\)/);
    out.push({
      name,
      url: /^https?:/.test(href) ? href : `${GH}/tree/main/addons/${href.replace(/^\.\//, "")}`,
      what: c[1] || "",
      by: by ? by[1] : (c[2] || "").replace(/^@/, ""),
      byUrl: by ? by[2] : "",
      tested: c[3] || "",
      permissions: c[4] || "",
    });
  }
  return out;
}

/** The default a key's text states ("(`false` by default)", "`radial` (default)", "Off unless set"), or "" when it says none. */
export function keyDefault(text: string): string {
  const t = text.replace(/`/g, "");
  let m = t.match(/\b(true|false|\d+|black)\s+by default/i);
  if (m) return m[1].toLowerCase();
  m = t.match(/([\w#.-]+)(?:\s+(?:hides it|is off))?\s*\((?:the )?default\b/);
  if (m) return m[1];
  if (/off unless set|off by default/i.test(t)) return "false";
  return "";
}

/** toggle: a bool. value: a number range, colour, date, choice, or a string with a stated default. list: lists, names and apps. */
export function keyKind(k: ThemeKey): "toggle" | "value" | "list" {
  if (/^bool$/i.test(k.type)) return "toggle";
  if (/^-?\d+ to \d+$|#RRGGBB|YYYY| or /.test(k.type) || (k.type === "string" && keyDefault(k.text))) return "value";
  return "list";
}
