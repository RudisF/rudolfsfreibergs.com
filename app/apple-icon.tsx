import { ImageResponse } from "next/og";

// Edge runtime avoids @vercel/og's node font-path bug (project path has a space).
export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0d",
          color: "#f4f3ee",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        RF
      </div>
    ),
    { ...size },
  );
}
