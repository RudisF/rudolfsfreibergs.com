import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { media, type MediaItem } from "@/content/media";

export const metadata: Metadata = {
  title: "Media",
  description: "Podcasts, webinars, lectures, awards, and press featuring Rudolfs Freibergs.",
  alternates: { canonical: "/media" },
};

// "Media" as a category would repeat the page title inside the grid.
const LABEL: Record<MediaItem["category"], string> = {
  Podcast: "Podcast",
  Webinar: "Webinar",
  Event: "Event",
  Award: "Award",
  Media: "Press",
};

const FEATURED_ID = "mauritania-train-podcast";

function Card({ item, featured = false }: { item: MediaItem; featured?: boolean }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col bg-navy-2 text-cream"
    >
      <div
        className={`relative overflow-hidden ${featured ? "h-[260px] md:h-auto md:flex-1" : "h-[200px] md:h-[220px]"}`}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-col gap-2 ${featured ? "px-6 py-7 md:px-10" : "px-6 py-5"}`}>
        <p className="meta text-gold">
          {LABEL[item.category]} · {item.year}
        </p>
        <h2
          className={`font-extrabold leading-tight tracking-[-0.02em] transition-colors group-hover:text-gold ${
            featured ? "text-[clamp(1.5rem,2.4vw,2.125rem)]" : "text-[19px]"
          }`}
        >
          {item.title}
        </h2>
        <p className="text-sm text-on-navy">
          {item.source} <span aria-hidden>↗</span>
        </p>
      </div>
    </a>
  );
}

export default function MediaPage() {
  const featured = media.find((m) => m.id === FEATURED_ID) ?? media[0];
  const rest = media.filter((m) => m.id !== featured.id);
  const [side1, side2, ...below] = rest;

  return (
    <>
      <section className="flex flex-col gap-6 bg-navy px-5 pb-12 pt-14 md:flex-row md:items-end md:justify-between md:px-14 md:pt-16">
        <h1 className="display text-[clamp(4rem,11.8vw,10.5rem)] text-cream">Media</h1>
        <p className="max-w-[420px] pb-3 text-xl leading-relaxed text-on-navy">
          Podcasts, webinars, lectures and press. A running record of conversations and appearances.
        </p>
      </section>

      <section
        aria-label="Appearances"
        className="grid grid-cols-1 gap-[3px] bg-navy md:grid-cols-3"
      >
        <div className="md:col-span-2 md:row-span-2 md:min-h-[683px]">
          <Card item={featured} featured />
        </div>
        {side1 && <Card item={side1} />}
        {side2 && <Card item={side2} />}
        {below.map((m) => (
          <Card key={m.id} item={m} />
        ))}
      </section>

      <section className="flex flex-col gap-8 border-t border-cream/10 bg-navy px-5 py-16 md:flex-row md:items-center md:justify-between md:px-14 md:py-20">
        <h2 className="display text-[clamp(2.75rem,5.6vw,5rem)] text-cream">
          Press, podcast <span className="text-gold">or a talk?</span>
        </h2>
        <div>
          <Link href="/contact?topic=speaking" className="btn-gold">
            Invite me <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
