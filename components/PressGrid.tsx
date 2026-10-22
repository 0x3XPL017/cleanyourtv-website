"use client";

import { useState } from "react";
import { cdn } from "@/lib/site";

export type PressItem = { outlet: string; headline: string; date: string; url: string; thumb: string; icon: string; group: string };

// Short country labels for the card footer; the dropdown keeps the full names.
const short = (g: string) => g.replace(/ \(.*\)$/, "");

/** Every article in one grid, with a dropdown that narrows it to one country (or the online / Latin America groups). */
export default function PressGrid({ items, groups }: { items: PressItem[]; groups: { label: string; count: number }[] }) {
  const [group, setGroup] = useState("");
  const shown = group ? items.filter((i) => i.group === group) : items;
  return (
    <>
      <div className="press-filter">
        <label className="press-jump">
          <span className="sr-only">Filter by country</span>
          <select value={group} aria-label="Filter by country" onChange={(e) => setGroup(e.target.value)}>
            <option value="">All countries · {items.length}</option>
            {groups.map((g) => (
              <option key={g.label} value={g.label}>
                {g.label} · {g.count}
              </option>
            ))}
          </select>
        </label>
        {group && (
          <button type="button" className="press-clear" onClick={() => setGroup("")}>
            Show all {items.length}
          </button>
        )}
      </div>
      <ul className="press-grid" aria-live="polite">
        {shown.map(({ outlet, headline, date, url, thumb, icon, group: g }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener" className="press-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="press-thumb" src={cdn(`/press/thumbs/${thumb}.jpg`)} alt="" width={640} height={360} loading="lazy" decoding="async" />
              <span className="press-body">
                <span className="press-outlet">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cdn(`/press/icons/${icon}.png`)} alt="" width={22} height={22} loading="lazy" decoding="async" />
                  <span className="press-outlet-name">{outlet}</span>
                </span>
                <span className="press-title">{headline}</span>
                <span className="press-date">{[date, short(g)].filter(Boolean).join(" · ")}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
