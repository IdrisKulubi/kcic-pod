import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr"

import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  getAllIndexableEpisodes,
  getEpisodeById,
  getEpisodePagePath,
  getEpisodeThumbnail,
  getEpisodeUrl,
} from "@/lib/episodes"
import { buildPageMetadata, buildPodcastEpisodeJsonLd } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

type EpisodePageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllIndexableEpisodes().map((episode) => ({ id: episode.id }))
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const { id } = await params
  const episode = getEpisodeById(id)

  if (!episode) {
    return buildPageMetadata({
      title: "Episode not found",
      description: `The requested episode could not be found on ${siteConfig.name}.`,
      path: getEpisodePagePath(id),
    })
  }

  const description =
    episode.summary ??
    `${episode.title}. A ${siteConfig.name} conversation on ${episode.topic}.`

  return buildPageMetadata({
    title: episode.title,
    description,
    path: getEpisodePagePath(episode.id),
    image: getEpisodeThumbnail(episode.id),
    type: "article",
  })
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id } = await params
  const episode = getEpisodeById(id)

  if (!episode) notFound()

  const youtubeUrl = getEpisodeUrl(episode.id)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${episode.id}?rel=0`
  const description =
    episode.summary ??
    `A Sustainably Speaking Africa conversation on ${episode.topic}.`

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={buildPodcastEpisodeJsonLd(episode)} />
      <SiteHeader />

      <article className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] pb-[clamp(3rem,6vw,5rem)] pt-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#episodes"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to episodes
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            <p className="text-sm font-bold text-secondary">
              {episode.topic} · {episode.published} · {episode.duration}
            </p>
            <h1 className="mt-4 text-balance text-[clamp(1.85rem,4vw,3.25rem)] font-black leading-[1.05]">
              {episode.title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground">
              {description}
            </p>
          </header>

          <div className="mt-8 overflow-hidden rounded-md bg-card">
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 size-full"
                src={embedUrl}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
            >
              <Play className="size-4" weight="fill" aria-hidden="true" />
              Watch on YouTube
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <p className="text-sm text-muted-foreground">
              Part of {siteConfig.name} by {siteConfig.publisher}
            </p>
          </div>

          <aside className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-[10rem_minmax(0,1fr)]">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-card sm:aspect-square">
              <Image
                fill
                sizes="160px"
                className="object-cover"
                src={getEpisodeThumbnail(episode.id)}
                alt={`Thumbnail for ${episode.title}`}
              />
            </div>
            <div>
              <h2 className="text-lg font-black">About this episode</h2>
              <p className="mt-3 text-pretty text-sm leading-7 text-muted-foreground">
                {description} Listen on the {siteConfig.name} site or open the
                full conversation on YouTube.
              </p>
            </div>
          </aside>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
