import Image from "next/image";

interface ImagePlateProps {
  src: string;
  alt?: string;
  halo?: boolean;
  cloudSrc?: string;
  priority?: boolean;
  sizes?: string;
  /** CSS aspect-ratio value, e.g. "3/4", "16/9", "1/1". Defaults to "3/4". */
  ratio?: string;
  className?: string;
}

export default function ImagePlate({
  src,
  alt = "",
  halo = false,
  cloudSrc,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ratio = "3/4",
  className = "",
}: ImagePlateProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Halo glow */}
      {halo && (
        <div
          className="absolute -inset-8 rounded-3xl bg-accent opacity-20 blur-3xl"
          aria-hidden
        />
      )}

      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: ratio }}>
        {/* Cloud drift layer sits under portrait in DOM order */}
        {cloudSrc && (
          <Image
            src={cloudSrc}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="animate-cloud-drift object-cover"
            style={{ opacity: 0.25 }}
          />
        )}

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
          style={
            halo
              ? {
                  maskImage: "linear-gradient(180deg, #000 70%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(180deg, #000 70%, transparent 100%)",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
