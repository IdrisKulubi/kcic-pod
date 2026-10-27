import { EpisodesManager } from "@/components/staff/episodes-manager"
import { syncEpisodes } from "@/lib/actions/episodes"
import { getStaffEpisodeRows, loadSyncState } from "@/lib/queries"

const ONE_HOUR_MS = 60 * 60 * 1000

export default async function StaffEpisodesPage() {
  const sync = await loadSyncState()
  const shouldAutoSync =
    !sync.lastSyncedAt ||
    Date.now() - new Date(sync.lastSyncedAt).getTime() > ONE_HOUR_MS

  if (shouldAutoSync) {
    await syncEpisodes()
  }

  const episodes = await getStaffEpisodeRows()

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-black">Episodes</h2>
        <p className="mt-2 text-sm text-[oklch(0.78_0.02_92)]">
          Sync from YouTube, choose top featured episodes, and reorder the full
          episode list shown on the homepage.
        </p>
      </div>
      <EpisodesManager
        initialEpisodes={episodes.map((episode) => ({
          videoId: episode.videoId,
          title: episode.title,
          topic: episode.topic,
          summary: episode.summary,
          duration: episode.duration,
          isHidden: episode.isHidden,
          topFeaturedPosition: episode.topFeaturedPosition,
          position: episode.position,
        }))}
      />
    </div>
  )
}
