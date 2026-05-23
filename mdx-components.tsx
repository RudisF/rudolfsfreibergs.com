import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Element styling is handled by the
// `prose prose-ink` wrapper on the post body, so we pass components through.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
