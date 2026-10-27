import "server-only"

import { unstable_cache } from "next/cache"
import { and, asc, eq, isNotNull } from "drizzle-orm"

import db from "@/db/drizzle"
import { episode, featuredEpisode, siteContent, syncState } from "@/db/schema"
import {
  defaultFeaturedEpisode,
  defaultHeroContent,
  getDefaultEpisodeRows,
} from "@/lib/cms-defaults"
import { mapEpisodeRow } from "@/lib/episode-format"
import type {
  FeaturedEpisodeContent,
  HeroContent,
} from "@/lib/cms-types"
import {
  getEpisodePagePath,
  getEpisodeThumbnail,
  getEpisodeUrl,
  podcastEpisodes,
  type PodcastEpisode,
} from "@/lib/episodes"

export type { FeaturedEpisodeContent, HeroContent } from "@/lib/cms-types"

async function loadSiteContent(): Promise<HeroContent> {
  try {
    const [row] = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.id, "default"))
      .limit(1)
    if (!row) return defaultHeroContent
    return {
      heroTitleLine1: row.heroTitleLine1,
      heroTitleAccent: row.heroTitleAccent,
      heroTitleLine3: row.heroTitleLine3,
      heroSubheading: row.heroSubheading,
      heroDescription: row.heroDescription,
      heroTagline: row.heroTagline,
    }
  } catch {
    return defaultHeroContent
  }
}

async function loadFeaturedEpisode(): Promise<FeaturedEpisodeContent> {
  try {
    const [row] = await db
      .select()
      .from(featuredEpisode)
      .where(eq(featuredEpisode.id, "default"))
      .limit(1)
    if (!row) return buildFeaturedView(defaultFeaturedEpisode)
    return buildFeaturedView({
      videoId: row.videoId,
      eyebrow: row.eyebrow,
      headingLine: row.headingLine,
      headingAccent: row.headingAccent,
      intro: row.intro,
      title: row.title,
      description: row.description,
      moderator: row.moderator ?? undefined,
      panelists: row.panelists ?? undefined,
      quote: row.quote ?? undefined,
      startSeconds: row.startSeconds,
    })
  } catch {
    return buildFeaturedView(defaultFeaturedEpisode)
  }
}

function buildFeaturedView(
  input: {
    videoId: string
    eyebrow: string
    headingLine: string
    headingAccent: string
    intro: string
    title: string
    description: readonly string[] | string[]
    moderator?: string
    panelists?: readonly string[] | string[]
    quote?: string
    startSeconds: number
  }
): FeaturedEpisodeContent {
  const start = input.startSeconds > 0 ? `&start=${input.startSeconds}` : ""
  return {
    ...input,
    moderator: input.moderator || undefined,
    panelists: input.panelists?.length ? input.panelists : undefined,
    quote: input.quote || undefined,
    youtubeUrl: `${getEpisodeUrl(input.videoId)}${input.startSeconds > 0 ? `&t=${input.startSeconds}s` : ""}`,
    pagePath: getEpisodePagePath(input.videoId),
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.videoId}?rel=0${start}&autoplay=1`,
    poster: `https://i.ytimg.com/vi/${input.videoId}/maxresdefault.jpg`,
  }
}

async function loadEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const rows = await db
      .select()
      .from(episode)
      .where(eq(episode.isHidden, false))
      .orderBy(asc(episode.position))
    if (rows.length === 0) {
      return podcastEpisodes
    }
    return rows.map(mapEpisodeRow)
  } catch {
    return podcastEpisodes
  }
}

async function loadTopFeatured(): Promise<PodcastEpisode[]> {
  try {
    const rows = await db
      .select()
      .from(episode)
      .where(
        and(
          eq(episode.isHidden, false),
          isNotNull(episode.topFeaturedPosition)
        )
      )
      .orderBy(asc(episode.topFeaturedPosition))
    if (rows.length === 0) {
      return podcastEpisodes.filter((item) => item.featured)
    }
    return rows.map(mapEpisodeRow)
  } catch {
    return podcastEpisodes.filter((item) => item.featured)
  }
}

async function loadEpisodeById(id: string): Promise<PodcastEpisode | null> {
  try {
    const [row] = await db
      .select()
      .from(episode)
      .where(and(eq(episode.videoId, id), eq(episode.isHidden, false)))
      .limit(1)
    if (!row) {
      return podcastEpisodes.find((item) => item.id === id) ?? null
    }
    return mapEpisodeRow(row)
  } catch {
    return podcastEpisodes.find((item) => item.id === id) ?? null
  }
}

async function loadAllEpisodeIds(): Promise<string[]> {
  try {
    const rows = await db
      .select({ videoId: episode.videoId })
      .from(episode)
      .where(eq(episode.isHidden, false))
      .orderBy(asc(episode.position))
    if (rows.length === 0) {
      return podcastEpisodes.map((item) => item.id)
    }
    return rows.map((row) => row.videoId)
  } catch {
    return podcastEpisodes.map((item) => item.id)
  }
}

export async function loadSyncState() {
  try {
    const [row] = await db
      .select()
      .from(syncState)
      .where(eq(syncState.id, "default"))
      .limit(1)
    return row ?? { lastSyncedAt: null, lastError: null }
  } catch {
    return { lastSyncedAt: null, lastError: null }
  }
}

export const getSiteContent = unstable_cache(loadSiteContent, ["site-content"], {
  tags: ["site-content"],
})

export const getFeaturedEpisodeContent = unstable_cache(
  loadFeaturedEpisode,
  ["featured-episode"],
  { tags: ["featured-episode"] }
)

export const getAllEpisodes = unstable_cache(loadEpisodes, ["episodes-all"], {
  tags: ["episodes"],
})

export const getTopFeaturedEpisodes = unstable_cache(
  loadTopFeatured,
  ["episodes-top-featured"],
  { tags: ["episodes"] }
)

export async function getEpisodeById(id: string) {
  return loadEpisodeById(id)
}

export async function getIndexableEpisodeIds() {
  return loadAllEpisodeIds()
}

export async function getStaffEpisodeRows() {
  const rows = await db.select().from(episode).orderBy(asc(episode.position))
  return rows
}

export async function getStaffUsers() {
  const { user } = await import("@/db/schema")
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.banned, false))
    .orderBy(asc(user.createdAt))
}

export function getDefaultRowsForSeed() {
  return getDefaultEpisodeRows().map((row) => ({
    ...row,
    thumbnailUrl: getEpisodeThumbnail(row.videoId),
    publishedAt: row.publishedAt,
  }))
}
