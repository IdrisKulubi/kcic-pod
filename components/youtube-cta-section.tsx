"use client"

import { useEffect, useRef } from "react"
import { Bell, Play } from "@phosphor-icons/react"
import gsap from "gsap"

import { youtubeChannel } from "@/lib/site-data"

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
          const pill = section.querySelector("[data-cta-pill]")
          const bell = section.querySelector("[data-cta-bell]")

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
              pill,
              {
                x: -24,
                opacity: 0,
                duration: 0.55,
              },
              "-=0.25"
            )
            .from(
              bell,
              {
                scale: 0.5,
                opacity: 0,
                duration: 0.4,
              },
              "-=0.2"
            )
            .to(bell, {
              rotation: 12,
              duration: 0.12,
              yoyo: true,
              repeat: 3,
              ease: "power1.inOut",
            })
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
      id="youtube"
      className="bg-background px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(2rem,4vw,3.5rem)]"
      aria-label="Follow Sustainably Speaking Africa on YouTube"
    >
      <div className="mx-auto max-w-[96rem]">
        <a
          href={youtubeChannel.url}
          target="_blank"
          rel="noreferrer"
          data-cta-band
          className="group relative block overflow-hidden bg-primary px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.25rem,4.5vw,3.5rem)] text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
        >
          <TornEdge />
          <TornEdge flip />

          <div className="relative z-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-center sm:gap-6 lg:gap-8">
            <span
              data-cta-play
              className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[oklch(0.16_0.04_164)] text-[oklch(0.95_0.014_92)] shadow-[0_10px_30px_oklch(0.16_0.04_164_/_0.28)] transition-transform duration-300 group-hover:scale-105 sm:size-20"
            >
              <Play className="ml-0.5 size-7" weight="fill" aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <p
                data-cta-line
                className="text-[clamp(1.35rem,3vw,2.35rem)] font-black leading-none tracking-[0.01em]"
              >
                Follow Us on
              </p>
              <p
                data-cta-line
                className="mt-2 text-[clamp(1.35rem,3vw,2.35rem)] font-black leading-none tracking-[0.01em]"
              >
                {youtubeChannel.label}
              </p>
            </div>

            <div className="flex items-stretch">
              <span
                data-cta-pill
                className="inline-flex items-center rounded-l-full rounded-r-none bg-[oklch(0.97_0.01_92)] px-5 py-3 text-sm font-extrabold text-[oklch(0.16_0.04_164)] sm:px-6 sm:text-base"
              >
                {youtubeChannel.handle}
              </span>
              <span
                data-cta-bell
                className="inline-flex items-center rounded-r-2xl rounded-l-none bg-[oklch(0.16_0.04_164)] px-3.5 text-[oklch(0.95_0.014_92)]"
                aria-hidden="true"
              >
                <Bell className="size-5" weight="fill" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
