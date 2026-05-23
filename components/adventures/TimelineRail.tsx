"use client";

import { useEffect, useState } from "react";

interface TimelineRailProps {
  years: number[];
}

export default function TimelineRail({ years }: TimelineRailProps) {
  const [active, setActive] = useState(years[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = Number(entry.target.id.replace("year-", ""));
            if (year) setActive(year);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    years.forEach((year) => {
      const el = document.getElementById(`year-${year}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [years]);

  return (
    <aside
      className="pointer-events-none absolute left-0 top-0 hidden h-full w-10 md:block"
      aria-hidden
    >
      {/* Full-height vertical rule */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-rule" />

      {/* Sticky dot cluster */}
      <div className="pointer-events-auto sticky top-1/2 flex -translate-y-1/2 flex-col items-center gap-6">
        {years.map((year) => (
          <a
            key={year}
            href={`#year-${year}`}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`h-[6px] w-[6px] rounded-full transition-colors duration-200 ${
                active === year ? "bg-accent" : "bg-rule"
              }`}
            />
            <span
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              className={`font-mono text-[9px] font-medium uppercase tracking-widest transition-colors duration-200 ${
                active === year ? "text-accent" : "text-stone hover:text-ink"
              }`}
            >
              {year}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
