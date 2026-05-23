import { ImageResponse } from "next/og";

// Edge runtime avoids @vercel/og's node font-path bug (which breaks on Windows
// when the project directory contains a space). Title/reading time come in via
// query params from generateMetadata, so no filesystem access is needed here.
export const runtime = "edge";

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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title")?.slice(0, 140) || "Field notes";
  const rt = searchParams.get("rt") || "";

  const fraunces = await loadFraunces();
  const fonts = fraunces
    ? [{ name: "Fraunces", data: fraunces, weight: 600 as const, style: "normal" as const }]
    : [];
  const headingFont = fraunces ? "Fraunces" : "serif";

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

        <div style={{ fontSize: 76, lineHeight: 1.1, fontFamily: headingFont, maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 6, background: "#2f4cff" }} />
          <div style={{ fontSize: 26, color: "#a8a8a3" }}>{rt}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
