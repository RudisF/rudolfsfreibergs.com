"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type WorkPhoto = {
  src: string;
  alt: string;
  caption: string;
  position: string;
};

// Phone-only carousel for the Work page. Desktop shows the 2x2 grid instead.
export default function PhotoCarousel({ photos }: { photos: WorkPhoto[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = photos.length;
  const go = (i: number) => setIndex((i + n) % n);

  return (
    <div className="bg-navy" aria-roledescription="carousel" aria-label="Work photos">
      <div
        className="relative h-[460px] overflow-hidden"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {photos.map((ph, i) => (
          <figure
            key={ph.src}
            className={`absolute inset-0 m-0 transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: ph.position }}
              priority={i === 0}
            />
            <figcaption className="absolute bottom-0 left-0 bg-navy/80 px-3.5 py-2 text-xs font-semibold text-cream">
              {ph.caption}
            </figcaption>
          </figure>
        ))}

        <p className="absolute right-3.5 top-3.5 bg-navy/70 px-2.5 py-1.5 text-xs font-bold tracking-[0.12em] text-cream">
          {index + 1} / {n}
        </p>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => go(index - 1)}
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/70 text-cream"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => go(index + 1)}
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-navy/70 text-cream"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div
        className="flex h-11 items-center justify-center gap-1"
        role="group"
        aria-label="Choose photo"
      >
        {photos.map((ph, i) => (
          <button
            key={ph.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className="flex h-11 w-7 items-center justify-center"
          >
            <span
              className={`block h-1 transition-all ${i === index ? "w-6 bg-gold" : "w-3 bg-cream/40"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
