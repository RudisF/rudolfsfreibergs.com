"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/components/providers/ReducedMotionProvider";

export interface Slide {
  num: string;
  label: string;
  text: string;
  image: string;
  alt: string;
  caption: string;
}

const INTERVAL_MS = 5000;

export default function WorkCarousel({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing || reduce) return;
    timer.current = setInterval(() => setI((n) => (n + 1) % slides.length), INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, reduce, slides.length]);

  const pick = (k: number) => {
    setPlaying(false);
    setI(k);
  };

  const cur = slides[i];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="flex flex-col gap-5"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-ink/5 lg:aspect-auto lg:h-[440px]">
        {slides.map((s, k) => (
          <Image
            key={s.image}
            src={s.image}
            alt={s.alt}
            fill
            priority={k === 0}
            sizes="(min-width: 1024px) 400px, 100vw"
            className={`object-cover ${reduce ? "" : "transition-opacity duration-[900ms] ease-in-out"} ${
              k === i ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={k !== i}
          />
        ))}
      </div>

      <div aria-live={playing && !reduce ? "off" : "polite"} className="flex flex-col gap-5">
        <div className="flex items-baseline gap-3.5">
          <span
            className="text-5xl leading-none text-accent lg:text-[56px]"
            style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          >
            {cur.num}
          </span>
          <span className="text-sm text-ink/60">{cur.label}</span>
        </div>
        <p className="min-h-[96px] text-[15px] leading-relaxed text-ink/80 lg:min-h-[78px] lg:text-base">
          {cur.text}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] text-ink/50">{cur.caption}</span>
        <div className="flex items-center">
          {slides.map((s, k) => (
            // 44px hit area around a small visual dot
            <button
              key={s.label}
              type="button"
              onClick={() => pick(k)}
              aria-label={`Show ${s.label}`}
              aria-current={k === i}
              className="group flex h-11 items-center justify-center px-1 focus-visible:outline-none"
            >
              <span
                className={`block h-2.5 rounded-full group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-paper ${
                  reduce ? "" : "transition-[width] duration-300"
                } ${k === i ? "w-7 bg-accent" : "w-2.5 bg-ink/20 group-hover:bg-ink/40"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
