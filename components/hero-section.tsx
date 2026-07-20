"use client"

import { useEffect, useRef } from "react"
import { ArrowDownRight, ArrowUpRight, Play, Waveform } from "@phosphor-icons/react"
import gsap from "gsap"

import { topics, waveformBars } from "@/lib/site-data"

const titleLines = [
  { text: "Sustainably", className: "font-sans font-black" },
  { text: "Speaking", className: "font-display italic font-normal text-primary" },
  { text: "Africa", className: "font-sans font-black" },
] as const

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-hero-char]")
      const reveals = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]")
      const rings = gsap.utils.toArray<HTMLElement>("[data-frequency-ring]")
      const bars = gsap.utils.toArray<HTMLElement>("[data-wave-bar]")
      const video = root.querySelector<HTMLElement>("[data-hero-video]")
      const frequency = root.querySelector<HTMLElement>("[data-frequency]")

      if (reducedMotion) {
        gsap.set([...chars, ...reveals, ...rings, ...bars, video, frequency], {
          autoAlpha: 1,
          clearProps: "all",
        })
        return
      }

      gsap.set(chars, { autoAlpha: 0, yPercent: 105, rotateX: -34 })
      gsap.set(reveals, { autoAlpha: 0, y: 22 })
      gsap.set(rings, { autoAlpha: 0, scale: 0.72 })
      gsap.set(bars, { scaleY: 0.12 })
      gsap.set(video, { autoAlpha: 0, scale: 1.09 })

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } })

      intro
        .to(video, { autoAlpha: 1, scale: 1.025, duration: 1.9 })
        .to(
          chars,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.88,
            stagger: 0.018,
          },
          0.22
        )
        .to(
          rings,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.11,
          },
          0.52
        )
        .to(
          reveals,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.08,
          },
          0.78
        )
        .to(
          bars,
          {
            scaleY: 1,
            duration: 0.62,
            stagger: { each: 0.035, from: "center" },
          },
          1.04
        )

      gsap.to(rings, {
        scale: (index) => 1 + index * 0.018,
        opacity: (index) => 0.22 + index * 0.12,
        duration: 3.4,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(bars, {
        scaleY: () => gsap.utils.random(0.38, 1),
        duration: 0.75,
        stagger: { each: 0.06, from: "random" },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      if (window.matchMedia("(pointer: fine)").matches && frequency) {
        const moveX = gsap.quickTo(frequency, "x", {
          duration: 1.4,
          ease: "expo.out",
        })
        const moveY = gsap.quickTo(frequency, "y", {
          duration: 1.4,
          ease: "expo.out",
        })

        const onPointerMove = (event: PointerEvent) => {
          moveX((event.clientX / window.innerWidth - 0.5) * 22)
          moveY((event.clientY / window.innerHeight - 0.5) * 18)
        }

        root.addEventListener("pointermove", onPointerMove)
        return () => root.removeEventListener("pointermove", onPointerMove)
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-svh overflow-hidden bg-background px-[clamp(1rem,2.2vw,2.75rem)] pb-8 pt-24 sm:pb-10"
    >
      <video
        data-hero-video
        className="absolute inset-0 size-full object-cover object-center opacity-55 saturate-[0.78] contrast-[1.05]"
        src="/Video%20Project%20final%20%281%29.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-shade absolute inset-0" aria-hidden="true" />
      <div className="hero-grain absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[calc(100svh-9rem)] w-full max-w-none flex-col justify-between">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:gap-4">
          <div className="max-w-5xl self-center">
           

            <h1
              className="hero-display text-[clamp(2.3rem,7vw,6rem)] leading-[0.82] tracking-[0.01em] text-foreground"
              aria-label="Sustainably Speaking Africa"
            >
              {titleLines.map((line) => (
                <span
                  key={line.text}
                  className={`block overflow-hidden pb-[0.24em] ${line.className}`}
                  aria-hidden="true"
                >
                  {line.text.split("").map((char, index) => (
                    <span
                      key={`${line.text}-${char}-${index}`}
                      data-hero-char
                      className="inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div
              data-hero-reveal
              className="mt-7 grid max-w-3xl gap-6 border-t border-white/18 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
            >
              <p className="max-w-xl text-pretty text-sm leading-7 text-foreground/76 sm:text-base">
                African voices on climate finance, clean energy, circularity,
                food systems, and the ideas reshaping our future.
              </p>
              <a
                href="#episodes"
                className="group inline-flex h-13 w-fit min-w-13 items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <Play className="size-4" weight="fill" aria-hidden="true" />
                Listen now
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div
            data-frequency
            className="hero-frequency relative mx-auto hidden aspect-square w-full max-w-[30rem] place-items-center lg:grid"
            aria-hidden="true"
          >
            <span data-frequency-ring className="frequency-orbit frequency-orbit-one" />
            <span data-frequency-ring className="frequency-orbit frequency-orbit-two" />
            <span data-frequency-ring className="frequency-orbit frequency-orbit-three" />
            <span className="frequency-crosshair" />
            <span className="relative grid size-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_0_12px_oklch(0.77_0.2_145_/_0.12)]">
              <Waveform className="size-9" weight="bold" />
            </span>
            <span className="absolute bottom-[13%] right-[4%] max-w-44 text-left text-[0.68rem] font-bold uppercase leading-5 tracking-[0.18em] text-foreground/65">
              Voices. Ideas.
              <br />
              African solutions.
            </span>
          </div>
        </div>

        <div
          data-hero-reveal
          className="grid items-end gap-6 border-t border-white/18 pt-5 lg:grid-cols-[1fr_auto_1fr]"
        >
          <div className="hidden items-center gap-4 lg:flex">
            <span className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-secondary">
              Now on air
            </span>
            <span className="h-px w-10 bg-secondary/60" />
            <p className="text-sm font-semibold text-foreground/88">
              Why Africa needs its own sustainability conversation
            </p>
          </div>

          <div className="flex h-9 items-center justify-center gap-1.5" aria-hidden="true">
            {waveformBars.concat(waveformBars.slice(0, 6)).map((height, index) => (
              <span
                key={`${height}-${index}`}
                data-wave-bar
                className="waveform-bar"
                style={{ height: `${Math.max(24, height * 0.48)}%` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <div className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Featured themes">
              {topics.slice(0, 3).map((topic) => (
                <a
                  key={topic.slug}
                  href={`#${topic.slug}`}
                  className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/58 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  {topic.label}
                </a>
              ))}
            </div>
            <a
              href="#themes"
              className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/22 text-foreground transition-colors hover:border-primary hover:text-primary sm:grid"
              aria-label="Explore themes"
            >
              <ArrowDownRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
