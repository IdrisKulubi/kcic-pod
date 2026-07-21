import type { MetadataRoute } from "next"

import { getAllIndexableEpisodes, getEpisodePagePath } from "@/lib/episodes"
import { absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const episodeEntries: MetadataRoute.Sitemap = getAllIndexableEpisodes().map(
    (episode) => ({
      url: absoluteUrl(getEpisodePagePath(episode.id)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: episode.featured ? 0.85 : 0.7,
    })
  )

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...episodeEntries,
  ]
}
