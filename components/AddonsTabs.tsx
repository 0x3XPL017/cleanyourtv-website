"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GH, keyDefault, keyKind } from "@/lib/parse";
import type { AddonsData, ThemeKey } from "@/lib/parse";
import { repoCdn } from "@/lib/site";

type Tab = "themes" | "switches" | "addons";
const TABS: [Tab, string][] = [["themes", "Themes"], ["switches", "Switches"], ["addons", "Add-ons"]];
const KINDS: [ReturnType<typeof keyKind>, string][] = [["toggle", "On and off"], ["value", "Numbers, colours and styles"], ["list", "Apps, remote keys and lists"]];

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
    <button type="button" className="ao-copy" onClick={copy} aria-label={done ? "Copied" : `Copy: ${text}`}>
      <span aria-live="polite">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}

function CopyLine({ label, text, cmd }: { label?: string; text: string; cmd?: boolean }) {
  return (
    <div className="ao-copyline">
      {label && <span className="ao-label">{label}</span>}
      <div className={cmd ? "ao-line ao-cmd" : "ao-line"}>
        <code>{text}</code>
        <Copy text={text} />
      </div>
    </div>
  );
}

function keyPrompt(k: ThemeKey, def: string): string {
  const key = k.keys.join(" and ");
  if (/config\.xml only/.test(k.type)) return `Set ${key} in my CleanYourTV launcher's config.xml and rebuild it`;
  if (keyKind(k) === "toggle" && def === "true") return `Turn off ${key} in my CleanYourTV theme and push it to my TV`;
  if (keyKind(k) === "toggle" && def === "false") return `Turn on ${key} in my CleanYourTV theme and push it to my TV`;
  return `Set ${key} in my CleanYourTV theme and push it to my TV`;
}

function defaultLabel(k: ThemeKey, def: string): string {
  if (!def) return "";
  if (keyKind(k) === "toggle") return def === "true" ? "On by default" : "Off by default";
  return `Default ${def}`;
}

