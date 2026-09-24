import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

const withMDX = createMDX({
  // Handle both .md and .mdx (content lives in /content/blog).
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async redirects() {
    // About was merged into the home page.
    return [{ source: "/about", destination: "/", permanent: true }];
  },
};

export default withMDX(nextConfig);
