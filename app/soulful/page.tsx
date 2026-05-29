import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import FeatureRow from "@/components/ui/FeatureRow";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Soulful experiences",
  description:
    "Sauna ceremonies, singing-bowl sound therapy, guided meditation, positive psychology, and core shamanism - a grounded counterweight to a fast digital world.",
};

const practices = [
  {
    label: "Sauna ceremonies",
    title: "Heat as a doorway",
    body: "I've been in sauna culture since childhood - Latvian roots, then years exploring traditions from around the world to learn what actually does the work. My ceremonies weave that practice with mindfulness, sound therapy, singing bowls, and music selected one track at a time. The pairing of grounding heat and resonant sound is the engine: full-body release, a quieter mind, the kind of clarity you can't think your way into.",
    image: "/images/soulful/Sauna.jpg",
    side: "left",
  },
  {
    label: "Singing bowls",
    title: "Sound that resets the body",
    body: "Sound therapy training comes directly from practitioners in Nepal. I learned how specific harmonic vibrations move through the body's energy centres - the chakras - to release what's been held there.\n\nThe one hour session reset the nervous system through pure sound. They work as a standalone practice, or layered into a sauna ceremony where heat and sound amplify each other.",
    image: "/images/soulful/Singing_bowls.png",
    side: "right",
  },
  {
    label: "Buddhist meditation principles",
    title: "Stillness, on purpose",
    body: "I spent time at Kopan Monastery in Nepal, immersed in the foundational Buddhist traditions of Shamatha and Vipassana. Over sixty guided practices, learning how to stabilise attention and quiet the mind. The point of sharing them isn't escape. It's psychological flexibility you can use in the middle of a regular Tuesday, not on a retreat you have to fly to.",
    image: "/images/soulful/Kopan_Monastery.JPG",
    side: "left",
  },
  {
    label: "Positive Psychology as inspiration",
    title: "Training for what's good",
    body: "Positive Psychology treats well-being as the integration of joy and difficulty, not the absence of one or the other. I work with established frameworks: aligning daily actions with values, treating negative emotions as signals rather than problems, building flexibility through small, realistic behavioural experiments.",
    image: "/images/soulful/Positive_Psychology.PNG",
    side: "right",
  },
  {
    label: "Shamanism",
    title: "Older ways of seeing",
    body: "I trained in core shamanism - the framework Michael Harner built from the universal principles behind humanity's oldest healing traditions, stripped of any single ethnic culture. The work is grounded in the 'shamanic journey,' a method that uses rhythmic drumming, not hallucinogens, to enter a shamanic state of consciousness. Theory, methodology, ethics.\n\nAll practices learned through the Foundation for Shamanic Studies.",
    image: "/images/soulful/Shamanism.jpg",
    side: "left",
  },
] as const;

export default function SoulfulPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Container>
        <section className="pt-24 pb-10 md:pt-32 md:pb-12">
          <Eyebrow>Going inward</Eyebrow>
          <h1
            className="mt-4 max-w-3xl font-serif leading-[1.05] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500 }}
          >
            Soulful experiences
          </h1>
          <p
            className="mt-8 max-w-2xl font-serif italic text-ink"
            style={{ fontSize: "22px", lineHeight: 1.5 }}
          >
            Tools that clear the noise and reset the body and mind
          </p>
        </section>
      </Container>

      {/* ── Practices ─────────────────────────────────────────────────── */}
      <Container>
        <div className="space-y-32 pb-32">
          {practices.map((p) => (
            <FeatureRow key={p.label} labelColor="stone" {...p} />
          ))}
        </div>
      </Container>

      {/* ── Practice with me CTA ──────────────────────────────────────── */}
      <CtaBand
        tone="ink"
        heading="Practice with me"
        subcopy="Curious about a session, or just want to say hello? Reach out!"
        ctaLabel="Say hi"
        href="/contact?topic=just-say-hi"
      />
    </>
  );
}
