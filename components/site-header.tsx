"use client"

import { useEffect, useState } from "react"
import { List, X } from "@phosphor-icons/react"
import Link from "next/link"

import { SiteLogo } from "@/components/site-logo"
import { navItems } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/88 backdrop-blur-md">
      <nav
        className="flex h-16 w-full max-w-none items-center justify-between gap-4 px-[clamp(1rem,2.2vw,2.75rem)] sm:h-20"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group min-w-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Sustainably Speaking Africa home"
        >
          <SiteLogo size="lg" priority className="max-w-[min(100%,18rem)] sm:max-w-[22rem]" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-foreground/65 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <List className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-white/10 bg-background/95 backdrop-blur-md md:hidden",
          menuOpen ? "block" : "hidden"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
