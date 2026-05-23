import type { ComponentType } from "react";

declare module "*.mdx" {
  const Component: ComponentType;
  export default Component;
}

declare module "*.md" {
  const Component: ComponentType;
  export default Component;
}
