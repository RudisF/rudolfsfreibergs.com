import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rudolfs Freibergs",
    short_name: "Rudolfs",
    icons: [
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#0c0f14",
    background_color: "#0c0f14",
    display: "standalone",
  };
}
