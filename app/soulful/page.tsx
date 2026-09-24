import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Soulful experiences",
  description:
    "Sauna ceremonies, singing-bowl sound therapy, guided meditation, positive psychology, and core shamanism - a grounded counterweight to a fast digital world.",
  alternates: { canonical: "/soulful" },
};

const MORE = [
  {
    title: ["Buddhist", "meditation"],
    body: "Time at Kopan Monastery in Nepal, in the traditions of Shamatha and Vipassana. Over sixty guided practices for stabilising attention - usable on a regular Tuesday, not only on a retreat.",
    image: "/images/soulful/Kopan_Monastery.JPG",
    alt: "Meditation hall at Kopan Monastery",
    position: "50% 55%",
  },
  {
    title: ["Positive", "psychology"],
    body: "Joy and difficulty held together, not the absence of one. Daily actions aligned with values, negative emotions read as signals, small behavioural experiments.",
    image: "/images/soulful/Positive_Psychology.PNG",
    alt: "Positive Psychology certificate, University of Pennsylvania",
    position: "50% 40%",
  },
  {
    title: ["", "Shamanism"],
    body: "Core shamanism as Michael Harner built it: the shamanic journey through rhythmic drumming, not hallucinogens. Trained through the Foundation for Shamanic Studies.",
    image: "/images/soulful/Shamanism.jpg",
    alt: "Shamanic ceremony in the Amazon",
    position: "50% 45%",
  },
] as const;

export default function SoulfulPage() {
  return (
    <>
      {/* Title */}
      <section className="flex flex-col gap-6 bg-navy px-5 pb-12 pt-14 md:flex-row md:items-end md:justify-between md:px-14 md:pt-16">
        <h1 className="display text-[clamp(3.25rem,8.9vw,8rem)] text-cream">
          Soulful
          <br />
          <span className="text-gold">experiences</span>
        </h1>
        <p className="max-w-[300px] pb-3 text-xl leading-relaxed text-on-navy">
          Tools that clear the noise and reset the body and mind.
        </p>
      </section>

      {/* Sauna: full bleed */}
      <section aria-labelledby="sauna" className="relative overflow-hidden">
        <Image
          src="/images/soulful/Sauna.jpg"
          alt="Rudolfs after a sauna ceremony"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
        <div className="relative flex min-h-[760px] items-end p-5 md:items-center md:p-14">
          <div className="flex max-w-[520px] flex-col gap-6 bg-navy/90 p-8 md:p-12">
            <h2 id="sauna" className="display text-[clamp(2.5rem,4.2vw,3.75rem)] text-cream">
              Sauna <span className="text-gold">ceremonies</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-on-navy">
              Sauna culture since childhood - Latvian roots, then years exploring traditions from
              around the world to learn what actually does the work.
            </p>
            <p className="text-[17px] leading-relaxed text-on-navy">
              My ceremonies weave that practice with mindfulness, sound therapy, singing bowls and
              music selected one track at a time. Grounding heat and resonant sound: full-body
              release, a quieter mind.
            </p>
          </div>
        </div>
      </section>

      {/* Singing bowls: split */}
      <section
        aria-labelledby="bowls"
        className="grid grid-cols-1 lg:min-h-[640px] lg:grid-cols-[820px_1fr]"
      >
        <div className="relative min-h-[380px]">
          <Image
            src="/images/soulful/Singing_bowls.png"
            alt="Sound therapy practitioners in Nepal"
            fill
            sizes="(min-width: 1024px) 57vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 60%" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-6 bg-sand px-5 py-16 md:px-14">
          <h2 id="bowls" className="display text-[clamp(2.5rem,4.2vw,3.75rem)] text-[#151515]">
            Singing <span className="text-gold-deep">bowls</span>
          </h2>
          <p className="text-[17px] leading-relaxed text-on-sand">
            Sound therapy training comes directly from practitioners in Nepal: how specific harmonic
            vibrations move through the body to release what has been held there.
          </p>
          <p className="text-[17px] leading-relaxed text-on-sand">
            A one-hour session works on its own, or layered into a sauna ceremony where heat and
            sound amplify each other.
          </p>
        </div>
      </section>

      {/* Three practices */}
      <section
        aria-label="More practices"
        className="grid grid-cols-1 gap-[3px] bg-navy md:grid-cols-3"
      >
        {MORE.map((m, i) => (
          <article
            key={m.title[1]}
            className={`flex flex-col ${i === 1 ? "bg-navy-2" : "bg-navy"}`}
          >
            <div className="relative h-[320px] md:h-[420px]">
              <Image
                src={m.image}
                alt={m.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
                style={{ objectPosition: m.position }}
              />
            </div>
            <div className="flex flex-col gap-4 px-5 py-8 md:px-10">
              <h2 className="display text-[40px] text-cream">
                {m.title[0]} <span className="text-gold">{m.title[1]}</span>
              </h2>
              <p className="text-base leading-relaxed text-on-navy">{m.body}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Book */}
      <section className="flex flex-col gap-8 bg-navy-2 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-14 md:py-20">
        <h2 className="display text-[clamp(3rem,5.6vw,5rem)] text-cream">
          Practice <span className="text-gold">with me</span>
        </h2>
        <div className="flex max-w-[420px] flex-col gap-6">
          <p className="text-lg leading-relaxed text-on-navy">
            A sauna ceremony or a sound session. Tell me what you have in mind.
          </p>
          <Link href="/contact?topic=sauna-or-session" className="btn-gold self-start">
            Ask about a session <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
