"use client";

/** A single dropdown that jumps to a country's section on /press (replaces a wall of chips). */
export default function CountryJump({ groups }: { groups: { id: string; label: string; count: number }[] }) {
  return (
    <label className="press-jump">
      <span className="sr-only">Jump to a country</span>
      <select
        defaultValue=""
        aria-label="Jump to a country"
        onChange={(e) => {
          const el = document.getElementById(e.target.value);
          if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
          e.target.value = "";
        }}
      >
        <option value="" disabled>
          Jump to a country
        </option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.label} · {g.count}
          </option>
        ))}
      </select>
    </label>
  );
}
