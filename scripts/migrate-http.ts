import "./load-env"

import { migrate } from "drizzle-orm/neon-http/migrator"
import path from "node:path"

import db from "../db/client"

async function main() {
  const migrationsFolder = path.join(process.cwd(), "drizzle")
  await migrate(db, { migrationsFolder })
  console.log("Migrations applied.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
