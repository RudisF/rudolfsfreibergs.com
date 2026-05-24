import { ImageResponse } from "next/og";

// Edge runtime avoids @vercel/og's node font-path bug (project path has a space).
export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
