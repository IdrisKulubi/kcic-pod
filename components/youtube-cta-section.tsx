"use client"

import { useEffect, useRef } from "react"
import {
  ApplePodcastsLogo,
  ShareNetwork,
  SpotifyLogo,
  YoutubeLogo,
} from "@phosphor-icons/react"
import gsap from "gsap"

import { siteConfig } from "@/lib/site"

const channelLinks = [
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: YoutubeLogo,
    iconClass: "text-[oklch(0.55_0.22_25)]",
  },
  {
    label: "Spotify",
    href: siteConfig.platforms.spotify,
    icon: SpotifyLogo,
    iconClass: "text-[oklch(0.62_0.17_155)]",
  },
  {
    label: "Apple Podcasts",
    href: siteConfig.platforms.applePodcasts,
    icon: ApplePodcastsLogo,
    iconClass: "text-[oklch(0.58_0.22_330)]",
  },
] as const

function TornEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`absolute inset-x-0 h-4 w-full text-background ${flip ? "bottom-0 rotate-180" : "top-0"}`}
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 18 48 8l48 12 48-14 48 10 48-8 48 14 48-12 48 8 48-10 48 14 48-8 48 10 48-14 48 12 48-10 48 8 48-12 48 14 48-8 48 10 48-14 48 12 48-10 48 14V0H0z"
      />
    </svg>
  )
}

export function YoutubeCtaSection() {
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

        const ctx = gsap.context(() => {
          const band = section.querySelector("[data-cta-band]")
          const play = section.querySelector("[data-cta-play]")
          const lines = gsap.utils.toArray<HTMLElement>("[data-cta-line]")
          const pills = gsap.utils.toArray<HTMLElement>("[data-cta-pill]")

          const timeline = gsap.timeline({ defaults: { ease: "expo.out" } })

          timeline
            .from(band, {
              scaleY: 0.72,
              opacity: 0,
              duration: 0.7,
              transformOrigin: "center center",
            })
            .from(
              play,
              {
                scale: 0.6,
                opacity: 0,
                duration: 0.55,
              },
              "-=0.35"
            )
            .from(
              lines,
              {
                y: 18,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
              },
              "-=0.3"
            )
            .from(
              pills,
              {
                y: 16,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
              },
              "-=0.25"
            )
        }, section)

        observer.disconnect()
        return () => ctx.revert()
      },
      { threshold: 0.35 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="social"
      className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(2rem,4vw,3.5rem)]"
      aria-label="Follow Sustainably Speaking Africa on social channels"
    >
      <div className="mx-auto max-w-[96rem]">
        <div
          data-cta-band
          className="relative overflow-hidden bg-primary px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.25rem,4.5vw,3.5rem)] text-primary-foreground"
        >
          <TornEdge />
          <TornEdge flip />

          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-7 lg:gap-10">
            <span
              data-cta-play
              className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[oklch(0.16_0.04_164)] text-[oklch(0.95_0.014_92)] shadow-[0_10px_30px_oklch(0.16_0.04_164_/_0.28)] sm:size-20"
            >
              <ShareNetwork
                className="size-7"
                weight="fill"
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <p
                data-cta-line
                className="text-[clamp(1.35rem,3vw,2.35rem)] leading-none font-black tracking-[0.01em]"
              >
                Hear Africa&apos;s climate future
              </p>
              <p
                data-cta-line
                className="mt-2 text-[clamp(1.35rem,3vw,2.35rem)] leading-none font-black tracking-[0.01em]"
              >
                from the people building it
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {channelLinks.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cta-pill
                  className="inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.16_0.04_164_/_0.18)] bg-[oklch(0.16_0.04_164_/_0.08)] px-5 py-3 text-sm font-extrabold text-primary-foreground backdrop-blur-[2px] transition-colors duration-300 hover:bg-[oklch(0.16_0.04_164_/_0.14)] focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-none sm:px-6 sm:text-base"
                >
                  <channel.icon
                    className={`size-5 ${channel.iconClass}`}
                    weight="fill"
                    aria-hidden="true"
                  />
                  {channel.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
