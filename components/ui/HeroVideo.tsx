"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/providers/ReducedMotionProvider";

export default function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  // z-index layer 1 of 3 in the hero stack: video (z-0) → overlay (z-10) → text (z-20)
  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full object-cover"
    >
      <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
}
