import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/ui/HeroVideo";
import PhotoCarousel, { type WorkPhoto } from "@/components/home/PhotoCarousel";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const WORK_PHOTOS: WorkPhoto[] = [
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

type Practice = {
  title: [string, string];
  text: string;
  image: string;
  alt: string;
  position: string;
};

const MAIN_PRACTICES: Practice[] = [
  {
    title: ["Sauna", "ceremonies"],
    text: "Latvian roots, then years exploring traditions around the world. Heat, singing bowls and music chosen one track at a time.",
    image: "/images/soulful/Sauna.jpg",
    alt: "Rudolfs after a sauna ceremony",
    position: "50% 35%",
  },
  {
    title: ["Singing", "bowls"],
    text: "Sound therapy learned from practitioners in Nepal. One hour on its own, or layered into a sauna ceremony.",
    image: "/images/soulful/Singing_bowls.png",
    alt: "Sound therapy practitioners in Nepal",
    position: "50% 60%",
  },
];

const MORE_PRACTICES: Practice[] = [
  {
    title: ["Buddhist", "meditation"],
    text: "Shamatha and Vipassana at Kopan Monastery, Nepal. Usable on a regular Tuesday.",
    image: "/images/soulful/Kopan_Monastery.JPG",
    alt: "Meditation hall at Kopan Monastery",
    position: "50% 55%",
  },
  {
    title: ["Positive", "psychology"],
    text: "Daily actions aligned with values. Negative emotions read as signals.",
    image: "/images/soulful/Positive_Psychology.PNG",
    alt: "Positive Psychology certificate, University of Pennsylvania",
    position: "50% 30%",
  },
  {
    title: ["", "Shamanism"],
    text: "Rhythmic drumming, not hallucinogens. Foundation for Shamanic Studies.",
    image: "/images/soulful/Shamanism.jpg",
    alt: "Shamanic ceremony in the Amazon",
    position: "50% 45%",
  },
];

function PracticeTile({ p, big }: { p: Practice; big: boolean }) {
  return (
    <article
      className={`relative overflow-hidden ${big ? "h-[420px] md:h-[720px]" : "h-[150px] md:h-[520px]"}`}
    >
      <Image
        src={p.image}
        alt={p.alt}
        fill
        sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 33vw"}
        className="object-cover"
        style={{ objectPosition: p.position }}
      />
      <div
        className={`absolute inset-0 ${
          big
            ? "bg-gradient-to-b from-navy/0 from-40% to-navy/90"
            : "hidden bg-gradient-to-b from-navy/0 from-20% to-navy/95 to-70% md:block"
        }`}
        aria-hidden
      />
      <div
        className={`absolute flex-col gap-3 ${
          big
            ? "inset-x-5 bottom-6 flex md:inset-x-10 md:bottom-10"
            : "inset-x-7 bottom-7 hidden md:flex"
        }`}
      >
        <h3 className={`display text-cream ${big ? "text-[34px] md:text-[56px]" : "text-4xl"}`}>
          {p.title[0]} <span className="text-gold">{p.title[1]}</span>
        </h3>
        <p
          className={`leading-relaxed text-cream ${big ? "text-[15px] md:text-[17px]" : "text-[15px]"}`}
        >
          {p.text}
        </p>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero: video unchanged ─────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[560px] flex-col justify-end overflow-hidden bg-black">
        <HeroVideo
          src="/images/about/Hero_video/Rudolfsfreibergs.webm"
          poster="/images/about/Nepal_Rudolfs_Freibergs.JPG"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-navy/15 from-30% to-navy/90"
          aria-hidden
        />
        <div className="relative z-20 flex flex-col gap-7 px-5 pb-28 md:px-14 md:pb-16">
          <h1 className="display animate-fade-up text-[clamp(2.4rem,7vw,6.25rem)] text-cream">
            No noise.
            <br />
            <span className="text-gold">Travel stories</span> and
            <br />
            personal reflections
          </h1>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[640px] text-lg leading-relaxed text-cream md:text-xl">
              A traveler with 8 years of experience across IT and marketing, I write to turn raw
              internal moments into human-first stories where readers finally feel understood.
            </p>
            <Link href="/adventures#mauritania" className="btn-gold self-start md:self-auto">
              Start with the Sahara <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About me ──────────────────────────────────────────────────── */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="grid scroll-mt-20 grid-cols-1 bg-sand lg:min-h-[760px] lg:grid-cols-[720px_1fr]"
      >
        <div className="relative min-h-[340px]">
          <Image
            src="/images/about/Nepal_Rudolfs_Freibergs.JPG"
            alt="Rudolfs in the Himalayas, Nepal"
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-6 px-5 py-12 md:px-[72px] md:py-20">
          <h2 id="about-heading" className="display text-[clamp(3rem,5.5vw,5rem)] text-[#151515]">
            About <span className="text-gold-deep">me</span>
          </h2>
          <div className="flex max-w-[600px] flex-col gap-5 text-base leading-relaxed text-on-sand md:text-lg">
            <p>
              My days run on the high-demand rhythms of corporate IT, B2B marketing and customer
              engagement. To stay whole, I balance that intensity with quieter practices: sound
              therapy and traditional sauna ceremonies.
            </p>
            <p>
              Sitting in meditation at Kopan Monastery in Nepal, I decided to bring these stories
              and notes into public view.
            </p>
          </div>
        </div>
      </section>

      {/* ── What I do ─────────────────────────────────────────────────── */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="grid scroll-mt-20 grid-cols-1 bg-navy lg:min-h-[860px] lg:grid-cols-[780px_1fr]"
      >
        <div className="hidden grid-cols-2 grid-rows-2 gap-[3px] bg-navy lg:grid">
          {WORK_PHOTOS.map((ph) => (
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

        <div className="flex flex-col justify-center gap-6 px-5 pb-10 pt-14 md:gap-8 md:px-16 lg:py-[72px]">
          <p className="meta text-gold">What I do</p>
          <h2 id="work-heading" className="display text-[clamp(2.4rem,4.2vw,3.75rem)] text-cream">
            Most deals are decided <span className="text-gold">before the first call.</span> I work
            on that part.
          </h2>
          <p className="max-w-[560px] text-base leading-relaxed text-on-navy md:text-[19px]">
            {PITCH}
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-7">
            <p
              className="text-[30px] font-black leading-none tracking-[-0.02em] text-cream md:text-[34px]"
              aria-label="B:Engage"
            >
              B<span className="text-gold">:</span>Engage
            </p>
            <a href="https://b2b-engagement.com/" className="btn-gold">
              Explore B:Engage <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="lg:hidden">
          <PhotoCarousel photos={WORK_PHOTOS} />
        </div>
      </section>

      {/* ── The M-shape: work + practice ─────────────────────────────── */}
      <section id="soulful" aria-labelledby="mshape-heading" className="scroll-mt-20 bg-navy-2">
        <div className="grid grid-cols-1 items-end gap-6 px-5 pb-10 pt-14 md:grid-cols-2 md:gap-16 md:px-14 md:pb-[72px] md:pt-24">
          <h2 id="mshape-heading" className="display text-[clamp(4rem,8.4vw,7.5rem)] text-cream">
            The <span className="whitespace-nowrap text-gold">M-shape</span>
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-on-navy md:pb-2 md:text-[19px]">
            <p>
              The T-shaped professional has one deep area of expertise. The M-shape has more than
              one peak.
            </p>
            <p>
              One of mine is the work above. The other sits in heat, sound and stillness. The
              stillness of one feeds the other.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[3px] bg-navy md:grid-cols-2">
          {MAIN_PRACTICES.map((p) => (
            <PracticeTile key={p.image} p={p} big />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-[3px] border-t-[3px] border-navy bg-navy">
          {MORE_PRACTICES.map((p) => (
            <PracticeTile key={p.image} p={p} big={false} />
          ))}
        </div>
        <p className="bg-navy px-5 pb-10 pt-6 text-[15px] leading-relaxed text-on-navy md:hidden">
          Also in the practice: Buddhist meditation from Kopan Monastery, positive psychology, and
          core shamanism through the Foundation for Shamanic Studies.
        </p>
      </section>

      {/* ── Why I travel ──────────────────────────────────────────────── */}
      <section
        id="travel"
        aria-labelledby="travel-heading"
        className="relative flex min-h-[620px] flex-col justify-end overflow-hidden md:min-h-[720px] md:justify-center"
      >
        <Image
          src="/images/adventures/Peru_3.JPG"
          alt="Sand dunes at sunset"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "40% 50%" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/20 from-20% to-navy/90 md:bg-gradient-to-r md:from-navy/90 md:from-0% md:via-navy/40 md:to-navy/10"
          aria-hidden
        />
        <div className="relative flex max-w-[640px] flex-col gap-6 px-5 pb-11 md:px-14 md:py-20">
          <p className="meta text-gold">Why I travel</p>
          <h2
            id="travel-heading"
            className="display text-[clamp(2.75rem,5.3vw,4.75rem)] text-cream"
          >
            Places that <span className="text-gold">don&apos;t care</span> about you
          </h2>
          <p className="text-base leading-relaxed text-cream md:text-[19px]">
            Once a year I leave the context behind. Wandering through places that don&apos;t care
            about you is one of the reliable ways to build conviction in the choices you make when
            you come home.
          </p>
          <Link href="/adventures" className="btn-gold self-start">
            See the adventures <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
