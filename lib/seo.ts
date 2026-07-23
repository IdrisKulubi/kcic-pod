import type { Metadata } from "next"

import {
  getEpisodeThumbnail,
  getEpisodeUrl,
  podcastEpisodes,
  type PodcastEpisode,
} from "@/lib/episodes"
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/site"
import { featuredEpisode } from "@/lib/site-data"

export function durationToIso8601(duration: string) {
  const parts = duration.split(":").map((part) => Number(part))
  if (parts.some((part) => Number.isNaN(part))) return undefined

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts
    return `PT${hours}H${minutes}M${seconds}S`
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts
    return `PT${minutes}M${seconds}S`
  }

  return undefined
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: "website" | "article"
} = {}): Metadata {
  const absoluteTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | ${siteConfig.tagline}`
  const pageDescription = description ?? siteConfig.description
  const canonical = absoluteUrl(path)
  const ogImage = image ?? absoluteUrl("/opengraph-image")

  return {
    metadataBase: new URL(getSiteUrl()),
    title: title
      ? title
      : {
          default: absoluteTitle,
          template: `%s | ${siteConfig.name}`,
        },
    description: pageDescription,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: "Podcast",
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: absoluteTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} podcast cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      url: getSiteUrl(),
      logo: absoluteUrl(siteConfig.logo),
    },
    inLanguage: siteConfig.language,
  }
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.publisher,
    alternateName: "KCIC",
    url: getSiteUrl(),
    email: siteConfig.email,
    logo: absoluteUrl(siteConfig.logo),
    sameAs: [
      siteConfig.social.youtube,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.x,
      siteConfig.platforms.spotify,
      siteConfig.platforms.applePodcasts,
    ],
  }
}

export function buildPodcastSeriesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    webFeed: siteConfig.youtube.url,
    author: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      logo: absoluteUrl(siteConfig.logo),
    },
    image: [absoluteUrl(siteConfig.logo), featuredEpisode.poster],
    inLanguage: siteConfig.language,
    genre: ["Climate", "Sustainability", "Innovation", "Africa"],
    episode: podcastEpisodes.slice(0, 12).map((episode, index) =>
      buildPodcastEpisodeNode(episode, index + 1)
    ),
  }
}

export function buildPodcastEpisodeJsonLd(
  episode: PodcastEpisode,
  position?: number
) {
  return {
    "@context": "https://schema.org",
    ...buildPodcastEpisodeNode(episode, position),
  }
}

function buildPodcastEpisodeNode(episode: PodcastEpisode, position?: number) {
  return {
    "@type": "PodcastEpisode",
    name: episode.title,
    description:
      episode.summary ??
      `${episode.title}. A Sustainably Speaking Africa conversation on ${episode.topic}.`,
    url: absoluteUrl(`/episodes/${episode.id}`),
    datePublished: episode.published,
    duration: durationToIso8601(episode.duration),
    image: getEpisodeThumbnail(episode.id),
    episodeNumber: position,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    associatedMedia: {
      "@type": "VideoObject",
      name: episode.title,
      contentUrl: getEpisodeUrl(episode.id),
      embedUrl: `https://www.youtube-nocookie.com/embed/${episode.id}`,
      thumbnailUrl: getEpisodeThumbnail(episode.id),
      uploadDate: episode.published,
    },
  }
}

export function buildEpisodeListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} episodes`,
    itemListElement: podcastEpisodes.map((episode, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/episodes/${episode.id}`),
      name: episode.title,
    })),
  }
}
