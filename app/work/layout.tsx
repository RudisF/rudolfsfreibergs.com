import type { ReactNode } from "react";

// Work uses the site-wide type and palette. Nested layouts can't re-declare <body>.
export default function WorkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
