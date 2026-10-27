import type { Metadata } from "next"

import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function StaffRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster theme="dark" richColors position="top-center" />
    </>
  )
}
