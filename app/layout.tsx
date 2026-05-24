import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ReducedMotionProvider } from "@/components/providers/ReducedMotionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://www.rudolfsfreibergs.com";
const SITE_DESCRIPTION =
  "Rudolfs Freibergs — eight years across IT and marketing, expeditions from the Nepali Himalayas to Mauritania and Peru, and soulful practices like sauna and sound therapy. Honest writing on ambition, adventure, and staying grounded.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rudolfs Freibergs",
    template: "%s | Rudolfs Freibergs",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    type: "website",
    siteName: "Rudolfs Freibergs",
    url: SITE_URL,
    title: "Rudolfs Freibergs",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudolfs Freibergs",
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rudolfs Freibergs",
  url: SITE_URL,
  jobTitle: "IT & Marketing Account Manager",
  sameAs: [
    "https://www.instagram.com/rudolfs_freibergs/",
    "https://www.linkedin.com/in/rudolfs-freibergs/",
    "https://www.youtube.com/@rudolfsfreibergs2733",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ReducedMotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
