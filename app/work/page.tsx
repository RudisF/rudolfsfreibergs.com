import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import WorkCarousel, { type Slide } from "./WorkCarousel";

const TITLE = "Work - B2B marketing, account management, GTM and AI";
const DESCRIPTION =
  "Eight years of finding out what a buyer needs before they say it - and building the dinners, the teams and the AI that let a company act on it.";
const URL = "https://www.rudolfsfreibergs.com/work";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    siteName: "Rudolfs Freibergs",
    url: URL,
    title: `${TITLE} | Rudolfs Freibergs`,
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rudolfs Freibergs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Rudolfs Freibergs`,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rudolfs Freibergs",
  url: URL,
  worksFor: {
    "@type": "Organization",
    name: "B:Engage",
    url: "https://b2b-engagement.com/",
  },
  knowsAbout: ["B2B marketing", "Account management", "Go-to-market strategy", "AI automation"],
};

const SLIDES: Slide[] = [
  {
    num: "€50k",
    label: "B2B marketing",
    text: "One dinner, nine guests. A €50k contract inside two months - and a €500M company getting in touch eight months later.",
    image: "/images/work/Zurich_Executive_Roundtable.png.JPG",
    alt: "Executive roundtable dinner in Zurich",
    caption: "Executive roundtable, Zurich",
  },
  {
    num: "93",
    label: "Account management - NPS",
    text: "An account management department built from zero to 130+ clients worldwide. Clients scored it 93 on a scale from -100 to 100.",
    image: "/images/work/Sweden_Executive_Roundtable.png.JPG",
    alt: "Executive roundtable in Sweden",
    caption: "Executive roundtable, Sweden",
  },
  {
    num: "€2.5M",
    label: "Go-to-market",
    text: "6,000 old delivery tasks, read and turned into a new pitch. Outbound leads went from €1M to €2.5M in one year.",
    image: "/images/work/GTM_Latvia.png",
    alt: "Go-to-market session in Latvia",
    caption: "Go-to-market session, Latvia",
  },
  {
    num: "20,000",
    label: "AI automation",
    text: "An AI agent read 20,000 dead CRM contacts and wrote each one a WhatsApp message from what it found.",
    image: "/images/work/Dubai_Executive_Roundtable.png",
    alt: "Executive roundtable in Dubai",
    caption: "Executive roundtable, Dubai",
  },
];

// Trimmed ink-on-transparent logos. Sizes balance visual weight (equal area),
// not equal height, so wide wordmarks and square marks read the same size.
const LOGOS = [
  { name: "PUMA", src: "/images/clients/ink/puma.png", w: 66, h: 51 },
  { name: "The MET Store", src: "/images/clients/ink/met.png", w: 51, h: 67 },
  { name: "Läderach", src: "/images/clients/ink/laderach.png", w: 123, h: 28 },
  { name: "Haypp Group", src: "/images/clients/ink/haypp.png", w: 192, h: 18 },
  { name: "Spice", src: "/images/clients/ink/spice.png", w: 98, h: 35 },
];

const serif = { fontFamily: "var(--font-instrument-serif), Georgia, serif" };

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-9">
            <p className="text-[13px] text-ink/60 md:text-[15px]">
              B2B marketing, account management, GTM and AI
            </p>
            <h1
              className="font-normal leading-[0.98] tracking-[-0.02em]"
              style={{ ...serif, fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              Most deals are decided before the first call. I work on that part.
            </h1>
            <p className="max-w-[560px] text-base leading-relaxed text-ink/75 md:text-[19px]">
              {DESCRIPTION}
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <a
                href="https://b2b-engagement.com/"
                className="inline-flex min-h-[52px] items-center justify-center rounded-sm bg-accent px-7 text-base font-medium text-paper transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
              >
                Work with me at B:Engage
              </a>
              <Link
                href="/contact"
                className="text-center text-base underline underline-offset-[6px] transition-colors hover:text-accent sm:text-left"
              >
                Or write to me here
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <WorkCarousel slides={SLIDES} />
          </div>
        </div>
      </Container>

      <section aria-label="Clients" className="border-y border-ink/10">
        <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-14">
          <p className="text-[13px] leading-normal text-ink/60 md:w-[180px] md:shrink-0 md:text-sm">
            Some of the 130+ accounts I&apos;ve looked after
          </p>
          <ul className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-8 md:justify-between">
            {LOGOS.map((l) => (
              <li key={l.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.src}
                  alt={l.name}
                  width={l.w}
                  height={l.h}
                  loading="lazy"
                  className="max-w-none opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
