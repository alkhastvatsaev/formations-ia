import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? SITE.fullName;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1222",
          color: "#f2f5f3",
          padding: "64px",
          fontSize: 56,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", color: "#7dceb8", fontSize: 28 }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", maxWidth: 1000, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#9aa3b5" }}>
          {SITE.author.name}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
