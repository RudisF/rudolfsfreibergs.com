"use client";

import { useState } from "react";

const chip =
  "min-h-[36px] border border-ink/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-stone transition-colors hover:border-ink hover:text-ink";

export default function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  function openShare(platform: "x" | "linkedin") {
    const u = encodeURIComponent(currentUrl());
    const t = encodeURIComponent(title);
    const href =
      platform === "x"
        ? `https://twitter.com/intent/tweet?text=${t}&url=${u}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="meta text-stone">Share</span>
      <button type="button" onClick={() => openShare("x")} className={chip}>
        X
      </button>
      <button type="button" onClick={() => openShare("linkedin")} className={chip}>
        LinkedIn
      </button>
      <button type="button" onClick={copyLink} className={chip}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
