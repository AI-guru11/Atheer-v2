import Section from "../layout/Section"
import Card from "../ui/Card"
import { siteContent } from "../../data/siteContent"

export default function DifferenceSection() {
  const { difference } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-8">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-cyan-300/70">
            {difference.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {difference.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {difference.description}
          </p>
        </div>

        <div className="grid gap-5">
          {difference.points.map((point) => (
            <Card key={point.title} className="p-7 sm:p-8 text-white">
              <div className="space-y-4">
                <div className="h-1.5 w-20 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]" />
                <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {point.title}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {point.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}