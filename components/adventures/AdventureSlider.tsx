"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/components/providers/ReducedMotionProvider";

interface AdventureSliderProps {
  images: string[];
  alt: string;
  sizes?: string;
}

export default function AdventureSlider({
  images,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: AdventureSliderProps) {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = images.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  if (total === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        loading="lazy"
        sizes={sizes}
        className="object-cover object-center"
      />
    );
  }

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          loading="lazy"
          sizes={sizes}
          className={[
            "object-cover object-center transition-opacity ease-in-out",
            reduceMotion ? "duration-0" : "duration-700",
            i === current ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden={i !== current}
        />
      ))}

      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur-sm transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur-sm transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-4 bg-paper" : "w-1.5 bg-paper/50 hover:bg-paper/80",
            ].join(" ")}
          />
        ))}
      </div>
    </>
  );
}
