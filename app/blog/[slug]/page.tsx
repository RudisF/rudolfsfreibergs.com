import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareRow from "@/components/blog/ShareRow";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const ogUrl = `/blog/${post.slug}/og?title=${encodeURIComponent(
    post.title
  )}&rt=${encodeURIComponent(post.readingTime)}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function loadContent(slug: string): Promise<ComponentType | null> {
  try {
    return (await import(`../../../content/blog/${slug}.mdx`)).default;
  } catch {
    /* fall through to .md */
  }
  try {
    return (await import(`../../../content/blog/${slug}.md`)).default;
  } catch {
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const Content = await loadContent(params.slug);
  if (!Content) notFound();

  // "Read next": the following posts in date order, wrapping around.
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const readNext = [...all.slice(idx + 1), ...all.slice(0, idx)].slice(0, 2);

  const base = "https://www.rudolfsfreibergs.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    url: `${base}/blog/${post.slug}`,
    image: `${base}/blog/${post.slug}/og?title=${encodeURIComponent(
      post.title
    )}&rt=${encodeURIComponent(post.readingTime)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <header className="bg-navy px-5 pb-12 pt-12 md:px-14 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="meta text-gold transition-colors hover:text-cream">
            ← Notes
          </Link>
          <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.5rem)] text-cream">{post.title}</h1>
          <p className="meta mt-6 text-on-navy">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} ·{" "}
            {post.author}
          </p>
        </div>
      </header>

      <div className="bg-paper text-ink">
        <Container className="py-14 md:py-20">
          <article className="mx-auto max-w-2xl">
            <div className="prose prose-ink prose-lg">
              <Content />
            </div>

            <div className="mt-12 border-t border-ink/15 pt-6">
              <ShareRow title={post.title} />
            </div>
          </article>

          {readNext.length > 0 && (
            <div className="mx-auto mt-16 max-w-4xl">
              <h2 className="meta text-stone">Read next</h2>
              <div className="mt-4 grid grid-cols-1 gap-[3px] sm:grid-cols-2">
                {readNext.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-navy p-6 text-cream transition-colors hover:bg-navy-2"
                  >
                    <div className="meta text-gold">
                      {formatDate(p.date)} · {p.readingTime}
                    </div>
                    <h3 className="mt-2 text-xl font-extrabold leading-snug transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-on-navy">
                      {p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
