import { defineConfig } from "drizzle-kit"

import { getPostgresUrl } from "./lib/postgres-url"

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: getPostgresUrl(),
  },
})
