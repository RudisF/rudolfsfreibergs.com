import type { ReactNode } from "react";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Paper background, same palette as the rest of the site. Nested layouts can't re-declare <body>.
export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${instrumentSerif.variable} ${GeistSans.variable} bg-paper text-ink`}
      style={{ fontFamily: "var(--font-geist-sans), 'Helvetica Neue', sans-serif" }}
    >
      {children}
    </div>
  );
}
