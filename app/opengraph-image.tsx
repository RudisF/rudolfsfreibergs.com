import { ImageResponse } from "next/og";

// Edge runtime avoids @vercel/og's node font-path bug (project path has a space).
export const runtime = "edge";

export const alt = "Rudolfs Freibergs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFraunces(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)" } },
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const fraunces = await loadFraunces();
  const fonts = fraunces
    ? [{ name: "Fraunces", data: fraunces, weight: 600 as const, style: "normal" as const }]
    : [];
  const serif = fraunces ? "Fraunces" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0d",
          color: "#f4f3ee",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#a8a8a3" }}>
          rudolfsfreibergs.com
        </div>

        <div style={{ fontSize: 96, lineHeight: 1.05, fontFamily: serif }}>Rudolfs Freibergs</div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 6, background: "#2f4cff" }} />
          <div style={{ fontSize: 28, color: "#a8a8a3" }}>
            IT &amp; marketing · expeditions · soulful practice
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
