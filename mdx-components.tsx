import type { MDXComponents } from "mdx/types";
import BlogImage from "@/components/blog/BlogImage";

// Required by @next/mdx in the App Router.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <BlogImage src={src ?? ""} alt={alt ?? ""} {...props} />
    ),
  };
}
