export type HeroContent = {
  heroTitleLine1: string
  heroTitleAccent: string
  heroTitleLine3: string
  heroSubheading: string
  heroDescription: string
  heroTagline: string
}

export type FeaturedEpisodeContent = {
  videoId: string
  eyebrow: string
  headingLine: string
  headingAccent: string
  intro: string
  title: string
  description: readonly string[] | string[]
  moderator?: string
  panelists?: readonly string[] | string[]
  quote?: string
  startSeconds: number
  youtubeUrl: string
  pagePath: string
  embedUrl: string
  poster: string
}
