"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

import { featuredPodcastEpisodes, podcastEpisodes } from "@/lib/episodes"
import { EpisodeIndex } from "./episode-index"
import { FeaturedEpisodes } from "./featured-episodes"

export function EpisodeLibrarySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        gsap.from(section.querySelectorAll("[data-library-reveal]"), {
          y: 34,
          opacity: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: "expo.out",
        })
        observer.disconnect()
      },
      { threshold: 0.08 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="episode-library"
      className="overflow-hidden bg-[oklch(0.105_0.03_164)] px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,6vw,6rem)] text-foreground"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-[clamp(3rem,5vw,6rem)] lg:grid-cols-[minmax(0,0.96fr)_minmax(26rem,0.84fr)] lg:items-stretch">
          <div data-library-reveal>
            <FeaturedEpisodes episodes={featuredPodcastEpisodes} />
          </div>
          <div
            data-library-reveal
            className="min-h-0 lg:flex lg:h-0 lg:min-h-full lg:flex-col lg:overflow-hidden"
          >
            <EpisodeIndex episodes={podcastEpisodes} />
          </div>
        </div>
      </div>
    </section>
  )
}
