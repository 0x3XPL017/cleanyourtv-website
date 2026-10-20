import type { NextConfig } from "next";

// Classic ISR: the page is static and re-rendered at most once an hour (see app/page.tsx).
const nextConfig: NextConfig = {
  async headers() {
    const day = "public, max-age=86400, stale-while-revalidate=604800";
    return ["/results/:p*", "/showcase/:p*", "/press/:p*", "/blog/:p*", "/docs/:p*", "/themes/:p*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: day }],
    }));
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "github.com" }, { protocol: "https", hostname: "avatars.githubusercontent.com" }] },
};

export default nextConfig;
