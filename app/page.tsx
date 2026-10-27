import type { Metadata } from "next"

import { FeaturedEpisodeSection } from "@/components/featured-episode-section"
import { HeroSection } from "@/components/hero-section"
import { EpisodeLibrarySection } from "@/components/episode-library/episode-library-section"
import { JsonLd } from "@/components/json-ld"
import { NarrativeShiftSection } from "@/components/narrative-shift-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { YoutubeCtaSection } from "@/components/youtube-cta-section"
import {
  getAllEpisodes,
  getFeaturedEpisodeContent,
  getSiteContent,
  getTopFeaturedEpisodes,
} from "@/lib/queries"
import { buildEpisodeListJsonLd, buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: undefined,
  description:
    "Sustainably Speaking Africa amplifies African-led climate solutions, lived experience, and the people building resilient futures across the continent.",
  path: "/",
})

export default async function Page() {
  const [heroContent, featuredEpisode, topFeatured, allEpisodes] =
    await Promise.all([
      getSiteContent(),
      getFeaturedEpisodeContent(),
      getTopFeaturedEpisodes(),
      getAllEpisodes(),
    ])

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={buildEpisodeListJsonLd(allEpisodes)} />
      <SiteHeader />
      <HeroSection content={heroContent} />
      <FeaturedEpisodeSection episode={featuredEpisode} />
      <NarrativeShiftSection />
      <EpisodeLibrarySection
        topFeatured={topFeatured}
        allEpisodes={allEpisodes}
      />
      <YoutubeCtaSection />
      <SiteFooter />
    </main>
  )
}
