"use client"

import { useEffect, useRef } from "react"
import {
  AppleLogo,
  ArrowUpRight,
  EnvelopeSimple,
  SpotifyLogo,
  Waveform,
  YoutubeLogo,
} from "@phosphor-icons/react"
import gsap from "gsap"

import { navItems, topics, youtubeChannel } from "@/lib/site-data"

const listenLinks = [
  {
    label: "YouTube",
    href: youtubeChannel.url,
    icon: YoutubeLogo,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com",
    icon: SpotifyLogo,
  },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com",
    icon: AppleLogo,
  },
] as const

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        gsap.from(footer.querySelectorAll("[data-footer-reveal]"), {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
        })
        observer.disconnect()
      },
      { threshold: 0.15 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="light-surface border-t border-border">
      <div className="mx-auto max-w-[96rem] px-[clamp(1rem,2.2vw,2.75rem)] pt-[clamp(3rem,6vw,5rem)] pb-8">
        <div className="grid gap-10 border-b border-border pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] lg:gap-16">
          <div data-footer-reveal className="max-w-md">
            <a
              href="#top"
              className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Sustainably Speaking Africa home"
            >
              <span className="relative grid size-11 place-items-center rounded-full border border-primary/50 bg-primary/10 text-primary">
                <span className="absolute inset-1 rounded-full border border-secondary/30" />
                <Waveform className="size-5" weight="bold" aria-hidden="true" />
              </span>
              <span className="leading-none">
                <span className="block text-sm font-extrabold tracking-[0.01em]">
                  Sustainably Speaking
                </span>
                <span className="mt-1 block font-display text-base italic text-secondary">
                  Africa
                </span>
              </span>
            </a>

            <p className="mt-6 text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              African climate stories in full signal. Conversations with founders,
              financiers, and community builders shaping innovation across the
              continent.
            </p>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              A KCIC production
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div data-footer-reveal>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-secondary">
                Explore
              </h2>
              <ul className="mt-4 space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-reveal>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-secondary">
                Themes
              </h2>
              <ul className="mt-4 space-y-3">
                {topics.map((topic) => (
                  <li key={topic.slug}>
                    <a
                      href={`#${topic.slug}`}
                      className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {topic.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-reveal>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-secondary">
                Listen
              </h2>
              <ul className="mt-4 space-y-3">
                {listenLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <link.icon className="size-4" weight="fill" aria-hidden="true" />
                      {link.label}
                      <ArrowUpRight
                        className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          data-footer-reveal
          className="mt-8 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-display text-2xl italic tracking-[-0.02em] text-primary sm:text-3xl">
              The conversation continues.
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Suggest a guest, share a question, or join the next episode drop.
            </p>
          </div>
          <a
            href="mailto:podcast@kcic.org?subject=Sustainably%20Speaking%20Africa"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-extrabold text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <EnvelopeSimple className="size-4" weight="bold" aria-hidden="true" />
            Contact the team
          </a>
        </div>

        <div
          data-footer-reveal
          className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()} Sustainably Speaking Africa · Kenya
            Climate Innovation Center
          </p>
          <p className="font-medium">Innovation for a greener world</p>
        </div>
      </div>
    </footer>
  )
}
