import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = buildPageMetadata({
  title: "Cookies Settings",
  description: `How ${siteConfig.name} uses cookies and how you can manage them.`,
  path: "/cookies",
})

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies Settings"
      updated="23 July 2026"
      intro={`This page explains how ${siteConfig.name} uses cookies and similar technologies, and how you can control them in your browser.`}
      sections={[
        {
          title: "What are cookies?",
          paragraphs: [
            "Cookies are small text files stored on your device when you visit a website. They help sites remember preferences, keep things working, and understand how pages are used.",
            "Similar technologies include local storage and pixels used by embedded media or analytics tools.",
          ],
        },
        {
          title: "How we use cookies",
          paragraphs: [
            "Essential cookies may be used for basic site operation, security, and remembering simple preferences.",
            "Analytics cookies (if enabled) help us understand which pages and episodes are visited so we can improve the experience. These insights are typically aggregated.",
            "Embedded third-party players (for example YouTube) may set their own cookies when you interact with embedded content.",
          ],
        },
        {
          title: "Third-party cookies",
          paragraphs: [
            "When you follow links to Spotify, Apple Podcasts, YouTube, or our social channels, those platforms may set cookies according to their own policies.",
            "We do not control third-party cookies. Please review each platform’s cookie and privacy documentation for details.",
          ],
        },
        {
          title: "Managing cookies",
          paragraphs: [
            "You can control cookies through your browser settings. Most browsers let you block cookies, delete existing cookies, or alert you before a cookie is stored.",
            "If you block all cookies, some site features—especially embedded video or media—may not work as expected.",
            "Browser cookie controls are usually found under Settings → Privacy / Security → Cookies (wording varies by browser).",
          ],
        },
        {
          title: "Your choices on this site",
          paragraphs: [
            "This website currently does not use a separate cookie consent banner for optional marketing cookies. If that changes, we will update this page and provide clearer on-site controls.",
            "You can always limit cookies in your browser or avoid interacting with embedded third-party players if you prefer not to load those cookies.",
          ],
        },
        {
          title: "More information",
          paragraphs: [
            `For privacy-related questions, see our Privacy Policy or email ${siteConfig.email}.`,
          ],
        },
      ]}
    />
  )
}
