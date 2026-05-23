import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  title: string;
  category: string;
  href: string;
  image: string;
  source?: string;
  year?: number;
  hasVideo?: boolean;
  accentColor?: string;
  className?: string;
}

function CardInner({
  title,
  category,
  image,
  source,
  year,
  hasVideo,
  accentColor,
}: Omit<MediaCardProps, "href" | "className">) {
  return (
    <>
      {/* Image */}
      <div className="relative min-h-0 flex-[3] overflow-hidden bg-rule">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />

        {/* Hover affordance: open-in-new-tab arrow */}
        <span
          aria-hidden
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-sm text-paper opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        >
          ↗
        </span>

        {/* Video indicator */}
        {hasVideo && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-paper backdrop-blur-sm">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden>
              <path d="M0 0l8 4-8 4z" />
            </svg>
            Video
          </span>
        )}
      </div>

      {/* Info bar */}
      <div className="flex flex-[2] flex-col justify-center gap-1.5 bg-rule px-5 py-4">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: accentColor }}
            aria-hidden
          />
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
            {category}
            {year ? ` · ${year}` : ""}
          </p>
        </div>
        <h3 className="line-clamp-2 font-serif text-base font-medium leading-tight text-paper">
          {title}
        </h3>
        {source && <p className="truncate font-mono text-[11px] text-stone">{source}</p>}
      </div>
    </>
  );
}

export default function MediaCard({
  title,
  category,
  href,
  image,
  source,
  year,
  hasVideo,
  accentColor = "#2f4cff",
  className = "",
}: MediaCardProps) {
  const shared = `group flex h-72 flex-col overflow-hidden rounded-2xl md:h-80 ${className}`.trim();
  const inner = (
    <CardInner
      title={title}
      category={category}
      image={image}
      source={source}
      year={year}
      hasVideo={hasVideo}
      accentColor={accentColor}
    />
  );

  if (href.startsWith("http") || href.startsWith("//")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={shared}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={shared}>
      {inner}
    </Link>
  );
}
