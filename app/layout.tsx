import type { Metadata } from "next"
import { Instrument_Serif, Manrope } from "next/font/google"

import { JsonLd } from "@/components/json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import {
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildPodcastSeriesJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  ...buildPageMetadata(),
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={siteConfig.language}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        manrope.variable,
        instrumentSerif.variable
      )}
    >
      <body>
        <JsonLd
          data={[
            buildWebsiteJsonLd(),
            buildOrganizationJsonLd(),
            buildPodcastSeriesJsonLd(),
          ]}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
