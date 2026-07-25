import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #172a5f 0%, #244cd1 55%, #0c8778 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "white",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,0.16)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 20,
                height: 20,
                borderRadius: 6,
                background: "white",
              }}
            />
          </div>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          Know your dental implant cost in under 60 seconds
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
          Personalized - Itemized - Instant
        </div>
      </div>
    ),
    { ...size }
  );
}
