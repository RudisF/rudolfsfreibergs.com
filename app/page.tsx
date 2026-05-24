import type { CSSProperties } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ImagePlate from "@/components/ui/ImagePlate";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaBand from "@/components/ui/CtaBand";

function s(i: number): CSSProperties {
  return { animationDelay: `${i * 80}ms` };
}

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-content px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text col (right on desktop) */}
          <div className="flex flex-col gap-6 md:order-2">
            <p
              className="animate-fade-up font-mono text-xs font-medium uppercase tracking-widest text-stone"
              style={s(0)}
            >
              Est. Riga, Latvia
            </p>

            <h1
              className="animate-fade-up font-serif leading-[1.05] text-ink"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 500, ...s(1) }}
            >
              It&apos;s about the journey, not the destination
            </h1>

            <p className="animate-fade-up max-w-xl text-base leading-relaxed text-stone" style={s(2)}>
              A traveler with 8 years of experience across IT and marketing, I write to turn raw
              internal moments into human-first stories where readers finally feel understood.
            </p>

            <div className="animate-fade-up flex flex-wrap gap-4" style={s(3)}>
              <Button href="/contact" variant="primary">
                Get in touch
              </Button>
              <Button href="/about" variant="ghost">
                About Rudolfs
              </Button>
            </div>
          </div>

          {/* Image col (left on desktop) */}
          <div className="animate-fade-up md:order-1" style={s(4)}>
            <ImagePlate src="/images/home/portrait.jpg" alt="Rudolfs Freibergs" halo priority />
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
                  title="It's about the journey, not the destination"
                />
              </div>

              <p
                className="animate-fade-up max-w-xl text-base leading-relaxed text-stone"
                style={s(1)}
              >
                The footage has been sitting on hard drives since 2017. Raw moments from the
                high-altitude passes of Nepal, the dust of Mauritania, and the deep trails of the
                Amazon rainforest in Peru. I am currently editing these years of movement into a
                cohesive YouTube video series. It is a slow process because condensing true chaos
                into a story that respects your time takes restraint. The final cut is not ready
                yet, but the channel is live. You can subscribe to my YouTube channel today to see
                it the moment it drops.
              </p>

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
                  I spend my days navigating the high-demand, high-stress rhythms of corporate IT
                  and marketing accounts. It is an environment that constantly asks you to optimize
                  for output, numbers, and scale. To stay whole, I balance that intensity with
                  quiet, soulful experiences like sound therapies and traditional sauna ceremonies.
                  This is not a trendy wellness escape, it is about learning how to keep your feet
                  on the ground while your world moves at breakneck speed.
                </p>
                <p>
                  I approach B2B marketing not as a series of isolated creative campaigns, but as a
                  core revenue engine rooted in data and strategic precision. This high-level
                  alignment allows me to aggressively capture business expansion opportunities and
                  build comprehensive Go-To-Market ecosystems.
                </p>
                <p>
                  The dual pillars of my M-shaped professional life allow me to bring deep focus to
                  business problems without burning out, using stillness to fuel creativity. I
                  write about this tension because I know what it feels like to chase ambition
                  without wanting to lose your soul in the process.
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

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <CtaBand
        heading="Let's work together"
        subcopy="Enquiries for marketing and account management — or just say hello."
        ctaLabel="Get in touch"
        href="/contact"
        tone="accent"
      />
    </>
  );
}
