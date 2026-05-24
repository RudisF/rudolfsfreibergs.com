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
    post.title,
  )}&rt=${encodeURIComponent(post.readingTime)}`;
  return {
    title: post.title,
    description: post.description,
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
      post.title,
    )}&rt=${encodeURIComponent(post.readingTime)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <Container className="py-16 md:py-24">
        <article className="mx-auto max-w-2xl">
          {/* Header */}
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-stone transition-colors hover:text-ink"
          >
            ← Blog
          </Link>

          <h1
            className="mt-6 font-serif font-medium leading-tight text-ink"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-stone">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
            <span aria-hidden>·</span>
            <span>{post.author}</span>
          </div>

          {/* Body */}
          <div className="prose prose-ink mt-10">
            <Content />
          </div>

          {/* Share */}
          <div className="mt-12 border-t border-rule/40 pt-6">
            <ShareRow title={post.title} />
          </div>
        </article>

        {/* Read next */}
        {readNext.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="font-mono text-xs uppercase tracking-widest text-stone">Read next</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {readNext.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-rule p-6 transition-colors hover:border-stone"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-stone">
                    {formatDate(p.date)} · {p.readingTime}
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
