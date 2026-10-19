// Parsers shared by the server loader and the client component. No Node imports here.
export const REPO = "Gathin23/cleanyourtv";
export const GH = `https://github.com/${REPO}`;

export type Tv = { folder: string; tv: string; brand: string; model: string; os: string; notes: string };
export type Pr = { login: string; avatar: string; title: string };
export type ResultItem = { handle: string; quote: string; image: string; link: string; tv: string };
export type ShowcaseItem = { name: string; what: string; builtOn: string; by: string; url: string };
export type ThemeItem = { name: string; what: string };
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
  return md
    .split("\n")
    .filter((l) => /^\|\s*\[/.test(l))
    .map((l) => {
      const c = l.split("|").slice(1, -1).map((s) => s.trim());
      const m = c[0].match(/\[([^\]]+)\]\(([^)]+)\)/);
      const by = (c[3] || "").match(/\[([^\]]+)\]/);
      return { name: m ? m[1] : c[0], url: m ? m[2] : GH, what: c[1] || "", builtOn: c[2] || "", by: by ? by[1] : "" };
    })
    .filter((s) => s.name && s.url);
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
