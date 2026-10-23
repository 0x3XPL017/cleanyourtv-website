"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const ROWS = 5;

/** The /press logo wall, folded to five rows until "See all" (every link stays in the page for crawlers).
 *  The fold height is measured from the real rows, so it holds for any column count. */
export default function LogoWall({ count, children }: { count: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [fold, setFold] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ul = wrap.current?.querySelector<HTMLElement>(".press-logos");
    if (!ul) return;
    const measure = () => {
      const tops = [...new Set([...ul.children].map((li) => (li as HTMLElement).offsetTop))].sort((a, b) => a - b);
      if (tops.length <= ROWS) return setFold(null);
      const last = [...ul.children].find((li) => (li as HTMLElement).offsetTop === tops[ROWS - 1]) as HTMLElement;
      setFold(last.offsetTop - tops[0] + last.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={wrap} className="press-logos-wrap" data-open={open || undefined} style={fold ? ({ "--logo-rows": `${fold}px` } as React.CSSProperties) : undefined}>
      {children}
      <button type="button" className="press-logos-more" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Show fewer" : `See all ${count} outlets`}
      </button>
    </div>
  );
}
