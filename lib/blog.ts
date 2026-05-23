import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  tags: string[];
  author: string;
  cover: string | null;
  readingTime: string; // e.g. "5 min read"
}

function parseFile(file: string): PostMeta {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const rt = data.readingTime ?? readingTime(content).text;
  const dateValue = data.date ? new Date(data.date) : new Date();

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: dateValue.toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? "Rudolfs Freibergs",
    cover: data.cover ?? null,
    readingTime: typeof rt === "string" ? rt : String(rt),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): PostMeta | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  const file = candidates.find((f) => fs.existsSync(path.join(BLOG_DIR, f)));
  return file ? parseFile(file) : null;
}
