"use client"

import { useEffect, useRef, type ReactNode, type RefObject } from "react"
import {
  ApplePodcastsLogo,
  ArrowRight,
  Broadcast,
  ChatsCircle,
  Compass,
  EnvelopeSimple,
  GlobeHemisphereWest,
  Lightbulb,
  MapPin,
  MicrophoneStage,
  Play,
  SpotifyLogo,
  UsersThree,
  YoutubeLogo,
} from "@phosphor-icons/react"
import gsap from "gsap"
import Link from "next/link"

import {
  aboutChallenge,
  aboutHero,
  aboutMission,
  aboutThemes,
  audienceFocus,
  distributionNote,
  episodeFormats,
  kcicPartner,
  semaboxPartner,
  strategicObjectives,
  targetAudiences,
} from "@/lib/about-content"
import { siteConfig } from "@/lib/site"

const formatIcons = [
  Lightbulb,
  ChatsCircle,
  MapPin,
  UsersThree,
  Compass,
] as const

const listenLinks = [
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

function useAboutReveal(sectionRef: RefObject<HTMLElement | null>) {
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

        gsap.from(section.querySelectorAll("[data-about-reveal]"), {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "expo.out",
        })
        observer.disconnect()
      },
      { threshold: 0.12 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionRef])
}

function AboutSection({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useAboutReveal(ref)

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  )
}

