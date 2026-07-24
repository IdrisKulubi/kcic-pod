"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, WaveSine } from "@phosphor-icons/react"
import gsap from "gsap"

const narrativeShifts = [
  { from: "Africa as climate victim", to: "Africa as climate innovator" },
  { from: "Abstract climate data", to: "Lived African experience" },
  { from: "Problems", to: "Possibilities" },
] as const

const futureSignals = [
  "Homegrown innovation",
  "Investable opportunity",
  "Resilient futures",
] as const

export function NarrativeShiftSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reducedMotion) return

    let observer: IntersectionObserver | undefined

    const context = gsap.context(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          const timeline = gsap.timeline({ defaults: { ease: "expo.out" } })

          timeline
            .from("[data-narrative-heading]", {
              y: 44,
              opacity: 0,
              duration: 1,
            })
            .from(
              "[data-narrative-copy]",
              { y: 24, opacity: 0, duration: 0.75, stagger: 0.1 },
              "-=0.58"
            )
            .from(
              "[data-narrative-row]",
              { x: 38, opacity: 0, duration: 0.8, stagger: 0.12 },
              "-=0.42"
            )
            .from(
              "[data-narrative-sweep]",
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.7,
                stagger: 0.1,
              },
              "-=0.76"
            )
            .from(
              "[data-narrative-signal]",
              { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 },
              "-=0.34"
            )

          gsap.to("[data-narrative-orbit='outer']", {
            rotate: 360,
            duration: 34,
            repeat: -1,
            ease: "none",
          })
          gsap.to("[data-narrative-orbit='inner']", {
            rotate: -360,
            duration: 26,
            repeat: -1,
            ease: "none",
          })

          observer?.disconnect()
        },
        { threshold: 0.16 }
      )

      observer.observe(section)
    }, section)

    return () => {
      observer?.disconnect()
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="light-surface relative isolate overflow-hidden px-[clamp(1rem,2.2vw,2.75rem)] py-[clamp(4rem,7vw,7rem)]"
    >
      <div
        className="pointer-events-none absolute top-[-9rem] right-[-8rem] hidden aspect-square w-[34rem] opacity-35 lg:block"
        aria-hidden="true"
      >
        <span
          data-narrative-orbit="outer"
          className="absolute inset-0 rounded-full border border-primary/40"
        >
          <span className="absolute top-[20%] left-[11%] size-3 rounded-full bg-secondary" />
          <span className="absolute right-[18%] bottom-[14%] size-2 rounded-full bg-primary" />
        </span>
        <span
          data-narrative-orbit="inner"
          className="absolute inset-[18%] rounded-full border border-secondary/35"
        >
          <span className="absolute top-1/2 right-[-0.3rem] size-2.5 rounded-full bg-highlight" />
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[96rem]">
        <div className="grid gap-[clamp(2.5rem,6vw,7rem)] lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.58fr)] lg:items-end">
          <div>
            <p
              data-narrative-copy
              className="mb-5 text-base font-extrabold text-secondary"
            >
              The story needs to change.
            </p>
            <h2
              data-narrative-heading
              className="max-w-5xl text-[clamp(2.75rem,6.2vw,6rem)] leading-[0.92] font-black tracking-[0.01em] text-balance"
            >
              Africa is not only facing the climate crisis.
              <span className="mt-2 block font-display font-normal text-primary italic">
                It is building the solutions.
              </span>
            </h2>
          </div>

          <div data-narrative-copy className="border-t border-border pt-5">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/45">
                <WaveSine className="size-5" weight="bold" aria-hidden="true" />
              </span>
              <p className="font-extrabold">
                Amplifying African Narratives of Change
              </p>
            </div>
            <p className="max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              We ground sustainability in local context, tangible innovation,
              and the lived experiences of people making a difference across the
              continent.
            </p>
          </div>
        </div>

        <div className="mt-[clamp(3rem,6vw,6rem)] border-t border-border">
          <ul aria-label="The narrative shifts this podcast champions">
            {narrativeShifts.map((shift) => (
              <li
                key={shift.from}
                data-narrative-row
                className="relative grid gap-3 border-b border-border py-5 sm:grid-cols-[minmax(0,0.78fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-6 sm:py-6"
              >
                <span className="text-base font-semibold text-muted-foreground line-through decoration-foreground/25 sm:text-lg">
                  {shift.from}
                </span>
                <ArrowRight
                  className="size-5 rotate-90 text-secondary sm:rotate-0"
                  weight="bold"
                  aria-hidden="true"
                />
                <span className="text-[clamp(1.35rem,2.5vw,2.35rem)] leading-tight font-black text-foreground">
                  {shift.to}
                </span>
                <span
                  data-narrative-sweep
                  className="absolute bottom-[-1px] left-0 h-px w-full bg-linear-to-r from-primary via-secondary to-transparent"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
          {futureSignals.map((signal, index) => (
            <div
              key={signal}
              data-narrative-signal
              className="flex items-center gap-3 text-sm font-extrabold text-foreground/80 sm:text-base"
            >
              <span
                className={`size-2 rounded-full ${
                  index === 0
                    ? "bg-primary"
                    : index === 1
                      ? "bg-secondary"
                      : "bg-highlight"
                }`}
                aria-hidden="true"
              />
              {signal}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
