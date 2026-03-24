import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function FeaturedSection() {
  const { featured } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {featured.eyebrow}
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {featured.title}
          </h2>
        </div>

        {/* Alternating feature blocks — not equal-weight card grid */}
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4">
          {featured.items.map((item, index) => {
            // Asymmetric column spans for visual variety
            const spans = [
              "sm:col-span-7",
              "sm:col-span-5",
              "sm:col-span-12",
            ]
            const span = spans[index] || "sm:col-span-12"

            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] p-7 sm:p-8 ${span}`}
                style={{
                  background:
                    index === 2
                      ? "linear-gradient(135deg, rgba(19, 19, 22, 0.45) 0%, rgba(124, 92, 255, 0.04) 100%)"
                      : "rgba(19, 19, 22, 0.40)",
                }}
              >
                <div className="flex flex-col gap-4 text-right">
                  {/* Tag */}
                  <div className="flex justify-end">
                    <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#a78bfa]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className={`text-base leading-[1.8] text-[#7c8099] ${
                    index === 2 ? "max-w-xl" : "max-w-lg"
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
