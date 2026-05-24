import Image from "next/image";
import Disclosure from "@/components/adventures/Disclosure";

export interface FeatureRowProps {
  /** Optional anchor id rendered on the <article> (used by the adventures timeline). */
  id?: string;
  /** Big serif text in the ink band at the top of the row. */
  label: string;
  /** Color of the band's left edge. "accent" for adventures, "stone" for a softer feel. */
  labelColor?: "accent" | "stone";
  /** Short phrase in the dark card overlapping the image's inner edge. */
  title: string;
  body: string;
  image: string;
  imageAlt?: string;
  side?: "left" | "right";
  extras?: {
    photos: string[];
    body: string;
  };
  className?: string;
}

export default function FeatureRow({
  id,
  label,
  labelColor = "accent",
  title,
  body,
  image,
  imageAlt,
  side = "right",
  extras,
  className = "",
}: FeatureRowProps) {
  const imageFirst = side === "left";
  const edge = labelColor === "stone" ? "border-stone" : "border-accent";

  return (
    <article id={id} className={className}>
      {/* Band */}
      <div className={`mb-8 border-l-4 ${edge} bg-ink px-6 py-4`}>
        <span className="font-serif text-paper" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
          {label}
        </span>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div
          className={`relative aspect-square overflow-hidden rounded-2xl bg-rule ${
            imageFirst ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={image}
            alt={imageAlt || label}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Text block */}
        <div
          className={`relative z-10 flex flex-col justify-start mt-8 md:mt-0 ${
            imageFirst ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Title card — overlaps the image's inner edge by 24px */}
          <div className={`bg-ink px-6 py-5 ${imageFirst ? "md:-ml-6" : "md:-mr-6"}`}>
            <h3
              className="font-serif font-semibold leading-snug text-paper"
              style={{ fontSize: "24px" }}
            >
              {title}
            </h3>
          </div>

          <div className={`mt-6 flex flex-col gap-4 ${imageFirst ? "md:pl-8" : "md:pr-8"}`}>
            {body.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-stone">
                {para}
              </p>
            ))}
            {extras && <Disclosure photos={extras.photos} body={extras.body} />}
          </div>
        </div>
      </div>
    </article>
  );
}
