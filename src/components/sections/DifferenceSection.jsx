import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function DifferenceSection() {
  const { difference } = siteContent

  return (
    <Section className="text-white">
      {/* Editorial emotional-value section — no card grid, visual pause */}
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Ambient glow behind statement */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124, 92, 255, 0.06) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
          {difference.eyebrow}
        </span>

        {/* Large editorial statement */}
        <h2 className="mt-5 text-3xl font-bold leading-[1.2] sm:text-4xl lg:text-[3.25rem] lg:leading-[1.15]">
          {difference.title}
        </h2>

        {/* Extended description — editorial voice */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.9] text-[#9ca3af] sm:text-lg">
          {difference.description}
        </p>

        {/* Supporting points — inline, not in cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {difference.points.map((point, index) => (
            <div key={point.title} className="space-y-3 text-center">
              {/* Accent line */}
              <div className="mx-auto h-px w-10 bg-gradient-to-r from-transparent via-[#7c5cff]/40 to-transparent" />

              <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                {point.title}
              </h3>
              <p className="mx-auto max-w-xs text-sm leading-[1.8] text-[#7c8099]">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
