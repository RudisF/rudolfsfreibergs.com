"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";

const SECTIONS = [
  { id: "marketing", label: "Marketing" },
  { id: "account-management", label: "Account Management" },
  { id: "gtm", label: "GTM" },
  { id: "ai", label: "AI" },
  { id: "certifications", label: "Certifications" },
  { id: "stack", label: "Stack" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function WorkSubNav() {
  const [active, setActive] = useState<SectionId>("marketing");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-16 z-30 border-b border-rule bg-paper/90 backdrop-blur-md"
      aria-label="Work sections"
    >
      <Container>
        <div className="flex gap-8 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative whitespace-nowrap font-mono text-[14px] transition-colors duration-150 ${
                active === id ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              {label}
              {active === id && (
                <span className="absolute -bottom-4 left-0 h-[2px] w-full bg-accent" />
              )}
            </a>
          ))}
        </div>
      </Container>
    </nav>
  );
}
