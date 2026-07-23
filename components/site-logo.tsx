import Image from "next/image"

import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export const siteLogoSrc = siteConfig.logo

type SiteLogoProps = {
  className?: string
  priority?: boolean
  /** Visual height of the logo lockup */
  size?: "sm" | "md" | "lg"
}

const sizeClass = {
  sm: "h-9 w-auto sm:h-10",
  md: "h-11 w-auto sm:h-12",
  lg: "h-14 w-auto sm:h-16",
} as const

const sizePx = {
  sm: { width: 220, height: 40 },
  md: { width: 280, height: 48 },
  lg: { width: 360, height: 64 },
} as const

export function SiteLogo({
  className,
  priority = false,
  size = "md",
}: SiteLogoProps) {
  const dims = sizePx[size]

  return (
    <Image
      src={siteLogoSrc}
      alt="Sustainably Speaking Africa"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn(
        "object-contain object-left",
        sizeClass[size],
        className
      )}
    />
  )
}
