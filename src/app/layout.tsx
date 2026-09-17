import type { Metadata, Viewport } from "next";
import { Syne, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Background } from "@/components/layout/Background";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { siteConfig } from "@/data/site";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Digital Product Studio`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Eagox Studio",
    "Eagox",
    "digital product studio",
    "website development",
    "web app development",
    "desktop app development",
    "Android app development",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: "/",
    title: `${siteConfig.name} — Digital Product Studio`,
    description: siteConfig.description,
    images: [
      {
        url: "/assets/social/eagox-og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — digital product studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Digital Product Studio`,
    description: siteConfig.description,
    images: ["/assets/social/eagox-og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon.ico", sizes: "any" },
      { url: "/assets/favicon/eagox-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/eagox-favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${cormorant.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Background />
          <div className="app-shell">
            <NavBar />
            <main id="main-content" className="app-main">
              {children}
            </main>
            <Footer />
          </div>
          <StructuredData />
        </MotionProvider>
      </body>
    </html>
  );
}
