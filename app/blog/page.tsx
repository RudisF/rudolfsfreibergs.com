import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaBand from "@/components/ui/CtaBand";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes - short, honest essays on ambition, adventure, technology, and staying grounded.",
};

const PAGE_SIZE = 6;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, Number(searchParams.page) || 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const pagePosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Container className="py-20 md:py-28">
      <Eyebrow color="accent">Field notes</Eyebrow>
      <h1
        className="mt-4 font-serif leading-[1.05] text-ink"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500 }}
      >
        Blog
      </h1>

      {/* Post list */}
      <div className="mt-12 flex flex-col border-t border-rule/40">
        {pagePosts.map((post) => (
          <article key={post.slug} className="group border-b border-rule/40">
            <Link href={`/blog/${post.slug}`} className="block py-8">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-stone">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-rule px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-stone"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
        {pagePosts.length === 0 && <p className="py-8 text-stone">No posts yet.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between">
          {current > 1 ? (
            <Link
              href={`/blog?page=${current - 1}`}
              className="font-mono text-xs uppercase tracking-widest text-accent hover:underline"
            >
              ← Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="font-mono text-xs uppercase tracking-widest text-stone">
            Page {current} of {totalPages}
          </span>
          {current < totalPages ? (
            <Link
              href={`/blog?page=${current + 1}`}
              className="font-mono text-xs uppercase tracking-widest text-accent hover:underline"
            >
              Older →
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
      </Container>

      <CtaBand
        heading="Let's keep talking"
        ctaLabel="Get in touch"
        href="/contact"
      />
    </>
  );
}
