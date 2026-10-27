import { z } from "zod"

const videoIdSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9_-]{11}$/, "Invalid YouTube video id")

export const heroContentSchema = z.object({
  heroTitleLine1: z.string().trim().min(1).max(80),
  heroTitleAccent: z.string().trim().min(1).max(80),
  heroTitleLine3: z.string().trim().min(1).max(80),
  heroSubheading: z.string().trim().min(2).max(120),
  heroDescription: z.string().trim().min(20).max(600),
  heroTagline: z.string().trim().min(5).max(200),
})

export const featuredEpisodeSchema = z.object({
  videoId: videoIdSchema,
  eyebrow: z.string().trim().min(2).max(120),
  headingLine: z.string().trim().min(2).max(120),
  headingAccent: z.string().trim().min(2).max(120),
  intro: z.string().trim().min(20).max(800),
  title: z.string().trim().min(5).max(300),
  description: z
    .array(z.string().trim().min(10).max(1200))
    .min(1)
    .max(6),
  moderator: z.string().trim().max(120).optional().or(z.literal("")),
  panelists: z.array(z.string().trim().min(2).max(120)).max(12).optional(),
  quote: z.string().trim().max(500).optional().or(z.literal("")),
  startSeconds: z.coerce.number().int().min(0).max(60 * 60 * 4),
})

export const episodeDetailsSchema = z.object({
  videoId: videoIdSchema,
  topic: z.string().trim().min(2).max(80),
  summary: z.string().trim().max(600).optional().or(z.literal("")),
  duration: z.string().trim().min(1).max(12),
})

export const topFeaturedSchema = z.object({
  videoIds: z.array(videoIdSchema).min(1).max(5),
})

export const reorderEpisodesSchema = z.object({
  videoIds: z.array(videoIdSchema).min(1),
})

export const setEpisodeHiddenSchema = z.object({
  videoId: videoIdSchema,
  isHidden: z.boolean(),
})

export const createStaffSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(12).max(72),
})

export const resetPasswordSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(12).max(72),
})

export const removeStaffSchema = z.object({
  userId: z.string().min(1),
})
