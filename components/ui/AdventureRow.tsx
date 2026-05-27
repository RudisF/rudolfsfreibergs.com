import FeatureRow from "@/components/ui/FeatureRow";

export interface AdventureRowProps {
  year: number;
  location: string;
  slug: string;
  subtitle: string;
  body: string;
  images: string[];
  side?: "left" | "right";
  extras?: {
    photos: string[];
    body: string;
  };
  className?: string;
}

export default function AdventureRow({
  year,
  location,
  subtitle,
  body,
  images,
  side = "right",
  extras,
  className = "",
}: AdventureRowProps) {
  return (
    <FeatureRow
      id={`year-${year}`}
      label={`${year} · ${location}`}
      labelColor="accent"
      title={subtitle}
      body={body}
      image={images[0]}
      images={images}
      imageAlt={`${location} ${year}`}
      side={side}
      extras={extras}
      className={className}
    />
  );
}
