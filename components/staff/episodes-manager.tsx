"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ArrowDown, ArrowUp, DotsSixVertical } from "@phosphor-icons/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  reorderEpisodes,
  setEpisodeHidden,
  setTopFeatured,
  syncEpisodes,
  updateEpisodeDetails,
} from "@/lib/actions/episodes"
import { getEpisodeThumbnail } from "@/lib/episodes"

export type StaffEpisodeRow = {
  videoId: string
  title: string
  topic: string
  summary: string | null
  duration: string
  isHidden: boolean
  topFeaturedPosition: number | null
  position: number
}

type EpisodesManagerProps = {
  initialEpisodes: StaffEpisodeRow[]
}

function SortableEpisodeItem({
  episode,
  index,
  total,
  onMove,
  onToggleHidden,
  onPatchEpisode,
  onPersistEpisode,
}: {
  episode: StaffEpisodeRow
  index: number
  total: number
  onMove: (from: number, to: number) => void
  onToggleHidden: (videoId: string, isHidden: boolean) => void
  onPatchEpisode: (videoId: string, patch: Partial<StaffEpisodeRow>) => void
  onPersistEpisode: (videoId: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: episode.videoId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="grid gap-4 rounded-lg border border-white/10 bg-[oklch(0.13_0.034_164)] p-4"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          className="mt-1 cursor-grab text-[oklch(0.72_0.02_92)] active:cursor-grabbing"
          aria-label={`Drag to reorder ${episode.title}`}
          {...attributes}
          {...listeners}
        >
          <DotsSixVertical className="size-5" weight="bold" />
        </button>
        <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-sm">
          <Image
            fill
            sizes="96px"
            src={getEpisodeThumbnail(episode.videoId)}
            alt=""
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">{episode.title}</p>
          <p className="mt-1 text-xs text-[oklch(0.72_0.02_92)]">
            #{String(index + 1).padStart(2, "0")} · {episode.videoId}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            disabled={index === 0}
            onClick={() => onMove(index, index - 1)}
            aria-label="Move up"
          >
            <ArrowUp className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            disabled={index === total - 1}
            onClick={() => onMove(index, index + 1)}
            aria-label="Move down"
          >
            <ArrowDown className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label>Topic</Label>
          <Input
            value={episode.topic}
            onChange={(event) =>
              onPatchEpisode(episode.videoId, { topic: event.target.value })
            }
            onBlur={() => onPersistEpisode(episode.videoId)}
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>
        <div className="grid gap-2">
          <Label>Duration</Label>
          <Input
            value={episode.duration}
            onChange={(event) =>
              onPatchEpisode(episode.videoId, { duration: event.target.value })
            }
            onBlur={() => onPersistEpisode(episode.videoId)}
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>
        <div className="flex items-end gap-3 pb-1">
          <Switch
            checked={!episode.isHidden}
            onCheckedChange={(checked) =>
              onToggleHidden(episode.videoId, !checked)
            }
            aria-label={`Show ${episode.title} on site`}
          />
          <span className="text-sm">Visible on site</span>
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Summary</Label>
        <Textarea
          rows={2}
          value={episode.summary ?? ""}
          onChange={(event) =>
            onPatchEpisode(episode.videoId, { summary: event.target.value })
          }
          onBlur={() => onPersistEpisode(episode.videoId)}
          className="border-white/15 bg-[oklch(0.12_0.03_164)]"
        />
      </div>
    </li>
  )
}

export function EpisodesManager({ initialEpisodes }: EpisodesManagerProps) {
  const [episodes, setEpisodes] = useState(initialEpisodes)
  const [topFeaturedIds, setTopFeaturedIds] = useState(
    initialEpisodes
      .filter((episode) => episode.topFeaturedPosition !== null)
      .sort(
        (a, b) =>
          (a.topFeaturedPosition ?? 0) - (b.topFeaturedPosition ?? 0)
      )
      .map((episode) => episode.videoId)
  )
  const [isSyncing, setIsSyncing] = useState(false)
  const [isSavingOrder, setIsSavingOrder] = useState(false)
  const [isSavingTop, setIsSavingTop] = useState(false)

  const visibleEpisodes = useMemo(
    () => episodes.filter((episode) => !episode.isHidden),
    [episodes]
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function patchEpisode(videoId: string, patch: Partial<StaffEpisodeRow>) {
    setEpisodes((prev) =>
      prev.map((episode) =>
        episode.videoId === videoId ? { ...episode, ...patch } : episode
      )
    )
  }

  async function persistEpisode(videoId: string) {
    const episode = episodes.find((item) => item.videoId === videoId)
    if (!episode) return

    const result = await updateEpisodeDetails({
      videoId: episode.videoId,
      topic: episode.topic,
      summary: episode.summary ?? "",
      duration: episode.duration,
    })
    if (!result.ok) {
      toast.error(result.error)
    }
  }

  async function handleToggleHidden(videoId: string, isHidden: boolean) {
    setEpisodes((prev) =>
      prev.map((episode) =>
        episode.videoId === videoId ? { ...episode, isHidden } : episode
      )
    )
    const result = await setEpisodeHidden({ videoId, isHidden })
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    if (isHidden) {
      setTopFeaturedIds((prev) => prev.filter((id) => id !== videoId))
    }
  }

  function handleMove(from: number, to: number) {
    if (to < 0 || to >= episodes.length) return
    const next = arrayMove(episodes, from, to)
    setEpisodes(next)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = episodes.findIndex((episode) => episode.videoId === active.id)
    const newIndex = episodes.findIndex((episode) => episode.videoId === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    setEpisodes(arrayMove(episodes, oldIndex, newIndex))
  }

  async function handleSaveOrder() {
    setIsSavingOrder(true)
    const result = await reorderEpisodes({
      videoIds: episodes.map((episode) => episode.videoId),
    })
    setIsSavingOrder(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Episode order saved")
  }

  async function handleSaveTopFeatured() {
    if (topFeaturedIds.length === 0) {
      toast.error("Select at least one top featured episode")
      return
    }
    setIsSavingTop(true)
    const result = await setTopFeatured({ videoIds: topFeaturedIds })
    setIsSavingTop(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Top featured updated")
  }

  async function handleSync() {
    setIsSyncing(true)
    const result = await syncEpisodes()
    setIsSyncing(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success(`Synced ${result.data?.count ?? 0} episodes from YouTube`)
    window.location.reload()
  }

  function toggleTopFeatured(videoId: string) {
    setTopFeaturedIds((prev) => {
      if (prev.includes(videoId)) {
        return prev.filter((id) => id !== videoId)
      }
      if (prev.length >= 5) {
        toast.error("You can select up to 5 top featured episodes")
        return prev
      }
      return [...prev, videoId]
    })
  }

  function moveTopFeatured(videoId: string, direction: -1 | 1) {
    setTopFeaturedIds((prev) => {
      const index = prev.indexOf(videoId)
      if (index < 0) return prev
      const target = index + direction
      if (target < 0 || target >= prev.length) return prev
      return arrayMove(prev, index, target)
    })
  }

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={handleSync}
          disabled={isSyncing}
          className="font-extrabold"
        >
          {isSyncing ? "Syncing…" : "Sync from YouTube"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveOrder}
          disabled={isSavingOrder}
          className="border-white/15"
        >
          {isSavingOrder ? "Saving order…" : "Save all episodes order"}
        </Button>
      </div>

      <Card className="border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
        <CardHeader>
          <CardTitle>Top featured (1–5)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {visibleEpisodes.map((episode) => {
            const selected = topFeaturedIds.includes(episode.videoId)
            const rank = topFeaturedIds.indexOf(episode.videoId)
            return (
              <div
                key={episode.videoId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{episode.title}</p>
                  {selected ? (
                    <p className="text-xs text-primary">
                      Position {rank + 1}
                      {rank === 0 ? " (lead card)" : ""}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  {selected ? (
                    <>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="outline"
                        disabled={rank === 0}
                        onClick={() => moveTopFeatured(episode.videoId, -1)}
                        aria-label="Move up in top featured"
                      >
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="outline"
                        disabled={rank === topFeaturedIds.length - 1}
                        onClick={() => moveTopFeatured(episode.videoId, 1)}
                        aria-label="Move down in top featured"
                      >
                        <ArrowDown className="size-4" />
                      </Button>
                    </>
                  ) : null}
                  <Button
                    type="button"
                    variant={selected ? "default" : "outline"}
                    onClick={() => toggleTopFeatured(episode.videoId)}
                  >
                    {selected ? "Selected" : "Select"}
                  </Button>
                </div>
              </div>
            )
          })}
          <Button
            type="button"
            onClick={handleSaveTopFeatured}
            disabled={isSavingTop}
            className="w-fit font-extrabold"
          >
            {isSavingTop ? "Saving…" : "Save top featured"}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-xl font-black">All episodes order</h3>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={episodes.map((episode) => episode.videoId)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="grid gap-4">
              {episodes.map((episode, index) => (
                <SortableEpisodeItem
                  key={episode.videoId}
                  episode={episode}
                  index={index}
                  total={episodes.length}
                  onMove={handleMove}
                  onToggleHidden={handleToggleHidden}
                  onPatchEpisode={patchEpisode}
                  onPersistEpisode={persistEpisode}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
