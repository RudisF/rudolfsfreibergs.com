import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import ImagePlate from "@/components/ui/ImagePlate";
import MediaCard from "@/components/ui/MediaCard";
import AdventureRow from "@/components/ui/AdventureRow";

export const metadata = { title: "Styleguide" };

// ─── sample data ──────────────────────────────────────────────────────────────

const sampleCards = [
  {
    title: "Yangtze: Source to Sea",
    category: "Documentary",
    href: "/work/yangtze",
    image: "/images/home/yangtze.jpg",
  },
  {
    title: "The Lecture Circuit",
    category: "Keynote",
    href: "/work/lecture",
    image: "/images/home/lecture.jpg",
    accentColor: "#b06000",
  },
  {
    title: "Portrait Stories",
    category: "Photography",
    href: "/work/portrait",
    image: "/images/home/portrait.jpg",
    accentColor: "#1a7a4a",
  },
];

const sampleAdventures = [
  {
    year: 2026,
    location: "Nepal",
    slug: "nepal-preview",
    subtitle: "Into the Himalayas",
    body: "Placeholder body copy — a world-first traverse of the Yangtze River alongside explorer Ash Dykes. From Tibetan glaciers to the East China Sea.",
    images: ["/images/home/yangtze.jpg"],
    side: "right" as const,
  },
  {
    year: 2025,
    location: "Mauritania",
    slug: "mauritania-preview",
    subtitle: "Crossing the Sahara",
    body: "Placeholder body copy — bringing expedition stories to audiences worldwide, from university halls to corporate summits.",
    images: ["/images/home/lecture.jpg"],
    side: "left" as const,
  },
];

// ─── section wrapper ───────────────────────────────────────────────────────────

function Section({
  label,
  children,
  dark,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-ink" : "border-t border-rule"}>
      <Container className="py-16">
        <p className="mb-8 font-mono text-xs font-medium uppercase tracking-widest text-stone">
          {label}
        </p>
        {children}
      </Container>
    </section>
  );
}

// ─── page ──────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="border-b border-rule bg-paper">
        <Container className="py-12">
          <Eyebrow color="accent">Dev only</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Design System</h1>
          <p className="mt-2 text-stone">
            All primitives from <code className="font-mono text-xs text-accent">/components/ui</code>
          </p>
        </Container>
      </div>

      {/* ── Eyebrow ─────────────────────────────────────────────────────── */}
      <Section label="Eyebrow">
        <div className="flex flex-col gap-4">
          <Eyebrow>Default (stone)</Eyebrow>
          <Eyebrow color="accent">Accent variant</Eyebrow>
        </div>
      </Section>

      {/* ── Button ──────────────────────────────────────────────────────── */}
      <Section label="Button">
        <div className="space-y-6">
          {/* Primary */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-16 font-mono text-xs text-stone">primary</span>
            <Button variant="primary" size="md">Enquiries (md)</Button>
            <Button variant="primary" size="lg">Enquiries (lg)</Button>
          </div>

          {/* Ghost */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-16 font-mono text-xs text-stone">ghost</span>
            <Button variant="ghost" size="md">About Rudolfs (md)</Button>
            <Button variant="ghost" size="lg">About Rudolfs (lg)</Button>
          </div>

          {/* Link */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-16 font-mono text-xs text-stone">link</span>
            <Button variant="link" href="/about">Keep reading →</Button>
          </div>

          {/* Button with no href renders a <button> element */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-16 font-mono text-xs text-stone">button</span>
            <Button variant="primary" size="md">
              As &lt;button&gt;
            </Button>
          </div>

          {/* Disabled */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="w-16 font-mono text-xs text-stone">disabled</span>
            <Button variant="primary" size="md" disabled>Disabled</Button>
            <Button variant="ghost" size="md" disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      {/* ── SectionHeader ───────────────────────────────────────────────── */}
      <Section label="SectionHeader">
        <div className="space-y-12">
          <div>
            <p className="mb-4 font-mono text-xs text-stone">align=left, eyebrow + lede</p>
            <SectionHeader
              eyebrow="Featured Film"
              title="It's about the journey, not the destination"
              lede="A world-first 4,000 km trek along the Yangtze River. Filmed raw."
              align="left"
            />
          </div>

          <div>
            <p className="mb-4 font-mono text-xs text-stone">align=center, title only</p>
            <SectionHeader
              title="Stories worth telling"
              align="center"
            />
          </div>

          <div>
            <p className="mb-4 font-mono text-xs text-stone">eyebrow only, no lede</p>
            <SectionHeader
              eyebrow="Adventures"
              title="Where the map runs out"
            />
          </div>
        </div>
      </Section>

      {/* ── Container ───────────────────────────────────────────────────── */}
      <Section label="Container">
        <p className="mb-4 text-stone">
          The grey band below shows the Container boundaries (max-w-[1200px], px-6 / md:px-10).
          This whole page is already inside one.
        </p>
        <div className="bg-rule/30 px-6 py-6 md:px-10">
          <p className="font-mono text-xs text-stone">← container edge</p>
        </div>
      </Section>

      {/* ── ImagePlate ──────────────────────────────────────────────────── */}
      <Section label="ImagePlate">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs text-stone">default (no halo)</p>
            <ImagePlate src="/images/home/yangtze.jpg" alt="Yangtze" />
          </div>
          <div>
            <p className="mb-4 font-mono text-xs text-stone">halo=true + dissolve mask</p>
            <ImagePlate src="/images/home/portrait.jpg" alt="Portrait" halo priority />
          </div>
        </div>
      </Section>

      {/* ── MediaCard ───────────────────────────────────────────────────── */}
      <Section label="MediaCard">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCards.map((card) => (
            <MediaCard key={card.href} {...card} />
          ))}
        </div>
      </Section>

      {/* ── AdventureRow ────────────────────────────────────────────────── */}
      <Section label="AdventureRow">
        <div className="space-y-16">
          {sampleAdventures.map((adv) => (
            <AdventureRow key={adv.year} {...adv} />
          ))}
        </div>
      </Section>
    </div>
  );
}
