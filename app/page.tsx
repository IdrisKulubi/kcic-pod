import { FeaturedEpisodeSection } from "@/components/featured-episode-section"
import { HeroSection } from "@/components/hero-section"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <FeaturedEpisodeSection />
    </main>
  )
}
