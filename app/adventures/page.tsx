import type { Metadata } from "next";
import { adventures } from "@/content/adventures";
import AdventureRow from "@/components/ui/AdventureRow";
import TimelineRail from "@/components/adventures/TimelineRail";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Adventures",
  description:
    "Field notes from the edges — two months and 160km through the Nepali Himalayas, soloing Mauritania's iron-ore train, and half a year in Peru.",
};

export default function AdventuresPage() {
  const sorted = [...adventures].sort((a, b) => b.year - a.year);
  const years = sorted.map((a) => a.year);

  return (
    <>
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <TimelineRail years={years} />

      {/* Page intro */}
      <section className="py-20 md:py-28">
        <Eyebrow>Field notes</Eyebrow>
        <h1
          className="mt-4 font-serif leading-[1.05] text-ink"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500 }}
        >
          Where the map runs out
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-stone">
          A reverse-chronological record of expeditions, crossings, and the honest
          lessons each one left behind.
        </p>
      </section>

      {/* Adventure rows */}
      <div className="space-y-24 pb-28">
        {sorted.map((adventure) => (
          <AdventureRow key={adventure.slug} {...adventure} />
        ))}
      </div>
      </div>

      <CtaBand
        heading="Curious about the next one?"
        ctaLabel="Get in touch"
        href="/contact"
      />
    </>
  );
}
