"use client";

import { useState, useEffect } from "react";

interface BlogImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function BlogImage({ src, alt = "", className = "", ...props }: BlogImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className}`.trim()}
        onClick={() => setOpen(true)}
        {...props}
      />

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
