import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";
type Size = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "rounded-sm bg-accent text-paper hover:bg-accent/90",
  ghost:   "rounded-sm border border-rule text-ink hover:bg-ink hover:text-paper",
  link:    "text-accent underline-offset-4 hover:underline",
};

// link variant ignores size — it's inline text
const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  target,
  rel,
  type = "button",
  className = "",
  disabled,
}: ButtonProps) {
  const sizeClass = variant === "link" ? "text-sm" : sizes[size];
  const cls = `${base} ${variants[variant]} ${sizeClass} ${className}`.trim();

  if (!href) {
    return (
      <button type={type} onClick={onClick} className={cls} disabled={disabled}>
        {children}
      </button>
    );
  }

  const isExternal = href.startsWith("http") || href.startsWith("//");
  if (isExternal) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
