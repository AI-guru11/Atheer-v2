import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function FeatureStripSection() {
  const { featureStrip } = siteContent

  return (
    <section className="py-8 sm:py-10 text-white">
      <div className="container">
        {/* Minimal trust strip — horizontal, no cards */}
        <div className="space-y-5">
          <div className="text-right">
            <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
              {featureStrip.eyebrow}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/[0.05]" />

          {/* Inline feature items */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            {featureStrip.items.map((item, index) => (
              <div key={item.title} className="flex items-start gap-3 text-right sm:text-center sm:flex-col sm:items-center sm:flex-1">
                {/* Accent dot */}
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7c5cff]/50 sm:mt-0 sm:mb-1" />
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#7c8099]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/[0.05]" />
        </div>
      </div>
    </section>
  )
}
