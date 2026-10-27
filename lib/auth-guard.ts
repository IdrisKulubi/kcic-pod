import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export async function requireStaff() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/staff/login")
  }

  if ("banned" in session.user && session.user.banned) {
    redirect("/staff/login")
  }

  return session
}

export async function requireStaffAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (
    !session?.user ||
    ("banned" in session.user && session.user.banned)
  ) {
    throw new Error("Unauthorized")
  }

  return session
}
