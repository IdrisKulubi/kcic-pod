"use client"

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client"

export function StaffLoginForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    const result = await signIn.email({
      email,
      password,
    })

    setIsSubmitting(false)

    if (result.error) {
      const message =
        result.error.status >= 500
          ? "Could not reach the database. Check your connection and try again."
          : "Invalid email or password"
      toast.error(message)
      return
    }

    router.push("/staff")
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md border-white/10 bg-[oklch(0.14_0.036_164)] text-[oklch(0.96_0.01_92)] ring-white/10">
      <CardHeader>
        <CardTitle className="text-2xl font-black">Staff sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="border-white/15 bg-[oklch(0.12_0.03_164)]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="border-white/15 bg-[oklch(0.12_0.03_164)] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-[oklch(0.75_0.02_92)] hover:text-[oklch(0.96_0.01_92)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="size-5" aria-hidden />
                ) : (
                  <EyeIcon className="size-5" aria-hidden />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-11 font-extrabold"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
