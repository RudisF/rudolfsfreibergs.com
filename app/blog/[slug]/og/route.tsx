import { ImageResponse } from "next/og";

// Edge runtime avoids @vercel/og's node font-path bug (which breaks on Windows
// when the project directory contains a space). Title/reading time come in via
// query params from generateMetadata, so no filesystem access is needed here.
export const runtime = "edge";

async function loadInter(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)" } }
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

  const inter = await loadInter();
  const fonts = inter
    ? [{ name: "Inter", data: inter, weight: 900 as const, style: "normal" as const }]
    : [];
  const headingFont = inter ? "Inter" : "sans-serif";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050917",
        color: "#E9E3D2",
        padding: "80px",
      }}
    >
      <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#C4C9D8" }}>
        rudolfsfreibergs.com
      </div>

      <div
        style={{
          fontSize: 76,
          lineHeight: 0.95,
          fontFamily: headingFont,
          fontWeight: 900,
          letterSpacing: -3,
          textTransform: "uppercase",
          maxWidth: 1040,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 56, height: 6, background: "#BA9B5F" }} />
        <div style={{ fontSize: 26, color: "#C4C9D8" }}>{rt}</div>
      </div>
    </div>,
    { width: 1200, height: 630, fonts }
  );
}
