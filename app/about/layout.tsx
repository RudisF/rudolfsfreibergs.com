import type { ReactNode } from "react";

// Explicit paper/ink palette for this route.
// Note: Next.js App Router doesn't allow nested layouts to re-declare <body>,
// so we wrap the route content in a covering div instead.
export default function AboutLayout({ children }: { children: ReactNode }) {
  return <div className="bg-paper text-ink">{children}</div>;
}
