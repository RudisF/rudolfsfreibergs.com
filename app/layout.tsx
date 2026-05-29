import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  "Stories and adventures from the edges of the map - Himalayan passes, the Sahara by rail, the Amazon. Plus sauna, sound, and the quiet in between.";

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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rudolfs Freibergs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudolfs Freibergs",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M3HE08QXEX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M3HE08QXEX');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ReducedMotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReducedMotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
