import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function ServicesSection() {
  const { services } = siteContent

  // Stagger offsets — margin-right pushes inward from start in RTL
  const stepOffsets = [
    "",
    "sm:mr-[7%]",
    "sm:mr-[2%]",
  ]

  return (
    <Section className="text-white">
      <div className="space-y-14 sm:space-y-16">
        {/* Section header with accent */}
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {services.eyebrow}
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            ثلاث خطوات فقط لتبدأ{" "}
            <span className="heading-accent">التجربة</span>
          </h2>
        </div>

        {/* Staggered editorial steps */}
        <div className="space-y-6 sm:space-y-0">
          {services.items.map((item, index) => (
            <div
              key={item.title}
              className={`relative ${stepOffsets[index] || ""}`}
            >
              {/* Oversized background numeral */}
              <span
                className="pointer-events-none absolute -top-6 right-0 text-[7rem] sm:text-[9rem] lg:text-[11rem] font-bold leading-none text-white/[0.025] select-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Step content */}
              <div className="relative space-y-3 text-right pt-6 sm:pt-8">
                {/* Step indicator with glowing dot */}
                <div className="flex items-center justify-end gap-3">
                  <span className="text-xs font-semibold tracking-[0.12em] text-[#22d3ee]/60">
                    {item.subtitle}
                  </span>
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full bg-[#7c5cff]"
                    style={{ boxShadow: "0 0 12px rgba(124, 92, 255, 0.45), 0 0 4px rgba(124, 92, 255, 0.3)" }}
                  />
                </div>

                <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {item.title}
                </h3>

                <p className="max-w-xl text-base leading-[1.8] text-[#7c8099] sm:text-lg">
                  {item.description}
                </p>
              </div>

              {/* Directional connector to next step */}
              {index !== services.items.length - 1 && (
                <div
                  className="flex justify-end mt-8 sm:mt-12 pr-[0.19rem]"
                  aria-hidden="true"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-8 sm:h-10 w-px bg-gradient-to-b from-[#7c5cff]/20 to-transparent" />
                    <div className="h-1 w-1 rounded-full bg-[#7c5cff]/25" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
