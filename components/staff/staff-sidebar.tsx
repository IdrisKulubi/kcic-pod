"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  House,
  MicrophoneStage,
  Sparkle,
  Users,
  Waveform,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/staff", label: "Overview", icon: House },
  { href: "/staff/hero", label: "Hero", icon: Sparkle },
  { href: "/staff/featured", label: "Featured episode", icon: MicrophoneStage },
  { href: "/staff/episodes", label: "Episodes", icon: Waveform },
  { href: "/staff/staff", label: "Staff", icon: Users },
] as const

export function StaffSidebar() {
  const pathname = usePathname()

  return (
    <nav
      className="flex flex-col gap-1"
      aria-label="Staff sections"
    >
      {links.map((link) => {
        const active =
          link.href === "/staff"
            ? pathname === "/staff"
            : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-[oklch(0.88_0.02_92)] hover:bg-white/8"
            )}
          >
            <link.icon className="size-4" weight="bold" aria-hidden="true" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
