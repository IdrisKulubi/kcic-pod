import { getPostgresUrl } from "../lib/postgres-url"

// Side effect: load and validate env when scripts import this module.
getPostgresUrl()
