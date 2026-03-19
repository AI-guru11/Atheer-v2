import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function FeatureStripSection() {
  const { featureStrip } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-6">
        <div className="text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {featureStrip.eyebrow}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {featureStrip.items.map((item) => (
            <div
              key={item.title}
              className="charcoal-card rounded-2xl px-5 py-5"
            >
              <div className="space-y-2 text-right">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#7c8099]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