export function AboutPageContent() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reducedMotion) return

    gsap.from(hero.querySelectorAll("[data-about-hero]"), {
      y: 36,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "expo.out",
    })
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-background px-[clamp(1rem,2.2vw,2.75rem)] pt-28 pb-[clamp(4rem,8vw,7rem)]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,oklch(0.77_0.2_145_/_0.14),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-[96rem]">
          <p
            data-about-hero
            className="text-sm font-extrabold tracking-[0.2em] text-secondary uppercase"
          >
            {aboutHero.eyebrow}
          </p>
          <h1
            data-about-hero
            className="mt-5 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.9] font-black tracking-[0.01em] text-balance"
          >
            {aboutHero.title}
            <span className="mt-1 block font-display font-normal text-primary italic">
              {aboutHero.titleAccent}
            </span>
          </h1>
          <p
            data-about-hero
            className="mt-7 max-w-2xl text-pretty text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8"
          >
            {aboutHero.description}
          </p>
        </div>
      </section>

      {/* Challenge + Why Now */}
      <AboutSection className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]">
        <div className="mx-auto max-w-[96rem]">
          <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
            <div data-about-reveal>
              <h2 className="text-2xl font-black sm:text-3xl">
                {aboutChallenge.challenge.title}
              </h2>
              <div className="mt-5 space-y-4">
                {aboutChallenge.challenge.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-pretty text-sm leading-7 text-muted-foreground sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div data-about-reveal>
              <h2 className="text-2xl font-black sm:text-3xl">
                {aboutChallenge.whyNow.title}
              </h2>
              <div className="mt-5 space-y-4">
                {aboutChallenge.whyNow.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-pretty text-sm leading-7 text-muted-foreground sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <blockquote
            data-about-reveal
            className="mt-[clamp(2.5rem,5vw,4rem)] border-l-4 border-primary pl-6"
          >
            <p className="max-w-4xl text-pretty font-display text-[clamp(1.25rem,2.5vw,1.85rem)] leading-snug font-normal text-foreground italic">
              {aboutChallenge.purpose}
            </p>
          </blockquote>
        </div>
      </AboutSection>

      {/* Mission & Vision */}
      <AboutSection className="relative isolate overflow-hidden bg-background px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]">
        <div
          className="pointer-events-none absolute top-0 right-0 hidden aspect-square w-[28rem] opacity-30 lg:block"
          aria-hidden="true"
        >
          <span className="absolute inset-0 rounded-full border border-primary/25" />
          <span className="absolute inset-[18%] rounded-full border border-secondary/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-[96rem]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
            <div data-about-reveal>
              <p className="text-sm font-extrabold text-secondary">
                {aboutMission.vision.label}
              </p>
              <p className="mt-4 max-w-xl text-pretty text-[clamp(1.35rem,2.8vw,2rem)] leading-snug font-black">
                {aboutMission.vision.text}
              </p>
            </div>
            <div data-about-reveal>
              <p className="text-sm font-extrabold text-primary">
                {aboutMission.mission.label}
              </p>
              <p className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-normal text-primary italic">
                {aboutMission.mission.text}
              </p>
              <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-foreground/72 sm:text-base">
                {aboutMission.approach}
              </p>
            </div>
          </div>
        </div>
      </AboutSection>

      {/* Episode Formats */}
      <AboutSection className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]">
        <div className="mx-auto max-w-[96rem]">
          <div data-about-reveal className="mb-10 max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight">
              Episode Formats
            </h2>
            <p className="mt-3 text-muted-foreground">
              Five ways we bring Africa&apos;s climate story to life.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {episodeFormats.map((format, index) => {
              const Icon = formatIcons[index]
              return (
                <li
                  key={format.title}
                  data-about-reveal
                  className="border-t border-border pt-5"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-primary/30 text-primary">
                    <Icon className="size-5" weight="bold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold">{format.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {format.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </AboutSection>

      {/* Strategic Objectives */}
      <AboutSection className="bg-background px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]">
        <div className="mx-auto max-w-[96rem]">
          <h2
            data-about-reveal
            className="mb-10 text-[clamp(2rem,4vw,3rem)] font-black leading-tight"
          >
            Strategic Objectives
          </h2>
          <ol className="space-y-0">
            {strategicObjectives.map((objective) => (
              <li
                key={objective.number}
                data-about-reveal
                className="grid gap-4 border-t border-white/12 py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8"
              >
                <span className="font-display text-4xl italic text-primary">
                  {objective.number}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold sm:text-2xl">
                    {objective.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-pretty text-sm leading-7 text-foreground/72 sm:text-base">
                    {objective.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </AboutSection>

      {/* Themes */}
      <AboutSection className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(3rem,5vw,5rem)]">
        <div className="mx-auto max-w-[96rem]">
          <h2 data-about-reveal className="mb-6 text-lg font-extrabold">
            Themes we explore
          </h2>
          <ul
            data-about-reveal
            className="flex flex-wrap gap-2.5"
            aria-label="Podcast themes"
          >
            {aboutThemes.map((theme) => (
              <li
                key={theme}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground"
              >
                {theme}
              </li>
            ))}
          </ul>
        </div>
      </AboutSection>

      {/* Target Audience */}
      <AboutSection className="bg-background px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]">
        <div className="mx-auto max-w-[96rem]">
          <div data-about-reveal className="mb-10 max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight">
              Who we serve
            </h2>
            <p className="mt-3 text-foreground/72">{audienceFocus}</p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {targetAudiences.map((audience) => (
              <li
                key={audience.title}
                data-about-reveal
                className="border-t border-white/12 pt-5"
              >
                <h3 className="font-extrabold text-foreground">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65">
                  {audience.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </AboutSection>

      {/* Platforms */}
      <AboutSection className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(5rem,8vw,8rem)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div data-about-reveal className="w-full">
            <h2 className="text-[clamp(2.5rem,5vw,3.75rem)] font-black leading-tight">
              Listen &amp; follow
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {distributionNote}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {listenLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3.5 text-base font-extrabold transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <link.icon
                    className={`size-5 ${link.iconClass}`}
                    weight="fill"
                    aria-hidden="true"
                  />
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex items-center gap-2.5 text-base font-bold text-foreground transition-colors hover:text-primary"
            >
              <EnvelopeSimple className="size-5" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </AboutSection>

      {/* Partners */}
      <AboutSection className="bg-background px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]">
        <div className="mx-auto max-w-[96rem]">
          <h2
            data-about-reveal
            className="mb-10 text-[clamp(2rem,4vw,3rem)] font-black leading-tight"
          >
            Behind the Podcast
          </h2>
          <div className="grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-2">
            <article data-about-reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-primary/35 text-primary">
                  <GlobeHemisphereWest
                    className="size-5"
                    weight="bold"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-xl font-extrabold">{kcicPartner.name}</h3>
              </div>
              <p className="text-sm leading-7 text-foreground/72 sm:text-base">
                {kcicPartner.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-secondary">
                Sectors: {kcicPartner.sectors}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {kcicPartner.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-2xl italic text-primary sm:text-3xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs font-semibold text-foreground/60">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
            <article data-about-reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-secondary/35 text-secondary">
                  <Broadcast
                    className="size-5"
                    weight="bold"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-xl font-extrabold">{semaboxPartner.name}</h3>
              </div>
              <p className="text-sm leading-7 text-foreground/72 sm:text-base">
                {semaboxPartner.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground/65">
                {semaboxPartner.detail}
              </p>
            </article>
          </div>
        </div>
      </AboutSection>

      {/* CTA */}
      <section className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(2rem,4vw,3.5rem)]">
        <div className="mx-auto max-w-[96rem]">
          <div className="relative overflow-hidden bg-primary px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.25rem,4.5vw,3.5rem)] text-primary-foreground">
            <TornEdge />
            <TornEdge flip />
            <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[clamp(1.35rem,3vw,2rem)] font-black leading-tight">
                  Ready to listen?
                </p>
                <p className="mt-2 max-w-lg text-sm text-primary-foreground/85 sm:text-base">
                  Start with our launch conversation, then explore the full
                  archive of African-led climate stories.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#episodes"
                  className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.16_0.04_164)] px-5 py-3 text-sm font-extrabold text-[oklch(0.95_0.014_92)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <Play className="size-4" weight="fill" aria-hidden="true" />
                  Listen now
                </Link>
                <a
                  href={`mailto:${siteConfig.email}?subject=Sustainably%20Speaking%20Africa`}
                  className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.16_0.04_164_/_0.25)] bg-[oklch(0.16_0.04_164_/_0.1)] px-5 py-3 text-sm font-extrabold backdrop-blur-[2px] transition-colors hover:bg-[oklch(0.16_0.04_164_/_0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <MicrophoneStage className="size-4" weight="fill" aria-hidden="true" />
                  Get in touch
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
