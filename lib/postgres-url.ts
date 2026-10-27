import { config } from "dotenv"
import path from "node:path"

let envLoaded = false

function loadEnvFiles() {
  if (envLoaded) return
  envLoaded = true
  const root = process.cwd()
  config({ path: path.join(root, ".env.local") })
  config({ path: path.join(root, ".env") })
}

export function getPostgresUrl(): string {
  loadEnvFiles()

  const raw = process.env.POSTGRES_URL ?? process.env.DATABASE_URL ?? ""
  const url = raw
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/^['"]|['"]$/g, "")
    .replace(/\r/g, "")

  if (!url) {
    throw new Error(
      "POSTGRES_URL is not set. Add your Neon connection string to .env.local"
    )
  }

  if (!url.startsWith("postgres://") && !url.startsWith("postgresql://")) {
    throw new Error(
      "POSTGRES_URL must use postgres:// or postgresql:// (check .env.local for stray quotes)"
    )
  }

  return url
}
