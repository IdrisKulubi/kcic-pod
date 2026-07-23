import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr"

import {
  getEpisodePagePath,
  getEpisodeThumbnail,
  type PodcastEpisode,
} from "@/lib/episodes"

type EpisodeIndexProps = {
  episodes: PodcastEpisode[]
}

export function EpisodeIndex({ episodes }: EpisodeIndexProps) {
  return (
    <div id="guests" className="flex min-h-0 flex-1 flex-col scroll-mt-28">
      <div className="mb-1 flex shrink-0 items-end justify-between gap-5 border-b border-border pb-4">
        <div>
          <h3 className="text-2xl font-black sm:text-3xl">All episodes</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Newest conversations first
          </p>
        </div>
        <div className="flex shrink-0 items-end gap-4">
          <span className="hidden items-center gap-1.5 pb-1 text-xs font-bold text-muted-foreground sm:flex">
            Scroll for more
            <ArrowDown className="size-3.5 text-secondary" aria-hidden="true" />
          </span>
          <span className="font-display text-3xl italic text-primary">
            {String(episodes.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <ol
        className="episode-index-scroll max-h-[34rem] min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2 sm:max-h-[38rem] lg:max-h-none"
        tabIndex={0}
        aria-label="All podcast episodes"
      >
        {episodes.map((episode, index) => (
          <li key={episode.id} className="border-b border-border">
            <Link
              href={getEpisodePagePath(episode.id)}
              className="group grid grid-cols-[5.8rem_minmax(0,1fr)_auto] items-center gap-4 py-5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:gap-5"
            >
              <div className="relative aspect-video overflow-hidden rounded-sm bg-card">
                <Image
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src={getEpisodeThumbnail(episode.id)}
                  alt={`Watch ${episode.title}`}
                />
                <span className="absolute inset-0 grid place-items-center bg-[oklch(0.18_0.038_164_/_0.18)] opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="size-5 text-primary" weight="fill" aria-hidden="true" />
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-[0.7rem] font-bold leading-snug text-secondary sm:text-xs">
                  {episode.topic} · {episode.duration}
                </p>
                <h4 className="mt-1 text-pretty text-sm font-extrabold leading-6 transition-colors group-hover:text-primary sm:text-base sm:leading-7">
                  {episode.title}
                </h4>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  {episode.published}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between self-stretch py-1">
                <span className="text-xs font-bold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
