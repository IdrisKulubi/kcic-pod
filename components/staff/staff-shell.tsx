"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowSquareOut, SignOut } from "@phosphor-icons/react"
import { toast } from "sonner"

import { StaffSidebar } from "@/components/staff/staff-sidebar"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth-client"

type StaffShellProps = {
  userName: string
  userEmail: string
  children: React.ReactNode
}

export function StaffShell({ userName, userEmail, children }: StaffShellProps) {
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    toast.success("Signed out")
    router.push("/staff/login")
    router.refresh()
  }

  return (
    <div className="min-h-svh bg-[oklch(0.11_0.032_164)] text-[oklch(0.96_0.01_92)]">
      <div className="mx-auto grid min-h-svh max-w-[120rem] lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="border-b border-white/10 px-4 py-6 lg:border-r lg:border-b-0 lg:px-5 lg:py-8">
          <div className="mb-8">
            <p className="text-xs font-extrabold tracking-[0.18em] text-primary uppercase">
              Staff workspace
            </p>
            <h1 className="mt-2 text-lg font-black">Sustainably Speaking Africa</h1>
            <p className="mt-1 text-xs text-[oklch(0.78_0.02_92)]">{userEmail}</p>
          </div>
          <StaffSidebar />
          <div className="mt-8 grid gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "justify-start border-white/15 bg-transparent"
              )}
            >
              <ArrowSquareOut className="size-4" aria-hidden="true" />
              View site
            </Link>
            <Button
              variant="outline"
              className="justify-start border-white/15 bg-transparent"
              onClick={handleSignOut}
            >
              <SignOut className="size-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </aside>
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <header className="mb-8 border-b border-white/10 pb-6">
            <p className="text-sm text-[oklch(0.78_0.02_92)]">Signed in as</p>
            <p className="text-xl font-black">{userName}</p>
          </header>
          {children}
        </div>
      </div>
    </div>
  )
}
