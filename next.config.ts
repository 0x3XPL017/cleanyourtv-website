import type { NextConfig } from "next";

// Classic ISR: the page is static and re-rendered at most once an hour (see app/page.tsx).
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "github.com" }, { protocol: "https", hostname: "avatars.githubusercontent.com" }] },
};

export default nextConfig;
