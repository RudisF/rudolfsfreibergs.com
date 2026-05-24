import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ImagePlate from "@/components/ui/ImagePlate";
import Eyebrow from "@/components/ui/Eyebrow";
import AnchorRail from "@/components/about/AnchorRail";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Rudolfs Freibergs is: a traveler moving between technology and mountain passes, and the M-shaped philosophy of balancing high-stakes work with soulful practice.",
};

// ── identity card data ─────────────────────────────────────────────────────────

const identities = [
  {
    id: "boundaries",
    eyebrow: "Pushing boundaries",
    title: "Adventures",
    description:
      "I seek out the edges where maps run out and certainty dissolves. These are the places where the most honest stories live.",
    image: "/images/home/yangtze.jpg",
    href: "/adventures",
  },
  {
    id: "building",
    eyebrow: "Building things",
    title: "Work",
    description:
      "Eight years managing IT and marketing accounts for demanding clients. The work is technical; the stories it generates are deeply human.",
    image: "/images/home/lecture.jpg",
    href: "/work",
  },
  {
    id: "inward",
    eyebrow: "Going inward",
    title: "Soulful experiences",
    description:
      "Sound baths, forest saunas, and the quiet between thoughts. A counterweight to the speed of the digital world.",
    image: "/images/home/portrait.jpg",
    href: "/soulful",
  },
] as const;

// ── page ───────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    // relative so the AnchorRail can position absolutely inside it
    <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
      <AnchorRail />

      {/* ── Section 1: Intro ─────────────────────────────────────────── */}
      <section id="who-i-am" className="py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: square portrait */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-rule">
            <Image
              src="/images/about/About_1.JPG"
              alt="Rudolfs in Nepal"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: eyebrow + lede + body */}
          <div className="flex flex-col gap-5">
            <h1
              className="font-serif leading-[1.05] text-ink"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500 }}
            >
              Man behind the stories
            </h1>

            <div className="space-y-4 text-base leading-relaxed text-stone">
              <p>
                Placeholder body copy — replace with your actual bio. Describe who Rudolfs is,
                where he&apos;s from, what drives him, and what makes his perspective on IT,
                marketing, adventure travel, and soulful living worth reading.
              </p>
              <p>
                A second paragraph can go here. Talk about the tension between high-performance
                work environments and the need for grounding — the core thread that ties every
                section of this site together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Group photo band ──────────────────────────────── */}
      <div>
        <div className="h-[4px] bg-accent" />
        <ImagePlate
          src="/images/about/About_2.jpeg"
          alt="Group at the temple"
          ratio="16/9"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="h-[4px] bg-accent" />
      </div>

      {/* ── M-shape philosophy ───────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-rule">
            <Image
              src="/images/about/smoke_dissolve.png"
              alt="Smoke dissolving into air"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: text */}
          <div className="flex flex-col gap-5">
            <h2
              className="font-serif font-medium leading-snug text-ink"
              style={{ fontSize: "32px" }}
            >
              Philosophy of the M shape
            </h2>
            <p className="text-base leading-relaxed text-stone">
              The traditional T-shaped professional has a broad base of light skills and one deep
              area of expertise. The M-shape model evolves this concept. Instead of a single
              vertical peak, an M-shaped person builds multiple deep, specialized pillars of
              expertise. Personally, I see my own M-shape showing up clearly in how I balance my
              professional and internal worlds. One peak lives inside the high-stakes execution of
              managing accounts and marketing strategy. The other peak is anchored deeply in my
              spiritual practices, sauna ceremonies, and sound therapies. This is not a
              contradiction. The dual pillars allow me to bring deep focus to business problems
              without burning out, using the stillness of my personal practices to fuel the
              creativity needed in my marketing work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Three identities ──────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {identities.map(({ id, eyebrow, title, description, image, href }) => (
            <article
              id={id}
              key={id}
              className="flex flex-col gap-4 rounded-2xl border border-rule bg-paper p-6"
            >
              {/* Card header */}
              <div className="flex-1 space-y-2">
                <Eyebrow>{eyebrow}</Eyebrow>
                <h3
                  className="font-serif font-semibold leading-snug text-ink"
                  style={{ fontSize: "28px" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-stone">{description}</p>
              </div>

              {/* Card footer: link left, thumb right */}
              <div className="flex items-end justify-between gap-4 pt-2">
                <Link
                  href={href}
                  className="font-sans text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  Read more →
                </Link>

                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-rule">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    loading="lazy"
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
