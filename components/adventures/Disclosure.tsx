"use client";

import { useState } from "react";
import Image from "next/image";

interface DisclosureProps {
  photos: string[];
  body: string;
}

export default function Disclosure({ photos, body }: DisclosureProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="font-mono text-xs font-medium uppercase tracking-widest text-accent transition-colors duration-200 hover:text-ink"
      >
        {open ? "− Read less" : "+ Read more"}
      </button>

      {/* CSS grid row trick for smooth height transition */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-6 space-y-6">
            {photos.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {photos.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-rule"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <p className="text-base leading-relaxed text-stone">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
