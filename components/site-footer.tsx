"use client"

import { useEffect, useRef } from "react"
import {
  InstagramLogo,
  LinkedinLogo,
  Waveform,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react"
import gsap from "gsap"

import { navItems, topics, youtubeChannel } from "@/lib/site-data"

const socialLinks = [
  { label: "YouTube", href: youtubeChannel.url, icon: YoutubeLogo },
  { label: "X", href: "https://x.com", icon: XLogo },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramLogo },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinLogo },
] as const

const footerColumns = [
  {
    title: "Explore",
    links: navItems.map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Themes",
    links: topics.map((topic) => ({
      label: topic.label,
      href: `#${topic.slug}`,
    })),
  },
  {
    title: "Listen",
    links: [
      { label: "YouTube", href: youtubeChannel.url },
      { label: "Spotify", href: "https://open.spotify.com" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com" },
      {
        label: "Contact",
        href: "mailto:podcast@kcic.org?subject=Sustainably%20Speaking%20Africa",
      },
    ],
  },
] as const

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookies Settings", href: "#cookies" },
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
          y: 20,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "expo.out",
        })
        observer.disconnect()
      },
      { threshold: 0.12 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(2rem,4vw,3.5rem)]"
    >
      <div
        data-footer-reveal
        className="mx-auto max-w-[96rem] rounded-2xl border border-border bg-card px-[clamp(1.25rem,3vw,3rem)] py-[clamp(2rem,4vw,3rem)] shadow-[0_8px_24px_oklch(0.18_0.038_164_/_0.06)]"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label="Sustainably Speaking Africa home"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-[oklch(0.18_0.038_164)] text-primary">
                <Waveform className="size-5" weight="bold" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-[-0.02em] text-foreground">
                Sustainably Speaking
              </span>
            </a>

            <p className="mt-5 max-w-sm text-pretty text-sm leading-6 text-muted-foreground">
              African climate stories in full signal. Conversations with founders,
              financiers, and community builders shaping innovation across the
              continent.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  aria-label={social.label}
                >
                  <social.icon className="size-4" weight="fill" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-extrabold text-foreground">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sustainably Speaking Africa. All
              rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
