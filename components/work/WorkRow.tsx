import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

export interface WorkRowProps {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  side?: "left" | "right";
  metric?: { value: string; label: string };
  children?: ReactNode;
}

export default function WorkRow({
  id,
  eyebrow,
  title,
  body,
  image,
  side = "left",
  metric,
  children,
}: WorkRowProps) {
  const imageOrder = side === "left" ? "md:order-1" : "md:order-2";
  const textOrder = side === "left" ? "md:order-2" : "md:order-1";

  return (
    <section id={id} className="scroll-mt-32 border-t border-rule py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-rule ${imageOrder}`}
          >
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Text */}
          <div className={`flex flex-col gap-6 ${textOrder}`}>
            <span className="inline-flex self-start rounded-sm bg-ink px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-paper">
              {eyebrow}
            </span>

            <h2 className="font-serif text-3xl font-medium leading-tight text-ink md:text-4xl">
              {title}
            </h2>

            {metric && (
              <div className="border-l-2 border-accent pl-5">
                <p className="font-serif leading-none text-ink" style={{ fontSize: "40px" }}>
                  {metric.value}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-stone">
                  {metric.label}
                </p>
              </div>
            )}

            <p className="max-w-prose text-base leading-relaxed text-stone">{body}</p>

            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
