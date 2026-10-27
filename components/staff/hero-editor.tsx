"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateHeroContent } from "@/lib/actions/site-content"
import type { HeroContent } from "@/lib/cms-types"

type HeroEditorProps = {
  initial: HeroContent
}

export function HeroEditor({ initial }: HeroEditorProps) {
  const [form, setForm] = useState(initial)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSaving(true)
    const result = await updateHeroContent(form)
    setIsSaving(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success("Hero content saved")
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-3">
          {(
            [
              ["heroTitleLine1", "Title line 1"],
              ["heroTitleAccent", "Title accent"],
              ["heroTitleLine3", "Title line 3"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="grid gap-2">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                value={form[key]}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, [key]: event.target.value }))
                }
                className="border-white/15 bg-[oklch(0.12_0.03_164)]"
              />
            </div>
          ))}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="heroSubheading">Subheading</Label>
          <Input
            id="heroSubheading"
            value={form.heroSubheading}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                heroSubheading: event.target.value,
              }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="heroDescription">Description</Label>
          <Textarea
            id="heroDescription"
            rows={4}
            value={form.heroDescription}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                heroDescription: event.target.value,
              }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="heroTagline">Footer tagline</Label>
          <Input
            id="heroTagline"
            value={form.heroTagline}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, heroTagline: event.target.value }))
            }
            className="border-white/15 bg-[oklch(0.12_0.03_164)]"
          />
        </div>
        <Button type="submit" disabled={isSaving} className="h-11 w-fit font-extrabold">
          {isSaving ? "Saving…" : "Save hero"}
        </Button>
      </form>

      <Card className="h-fit border-white/10 bg-[oklch(0.14_0.036_164)] ring-white/10">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 className="text-3xl leading-[0.9] font-black">
            <span className="block">{form.heroTitleLine1}</span>
            <span className="block font-display italic text-primary">
              {form.heroTitleAccent}
            </span>
            <span className="block">{form.heroTitleLine3}</span>
          </h3>
          <p className="text-sm font-extrabold">{form.heroSubheading}</p>
          <p className="text-sm text-[oklch(0.78_0.02_92)]">{form.heroDescription}</p>
          <p className="border-t border-white/10 pt-3 text-xs font-semibold">
            {form.heroTagline}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
