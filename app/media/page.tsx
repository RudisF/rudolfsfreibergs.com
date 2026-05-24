import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import MediaGallery from "@/components/media/MediaGallery";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Podcasts, webinars, lectures, awards, and press featuring Rudolfs Freibergs.",
};

export default function MediaPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <Container className="py-20 md:py-28">
      <Eyebrow color="accent">Press &amp; appearances</Eyebrow>
      <h1
        className="mt-4 max-w-3xl font-serif leading-[1.05] text-ink"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500 }}
      >
        Media
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
        Podcasts, webinars, lectures, and press — a running record of conversations and
        appearances.
      </p>

      <div className="mt-12">
        <Suspense fallback={null}>
          <MediaGallery items={media} initialCategory={searchParams.category} />
        </Suspense>
      </div>
    </Container>
  );
}
