import Image from "next/image"
import { ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr"

import {
  getEpisodeThumbnail,
  getEpisodeUrl,
  type PodcastEpisode,
} from "@/lib/episodes"

type FeaturedEpisodesProps = {
  episodes: PodcastEpisode[]
}

export function FeaturedEpisodes({ episodes }: FeaturedEpisodesProps) {
  const [leadEpisode, ...secondaryEpisodes] = episodes

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <h3 className="text-2xl font-black sm:text-3xl">Top featured</h3>
        <span className="text-sm font-bold text-secondary">Editor&apos;s listening desk</span>
      </div>

      <a
        href={getEpisodeUrl(leadEpisode.id)}
        target="_blank"
        rel="noreferrer"
        className="group block focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        <div className="relative aspect-video overflow-hidden rounded-md bg-card">
          <Image
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            src={getEpisodeThumbnail(leadEpisode.id)}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,oklch(0.06_0.025_164_/_0.86))]"
            aria-hidden="true"
          />
          <span className="absolute left-5 top-5 rounded-full bg-primary px-4 py-2 text-xs font-black text-primary-foreground">
            Latest feature
          </span>
          <span className="absolute bottom-5 right-5 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110 sm:size-16">
            <Play className="ml-0.5 size-6" weight="fill" aria-hidden="true" />
          </span>
          <span className="absolute bottom-5 left-5 text-sm font-bold text-[oklch(0.97_0.01_92)]">
            {leadEpisode.duration}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold text-secondary">
              {leadEpisode.topic} · {leadEpisode.published}
            </p>
            <h4 className="mt-2 max-w-3xl text-balance text-[clamp(1.25rem,2.5vw,2.1rem)] font-black leading-[1.08]">
              {leadEpisode.title}
            </h4>
            {leadEpisode.summary ? (
              <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">
                {leadEpisode.summary}
              </p>
            ) : null}
          </div>
        </div>
   
      </a>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {secondaryEpisodes.map((episode) => (
          <a
            key={episode.id}
            href={getEpisodeUrl(episode.id)}
            target="_blank"
            rel="noreferrer"
            className="group block focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <div className="relative aspect-video overflow-hidden rounded-md bg-card">
              <Image
                fill
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                src={getEpisodeThumbnail(episode.id)}
                alt=""
              />
              <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white/92 text-primary shadow-sm">
                <Play className="size-4" weight="fill" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-4 text-xs font-bold text-secondary">
              {episode.topic} · {episode.duration}
            </p>
            <h4 className="mt-2 text-balance text-lg font-extrabold leading-6 transition-colors group-hover:text-primary">
              {episode.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  )
}