function Themes({ data }: { data: AddonsData }) {
  return (
    <>
    <p className="ao-intro">
      Real-TV screenshots. Undo any time with <code>tools/theme.sh --reset</code>.
    </p>
    <ul className="ao-grid">
      {data.themes.map((t) => (
        <li key={t.name}>
          <div className={t.ended ? "ao-card ao-ended" : "ao-card"}>
            {t.screenshot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="ao-thumb" src={repoCdn(t.screenshot)} alt={`Home with the ${t.name} theme on a TV`} width={1280} height={720} loading="lazy" decoding="async" />
            )}
            <div className="ao-body">
              <div className="ao-head">
                <span className="ao-name">{title(t.name)}</span>
                {t.season && <span className="ao-badge ao-season">Seasonal · {t.season}</span>}
              </div>
              {t.what && <p className="ao-text">{md(t.what, "themes/")}</p>}
              <p className="ao-meta">
                <a href={`${GH}/tree/main/themes/${t.name}`} target="_blank" rel="noopener">themes/{t.name}/</a>
                {t.by && (
                  <>
                    {" · by "}
                    {t.byUrl ? <a href={t.byUrl} target="_blank" rel="noopener">{t.by}</a> : t.by}
                  </>
                )}
              </p>
              {t.keys.length > 0 && (
                <p className="ao-sets">
                  <span className="sr-only">Sets </span>
                  {t.keys.map((k) => <code key={k}>{k}</code>)}
                </p>
              )}
              <div className="ao-actions">
                <CopyLine label="Tell your coding agent" text={`Apply the ${t.name} theme from CleanYourTV to my TV`} />
                {data.push && <CopyLine label="Or push it yourself" text={data.push.replace("{theme}", t.name)} cmd />}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
}

function Switches({ keys, images }: { keys: ThemeKey[]; images: Record<string, string> }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = keys.filter((k) => !needle || k.keys.join(" ").includes(needle) || k.text.toLowerCase().includes(needle));
  const rank = (k: ThemeKey) => (keyKind(k) === "toggle" ? (keyDefault(k.text) === "false" ? 0 : keyDefault(k.text) === "true" ? 2 : 1) : 0);
  return (
    <>
      <p className="ao-intro">One setting each. A wrong key is ignored, so Home never breaks.</p>
      <label className="ao-search">
        <span className="sr-only">Search the keys</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${keys.length} keys`} />
      </label>
      {KINDS.map(([kind, label]) => {
        const list = shown.filter((k) => keyKind(k) === kind).map((k, i) => ({ k, i })).sort((a, b) => rank(a.k) - rank(b.k) || a.i - b.i).map(({ k }) => k);
        if (!list.length) return null;
        return (
          <section key={kind} aria-label={label}>
            <h2 className="ao-h2">
              {label} <span>{list.length}</span>
            </h2>
            <ul className="ao-keys">
              {list.map((k) => {
                const def = keyDefault(k.text), [line, rest] = splitText(k.text), img = k.keys.map((x) => images[x]).find(Boolean);
                return (
                  <li key={k.keys.join()} className="ao-card">
                    {img && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="ao-thumb" src={repoCdn(img)} alt={`${k.keys[0]} on a TV`} loading="lazy" decoding="async" />
                    )}
                    <div className="ao-body">
                      <div className="ao-head">
                        <span className="ao-key">{k.keys.join(", ")}</span>
                        {defaultLabel(k, def) && <span className="ao-badge">{defaultLabel(k, def)}</span>}
                      </div>
                      <p className="ao-text">{md(line, "themes/")}</p>
                      {rest && (
                        <details className="ao-more">
                          <summary>More</summary>
                          <p className="ao-text">{md(rest, "themes/")}</p>
                        </details>
                      )}
                      {kind !== "toggle" && <p className="ao-meta">{k.type}</p>}
                      <div className="ao-actions">
                        <CopyLine text={keyPrompt(k, def)} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      {!shown.length && <p className="ao-intro">No key matches &ldquo;{q}&rdquo;.</p>}
    </>
  );
}

function Addons({ data }: { data: AddonsData }) {
  const docs = (
    <>
      <a href={`${GH}/blob/main/addons/README.md`} target="_blank" rel="noopener">addons/README.md</a> and{" "}
      <a href={`${GH}/blob/main/docs/modules.md`} target="_blank" rel="noopener">docs/modules.md</a>
    </>
  );
  return (
    <>
      <p className="ao-intro">Small apps that show up on Home as a card. How-to: {docs}.</p>
      {!data.addons.length && (
        <div className="ao-card ao-empty">
          <div className="ao-body">
            <p className="ao-name">None in the repo yet. Build the first one.</p>
            <div className="ao-actions">
              <CopyLine label="Tell your coding agent" text="Read addons/README.md in CleanYourTV and help me build an add-on with a module card" />
            </div>
          </div>
        </div>
      )}
      <ul className="ao-grid">
        {data.addons.map((a) => (
          <li key={a.name}>
            <div className="ao-card">
              {a.screenshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="ao-thumb" src={repoCdn(a.screenshot)} alt={`${a.name} on a TV`} loading="lazy" decoding="async" />
              ) : (
                // Add-ons from before screenshots were required: the gap asks for one.
                <a className="ao-thumb ao-wanted" href={`${GH}/blob/main/addons/README.md#rules`} target="_blank" rel="noopener">Screenshot wanted</a>
              )}
              <div className="ao-body">
                <div className="ao-head">
                  <a className="ao-name" href={a.url} target="_blank" rel="noopener">{a.name}</a>
                </div>
                {a.what && <p className="ao-text">{md(a.what, "addons/")}</p>}
                <p className="ao-meta">
                  {a.by && <>by {a.byUrl ? <a href={a.byUrl} target="_blank" rel="noopener">{a.by}</a> : a.by}</>}
                  {a.tested && <>{a.by && " · "}tested on {a.tested}</>}
                </p>
                {a.permissions && <p className="ao-meta">Permissions: {md(a.permissions, "addons/")}</p>}
                <div className="ao-actions">
                  <CopyLine label="Tell your coding agent" text={`Build and install the ${a.name.replace(/\/$/, "")} add-on from CleanYourTV on my TV`} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {data.community.length > 0 && (
        <>
          <h2 className="ao-sub">From the community</h2>
          <p className="ao-intro">Built in their own repos and listed in <a href={`${GH}/blob/main/SHOWCASE.md`} target="_blank" rel="noopener">SHOWCASE.md</a>. Read each one&apos;s README before installing.</p>
          <ul className="ao-grid">
            {data.community.map((c) => (
              <li key={c.url}>
                <div className="ao-card">
                  <div className="ao-body">
                    <div className="ao-head">
                      <a className="ao-name" href={c.url} target="_blank" rel="noopener">{c.name}</a>
                    </div>
                    {c.what && <p className="ao-text">{md(c.what, "")}</p>}
                    <p className="ao-meta">
                      {c.by && <>by {c.by}</>}
                      {c.builtOn && <>{c.by && " · "}tested on {c.builtOn}</>}
                    </p>
                    <div className="ao-actions">
                      <CopyLine label="Tell your coding agent" text={`Read ${c.url} and help me install ${c.name} on my TV safely`} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/** The three tabs as chips, like What people built on the home page; #themes, #switches and #addons open one directly. */
export default function AddonsTabs({ data }: { data: AddonsData }) {
  const [tab, setTab] = useState<Tab>("themes");
  useEffect(() => {
    const read = () => {
      const h = location.hash.slice(1);
      if (TABS.some(([t]) => t === h)) setTab(h as Tab);
    };
    read();
    addEventListener("hashchange", read);
    return () => removeEventListener("hashchange", read);
  }, []);
  const pick = (t: Tab) => {
    setTab(t);
    try { history.replaceState(null, "", `#${t}`); } catch { /* ignore */ }
  };
  const count: Record<Tab, number> = { themes: data.themes.length, switches: data.keys.length, addons: data.addons.length + data.community.length };
  return (
    <>
      <nav className="ao-tabs" aria-label="Add-ons, themes and switches">
        {TABS.map(([t, label]) => (
          <button key={t} type="button" className="ao-tab" aria-pressed={tab === t} onClick={() => pick(t)}>
            {label} <span>{count[t]}</span>
          </button>
        ))}
      </nav>
      {tab === "themes" && <Themes data={data} />}
      {tab === "switches" && <Switches keys={data.keys} images={data.keyImages} />}
      {tab === "addons" && <Addons data={data} />}
    </>
  );
}
