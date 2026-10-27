import "./load-env"

import db from "../db/client"
import {
  episode,
  featuredEpisode,
  siteContent,
  syncState,
} from "../db/schema"
import {
  defaultFeaturedEpisode,
  defaultHeroContent,
  getDefaultEpisodeRows,
} from "../lib/cms-defaults"
import { getEpisodeThumbnail } from "../lib/episodes"

async function main() {
  await db
    .insert(siteContent)
    .values({
      id: "default",
      ...defaultHeroContent,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteContent.id,
      set: {
        ...defaultHeroContent,
        updatedAt: new Date(),
      },
    })

  const rows = getDefaultEpisodeRows()
  for (const row of rows) {
    await db
      .insert(episode)
      .values({
        videoId: row.videoId,
        title: row.title,
        publishedAt: row.publishedAt,
        thumbnailUrl: getEpisodeThumbnail(row.videoId),
        topic: row.topic,
        summary: row.summary,
        duration: row.duration,
        position: row.position,
        isHidden: row.isHidden,
        topFeaturedPosition: row.topFeaturedPosition,
        syncedAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: episode.videoId,
        set: {
          title: row.title,
          topic: row.topic,
          summary: row.summary,
          duration: row.duration,
          position: row.position,
          topFeaturedPosition: row.topFeaturedPosition,
          updatedAt: new Date(),
        },
      })
  }

  await db
    .insert(featuredEpisode)
    .values({
      id: "default",
      videoId: defaultFeaturedEpisode.videoId,
      eyebrow: defaultFeaturedEpisode.eyebrow,
      headingLine: defaultFeaturedEpisode.headingLine,
      headingAccent: defaultFeaturedEpisode.headingAccent,
      intro: defaultFeaturedEpisode.intro,
      title: defaultFeaturedEpisode.title,
      description: [...defaultFeaturedEpisode.description],
      moderator: defaultFeaturedEpisode.moderator,
      panelists: [...defaultFeaturedEpisode.panelists],
      quote: defaultFeaturedEpisode.quote,
      startSeconds: defaultFeaturedEpisode.startSeconds,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: featuredEpisode.id,
      set: {
        videoId: defaultFeaturedEpisode.videoId,
        eyebrow: defaultFeaturedEpisode.eyebrow,
        headingLine: defaultFeaturedEpisode.headingLine,
        headingAccent: defaultFeaturedEpisode.headingAccent,
        intro: defaultFeaturedEpisode.intro,
        title: defaultFeaturedEpisode.title,
        description: [...defaultFeaturedEpisode.description],
        moderator: defaultFeaturedEpisode.moderator,
        panelists: [...defaultFeaturedEpisode.panelists],
        quote: defaultFeaturedEpisode.quote,
        startSeconds: defaultFeaturedEpisode.startSeconds,
        updatedAt: new Date(),
      },
    })

  await db
    .insert(syncState)
    .values({ id: "default" })
    .onConflictDoNothing()

  console.log(`Seed complete. Episodes in database: ${rows.length}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
