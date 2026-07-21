import type { Metadata } from "next"

import { FeaturedEpisodeSection } from "@/components/featured-episode-section"
import { HeroSection } from "@/components/hero-section"
import { EpisodeLibrarySection } from "@/components/episode-library/episode-library-section"
import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { YoutubeCtaSection } from "@/components/youtube-cta-section"
import { buildEpisodeListJsonLd, buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: undefined,
  description:
    "Listen to Sustainably Speaking Africa — African voices on climate finance, clean energy, circularity, food systems, entrepreneurship, and leadership from KCIC.",
  path: "/",
})

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <JsonLd data={buildEpisodeListJsonLd()} />
      <SiteHeader />
      <HeroSection />
      <FeaturedEpisodeSection />
      <EpisodeLibrarySection />
      <YoutubeCtaSection />
      <SiteFooter />
    </main>
  )
}
