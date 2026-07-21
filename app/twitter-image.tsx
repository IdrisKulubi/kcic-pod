import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(145deg, #0f2920 0%, #163528 48%, #0c1f18 100%)",
          color: "#f5f2e8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#79d42f",
          }}
        >
          KCIC Podcast
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 0.95,
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Sustainably Speaking Africa
          </div>
          <div
            style={{
              fontSize: 32,
              fontStyle: "italic",
              color: "#9be04a",
              maxWidth: 720,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "rgba(245,242,232,0.78)",
          }}
        >
          <span>Climate · Energy · Circularity · Leadership</span>
          <span>YouTube {siteConfig.youtube.handle}</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
