"use client"

import { useEffect,  useState } from "react"
import { List,  Waveform, X } from "@phosphor-icons/react"

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/24 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:px-10"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Sustainably Speaking Africa home"
        >
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-primary/55 bg-background/30 text-primary sm:size-11">
            <span className="absolute inset-1 rounded-full border border-secondary/30 transition-transform duration-500 group-hover:rotate-45" />
            <Waveform className="size-5" weight="bold" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-sm font-extrabold tracking-[0.01em] text-foreground">
              Sustainably Speaking
            </span>
            <span className="mt-1 font-display text-sm italic text-secondary">Africa</span>
          </span>
        </a>

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
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
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
