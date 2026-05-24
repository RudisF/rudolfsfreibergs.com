import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface CtaBandProps {
  heading: string;
  subcopy?: string;
  ctaLabel: string;
  href: string;
  /** "accent" = full-bleed accent band; "ink" = rounded dark card. */
  tone?: "accent" | "ink";
}

export default function CtaBand({
  heading,
  subcopy,
  ctaLabel,
  href,
  tone = "accent",
}: CtaBandProps) {
  if (tone === "ink") {
    return (
      <Container>
        <section className="pb-20 md:pb-28">
          <div className="rounded-2xl bg-ink px-8 py-16 text-center md:px-16 md:py-20">
            <h2
              className="font-serif font-medium text-paper"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              {heading}
            </h2>
            {subcopy && (
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone">{subcopy}</p>
            )}
            <div className="mt-8 flex justify-center">
              <Button href={href} variant="primary" size="lg">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </section>
      </Container>
    );
  }

  return (
    <section className="bg-accent">
      <Container className="py-20 text-center md:py-28">
        <h2
          className="font-serif font-medium text-paper"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {heading}
        </h2>
        {subcopy && (
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-paper/80">{subcopy}</p>
        )}
        <div className="mt-8 flex justify-center">
          <Link
            href={href}
            className="inline-flex h-12 items-center justify-center rounded-sm border border-paper px-8 font-sans text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-accent"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
