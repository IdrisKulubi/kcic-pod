import type { episode } from "@/db/schema"
import type { PodcastEpisode } from "@/lib/episodes"

type EpisodeRow = typeof episode.$inferSelect

export function formatEpisodePublished(date: Date | string) {
  const value = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(value.getTime())) {
    return "—"
  }
  return value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

export function mapEpisodeRow(row: EpisodeRow): PodcastEpisode {
  return {
    id: row.videoId,
    title: row.title,
    duration: row.duration,
    published: formatEpisodePublished(row.publishedAt),
    topic: row.topic,
    summary: row.summary ?? undefined,
  }
}
