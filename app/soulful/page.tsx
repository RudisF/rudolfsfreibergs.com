import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import FeatureRow from "@/components/ui/FeatureRow";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Soulful experiences",
  description:
    "Sauna ceremonies, singing-bowl sound therapy, guided meditation, positive psychology, and core shamanism — a grounded counterweight to a fast digital world.",
};

const practices = [
  {
    label: "Sauna ceremonies",
    title: "Heat as a doorway",
    body: "I have been immersed in sauna culture since my childhood, exploring a vast array of global sauna traditions to discover exactly what yields the profoundest physical and psychological results. My curated ceremonies elegantly weave this lifelong expertise together with deep mindfulness practices to effortlessly soothe an overactive mind. By pairing the intense, grounding heat of the sauna with sound therapy — utilizing resonant singing bowls and meticulously selected music — I guide participants into an immersive sensory experience. This unique combination acts as a powerful catalyst for full-body relaxation, stress reduction, and deep mental clarity.",
    image: "/images/soulful/Soulful_experiences_1.jpg",
    side: "right",
  },
  {
    label: "Singing bowls",
    title: "Sound that resets the body",
    body: "My specialized training in sound therapy and acoustic frequencies originates directly from traditional practitioners in Nepal. I learned how specific harmonic vibrations can target, harmonize, and unblock the body's internal energy centers, known as chakras. This deeply restorative auditory experience works by using pure sound waves to gently reset the nervous system and dissolve deep-seated physical tension. These transformative sound sessions can be experienced as a standalone therapeutic practice or seamlessly integrated into a sauna ceremony to exponentially amplify the benefits.",
    image: "/images/soulful/Soulful_experiences_2.png",
    side: "left",
  },
  {
    label: "Guided meditations",
    title: "Stillness, on purpose",
    body: "I spent some time in Nepal studying at the Kopan Monastery, fully immersing myself in the foundational Buddhist meditation traditions of Shamatha and Vipassana. Through mastering over seventy distinct guided meditation practices, I gained a deep experiential understanding of how to stabilize attention and cultivate a quiet mind. This profound personal journey ultimately inspired a clear mission to share these time-tested tools with the modern world. My primary goal is to help others cultivate an enduring view of genuine happiness and psychological flexibility right in the middle of everyday life.",
    image: "/images/soulful/Soulful_experiences_3.JPG",
    side: "right",
  },
  {
    label: "Positive Psychology practices",
    title: "Training for what's good",
    body: "I have embarked on a collaborative journey rooted in positive psychology that views well-being not as the absence of suffering, but as the integration of both life's joys and its inevitable challenges. Rather than focusing on superficial motivation or forced optimism, this evidence-based approach utilizes established scientific frameworks to align your daily actions with your deepest values and identity. You are treating negative emotions as meaningful signals rather than problems to fix, allowing you to build psychological flexibility and safety as you navigate growth. The process relies on small, realistic behavioral experiments and consistent reflection to turn insights into sustainable, long-term habits. Ultimately, this partnership is designed to help you strip away what no longer serves you so you can live a more authentic, flourishing life on your own terms.",
    image: "/images/soulful/Soulful_experiences_4.PNG",
    side: "left",
  },
  {
    label: "Shamanism",
    title: "Older ways of seeing",
    body: "I have been through a fundamental training course in core shamanism designed to introduce participants to universal principles and practices derived from humanity's oldest healing traditions, rather than any single ethnic culture. I have learned the foundations of the “shamanic journey,” which utilizes rhythmic drumming to safely enter a shamanic state of consciousness without the use of hallucinogenic substances. The curriculum provides a balanced mix of theory, methodology, and ethical guidelines, focused heavily on using these ancient systems for seeking knowledge and facilitating healing. All practices were learned from the Foundation for Shamanic Studies (FSS).",
    image: "/images/soulful/Soulful_experiences_5.jpg",
    side: "right",
  },
] as const;

export default function SoulfulPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Container>
        <section className="py-32">
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
            Sound baths, forest saunas, and the quiet between thoughts — a counterweight to the
            speed of the digital world.
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
