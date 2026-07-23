import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="23 July 2026"
      intro={`${siteConfig.name} (“we”, “us”, or “our”) is a podcast produced by ${siteConfig.publisher}. This Privacy Policy explains how we handle information when you visit our website or engage with our content.`}
      sections={[
        {
          title: "Who we are",
          paragraphs: [
            `${siteConfig.name} is published by ${siteConfig.publisher} (KCIC). Our contact email for privacy questions is ${siteConfig.email}.`,
          ],
        },
        {
          title: "Information we collect",
          paragraphs: [
            "We may collect limited information when you use this site, including technical data such as browser type, device type, approximate location (country/city level), pages visited, and referral source.",
            "If you email us, we will receive the information you include in your message, such as your name, email address, and any details you share.",
            "We do not require an account to browse episodes on this website.",
          ],
        },
        {
          title: "How we use information",
          paragraphs: [
            "We use information to operate and improve the website, understand which episodes and pages are useful, respond to messages you send us, and protect the site from abuse or technical issues.",
            "We do not sell your personal information.",
          ],
        },
        {
          title: "Third-party services",
          paragraphs: [
            "Our website and podcast may link to or embed content from third-party platforms such as YouTube, Spotify, Apple Podcasts, and social networks. Those services have their own privacy policies and may collect data according to their terms.",
            "When you play an embedded episode or leave this site for a platform we link to, that platform’s privacy policy applies.",
          ],
        },
        {
          title: "Cookies and similar technologies",
          paragraphs: [
            "We may use cookies or similar technologies for basic site function, preferences, and analytics. See our Cookies Settings page for more detail on how cookies are used and how you can manage them.",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "We keep personal information only as long as needed for the purposes described in this policy, unless a longer period is required by law.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You may contact us to ask about information we hold about you, request a correction, or ask us to delete information you provided by email, where applicable.",
            `Email ${siteConfig.email} with the subject “Privacy request”.`,
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Continued use of the site after updates means you accept the revised policy.",
          ],
        },
      ]}
    />
  )
}
