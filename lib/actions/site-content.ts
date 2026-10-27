"use server"

import { eq } from "drizzle-orm"
import { revalidateCmsTag } from "@/lib/revalidate"

import db from "@/db/drizzle"
import { siteContent } from "@/db/schema"
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result"
import { requireStaffAction } from "@/lib/auth-guard"
import { heroContentSchema } from "@/lib/validators"

export async function updateHeroContent(
  input: unknown
): Promise<ActionResult> {
  try {
    const session = await requireStaffAction()
    const parsed = heroContentSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid hero content", parsed.error.flatten().fieldErrors)
    }

    await db
      .insert(siteContent)
      .values({
        id: "default",
        ...parsed.data,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteContent.id,
        set: {
          ...parsed.data,
          updatedBy: session.user.id,
          updatedAt: new Date(),
        },
      })

    revalidateCmsTag("site-content")
    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not save hero content")
  }
}
