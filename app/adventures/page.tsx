import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adventures, type Adventure, type AdventurePhoto } from "@/content/adventures";

export const metadata: Metadata = {
  title: "Adventures",
  description:
    "Field notes from the edges - two months and 160km through the Nepali Himalayas, soloing Mauritania's iron-ore train, and half a year in Peru.",
  alternates: { canonical: "/adventures" },
};

function Photo({
  photo,
  sizes,
  className = "",
}: {
  photo: AdventurePhoto;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative min-h-[240px] overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: photo.position ?? "50% 50%" }}
      />
    </div>
  );
}

function Mosaic({ a }: { a: Adventure }) {
  const [lead, ...rest] = a.photos;

  if (a.mosaic === "tall-left") {
    return (
      <div className="grid h-full grid-cols-2 gap-[3px] bg-navy lg:grid-rows-3">
        <Photo
          photo={lead}
          sizes="(min-width: 1024px) 30vw, 50vw"
          className="row-span-3 min-h-[480px]"
        />
        {rest.map((p) => (
          <Photo key={p.src} photo={p} sizes="(min-width: 1024px) 30vw, 50vw" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid h-full gap-[3px] bg-navy lg:grid-rows-[1.4fr_1fr]"
      style={{ gridTemplateColumns: `repeat(${rest.length}, minmax(0, 1fr))` }}
    >
      <Photo
        photo={lead}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="col-span-full min-h-[320px]"
      />
      {rest.map((p) => (
        <Photo key={p.src} photo={p} sizes="(min-width: 1024px) 30vw, 50vw" />
      ))}
    </div>
  );
}

function Chapter({ a }: { a: Adventure }) {
  const dark = a.tone === "navy";
  const text = (
    <div
      className={`flex h-full flex-col justify-center gap-6 px-5 py-16 md:px-14 md:py-[72px] ${
        dark ? "bg-navy" : "bg-sand"
      }`}
    >
      <p
        className={`text-[clamp(5rem,9vw,7.5rem)] font-black leading-[0.85] tracking-[-0.06em] ${
          dark ? "text-gold" : "text-gold-deep"
        }`}
        aria-hidden
      >
        {a.year}
      </p>
      <h2
        className={`display text-[clamp(2.5rem,4vw,3.5rem)] ${dark ? "text-cream" : "text-[#151515]"}`}
      >
        <span className="sr-only">{a.year}: </span>
        {a.title[0]} <span className={dark ? "text-gold" : "text-gold-deep"}>{a.title[1]}</span>
      </h2>
      <div
        className={`flex flex-col gap-4 text-[17px] leading-relaxed ${dark ? "text-on-navy" : "text-on-sand"}`}
      >
        {a.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id={a.slug}
      aria-label={`${a.title.join(" ")}, ${a.year}`}
      className={`grid scroll-mt-20 grid-cols-1 lg:min-h-[960px] ${
        a.textSide === "left" ? "lg:grid-cols-[560px_1fr]" : "lg:grid-cols-[1fr_560px]"
      }`}
    >
      {a.textSide === "left" ? text : null}
      <div className={a.textSide === "right" ? "order-2 lg:order-none" : ""}>
        <Mosaic a={a} />
      </div>
      {a.textSide === "right" ? <div className="order-1 lg:order-none">{text}</div> : null}
    </section>
  );
}

export default function AdventuresPage() {
  const sorted = [...adventures].sort((a, b) => b.year - a.year);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-screen min-h-[560px] flex-col justify-end overflow-hidden">
        <Image
          src="/images/adventures/Peru_1.JPG"
          alt="Sunset over the Amazon river, Peru"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/20 from-35% to-navy/85"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 px-5 pb-28 md:flex-row md:items-end md:justify-between md:gap-12 md:px-14 md:pb-[72px]">
          <h1 className="display text-[clamp(3.25rem,7.5vw,7rem)] text-cream">
            <span className="md:whitespace-nowrap">Where the map</span>
            <br />
            <span className="text-gold">runs out</span>
          </h1>
          <p className="max-w-[380px] text-lg leading-relaxed text-cream">
            Once a year I go fully solo where the map runs out - to clear my head and meet whoever I
            am when no one is watching.
          </p>
        </div>
      </section>

      {sorted.map((a) => (
        <Chapter key={a.slug} a={a} />
      ))}

      {/* Next trip */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/adventures/Mauritania_2.jpg"
          alt="Night sky over the Sahara"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 60%" }}
        />
        <div className="absolute inset-0 bg-navy/55" aria-hidden />
        <div className="relative flex min-h-[520px] flex-col justify-center gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="display text-[clamp(3rem,6.5vw,6rem)] text-cream">
            Curious about <span className="text-gold">the next one?</span>
          </h2>
          <div className="flex max-w-[420px] flex-col gap-6">
            <p className="text-lg leading-relaxed text-cream">
              Questions about a route, or want me to plan or guide one for you? Write to me.
            </p>
            <Link href="/contact?topic=adventures" className="btn-gold self-start">
              Ask about the next trip <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
