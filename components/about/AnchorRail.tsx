"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "who-i-am", label: "Who I am" },
  { id: "boundaries", label: "Boundaries" },
  { id: "building", label: "Building" },
  { id: "inward", label: "Inward" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function AnchorRail() {
  const [active, setActive] = useState<SectionId>("who-i-am");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      // Element is "active" when it crosses into the top-third of the viewport
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    // Absolute within the relative page wrapper; hidden on mobile
    <aside
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-6 md:block"
      aria-label="Page sections"
    >
      <div className="pointer-events-auto sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-6">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-200 ${
              active === id ? "text-accent" : "text-stone hover:text-ink"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
}
