import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function DifferenceSection() {
  const { difference } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-10">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {difference.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {difference.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
            {difference.description}
          </p>
        </div>

        <div className="grid gap-3">
          {difference.points.map((point) => (
            <div
              key={point.title}
              className="section-card charcoal-card rounded-2xl p-7 sm:p-8"
            >
              <div className="space-y-3">
                <div className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#7c5cff_50%,#22d3ee_100%)]" />
                <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {point.title}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
