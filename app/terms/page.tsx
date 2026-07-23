import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"
import { buildPageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: `Terms for using the ${siteConfig.name} website and podcast content.`,
  path: "/terms",
})

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="23 July 2026"
      intro={`These Terms of Service govern your use of the ${siteConfig.name} website and related online content published by ${siteConfig.publisher}. By using this site, you agree to these terms.`}
      sections={[
        {
          title: "About the service",
          paragraphs: [
            `${siteConfig.name} is a podcast and digital storytelling platform featuring African voices on climate finance, clean energy, circularity, food systems, entrepreneurship, and leadership.`,
            "The website provides episode information, links to listening platforms, and related content for general information and education.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: [
            "You agree to use this site lawfully and respectfully. You must not attempt to disrupt the site, scrape content in a way that harms our systems, misuse contact channels, or misrepresent yourself as affiliated with KCIC or Sustainably Speaking Africa without permission.",
          ],
        },
        {
          title: "Content and intellectual property",
          paragraphs: [
            `Unless otherwise stated, podcast titles, descriptions, branding, logos, and site design related to ${siteConfig.name} are owned by ${siteConfig.publisher} or its licensors.`,
            "You may share links to episodes for personal, educational, or non-commercial purposes. You may not copy, redistribute, or commercially reuse our materials without prior written permission, except where fair dealing / fair use or another legal exception applies.",
            "Guest opinions expressed on the podcast are their own and do not necessarily represent the official position of KCIC.",
          ],
        },
        {
          title: "Third-party platforms",
          paragraphs: [
            "Episodes may be available on YouTube, Spotify, Apple Podcasts, and social platforms. Your use of those services is governed by their own terms and policies.",
            "We are not responsible for the availability, ads, recommendations, or data practices of third-party platforms.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "Content on this site and in the podcast is provided for informational and educational purposes. It is not professional, legal, financial, or investment advice.",
            "We aim for accuracy but do not guarantee that all content is complete, current, or error-free.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, KCIC and Sustainably Speaking Africa are not liable for any indirect, incidental, or consequential loss arising from your use of the site or reliance on podcast content.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [
            `For questions about these terms, contact ${siteConfig.email}.`,
          ],
        },
        {
          title: "Updates",
          paragraphs: [
            "We may revise these Terms of Service periodically. The “Last updated” date reflects the latest version. Continued use of the site after changes means you accept the updated terms.",
          ],
        },
      ]}
    />
  )
}
