"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  MicrophoneStage,
  Play,
  Quotes,
  YoutubeLogo,
} from "@phosphor-icons/react"
import gsap from "gsap"

import { featuredEpisode, waveformBars } from "@/lib/site-data"

export function FeaturedEpisodeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

        const ctx = gsap.context(() => {
          const video = section.querySelector("[data-episode-video]")
          const reveals = gsap.utils.toArray<HTMLElement>(
            "[data-episode-reveal]"
          )
          const bars = gsap.utils.toArray<HTMLElement>("[data-episode-bar]")

          const timeline = gsap.timeline({ defaults: { ease: "expo.out" } })

          timeline
            .from(video, {
              clipPath: "inset(0 100% 0 0)",
              duration: 1.25,
            })
            .from(
              reveals,
              {
                y: 28,
                opacity: 0,
                duration: 0.82,
                stagger: 0.09,
              },
              0.24
            )
            .from(
              bars,
              {
                scaleY: 0.08,
                duration: 0.55,
                stagger: { each: 0.025, from: "center" },
              },
              0.62
            )
        }, section)

        observer.disconnect()
        return () => ctx.revert()
      },
      { threshold: 0.18 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="episodes"
      className="overflow-hidden bg-[oklch(0.92_0.018_150)] px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4.5rem,8vw,8.5rem)] text-[oklch(0.17_0.038_164)]"
    >
      <div className="mx-auto max-w-[96rem]">
        <header className="relative grid gap-8 pb-[clamp(2rem,4vw,4rem)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-linear-to-r after:from-primary after:via-primary after:to-secondary lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] lg:items-end">
          <div data-episode-reveal>
            <p className="mb-4 text-base font-bold text-[oklch(0.34_0.085_155)]">
              The launch conversation
            </p>
            <h2 className="max-w-5xl text-balance text-[clamp(3rem,6.4vw,6rem)] font-black leading-[0.9] tracking-[0.01em]">
              Why Africa.
              <span className="block font-display font-normal italic text-[oklch(0.46_0.17_145)]">
                Why now?
              </span>
            </h2>
          </div>

          <p
            data-episode-reveal
            className="max-w-md text-pretty text-lg font-semibold leading-8 text-[oklch(0.25_0.04_164)]"
          >
            A live opening statement for a podcast built around grounded,
            African-led sustainability dialogue.
          </p>
        </header>

        <div className="grid gap-[clamp(2.5rem,6vw,7rem)] py-[clamp(3rem,6vw,6.5rem)] lg:grid-cols-[minmax(0,1.32fr)_minmax(21rem,0.68fr)] lg:items-start">
          <div data-episode-video className="relative">
            <div className="relative aspect-video overflow-hidden rounded-md bg-[oklch(0.12_0.03_164)]">
              {isPlaying ? (
                <iframe
                  className="absolute inset-0 size-full"
                  src={featuredEpisode.embedUrl}
                  title={featuredEpisode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    src={featuredEpisode.poster}
                    alt="Sustainably Speaking Africa launch episode panel"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.05_0.02_164_/_0.08),oklch(0.05_0.02_164_/_0.62))]"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[oklch(0.77_0.2_145)]"
                    aria-label="Play the Sustainably Speaking Africa launch episode"
                  >
                    <span className="grid size-20 place-items-center rounded-full bg-[oklch(0.77_0.2_145)] text-[oklch(0.13_0.035_158)] transition-transform duration-500 group-hover:scale-110 sm:size-24">
                      <Play className="ml-1 size-8" weight="fill" aria-hidden="true" />
                    </span>
                  </button>
                  <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 text-[oklch(0.96_0.01_92)] sm:inset-x-7 sm:bottom-7">
                    <span className="max-w-sm text-sm font-bold leading-6 sm:text-base">
                      Recorded live at the Sustainably Speaking Africa launch
                    </span>
                    <YoutubeLogo className="size-7 shrink-0" weight="fill" aria-hidden="true" />
                  </div>
                </>
              )}
            </div>

            <div
              className="mt-5 flex h-8 items-center gap-1.5"
              aria-hidden="true"
            >
              {waveformBars.concat(waveformBars).map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  data-episode-bar
                  className="w-1 origin-center rounded-full bg-[oklch(0.36_0.12_150)] even:bg-[oklch(0.44_0.1_205)]"
                  style={{ height: `${Math.max(18, height * 0.34)}%` }}
                />
              ))}
              <span className="ml-3 h-px flex-1 bg-linear-to-r from-primary to-secondary" />
              <span className="text-xs font-bold text-[oklch(0.31_0.035_164)]">
                Launch episode
              </span>
            </div>
          </div>

          <article>
            <div data-episode-reveal className="flex items-center gap-3 text-[oklch(0.36_0.12_150)]">
              <MicrophoneStage className="size-5" weight="bold" aria-hidden="true" />
              <span className="text-sm font-extrabold">Featured episode</span>
            </div>

            <h3
              data-episode-reveal
              className="mt-5 text-balance text-[clamp(2rem,3.3vw,3.75rem)] font-black leading-[1.02] tracking-[0.01em]"
            >
              {featuredEpisode.title}
            </h3>

            <div
              data-episode-reveal
              className="mt-7 space-y-5 text-pretty text-base leading-7 text-[oklch(0.28_0.035_164)] sm:text-lg sm:leading-8"
            >
              {featuredEpisode.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div
              data-episode-reveal
              className="mt-8 border-y border-[oklch(0.17_0.038_164_/_0.2)] py-6"
            >
              <div className="grid gap-5 sm:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="text-xs font-bold text-[oklch(0.39_0.085_155)]">
                    Moderator
                  </p>
                  <p className="mt-1 text-base font-extrabold text-[oklch(0.17_0.038_164)]">
                    {featuredEpisode.moderator}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-[oklch(0.39_0.085_155)]">
                    In conversation
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                    {featuredEpisode.panelists.map((panelist) => (
                      <li
                        key={panelist}
                        className="text-sm font-bold text-[oklch(0.22_0.04_164)]"
                      >
                        {panelist}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              data-episode-reveal
              href={featuredEpisode.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex h-13 items-center gap-3 rounded-full bg-[oklch(0.16_0.04_164)] px-6 text-sm font-extrabold text-[oklch(0.95_0.014_92)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[oklch(0.46_0.17_145_/_0.5)]"
            >
              <YoutubeLogo className="size-5" weight="fill" aria-hidden="true" />
              Watch on YouTube
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </article>
        </div>

        <blockquote
          data-episode-reveal
          className="relative overflow-hidden rounded-md bg-[oklch(0.14_0.036_164)] px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,5vw,5rem)] text-[oklch(0.95_0.014_92)]"
        >
          <Quotes
            className="absolute right-5 top-5 size-16 text-[oklch(0.77_0.2_145_/_0.3)] sm:right-8 sm:top-8 sm:size-24"
            weight="fill"
            aria-hidden="true"
          />
          <p className="relative max-w-6xl text-balance font-display text-[clamp(2rem,4.2vw,4.75rem)] font-normal italic leading-[1.03] text-[oklch(0.92_0.11_145)]">
            Sustainability works best when local context, lived experience,
            and real conversations come first.
          </p>
        </blockquote>
      </div>
    </section>
  )
}
