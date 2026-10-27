"use server"

import { eq, sql } from "drizzle-orm"
import { headers } from "next/headers"

import db from "@/db/drizzle"
import { user } from "@/db/schema"
import { actionError, actionSuccess, type ActionResult } from "@/lib/action-result"
import { auth } from "@/lib/auth"
import { requireStaffAction } from "@/lib/auth-guard"
import {
  createStaffSchema,
  removeStaffSchema,
  resetPasswordSchema,
} from "@/lib/validators"

export async function createStaff(input: unknown): Promise<ActionResult> {
  try {
    await requireStaffAction()
    const parsed = createStaffSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid staff details", parsed.error.flatten().fieldErrors)
    }

    const result = await auth.api.createUser({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.name,
        role: "admin",
      },
      headers: await headers(),
    })

    if (!result?.user) {
      return actionError("Could not create staff account")
    }

    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not create staff account")
  }
}

export async function resetStaffPassword(
  input: unknown
): Promise<ActionResult> {
  try {
    await requireStaffAction()
    const parsed = resetPasswordSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid password", parsed.error.flatten().fieldErrors)
    }

    await auth.api.setUserPassword({
      body: {
        userId: parsed.data.userId,
        newPassword: parsed.data.password,
      },
      headers: await headers(),
    })

    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not reset password")
  }
}

export async function removeStaff(input: unknown): Promise<ActionResult> {
  try {
    const session = await requireStaffAction()
    const parsed = removeStaffSchema.safeParse(input)
    if (!parsed.success) {
      return actionError("Invalid request", parsed.error.flatten().fieldErrors)
    }

    if (parsed.data.userId === session.user.id) {
      return actionError("You cannot remove your own account")
    }

    const [countRow] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(user)
      .where(eq(user.banned, false))

    if ((countRow?.count ?? 0) <= 1) {
      return actionError("At least one staff account must remain")
    }

    await auth.api.removeUser({
      body: { userId: parsed.data.userId },
      headers: await headers(),
    })

    return actionSuccess()
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return actionError("Unauthorized")
    }
    return actionError("Could not remove staff account")
  }
}
