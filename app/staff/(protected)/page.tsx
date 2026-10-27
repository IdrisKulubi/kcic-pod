import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getFeaturedEpisodeContent,
  getStaffEpisodeRows,
  loadSyncState,
} from "@/lib/queries"

export default async function StaffOverviewPage() {
  const [episodes, featured, sync] = await Promise.all([
    getStaffEpisodeRows(),
    getFeaturedEpisodeContent(),
    loadSyncState(),
  ])

  const visibleCount = episodes.filter((row) => !row.isHidden).length
  const topFeaturedCount = episodes.filter(
    (row) => row.topFeaturedPosition !== null
  ).length

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-black">Overview</h2>
        <p className="mt-2 max-w-2xl text-sm text-[oklch(0.78_0.02_92)]">
          Manage homepage copy, featured episode selection, episode ordering, and
          staff accounts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
          <CardHeader>
            <CardTitle>Episodes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-extrabold">{visibleCount}</span> visible on
              site
            </p>
            <p>
              <span className="font-extrabold">{topFeaturedCount}</span> in top
              featured
            </p>
            <Link
              href="/staff/episodes"
              className={cn(buttonVariants({ variant: "outline" }), "mt-3")}
            >
              Manage episodes
            </Link>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
          <CardHeader>
            <CardTitle>Featured episode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="line-clamp-3 font-semibold">{featured.title}</p>
            <Link
              href="/staff/featured"
              className={cn(buttonVariants({ variant: "outline" }), "mt-3")}
            >
              Edit featured block
            </Link>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
          <CardHeader>
            <CardTitle>YouTube sync</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              Last sync:{" "}
              {sync.lastSyncedAt
                ? new Date(sync.lastSyncedAt).toLocaleString()
                : "Not yet synced"}
            </p>
            {sync.lastError ? (
              <p className="text-destructive">{sync.lastError}</p>
            ) : null}
            <Link
              href="/staff/episodes"
              className={cn(buttonVariants({ variant: "outline" }), "mt-3")}
            >
              Sync from episodes
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
