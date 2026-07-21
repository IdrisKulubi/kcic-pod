import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f2920",
    theme_color: "#79d42f",
    lang: siteConfig.language,
    categories: ["entertainment", "education", "news"],
  }
}
