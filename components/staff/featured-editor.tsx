"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateFeaturedEpisode } from "@/lib/actions/featured"
import type { FeaturedEpisodeContent } from "@/lib/cms-types"
import { getEpisodeThumbnail } from "@/lib/episodes"

type EpisodeOption = {
  videoId: string
  title: string
  isHidden: boolean
}

type FeaturedEditorProps = {
  initial: FeaturedEpisodeContent
  episodes: EpisodeOption[]
}

export function FeaturedEditor({ initial, episodes }: FeaturedEditorProps) {
  const [form, setForm] = useState({
    videoId: initial.videoId,
    eyebrow: initial.eyebrow,
    headingLine: initial.headingLine,
    headingAccent: initial.headingAccent,
    intro: initial.intro,
    title: initial.title,
    description: initial.description.join("\n\n"),
    moderator: initial.moderator ?? "",
    panelists: initial.panelists?.join(", ") ?? "",
    quote: initial.quote ?? "",
    startSeconds: initial.startSeconds,
  })
  const [query, setQuery] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const visibleEpisodes = useMemo(
    () =>
      episodes
        .filter((episode) => !episode.isHidden)
        .filter((episode) =>
          episode.title.toLowerCase().includes(query.toLowerCase())
        ),
    [episodes, query]
  )

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSaving(true)

    const result = await updateFeaturedEpisode({
      videoId: form.videoId,
      eyebrow: form.eyebrow,
      headingLine: form.headingLine,
      headingAccent: form.headingAccent,
      intro: form.intro,
      title: form.title,
      description: form.description
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      moderator: form.moderator,
      panelists: form.panelists
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean),
      quote: form.quote,
      startSeconds: form.startSeconds,
    })

    setIsSaving(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Featured episode saved")
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="search">Choose episode</Label>
          <Input
            id="search"
            placeholder="Search episodes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>
        <div className="grid max-h-72 gap-2 overflow-y-auto pr-1">
          {visibleEpisodes.map((episode) => (
            <button
              key={episode.videoId}
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  videoId: episode.videoId,
                  title: episode.title,
                }))
              }
              className={`grid grid-cols-[5rem_minmax(0,1fr)] gap-3 rounded-lg border p-2 text-left transition-colors ${
                form.videoId === episode.videoId
                  ? "border-primary bg-primary/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="relative aspect-video overflow-hidden rounded-sm">
                <Image
                  fill
                  sizes="80px"
                  src={getEpisodeThumbnail(episode.videoId)}
                  alt=""
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-semibold">{episode.title}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="eyebrow">Eyebrow</Label>
            <Input
              id="eyebrow"
              value={form.eyebrow}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, eyebrow: event.target.value }))
              }
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startSeconds">YouTube start (seconds)</Label>
            <Input
              id="startSeconds"
              type="number"
              min={0}
              value={form.startSeconds}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  startSeconds: Number(event.target.value),
                }))
              }
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="headingLine">Heading line</Label>
            <Input
              id="headingLine"
              value={form.headingLine}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, headingLine: event.target.value }))
              }
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="headingAccent">Heading accent</Label>
            <Input
              id="headingAccent"
              value={form.headingAccent}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  headingAccent: event.target.value,
                }))
              }
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="intro">Intro paragraph</Label>
          <Textarea
            id="intro"
            rows={3}
            value={form.intro}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, intro: event.target.value }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Episode title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description paragraphs</Label>
          <Textarea
            id="description"
            rows={6}
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
          <p className="text-xs text-[oklch(0.72_0.02_92)]">
            Separate paragraphs with a blank line.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="moderator">Moderator (optional)</Label>
            <Input
              id="moderator"
              value={form.moderator}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, moderator: event.target.value }))
              }
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="panelists">Panelists (comma-separated)</Label>
            <Input
              id="panelists"
              value={form.panelists}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, panelists: event.target.value }))
              }
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="quote">Quote (optional)</Label>
          <Textarea
            id="quote"
            rows={3}
            value={form.quote}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, quote: event.target.value }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>

        <Button type="submit" disabled={isSaving} className="h-11 w-fit font-extrabold">
          {isSaving ? "Saving…" : "Save featured episode"}
        </Button>
      </form>
    </div>
  )
}
