import {
  featuredPodcastEpisodes,
  launchEpisode,
  podcastEpisodes,
} from "@/lib/episodes"
import { featuredEpisode } from "@/lib/site-data"

export const defaultHeroContent = {
  heroTitleLine1: "Sustainably",
  heroTitleAccent: "Speaking",
  heroTitleLine3: "Africa",
  heroSubheading: "Sustainably Speaking Africa",
  heroDescription:
    "A podcast exploring authentic stories of Africa’s sustainability journey through the lived experiences and tangible successes of the people building its solutions.",
  heroTagline: "Amplifying African narratives of change",
} as const

export const defaultFeaturedEpisode = {
  videoId: featuredEpisode.id,
  eyebrow: "The launch conversation",
  headingLine: "Why Africa.",
  headingAccent: "Why now?",
  intro:
    "Africa’s green economy is gaining momentum through investment in renewable energy, climate-smart agriculture, and the circular economy. It’s time to tell authentic stories of African-led solutions and connect them to the capital, people, and policies needed to scale impact.",
  title: featuredEpisode.title,
  description: [...featuredEpisode.description],
  moderator: featuredEpisode.moderator,
  panelists: [...featuredEpisode.panelists],
  quote:
    "Sustainability works best when local context, lived experience, and real conversations come first.",
  startSeconds: 52,
} as const

export function getDefaultEpisodeRows() {
  const byId = new Map(
    podcastEpisodes.map((episode, index) => [
      episode.id,
      {
        videoId: episode.id,
        title: episode.title,
        topic: episode.topic,
        summary: episode.summary ?? null,
        duration: episode.duration,
        position: index,
        isHidden: false,
        topFeaturedPosition: null as number | null,
        publishedAt: new Date(),
      },
    ])
  )

  if (!byId.has(launchEpisode.id)) {
    byId.set(launchEpisode.id, {
      videoId: launchEpisode.id,
      title: launchEpisode.title,
      topic: launchEpisode.topic,
      summary: launchEpisode.summary ?? null,
      duration: launchEpisode.duration,
      position: -1,
      isHidden: false,
      topFeaturedPosition: null,
      publishedAt: new Date(),
    })
  }

  featuredPodcastEpisodes.forEach((episode, index) => {
    const row = byId.get(episode.id)
    if (row) {
      row.topFeaturedPosition = index + 1
    }
  })

  return Array.from(byId.values()).sort((a, b) => a.position - b.position)
}
