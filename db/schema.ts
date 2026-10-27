import {
  pgTable,
  index,
  text,
  timestamp,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core"

// Better Auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("admin"),
  banned: boolean("banned").notNull().default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const rateLimit = pgTable("rate_limit", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  count: integer("count").notNull(),
  lastRequest: integer("last_request").notNull(),
})

export const siteContent = pgTable("site_content", {
  id: text("id").primaryKey().default("default"),
  heroTitleLine1: text("hero_title_line1").notNull(),
  heroTitleAccent: text("hero_title_accent").notNull(),
  heroTitleLine3: text("hero_title_line3").notNull(),
  heroSubheading: text("hero_subheading").notNull(),
  heroDescription: text("hero_description").notNull(),
  heroTagline: text("hero_tagline").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: text("updated_by").references(() => user.id, {
    onDelete: "set null",
  }),
})

export const episode = pgTable(
  "episode",
  {
    videoId: text("video_id").primaryKey(),
    title: text("title").notNull(),
    publishedAt: timestamp("published_at").notNull(),
    thumbnailUrl: text("thumbnail_url").notNull(),
    topic: text("topic").notNull().default("Sustainability"),
    summary: text("summary"),
    duration: text("duration").notNull().default("—"),
    position: integer("position").notNull(),
    isHidden: boolean("is_hidden").notNull().default(false),
    topFeaturedPosition: integer("top_featured_position"),
    syncedAt: timestamp("synced_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    positionIdx: index("episode_position_idx").on(table.position),
    topFeaturedIdx: index("episode_top_featured_idx").on(
      table.topFeaturedPosition
    ),
  })
)

export const featuredEpisode = pgTable("featured_episode", {
  id: text("id").primaryKey().default("default"),
  videoId: text("video_id")
    .notNull()
    .references(() => episode.videoId, { onDelete: "restrict" }),
  eyebrow: text("eyebrow").notNull(),
  headingLine: text("heading_line").notNull(),
  headingAccent: text("heading_accent").notNull(),
  intro: text("intro").notNull(),
  title: text("title").notNull(),
  description: text("description").array().notNull(),
  moderator: text("moderator"),
  panelists: text("panelists").array(),
  quote: text("quote"),
  startSeconds: integer("start_seconds").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: text("updated_by").references(() => user.id, {
    onDelete: "set null",
  }),
})

export const syncState = pgTable("sync_state", {
  id: text("id").primaryKey().default("default"),
  lastSyncedAt: timestamp("last_synced_at"),
  lastError: text("last_error"),
})
