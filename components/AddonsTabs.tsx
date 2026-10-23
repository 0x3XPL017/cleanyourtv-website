"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GH, keyDefault, keyKind } from "@/lib/parse";
import type { AddonRow, AddonsData, ThemeKey } from "@/lib/parse";
import { FEATURED, GROUPS, SETTINGS, settingOf, type SettingGroup } from "@/lib/settings";
import { repoCdn } from "@/lib/site";

type Tab = "themes" | "settings" | "addons";
const ORDER = Object.keys(SETTINGS);

// Line icons in the site's style: 24px grid, round caps, drawn in currentColor.
const ln = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICONS: Record<Tab | SettingGroup | "copy" | "done" | "app" | "chevron" | "search", ReactNode> = {
  themes: <><path {...ln} d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.6-1.3-1.9-1.3-3.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-3.9-4-7-9-7z" /><circle cx="7.5" cy="11" r="1.2" fill="currentColor" /><circle cx="10.5" cy="7.3" r="1.2" fill="currentColor" /><circle cx="15" cy="7.8" r="1.2" fill="currentColor" /></>,
  settings: <><path {...ln} d="M4 7h9M17 7h3M4 17h3M11 17h9" /><circle {...ln} cx="15" cy="7" r="2" /><circle {...ln} cx="9" cy="17" r="2" /></>,
  addons: <><rect {...ln} x="3.5" y="3.5" width="7" height="7" rx="2" /><rect {...ln} x="13.5" y="3.5" width="7" height="7" rx="2" /><rect {...ln} x="3.5" y="13.5" width="7" height="7" rx="2" /><path {...ln} d="M17 14v6M14 17h6" /></>,
  look: <><path {...ln} d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path {...ln} d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" /></>,
  dock: <><rect {...ln} x="3" y="4" width="18" height="16" rx="3" /><path {...ln} d="M3 14h18" /><path {...ln} d="M7 17h2M11 17h2M15 17h2" /></>,
  remote: <><rect {...ln} x="8" y="2.5" width="8" height="19" rx="4" /><circle {...ln} cx="12" cy="8" r="2" /><path {...ln} d="M12 13.5v.01M12 17v.01" /></>,
  clock: <><circle {...ln} cx="12" cy="12" r="8.5" /><path {...ln} d="M12 7.5V12l3 2" /></>,
  behaviour: <><path {...ln} d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" /><path {...ln} d="M20 4v4.5h-4.5" /><path {...ln} d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" /><path {...ln} d="M4 20v-4.5h4.5" /></>,
  more: <><rect {...ln} x="3" y="5" width="18" height="12" rx="2.5" /><path {...ln} d="M9 20h6" /><path {...ln} d="M8 11h.01M12 11h.01M16 11h.01" /></>,
  copy: <><rect {...ln} x="8.5" y="8.5" width="11" height="11" rx="2.5" /><path {...ln} d="M15.5 4.5H7A2.5 2.5 0 0 0 4.5 7v8.5" /></>,
  done: <path {...ln} d="M5 12.5l4.5 4.5L19 7.5" />,
  app: <><rect {...ln} x="4" y="4" width="16" height="16" rx="4" /><path {...ln} d="M12 8.5v7M8.5 12h7" /></>,
  chevron: <path {...ln} d="M6 9l6 6 6-6" />,
  search: <><circle {...ln} cx="11" cy="11" r="6.5" /><path {...ln} d="M16 16l4 4" /></>,
};
const Icon = ({ name, className = "ao-icon" }: { name: keyof typeof ICONS; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>
);

/** Inline markdown from a README cell: `code`, **bold** and [links](...), relative links resolved against the README's folder. */
function md(s: string, base: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const k = out.length;
    if (m[1] !== undefined) out.push(<code key={k}>{m[1]}</code>);
    else if (m[2] !== undefined) out.push(<strong key={k}>{m[2]}</strong>);
    else out.push(<a key={k} href={new URL(m[4], `${GH}/blob/main/${base}`).href} target="_blank" rel="noopener">{m[3]}</a>);
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

/** A key's text as one plain line and the rest: split at the first sentence end or semicolon outside code and links. */
function splitText(text: string): [string, string] {
  const mask = text.replace(/`[^`]*`|\[[^\]]*\]\([^)]*\)/g, (x) => "x".repeat(x.length));
  const m = /(?<=[a-z0-9)])\.\s+(?=[A-Z(])|;\s+/.exec(mask);
  let line = m ? text.slice(0, m.index) : text;
  const rest = m ? text.slice(m.index + m[0].length) : "";
  line = line.replace(/\s*\(`?[\w#.-]+`? by default\)/, "").replace(/\.$/, "");
  return [line + ".", rest];
}

const title = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <button type="button" className={done ? "ao-copy ao-copied" : "ao-copy"} onClick={copy} aria-label={done ? "Copied" : `Copy: ${text}`}>
      <Icon name={done ? "done" : "copy"} />
      <span aria-live="polite">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}

/** The line a coding agent gets, with its copy button. */
function Ask({ text }: { text: string }) {
  return (
    <div className="ao-ask">
      <span className="ao-ask-label">Tell your coding agent</span>
      <div className="ao-line">
        <p>{text}</p>
        <Copy text={text} />
      </div>
    </div>
  );
}

/** A 16:9 picture, or a quiet frame that asks for one. */
function Shot({ src, alt, wanted, icon }: { src: string; alt: string; wanted: string; icon: keyof typeof ICONS }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="ao-thumb" src={repoCdn(src)} alt={alt} width={1280} height={720} loading="lazy" decoding="async" />;
  }
  return (
    <a className="ao-thumb ao-wanted" href={wanted} target="_blank" rel="noopener">
      <Icon name={icon} className="ao-wanted-icon" />
      <span>Screenshot wanted</span>
    </a>
  );
}

function Themes({ data }: { data: AddonsData }) {
  return (
    <>
      <p className="ao-intro">Whole looks, shown on real TVs. Undo any time with <code>tools/theme.sh --reset</code>.</p>
      <ul className="ao-grid">
        {data.themes.map((t) => (
          <li key={t.name} className={t.ended ? "ao-card ao-ended" : "ao-card"}>
            <Shot src={t.screenshot} alt={`Home with the ${t.name} theme on a TV`} wanted={`${GH}/tree/main/themes/${t.name}`} icon="themes" />
            <div className="ao-body">
              <div className="ao-head">
                <a className="ao-name" href={`${GH}/tree/main/themes/${t.name}`} target="_blank" rel="noopener">{title(t.name)}</a>
                {t.season && <span className="ao-badge ao-season">{t.season}</span>}
              </div>
              {t.what && <p className="ao-text ao-clamp">{md(t.what, "themes/")}</p>}
              {t.by && <p className="ao-meta"><span>by {t.byUrl ? <a href={t.byUrl} target="_blank" rel="noopener">{t.by}</a> : t.by}</span></p>}
              <div className="ao-actions">
                <Ask text={`Apply the ${t.name} theme from CleanYourTV to my TV`} />
                {data.push && (
                  <details className="ao-diy">
                    <summary><Icon name="chevron" className="ao-chev" />Do it yourself</summary>
                    <div className="ao-line ao-cmd">
                      <p>{data.push.replace("{theme}", t.name)}</p>
                      <Copy text={data.push.replace("{theme}", t.name)} />
                    </div>
                  </details>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function keyAsk(k: ThemeKey): string {
  const s = settingOf(k.keys), id = k.keys.join(", ");
  if (/config\.xml only/.test(k.type)) return `${s.ask} in my CleanYourTV launcher's config.xml (${id}) and rebuild it`;
  return `${s.ask} in my CleanYourTV launcher (${id})`;
}

function defaultLabel(k: ThemeKey): string {
  const def = keyDefault(k.text);
  if (!def) return "";
  if (keyKind(k) === "toggle") return def === "true" ? "On by default" : "Off by default";
  return `Default ${def}`;
}

/** img: undefined for no picture slot, "" for a slot that asks for one. */
function SettingCard({ k, img }: { k: ThemeKey; img?: string }) {
  const s = settingOf(k.keys), def = defaultLabel(k);
  // A hand-written line keeps the README's whole text under Details; otherwise its first sentence leads.
  // A first sentence long enough to be clamped also keeps the whole text there.
  const [first, after] = splitText(k.text);
  const line = s.line || first, rest = s.line || first.length > 110 ? k.text : after;
  return (
    <li className="ao-card">
      {img !== undefined && <Shot src={img} alt={`${s.title} on a TV`} wanted={`${GH}/blob/main/docs/switches.md`} icon={s.group} />}
      <div className="ao-body">
        <div className="ao-titles">
          <span className="ao-name">{s.title}</span>
          <code className="ao-key">{k.keys.join(", ")}</code>
        </div>
        <p className="ao-text ao-clamp">{md(line, "themes/")}</p>
        {(rest || def) && (
          <div className="ao-row">
            {def && <span className="ao-badge">{def}</span>}
            {rest && (
              <details className="ao-diy">
                <summary><Icon name="chevron" className="ao-chev" />Details</summary>
                <p className="ao-text ao-detail">{md(rest, "themes/")}</p>
              </details>
            )}
          </div>
        )}
        <div className="ao-actions">
          <Ask text={keyAsk(k)} />
        </div>
      </div>
    </li>
  );
}

function Settings({ keys, images }: { keys: ThemeKey[]; images: Record<string, string> }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Set<SettingGroup>>(new Set());
  const needle = q.trim().toLowerCase();
  const hit = (k: ThemeKey) => !needle || [k.keys.join(" "), k.text, settingOf(k.keys).title].join(" ").toLowerCase().includes(needle);
  const shown = keys.filter(hit);
  const rank = (k: ThemeKey) => (ORDER.indexOf(k.keys[0]) + 1 || ORDER.length + 1);
  const image = (k: ThemeKey) => k.keys.map((x) => images[x]).find(Boolean) || "";
  // Most useful: the picked keys the README still has, the ones with a screenshot first.
  const featured = FEATURED.map((f) => keys.find((k) => k.keys[0] === f)).filter((k): k is ThemeKey => !!k)
    .map((k, i) => ({ k, i })).sort((a, b) => Number(!image(a.k)) - Number(!image(b.k)) || a.i - b.i).map(({ k }) => k);
  const toggle = (g: SettingGroup) => setOpen((o) => {
    const n = new Set(o);
    if (n.has(g)) n.delete(g); else n.add(g);
    return n;
  });
  return (
    <>
      <p className="ao-intro">Small tweaks to the home screen: hide a pill, change the glow, show the date… A wrong value is ignored, so Home never breaks.</p>
      <label className="ao-search">
        <span className="sr-only">Search the settings</span>
        <Icon name="search" />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${keys.length} settings`} />
      </label>
      {!needle && featured.length > 0 && (
        <section aria-labelledby="ao-featured">
          <h2 id="ao-featured" className="ao-h2">Most useful</h2>
          <ul className="ao-grid">
            {featured.map((k) => <SettingCard key={k.keys.join()} k={k} img={image(k)} />)}
          </ul>
        </section>
      )}
      {shown.length > 0 && <h2 className="ao-h2">{needle ? `${shown.length} ${shown.length === 1 ? "match" : "matches"}` : "Every setting"}</h2>}
      <div className="ao-groups">
        {GROUPS.map((g) => {
          // In the table's order, which puts the everyday ones first; keys it doesn't know go last.
          const list = shown.filter((k) => settingOf(k.keys).group === g.id).sort((a, b) => rank(a) - rank(b));
          if (!list.length) return null;
          const isOpen = !!needle || open.has(g.id);
          return (
            <section key={g.id} className={isOpen ? "ao-group ao-open" : "ao-group"}>
              <button type="button" className="ao-group-head" aria-expanded={isOpen} aria-controls={`ao-g-${g.id}`} onClick={() => toggle(g.id)} disabled={!!needle}>
                <span className="ao-badge-icon"><Icon name={g.id} /></span>
                <span className="ao-group-titles">
                  <span className="ao-group-name">{g.name} <span className="ao-count">{list.length}</span></span>
                  <span className="ao-group-text">{g.text}</span>
                </span>
                {!needle && <Icon name="chevron" className="ao-chev" />}
              </button>
              {isOpen && (
                <ul id={`ao-g-${g.id}`} className="ao-grid ao-grid-keys">
                  {list.map((k) => <SettingCard key={k.keys.join()} k={k} />)}
                </ul>
              )}
            </section>
          );
        })}
      </div>
      {!shown.length && (
        <div className="ao-empty">
          <span className="ao-badge-icon"><Icon name="search" /></span>
          <p>No setting matches &ldquo;{q.trim()}&rdquo;.</p>
          <button type="button" className="ao-btn" onClick={() => setQ("")}>Clear the search</button>
        </div>
      )}
    </>
  );
}

// Short chips for an add-on's permissions, in this order; the full text is one tap away.
const PERMS: [RegExp, string][] = [
  [/internet|network/i, "Internet"],
  [/overlay|over other apps/i, "Draws over apps"],
  [/accessibility/i, "Accessibility"],
  [/bluetooth/i, "Bluetooth"],
  [/location/i, "Location"],
  [/foreground service/i, "Runs in background"],
  [/boot/i, "Starts at boot"],
  [/alarm/i, "Exact alarms"],
];

function Permissions({ a }: { a: AddonRow }) {
  const text = a.permissions.trim();
  if (!text || /^none$/i.test(text)) return <p className="ao-perms"><span className="ao-chip ao-chip-ok">No permissions</span></p>;
  const chips = PERMS.filter(([re]) => re.test(text)).map(([, label]) => label);
  return (
    <details className="ao-perms">
      <summary>
        <span className="sr-only">Permissions: </span>
        {(chips.length ? chips : ["Permissions"]).map((c) => <span key={c} className="ao-chip">{c}</span>)}
        <Icon name="chevron" className="ao-chev" />
      </summary>
      <p className="ao-text ao-detail">{md(text, "addons/")}</p>
    </details>
  );
}

function Addons({ data }: { data: AddonsData }) {
  return (
    <>
      <p className="ao-intro">
        Small apps that add a card to Home. How they work: <a href={`${GH}/blob/main/addons/README.md`} target="_blank" rel="noopener">addons/README.md</a>.
      </p>
      {!data.addons.length ? (
        <div className="ao-empty">
          <span className="ao-badge-icon"><Icon name="addons" /></span>
          <p>No add-ons in the repo yet. Build the first one.</p>
          <div className="ao-empty-ask"><Ask text="Read addons/README.md in CleanYourTV and help me build an add-on with a module card" /></div>
        </div>
      ) : (
        <ul className="ao-grid">
          {data.addons.map((a) => {
            const name = a.name.replace(/\/$/, "");
            return (
              <li key={a.name} className="ao-card">
                <Shot src={a.screenshot} alt={`${name} on a TV`} wanted={`${GH}/blob/main/addons/README.md#rules`} icon="addons" />
                <div className="ao-body">
                  <div className="ao-head">
                    <a className="ao-name" href={a.url} target="_blank" rel="noopener">{name}</a>
                  </div>
                  {a.what && <p className="ao-text ao-clamp">{md(a.what, "addons/")}</p>}
                  <p className="ao-meta">
                    {a.by && <span>by {a.byUrl ? <a href={a.byUrl} target="_blank" rel="noopener">{a.by}</a> : a.by}</span>}
                    {a.tested && <span>Tested on {a.tested}</span>}
                  </p>
                  <div className="ao-row">
                    <span className="ao-note"><Icon name="app" />Installs a separate app</span>
                  </div>
                  <Permissions a={a} />
                  <div className="ao-actions">
                    <Ask text={`Build and install the ${name} add-on from CleanYourTV on my TV`} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {data.community.length > 0 && (
        <section aria-labelledby="ao-community">
          <h2 id="ao-community" className="ao-h2 ao-h2-big">From the community</h2>
          <p className="ao-intro">Built in their own repos and listed in <a href={`${GH}/blob/main/SHOWCASE.md`} target="_blank" rel="noopener">SHOWCASE.md</a>. Read each one&apos;s README before installing.</p>
          <ul className="ao-grid">
            {data.community.map((c) => (
              <li key={c.url} className="ao-card">
                <div className="ao-body">
                  <div className="ao-head">
                    <a className="ao-name" href={c.url} target="_blank" rel="noopener">{c.name}</a>
                  </div>
                  {c.what && <p className="ao-text ao-clamp">{md(c.what, "")}</p>}
                  <p className="ao-meta">
                    {c.by && <span>by {c.by}</span>}
                    {c.builtOn && <span>Tested on {c.builtOn}</span>}
                  </p>
                  <div className="ao-actions">
                    <Ask text={`Help me install ${c.name} (${c.url.replace(/^https?:\/\//, "")}) on my TV safely`} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

const TABS: { id: Tab; name: string; text: string }[] = [
  { id: "themes", name: "Themes", text: "Whole looks, pushed in seconds" },
  { id: "settings", name: "Settings", text: "Hide a pill, change the glow, show the date" },
  { id: "addons", name: "Add-ons", text: "Small apps that add a card to Home" },
];
// #switches is the tab's old name; docs/switches.md in the repo still links there.
const ALIAS: Record<string, Tab> = { switches: "settings" };

/** Three big tabs; #themes, #settings and #addons open one directly. */
export default function AddonsTabs({ data }: { data: AddonsData }) {
  const [tab, setTab] = useState<Tab>("themes");
  useEffect(() => {
    const read = () => {
      const h = location.hash.slice(1), t = ALIAS[h] || h;
      if (TABS.some((x) => x.id === t)) setTab(t as Tab);
    };
    read();
    addEventListener("hashchange", read);
    return () => removeEventListener("hashchange", read);
  }, []);
  const pick = (t: Tab) => {
    setTab(t);
    try { history.replaceState(null, "", `#${t}`); } catch { /* ignore */ }
  };
  const count: Record<Tab, number> = { themes: data.themes.length, settings: data.keys.length, addons: data.addons.length + data.community.length };
  return (
    <>
      <div className="ao-tabs" role="tablist" aria-label="Themes, settings and add-ons">
        {TABS.map((t) => (
          <button key={t.id} id={`ao-tab-${t.id}`} type="button" role="tab" className="ao-tab" aria-selected={tab === t.id} aria-controls="ao-panel" onClick={() => pick(t.id)}>
            <span className="ao-badge-icon"><Icon name={t.id} /></span>
            <span className="ao-tab-titles">
              <span className="ao-tab-name">{t.name} <span className="ao-count">{count[t.id]}</span></span>
              <span className="ao-tab-text">{t.text}</span>
            </span>
          </button>
        ))}
      </div>
      <div id="ao-panel" role="tabpanel" aria-labelledby={`ao-tab-${tab}`}>
        {tab === "themes" && <Themes data={data} />}
        {tab === "settings" && <Settings keys={data.keys} images={data.keyImages} />}
        {tab === "addons" && <Addons data={data} />}
      </div>
    </>
  );
}
