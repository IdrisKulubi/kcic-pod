"use server"

import { and, eq, inArray, sql } from "drizzle-orm"
import { revalidateCmsTag } from "@/lib/revalidate"

import db from "@/db/drizzle"
import { episode, syncState } from "@/db/schema"
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result"
import { requireStaffAction } from "@/lib/auth-guard"
import { fetchYouTubeEpisodes } from "@/lib/youtube"
import {
  episodeDetailsSchema,
  reorderEpisodesSchema,
  setEpisodeHiddenSchema,
  topFeaturedSchema,
} from "@/lib/validators"

export async function syncEpisodes(): Promise<ActionResult<{ count: number }>> {
  try {
    await requireStaffAction()
    const feed = await fetchYouTubeEpisodes()
    if (!feed.ok) {
      await db
        .insert(syncState)
        .values({
          id: "default",
          lastError: feed.error,
        })
        .onConflictDoUpdate({
          target: syncState.id,
          set: { lastError: feed.error },
        })
      return { ok: false, error: feed.error }
    }

    const [minRow] = await db
      .select({ min: sql<number>`coalesce(min(${episode.position}), 0)` })
      .from(episode)

    let nextPosition = (minRow?.min ?? 0) - 1

    for (const item of feed.data) {
      const publishedAt = new Date(item.publishedAt)
      await db
        .insert(episode)
        .values({
          videoId: item.videoId,
          title: item.title,
          publishedAt,
          thumbnailUrl: item.thumbnailUrl,
          topic: "Sustainability",
          duration: "—",
          position: nextPosition,
          syncedAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: episode.videoId,
          set: {
            title: item.title,
            publishedAt,
            thumbnailUrl: item.thumbnailUrl,
            syncedAt: new Date(),
          },
        })

      nextPosition -= 1
    }

    await db
      .insert(syncState)
      .values({
        id: "default",
        lastSyncedAt: new Date(),
        lastError: null,
      })
      .onConflictDoUpdate({
        target: syncState.id,
        set: {
          lastSyncedAt: new Date(),
          lastError: null,
        },
      })

    revalidateCmsTag("episodes")
    return actionSuccess({ count: feed.data.length })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return { ok: false, error: "Unauthorized" }
    }
    return { ok: false, error: "Could not sync episodes from YouTube" }
  }
}

export async function updateEpisodeDetails(
  input: unknown
): Promise<ActionResult> {
  try {
    await requireStaffAction()
    const parsed = episodeDetailsSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid episode details", parsed.error.flatten().fieldErrors)
    }

    const summary = parsed.data.summary?.trim() || null

    await db
      .update(episode)
      .set({
        topic: parsed.data.topic,
        summary,
        duration: parsed.data.duration,
        updatedAt: new Date(),
      })
      .where(eq(episode.videoId, parsed.data.videoId))

    revalidateCmsTag("episodes")
    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not update episode")
  }
}

export async function setEpisodeHidden(input: unknown): Promise<ActionResult> {
  try {
    await requireStaffAction()
    const parsed = setEpisodeHiddenSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid request", parsed.error.flatten().fieldErrors)
    }

    await db
      .update(episode)
      .set({
        isHidden: parsed.data.isHidden,
        updatedAt: new Date(),
      })
      .where(eq(episode.videoId, parsed.data.videoId))

    revalidateCmsTag("episodes")
    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not update episode visibility")
  }
}

export async function setTopFeatured(input: unknown): Promise<ActionResult> {
  try {
    await requireStaffAction()
    const parsed = topFeaturedSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid top featured list", parsed.error.flatten().fieldErrors)
    }

    const ids = Array.from(new Set(parsed.data.videoIds))
    const rows = await db
      .select({ videoId: episode.videoId })
      .from(episode)
      .where(
        and(inArray(episode.videoId, ids), eq(episode.isHidden, false))
      )

    if (rows.length !== ids.length) {
      return actionError("One or more episodes are missing or hidden")
    }

    await db.update(episode).set({ topFeaturedPosition: null })

    for (let index = 0; index < ids.length; index += 1) {
      await db
        .update(episode)
        .set({
          topFeaturedPosition: index + 1,
          updatedAt: new Date(),
        })
        .where(eq(episode.videoId, ids[index]))
    }

    revalidateCmsTag("episodes")
    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not update top featured episodes")
  }
}

export async function reorderEpisodes(input: unknown): Promise<ActionResult> {
  try {
    await requireStaffAction()
    const parsed = reorderEpisodesSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid episode order", parsed.error.flatten().fieldErrors)
    }

    const ids: string[] = parsed.data.videoIds
    const values = ids
      .map((id: string, index: number) => `('${id.replace(/'/g, "''")}', ${index})`)
      .join(", ")

    if (!values) {
      return actionError("Episode list is empty")
    }

    await db.execute(sql.raw(`
      UPDATE episode AS e
      SET position = v.pos::integer, updated_at = NOW()
      FROM (VALUES ${values}) AS v(vid, pos)
      WHERE e.video_id = v.vid
    `))

    revalidateCmsTag("episodes")
    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not reorder episodes")
  }
}
