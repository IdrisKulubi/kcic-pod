import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function TwitterImage() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public", "ssa-logo.png")
  )
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        background:
          "linear-gradient(145deg, #050505 0%, #0f1a14 48%, #050505 100%)",
        color: "#f5f2e8",
      }}
    >
      <img
        src={logoSrc}
        alt=""
        width={520}
        height={180}
        style={{ objectFit: "contain", objectPosition: "left center" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div
          style={{
            fontSize: 36,
            fontStyle: "italic",
            color: "#9be04a",
            maxWidth: 720,
            fontFamily: "Georgia, serif",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(245,242,232,0.78)",
            maxWidth: 820,
          }}
        >
          African-led climate solutions, lived experience, and the people
          building resilient futures.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 22,
          color: "rgba(245,242,232,0.72)",
        }}
      >
        <span>Climate · Energy · Circularity · Leadership</span>
        <span>YouTube {siteConfig.youtube.handle}</span>
      </div>
    </div>,
    { ...size }
  )
}
