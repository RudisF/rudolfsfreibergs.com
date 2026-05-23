interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  title,
  eyebrow,
  lede,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-stone">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-ink">{title}</h2>
      {lede && (
        <p className="max-w-xl text-base leading-relaxed text-stone">{lede}</p>
      )}
    </div>
  );
}
