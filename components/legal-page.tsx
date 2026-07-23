import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

type LegalSection = {
  title: string
  paragraphs: string[]
}

type LegalPageProps = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader />

      <article className="light-surface px-[clamp(1rem,2.2vw,2.75rem)] pb-[clamp(3rem,6vw,5rem)] pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            <p className="text-sm font-bold text-secondary">Legal</p>
            <h1 className="mt-3 text-balance text-[clamp(1.85rem,4vw,3rem)] font-black leading-[1.05]">
              {title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
              {intro}
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-extrabold text-foreground">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-pretty text-sm leading-7 text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
            Questions? Contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
