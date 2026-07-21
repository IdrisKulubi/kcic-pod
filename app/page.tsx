import { FeaturedEpisodeSection } from "@/components/featured-episode-section"
import { HeroSection } from "@/components/hero-section"
import { EpisodeLibrarySection } from "@/components/episode-library/episode-library-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { YoutubeCtaSection } from "@/components/youtube-cta-section"

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <FeaturedEpisodeSection />
      <EpisodeLibrarySection />
      <YoutubeCtaSection />
      <SiteFooter />
    </main>
  )
}
