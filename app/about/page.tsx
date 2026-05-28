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
      "Places chosen by a feeling, not a destination. Once a year I go fully solo where the map runs out — to clear my head and meet whoever I am when no one's watching.",
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
      "Sauna ceremonies, singing bowls, and the quiet between thoughts. A counterweight to the speed of everything else.",
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
              <p>I build teams and spaces that help people breathe.</p>
              <p>
                On the surface, my work looks like two careers — marketing and account management
                teams, and heat and sound therapy for people worn down by high-intensity lives. To
                me it&apos;s one problem: removing noise so a person can think clearly again.
              </p>
              <p>
                We treat the body like a machine with a broken part. More apps, more sleep data,
                more compliance. But a nervous system is not a pipeline. Your body eventually
                screams the things your mouth refuses to say.
              </p>
              <p>
                Whether I&apos;m rebuilding a sales process or putting someone in a sauna until
                their shoulders finally drop, the objective is the same: clear the chaos so
                what&apos;s in front of you becomes visible.
              </p>
              <p>
                Once a year, I leave the context behind. Wandering through places that don&apos;t
                care about you is one of the reliable ways to build conviction in the choices you
                make when you come home. Its about building confidence in decisions you make and
                feeling the trust in strangers.
              </p>
              <p>
                No formula. No tidy lessons. Just notes on how technical intensity and physical
                alignment can live in the same body without one consuming the other.
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
              Philosophy of the M-shape
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-stone">
              <p>
                The T-shaped professional has a broad base of skills and one deep area of expertise.
              </p>
              <p>
                The M-shape has more than one peak. Mine shows up clearly in how I balance the
                professional and the internal. One peak sits in high-stakes execution — managing
                accounts and marketing strategy. The other is anchored in sauna ceremonies, sound
                therapy, meditation.
              </p>
              <p>
                Not a contradiction. The dual pillars let me bring deep focus to business problems
                without burning out, using the stillness of one to fuel the creativity of the other.
              </p>
            </div>
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
