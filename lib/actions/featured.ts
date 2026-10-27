"use server"

import { and, eq } from "drizzle-orm"
import { revalidateCmsTag } from "@/lib/revalidate"

import db from "@/db/drizzle"
import { episode, featuredEpisode } from "@/db/schema"
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result"
import { requireStaffAction } from "@/lib/auth-guard"
import { featuredEpisodeSchema } from "@/lib/validators"

export async function updateFeaturedEpisode(
  input: unknown
): Promise<ActionResult> {
  try {
    const session = await requireStaffAction()
    const parsed = featuredEpisodeSchema.safeParse(input)
    if (!parsed.success) {
      return actionError(
        "Invalid featured episode",
        parsed.error.flatten().fieldErrors
      )
    }

    const [target] = await db
      .select({ videoId: episode.videoId })
      .from(episode)
      .where(
        and(
          eq(episode.videoId, parsed.data.videoId),
          eq(episode.isHidden, false)
        )
      )
      .limit(1)

    if (!target) {
      return actionError("Selected episode is not available")
    }

    const panelists = parsed.data.panelists?.filter(Boolean) ?? []
    const moderator = parsed.data.moderator?.trim() || null
    const quote = parsed.data.quote?.trim() || null

    await db
      .insert(featuredEpisode)
      .values({
        id: "default",
        videoId: parsed.data.videoId,
        eyebrow: parsed.data.eyebrow,
        headingLine: parsed.data.headingLine,
        headingAccent: parsed.data.headingAccent,
        intro: parsed.data.intro,
        title: parsed.data.title,
        description: parsed.data.description,
        moderator,
        panelists: panelists.length ? panelists : null,
        quote,
        startSeconds: parsed.data.startSeconds,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: featuredEpisode.id,
        set: {
          videoId: parsed.data.videoId,
          eyebrow: parsed.data.eyebrow,
          headingLine: parsed.data.headingLine,
          headingAccent: parsed.data.headingAccent,
          intro: parsed.data.intro,
          title: parsed.data.title,
          description: parsed.data.description,
          moderator,
          panelists: panelists.length ? panelists : null,
          quote,
          startSeconds: parsed.data.startSeconds,
          updatedBy: session.user.id,
          updatedAt: new Date(),
        },
      })

    revalidateCmsTag("featured-episode")
    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not save featured episode")
  }
}
