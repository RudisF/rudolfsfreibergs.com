import type { ReactNode } from "react";

// Paper background for this route (nested layouts can't re-declare <body>).
export default function SoulfulLayout({ children }: { children: ReactNode }) {
  return <div className="bg-paper text-ink">{children}</div>;
}
