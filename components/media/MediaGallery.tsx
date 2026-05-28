"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MediaCard from "@/components/ui/MediaCard";
import type { MediaItem } from "@/content/media";

const FILTERS = ["Podcast", "Webinar", "Event", "Award", "Media"] as const;

const CATEGORY_COLORS: Record<MediaItem["category"], string> = {
  Podcast: "#2f4cff",
  Webinar: "#1a7a4a",
  Event: "#b06000",
  Award: "#8b2fd0",
  Media: "#c0392b",
};

export default function MediaGallery({
  items,
  initialCategory,
}: {
  items: MediaItem[];
  initialCategory?: string;
}) {
  const params = useSearchParams();
  // useSearchParams() is null during SSR; fall back to the server-read param so
  // the server render and first client render agree (no hydration mismatch).
  const raw = params.get("category") ?? initialCategory;
  const active = raw && (FILTERS as readonly string[]).includes(raw) ? raw : "All";

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-3">
        {["All", ...FILTERS].map((cat) => {
          const isActive = cat === active;
          const href = cat === "All" ? "/media" : `/media?category=${cat}`;
          return (
            <Link
              key={cat}
              href={href}
              scroll={false}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                isActive
                  ? "border-accent bg-accent text-paper"
                  : "border-rule text-stone hover:border-stone hover:text-ink"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-stone">No items in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              category={item.category}
              href={item.href}
              image={item.image}
              source={item.source}
              year={item.year}
              hasVideo={item.hasVideo}
              accentColor={CATEGORY_COLORS[item.category]}
            />
          ))}
        </div>
      )}
    </>
  );
}
