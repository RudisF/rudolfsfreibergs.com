import type { Metadata } from "next";
import Image from "next/image";
import PhotoCarousel, { type WorkPhoto } from "./PhotoCarousel";

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

const PHOTOS: WorkPhoto[] = [
  {
    src: "/images/work/Zurich_Executive_Roundtable.png.JPG",
    alt: "Executive roundtable dinner in Zurich",
    caption: "Executive roundtable, Zurich",
    position: "50% 62%",
  },
  {
    src: "/images/work/Sweden_Executive_Roundtable.png.JPG",
    alt: "Executive roundtable in Sweden",
    caption: "Executive roundtable, Sweden",
    position: "50% 55%",
  },
  {
    src: "/images/work/GTM_Latvia.png",
    alt: "Go-to-market session in London",
    caption: "Go-to-market session, London",
    position: "50% 35%",
  },
  {
    src: "/images/work/Dubai_Executive_Roundtable.png",
    alt: "Executive roundtable in Dubai",
    caption: "Executive roundtable, Dubai",
    // Anchored left so the person on the far left is never cropped.
    position: "0% 50%",
  },
];

const PITCH =
  "A B2B practice that engages buyers on a human level. Fractional CMO for B2B software, SaaS and commerce companies: ABM, outbound engines and marketing operations.";

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* One panel. Desktop: 2x2 photos left, text right. Phone: text first, carousel below. */}
      <section className="grid grid-cols-1 lg:min-h-[900px] lg:grid-cols-[780px_1fr]">
        <div className="hidden grid-cols-2 grid-rows-2 gap-[3px] bg-navy lg:grid">
          {PHOTOS.map((ph) => (
            <figure key={ph.src} className="relative m-0 overflow-hidden">
              <Image
                src={ph.src}
                alt={ph.alt}
                fill
                sizes="390px"
                className="object-cover"
                style={{ objectPosition: ph.position }}
              />
              <figcaption className="absolute bottom-0 left-0 bg-navy/80 px-3.5 py-2 text-xs font-semibold text-cream">
                {ph.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-8 bg-navy px-5 pb-10 pt-14 md:px-16 lg:py-[72px]">
          <p
            className="text-[40px] font-black leading-none tracking-[-0.02em] text-cream md:text-[44px]"
            aria-label="B:Engage"
          >
            B<span className="text-gold">:</span>Engage
          </p>
          <h1 className="display text-[clamp(2.5rem,4.5vw,4rem)] text-cream">
            Most deals are decided <span className="text-gold">before the first call.</span> I work
            on that part.
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-on-navy md:text-[19px]">
            {PITCH}
          </p>
          <a href="https://b2b-engagement.com/" className="btn-gold self-start">
            Explore B:Engage <span aria-hidden>→</span>
          </a>
        </div>
        <div className="lg:hidden">
          <PhotoCarousel photos={PHOTOS} />
        </div>
      </section>
    </>
  );
}
