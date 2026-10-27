import "./load-env"

import { randomUUID } from "node:crypto"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

import db from "../db/client"
import { account, user } from "../db/schema"

function readArg(name: string) {
  const index = process.argv.indexOf(`--${name}`)
  if (index === -1) return undefined
  return process.argv[index + 1]
}

async function main() {
  const email = readArg("email")?.toLowerCase().trim()
  const name = readArg("name")?.trim()
  const password = readArg("password")

  if (!email || !name || !password) {
    console.error(
      'Usage: npm run staff:create -- --email you@example.com --name "Staff Name" --password "secure-password"'
    )
    process.exit(1)
  }

  if (password.length < 12) {
    console.error("Password must be at least 12 characters")
    process.exit(1)
  }

  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1)

  if (existing) {
    console.error("A user with this email already exists")
    process.exit(1)
  }

  const userId = randomUUID()
  const passwordHash = await bcrypt.hash(password, 12)
  const now = new Date()

  await db.insert(user).values({
    id: userId,
    name,
    email,
    emailVerified: true,
    role: "admin",
    banned: false,
    createdAt: now,
    updatedAt: now,
  })

  await db.insert(account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  })

  console.log(`Staff user created: ${email}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
