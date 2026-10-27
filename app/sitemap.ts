import type { MetadataRoute } from "next"

import { getEpisodePagePath } from "@/lib/episodes"
import { getAllEpisodes } from "@/lib/queries"
import { absoluteUrl } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const episodes = await getAllEpisodes()

  const episodeEntries: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: absoluteUrl(getEpisodePagePath(episode.id)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...episodeEntries,
  ]
}
