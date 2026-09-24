import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/ui/HeroVideo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function Tile({
  href,
  image,
  alt,
  position,
  title,
  line,
  big = false,
  sizes,
}: {
  href: string;
  image: string;
  alt: string;
  position: string;
  title: string;
  line: string;
  big?: boolean;
  sizes: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block h-full min-h-[420px] overflow-hidden text-cream"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/0 from-45% to-navy/90"
        aria-hidden
      />
      <div
        className={`absolute inset-x-6 bottom-6 flex flex-col gap-3 ${big ? "md:inset-x-14 md:bottom-14" : "md:inset-x-9 md:bottom-9"}`}
      >
        <h3 className={`display ${big ? "text-5xl md:text-8xl" : "text-5xl md:text-[52px]"}`}>
          {title}{" "}
          <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
        </h3>
        <p className={`max-w-[520px] leading-relaxed ${big ? "text-lg" : "text-base"}`}>{line}</p>
      </div>
    </Link>
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
          <h1 className="display animate-fade-up text-[clamp(2.75rem,7vw,6.25rem)] text-cream">
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

      {/* ── About (merged from /about) ────────────────────────────────── */}
      <section
        aria-labelledby="about-heading"
        className="grid grid-cols-1 bg-sand lg:grid-cols-[760px_1fr]"
      >
        <div className="relative min-h-[420px] lg:min-h-[800px]">
          <Image
            src="/images/about/Nepal_Rudolfs_Freibergs.JPG"
            alt="Rudolfs in the Himalayas, Nepal"
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-7 px-5 py-16 md:px-[72px] md:py-20">
          <h2
            id="about-heading"
            className="display text-[clamp(2.75rem,5vw,4.5rem)] text-[#151515]"
          >
            The man behind <span className="text-gold-deep">the stories</span>
          </h2>
          <div className="flex max-w-[600px] flex-col gap-5 text-lg leading-relaxed text-on-sand">
            <p>
              My days run on the high-demand rhythms of corporate IT, B2B marketing and customer
              engagement. To stay whole, I balance that intensity with quieter practices: sound
              therapy and traditional sauna ceremonies.
            </p>
            <p>
              Sitting in meditation at Kopan Monastery in Nepal, I decided to bring these stories
              and notes into public view.
            </p>
            <p>
              Once a year I leave the context behind and go somewhere that does not care about my
              titles. No formula. No tidy lessons.
            </p>
          </div>
        </div>
      </section>

      {/* ── M-shape ───────────────────────────────────────────────────── */}
      <section aria-labelledby="mshape-heading" className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-7 bg-navy px-5 py-16 md:px-14 md:py-20">
          <h2 id="mshape-heading" className="display text-[clamp(3rem,6vw,5.5rem)] text-cream">
            The <span className="whitespace-nowrap text-gold">M-shape</span>
          </h2>
          <div className="flex max-w-[600px] flex-col gap-5 text-lg leading-relaxed text-on-navy">
            <p>
              The T-shaped professional has a broad base of skills and one deep area of expertise.
              The M-shape has more than one peak.
            </p>
            <p>
              One of mine sits in high-stakes execution: accounts and marketing strategy. The other
              is anchored in sauna ceremonies, sound therapy and meditation. The stillness of one
              feeds the other.
            </p>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-[720px]">
          <Image
            src="/images/about/Kopan_Monastery.jpeg"
            alt="Group at Kopan Monastery, Nepal"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Three worlds ──────────────────────────────────────────────── */}
      <section
        aria-label="Explore"
        className="grid grid-cols-1 lg:h-[900px] lg:grid-cols-[2fr_1fr]"
      >
        <Tile
          href="/adventures"
          image="/images/adventures/Mauritania_Main.JPG"
          alt="Riding the iron ore train at sunset, Mauritania"
          position="50% 55%"
          title="Adventures"
          line="Places chosen by a feeling, not a destination. Once a year I go fully solo where the map runs out."
          big
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
        <div className="grid grid-rows-2">
          <Tile
            href="/work"
            image="/images/home/Rudolfs_Freibergs_1.jpg"
            alt="Rudolfs speaking to a lecture hall"
            position="35% 50%"
            title="Work"
            line="Eight years managing IT and marketing accounts for demanding clients."
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
          <Tile
            href="/soulful"
            image="/images/soulful/Sauna.jpg"
            alt="Sauna ceremony"
            position="50% 30%"
            title="Soulful"
            line="Sauna ceremonies, singing bowls and the quiet between thoughts."
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}
