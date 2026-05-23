import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  color?: "stone" | "accent";
  className?: string;
}

export default function Eyebrow({ children, color = "stone", className = "" }: EyebrowProps) {
  const colorClass = color === "accent" ? "text-accent" : "text-stone";

  return (
    <p
      className={`font-mono text-xs font-medium uppercase tracking-widest ${colorClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}
