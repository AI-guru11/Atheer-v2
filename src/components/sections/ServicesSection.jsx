import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function ServicesSection() {
  const { services } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-16 sm:space-y-20">
        {/* Section header */}
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {services.eyebrow}
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {services.title}
          </h2>
        </div>

        {/* Editorial numbered steps — asymmetric, guided flow */}
        <div className="space-y-12 sm:space-y-0">
          {services.items.map((item, index) => (
            <div
              key={item.title}
              className={`relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10 ${
                index !== services.items.length - 1
                  ? "sm:pb-16 sm:border-b sm:border-white/[0.04]"
                  : ""
              }`}
            >
              {/* Step number — large editorial accent */}
              <div className="flex-shrink-0 sm:w-28 sm:text-center">
                <span className="inline-flex items-center justify-center text-6xl sm:text-7xl lg:text-8xl font-bold leading-none text-white/[0.05]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Step content */}
              <div className="flex-1 space-y-3 text-right sm:pt-3">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#22d3ee]/60">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-base leading-[1.8] text-[#7c8099] sm:text-lg">
                  {item.description}
                </p>
              </div>

              {/* Connecting line between steps (hidden on last) */}
              {index !== services.items.length - 1 && (
                <div
                  className="hidden sm:block absolute right-14 bottom-0 h-8 w-px bg-gradient-to-b from-[#7c5cff]/20 to-transparent"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
