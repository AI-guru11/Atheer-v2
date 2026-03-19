import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function ServicesSection() {
  const { services } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-10">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {services.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {services.title}
          </h2>
        </div>

        <div className="grid gap-3">
          {services.items.map((item) => (
            <div
              key={item.title}
              className="section-card charcoal-card rounded-2xl p-7 sm:p-8"
            >
              <div className="space-y-4">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#a78bfa]/60">
                  {item.subtitle}
                </span>

                <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {item.title}
                </h3>

                <p className="max-w-2xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
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
