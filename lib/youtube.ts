import "server-only"

import {
  KCIC_YOUTUBE_CHANNEL_ID,
} from "@/lib/youtube-constants"

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/
const FETCH_TIMEOUT_MS = 8000

export interface YouTubeEpisode {
  videoId: string
  title: string
  publishedAt: string
  thumbnailUrl: string
  description?: string
  url: string
}

function getFeedUrl() {
  const playlistId = process.env.YOUTUBE_PODCAST_PLAYLIST_ID?.trim()
  if (playlistId) {
    return `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
  }
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${KCIC_YOUTUBE_CHANNEL_ID}`
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function parseFeedEntries(xml: string): YouTubeEpisode[] {
  const episodes: YouTubeEpisode[] = []
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g

  for (const match of xml.matchAll(entryPattern)) {
    const block = match[1]
    const videoId =
      block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ??
      block.match(/<id>yt:video:([^<]+)<\/id>/)?.[1]

    const rawTitle = block.match(/<title>([^<]*)<\/title>/)?.[1]
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1]

    if (!videoId || !VIDEO_ID_PATTERN.test(videoId) || !rawTitle || !published) {
      continue
    }

    const rawDescription = block.match(
      /<media:description>([\s\S]*?)<\/media:description>/
    )?.[1]

    const thumbnailUrl =
      block.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] ??
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

    episodes.push({
      videoId,
      title: decodeXmlEntities(rawTitle),
      publishedAt: published,
      thumbnailUrl,
      description: rawDescription
        ? decodeXmlEntities(rawDescription).trim()
        : undefined,
      url: `https://www.youtube.com/watch?v=${videoId}`,
    })
  }

  return episodes
}

export async function fetchYouTubeEpisodes(): Promise<
  { ok: true; data: YouTubeEpisode[] } | { ok: false; error: string }
> {
  try {
    const response = await fetch(getFeedUrl(), {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/atom+xml, application/xml, text/xml",
        "User-Agent": "KCIC-Website/1.0",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })

    if (!response.ok) {
      return { ok: false, error: "YouTube feed unavailable" }
    }

    const xml = await response.text()
    const episodes = parseFeedEntries(xml)

    if (episodes.length === 0) {
      return { ok: false, error: "No episodes found in feed" }
    }

    return { ok: true, data: episodes }
  } catch (error) {
    console.error("Error fetching YouTube feed:", error)
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch YouTube feed",
    }
  }
}
