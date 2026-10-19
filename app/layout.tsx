import type { Metadata, Viewport } from "next";
import { Outfit, VT323 } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["200", "300", "400", "500"], variable: "--font-outfit", display: "swap" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cleanyour.tv"),
  title: "clean your TV",
  description:
    "Your TV, minus the ads. Debloat any Android TV or Google TV over Wi-Fi and swap the ad-filled home screen for a clean Apple TV-style launcher. No root, fully reversible.",
  openGraph: {
    title: "clean your TV",
    description: "Your TV, minus the ads. No root, nothing uninstalled, one line restores it.",
    url: "https://cleanyour.tv",
    siteName: "cleanyour.tv",
    images: [{ url: "/docs/new-home.jpg", width: 1920, height: 1080, alt: "The clean launcher on a TV" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@gathint", title: "clean your TV", description: "Your TV, minus the ads." },
};

export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${vt323.variable}`}>
      <body>{children}</body>
    </html>
  );
}
