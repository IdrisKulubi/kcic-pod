import { FeaturedEditor } from "@/components/staff/featured-editor"
import { getFeaturedEpisodeContent, getStaffEpisodeRows } from "@/lib/queries"

export default async function StaffFeaturedPage() {
  const [featured, episodes] = await Promise.all([
    getFeaturedEpisodeContent(),
    getStaffEpisodeRows(),
  ])

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-black">Featured episode</h2>
        <p className="mt-2 text-sm text-[oklch(0.78_0.02_92)]">
          Choose which YouTube episode appears in the homepage featured block and
          edit its supporting copy.
        </p>
      </div>
      <FeaturedEditor
        initial={featured}
        episodes={episodes.map((episode) => ({
          videoId: episode.videoId,
          title: episode.title,
          isHidden: episode.isHidden,
        }))}
      />
    </div>
  )
}
