"use client";

import { useEffect, useRef } from "react";

type Props = { mp4: string; webm: string; poster: string; label: string; width: number; height: number; className?: string };

/** A silent demo loop that only loads and plays while on screen. With reduced motion, or without JavaScript, it stays on its poster. */
export default function LoopVideo({ mp4, webm, poster, label, width, height, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = false;
    const sync = () => {
      if (seen && !still.matches) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      sync();
    }, { rootMargin: "200px 0px" });
    io.observe(v);
    still.addEventListener("change", sync);
    return () => {
      io.disconnect();
      still.removeEventListener("change", sync);
    };
  }, []);
  return (
    <video ref={ref} className={className} poster={poster} width={width} height={height} muted loop playsInline preload="none" aria-label={label}>
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
