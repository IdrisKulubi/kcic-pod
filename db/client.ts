import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"
import { getPostgresUrl } from "@/lib/postgres-url"

// Drizzle 1.0 rc: pass the connection string directly (not a pre-built neon() client).
// @ts-expect-error DrizzlePgConfig inference for combined schema module
const db = drizzle(getPostgresUrl(), { schema })

export default db
