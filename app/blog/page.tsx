import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, type PostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Field notes - short, honest essays on ambition, adventure, technology, and staying grounded.",
  alternates: { canonical: "/blog" },
};

const PAGE_SIZE = 7;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function metaLine(post: PostMeta) {
  return [post.tags[0], formatDate(post.date), post.readingTime].filter(Boolean).join(" · ");
}

function Feature({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 text-cream lg:min-h-[620px] lg:grid-cols-2"
    >
      <div className="relative min-h-[300px] overflow-hidden bg-gold">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-col justify-center gap-6 bg-navy-2 px-5 py-14 md:px-14">
        <p className="meta text-gold">{metaLine(post)}</p>
        <h2 className="display text-[clamp(2.5rem,4.4vw,4rem)] transition-colors group-hover:text-gold">
          {post.title}
        </h2>
        <p className="max-w-[560px] text-lg leading-relaxed text-on-navy">{post.description}</p>
        <span className="meta text-gold">
          Read the note <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

function Card({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-navy-2 text-cream">
      <div className="relative h-[240px] overflow-hidden bg-gold">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-3 px-6 py-6">
        <p className="meta text-gold">{metaLine(post)}</p>
        <h2 className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] transition-colors group-hover:text-gold">
          {post.title}
        </h2>
        <p className="line-clamp-3 text-base leading-relaxed text-on-navy">{post.description}</p>
      </div>
    </Link>
  );
}

export default function BlogIndex({ searchParams }: { searchParams: { page?: string } }) {
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, Number(searchParams.page) || 1), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const pagePosts = posts.slice(start, start + PAGE_SIZE);
  const [lead, ...rest] = pagePosts;

  return (
    <>
      <section className="bg-navy px-5 pb-11 pt-14 md:px-14 md:pt-16">
        <h1 className="display text-[clamp(4rem,11.8vw,10.5rem)] text-cream">Notes</h1>
      </section>

      {lead ? (
        <Feature post={lead} />
      ) : (
        <p className="px-5 py-16 text-on-navy md:px-14">No notes yet.</p>
      )}

      {rest.length > 0 && (
        <section
          aria-label="More notes"
          className="grid grid-cols-1 gap-[3px] bg-navy md:grid-cols-3"
        >
          {rest.map((p) => (
            <Card key={p.slug} post={p} />
          ))}
        </section>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between bg-navy px-5 py-10 md:px-14"
        >
          {current > 1 ? (
            <Link href={`/blog?page=${current - 1}`} className="meta text-gold hover:text-cream">
              ← Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="meta text-on-navy">
            Page {current} of {totalPages}
          </span>
          {current < totalPages ? (
            <Link href={`/blog?page=${current + 1}`} className="meta text-gold hover:text-cream">
              Older →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
