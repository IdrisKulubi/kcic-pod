import type { Metadata } from "next"

import { AboutPageContent } from "@/components/about/about-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `${siteConfig.name} amplifies African-led climate solutions through storytelling, innovation, and the lived experiences of people building resilient futures across the continent.`,
  path: "/about",
})

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader />
      <AboutPageContent />
      <SiteFooter />
    </main>
  )
}
