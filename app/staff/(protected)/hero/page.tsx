import { HeroEditor } from "@/components/staff/hero-editor"
import { getSiteContent } from "@/lib/queries"

export default async function StaffHeroPage() {
  const content = await getSiteContent()

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-black">Hero section</h2>
        <p className="mt-2 text-sm text-[oklch(0.78_0.02_92)]">
          Update the homepage hero headline, subheading, and supporting copy.
        </p>
      </div>
      <HeroEditor initial={content} />
    </div>
  )
}
