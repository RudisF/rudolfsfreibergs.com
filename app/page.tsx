import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import HeroVideo from "@/components/ui/HeroVideo";
import SectionHeader from "@/components/ui/SectionHeader";

function s(i: number): CSSProperties {
  return { animationDelay: `${i * 80}ms` };
}

const identities = [
  {
    id: "boundaries",
    eyebrow: "Pushing boundaries",
    title: "Adventures",
    description:
      "Places chosen by a feeling, not a destination. Once a year I go fully solo where the map runs out - to clear my head and meet whoever I am when no one's watching.",
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

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────────────── */}
      {/*
        Z-index stacking order (bottom to top):
          z-0  — <video>  background video
          z-10 — overlay  dark semi-transparent layer (adjust bg-black/35 opacity here)
          z-20 — text     all readable content
      */}
      <section className="relative overflow-hidden h-screen">
        {/* z-0: background video */}
        <HeroVideo src="/images/about/Hero_video/Rudolfsfreibergs.webm" />

        {/* z-10: dark overlay — change /35 to adjust darkness (30–40% recommended) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-black/35"
          aria-hidden="true"
        />

        {/* z-20: text content — right half on desktop, full-width on mobile */}
        <div className="relative z-20 mx-auto max-w-content px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 md:gap-16">
            {/* Left spacer — keeps text in the right column on desktop */}
            <div className="hidden md:block" aria-hidden="true" />

            {/* Text column */}
            <div className="flex flex-col gap-5">
              <p
                className="animate-fade-up font-mono text-xs font-medium uppercase tracking-widest text-white/60"
                style={s(0)}
              >
                Est. Riga, Latvia
              </p>

              <h1
                className="animate-fade-up font-serif leading-[1.05] text-white"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 500, ...s(1) }}
              >
                No noise. Travel stories and personal reflections
              </h1>

              <p className="animate-fade-up text-base leading-relaxed text-white/75" style={s(2)}>
                A traveler with 8 years of experience across IT and marketing, I write to turn raw
                internal moments into human-first stories where readers finally feel understood.
              </p>

              <div className="animate-fade-up flex flex-wrap gap-4" style={s(3)}>
                <Button href="/contact" variant="primary">
                  Get in touch
                </Button>
                <Button
                  href="/about"
                  variant="ghost"
                  className="!border-white/40 !text-white hover:!bg-white/15"
                >
                  About Rudolfs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Documentary ───────────────────────────────────── */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left: text */}
            <div className="flex flex-col gap-6">
              <div className="animate-fade-up" style={s(0)}>
                <SectionHeader
                  eyebrow="Video series"
                  title="It&apos;s about the journey, not the destination"
                />
              </div>

              <div
                className="animate-fade-up max-w-xl space-y-4 text-base leading-relaxed text-stone"
                style={s(1)}
              >
                <p>
                  The destination has never been the point. The places get chosen by something
                  quieter than logic - a feeling, a voice that says go there, and I trust it.
                </p>
                <p>
                  First footages has been sitting on hard drives since 2017. High passes in Nepal,
                  dust in Mauritania, deep trails in the Peruvian Amazon. I&apos;m editing years of
                  movement into a YouTube series - slowly, because condensing chaos into a story
                  that respects your time takes restraint. The final cut isn&apos;t ready. The
                  channel is.
                </p>
              </div>

              <div className="animate-fade-up" style={s(2)}>
                <Button
                  href="https://www.youtube.com/@rudolfsfreibergs2733"
                  target="_blank"
                  rel="noopener"
                  variant="primary"
                >
                  Get notified on YouTube
                </Button>
              </div>
            </div>

            {/* Right: tall portrait, full bleed */}
            <div
              className="animate-fade-up relative aspect-[2/3] overflow-hidden rounded-2xl"
              style={s(3)}
            >
              <Image
                src="/images/home/yangtze.jpg"
                alt="Yangtze River expedition"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: About preview (flipped) ───────────────────────── */}
      <section className="border-t border-rule bg-ink">
        <div className="mx-auto max-w-content px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left: image */}
            <div
              className="animate-fade-up relative aspect-[4/3] overflow-hidden rounded-2xl md:order-1"
              style={s(0)}
            >
              <Image
                src="/images/home/lecture.jpg"
                alt="Rudolfs speaking"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Right: text */}
            <div className="flex flex-col gap-6 md:order-2">
              <div className="animate-fade-up" style={s(1)}>
                <SectionHeader
                  eyebrow="About Rudolfs"
                  title="Stories worth telling"
                  className="[&_h2]:text-paper [&_p]:text-stone"
                />
              </div>

              <div
                className="animate-fade-up max-w-xl space-y-4 text-base leading-relaxed text-stone"
                style={s(2)}
              >
                <p>
                  My days run on the high-demand rhythms of corporate IT, B2B marketing and
                  customer engagement - an environment that asks you to build a relationship,
                  optimise for output and scale. To stay whole, I balance that intensity with
                  quieter practices: sound therapy, traditional sauna ceremonies. Not a wellness
                  escape. A way to keep your feet on the ground while the world moves at breakneck
                  speed.
                </p>
                <p>
                  Sitting in meditation at Kopan Monastery in Nepal, I decided to bring these
                  stories and notes into public view. I write about this tension because I know
                  what it feels like to chase ambition without losing your soul in the process.
                </p>
              </div>

              {/* CTA with diagonal accent rule behind it */}
              <div className="animate-fade-up relative mt-2 self-start" style={s(3)}>
                <div
                  className="absolute top-1/2 left-0 h-[2px] bg-accent"
                  style={{ width: "60%", opacity: 0.6, transform: "rotate(-8deg) translateY(-50%)" }}
                  aria-hidden
                />
                <Button href="/about" variant="link" className="relative text-accent">
                  Keep reading →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Three identities ──────────────────────────────── */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {identities.map(({ id, eyebrow, title, description, image, href }) => (
              <article
                key={id}
                className="flex flex-col gap-4 rounded-2xl border border-rule bg-paper p-6"
              >
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
        </div>
      </section>
    </>
  );
}
